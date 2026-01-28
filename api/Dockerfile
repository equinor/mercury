FROM python:3.10-slim AS build-base
ENV LANG=C.UTF-8 LC_ALL=C.UTF-8
WORKDIR /build

# Installing build dependencies. Including f2py(Fortan to python, included in numpy)
RUN apt-get update && \
  apt-get install -y --no-install-recommends \
  curl ca-certificates gnupg2 git openssh-client procps && \
  pip install numpy=="1.23"

# Install Intel Fortran compiler
RUN curl -fsSL https://apt.repos.intel.com/intel-gpg-keys/GPG-PUB-KEY-INTEL-SW-PRODUCTS-2023.PUB | gpg --dearmor > /usr/share/keyrings/oneAPI-keyring.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/oneAPI-keyring.gpg] https://apt.repos.intel.com/oneapi all main " > /etc/apt/sources.list.d/oneAPI.list
RUN apt-get update && \
  apt-get install -y --no-install-recommends \
  build-essential openssh-client intel-oneapi-compiler-fortran && \
  rm -rf /var/lib/apt/lists/*


FROM build-base AS build
# Clone libhg fortran repo
ENV GITHASH=14ce571e2af87fce039de2a30721980e2dafe54b
RUN --mount=type=secret,id=libhg-repo-deploy-key,env=LIBHG_REPO_DEPLOY_KEY \
  mkdir /root/.ssh && echo "${LIBHG_REPO_DEPLOY_KEY}" > /root/.ssh/id_ed25519 && \
  chmod -R 600 /root/.ssh && \
  ssh-keyscan github.com > ~/.ssh/known_hosts && \
  git clone git@github.com:equinor/gpa-libhg.git

# Pulls latest stabile commit from libhg repository:
RUN git -C gpa-libhg checkout $GITHASH
RUN mv gpa-libhg/libhg ./libhg

# Load env variables, compile fortran library and create python .so file
SHELL ["/bin/bash", "-c"]
COPY compile.sh ./libhg/
RUN cd libhg && source /opt/intel/oneapi/setvars.sh && ./compile.sh


FROM python:3.10-slim AS uv-base
ENV LANG=C.UTF-8 LC_ALL=C.UTF-8 PATH="/code/.venv/bin:$PATH"
WORKDIR /code

# install uv
# - byte-compile packages for faster application startups
# - silence uv complaining about not being able to use hard links
# - prevent uv from accidentally downloading isolated Python builds
# - use system python
ENV UV_COMPILE_BYTECODE=1 \
  UV_LINK_MODE=copy \
  UV_PYTHON_DOWNLOADS=never \
  UV_SYSTEM_PYTHON=1
RUN pip install --upgrade pip && \
  pip install uv==0.9.22


FROM uv-base AS main-dependencies
# copy libhg build and add to PYTHONPATH
COPY --from=build /build/libhg.so /code/libhg/
ENV PYTHONPATH=/code/libhg:$PYTHONPATH

# - use cache, mount pyproject.toml and uv.lock
# - synchronise dependencies without installing the application itself
RUN --mount=type=cache,target=/root/.cache/uv \
  --mount=type=bind,source=uv.lock,target=uv.lock \
  --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
  uv sync --locked --no-dev --no-install-project


FROM main-dependencies AS dev-dependencies
# install dev dependencies
RUN --mount=type=cache,target=/root/.cache/uv \
  --mount=type=bind,source=uv.lock,target=uv.lock \
  --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
  uv sync --locked --dev --no-install-project


FROM dev-dependencies AS development
WORKDIR /code/src
COPY src .
USER 1000
EXPOSE 5000
ENTRYPOINT ["/code/src/init.sh"]
CMD ["api"]


FROM main-dependencies AS prod
WORKDIR /code/src
COPY src .
USER 1000
EXPOSE 5000
ENTRYPOINT ["/code/src/init.sh"]
CMD ["api"]
