FROM python:3.10-slim as build
ARG LIBHG_REPO_DEPLOY_KEY
ENV LANG=C.UTF-8 LC_ALL=C.UTF-8
WORKDIR /build

# Update and install f2py(Fortan to python, included in numpy)
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    curl ca-certificates gnupg2 git openssh-client && \
    pip install numpy=="1.23.0" && \
    rm -rf /var/lib/apt/lists/*

# Install Intel Fortran compiler
RUN curl -fsSL https://apt.repos.intel.com/intel-gpg-keys/GPG-PUB-KEY-INTEL-SW-PRODUCTS-2023.PUB | gpg --dearmor > /usr/share/keyrings/oneAPI-keyring.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/oneAPI-keyring.gpg] https://apt.repos.intel.com/oneapi all main " > /etc/apt/sources.list.d/oneAPI.list
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    build-essential openssh-client intel-oneapi-compiler-fortran && \
    rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV PATH="/opt/intel/oneapi/compiler/2022.1.0/linux/bin/intel64:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin" \
    LD_LIBRARY_PATH="/opt/intel/oneapi/compiler/2022.1.0/linux/lib:/opt/intel/oneapi/compiler/2022.1.0/linux/lib/x64:/opt/intel/oneapi/compiler/2022.1.0/linux/compiler/lib/intel64_lin"

# Clone libhg fortran repo (cfortan compatible branch)
RUN mkdir /root/.ssh && echo "$LIBHG_REPO_DEPLOY_KEY" > /root/.ssh/id_ed25519
RUN chmod -R 600 /root/.ssh
RUN ssh-keyscan github.com > ~/.ssh/known_hosts
RUN git clone git@github.com:equinor/gpa-libhg.git
RUN cd gpa-libhg && git checkout cfortan-compatible && cd ..
RUN mv gpa-libhg/libhg ./libhg

# Compile fortran library and create python .so file
COPY compile.sh ./libhg/
RUN cd libhg && ./compile.sh

FROM python:3.10-slim as base-api
ENV PYTHONUNBUFFERED=1
ENV LANG=C.UTF-8 LC_ALL=C.UTF-8
ENV PYTHONPATH=/usr/local/lib/
ENTRYPOINT ["/code/init.sh"]
CMD ["api"]
EXPOSE 5000
WORKDIR /code

COPY --from=build /build/libhg.so /usr/local/lib/
# Install poetry
RUN pip install --upgrade pip && \
    pip install poetry && \
    poetry config virtualenvs.create false

# Install python dependencies
COPY pyproject.toml pyproject.toml
COPY poetry.lock poetry.lock


FROM base-api as dev-api
RUN poetry install
COPY . .
USER 1000

FROM base-api as prod-api
RUN poetry install --no-dev
COPY . .
USER 1000