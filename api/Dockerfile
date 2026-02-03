FROM alpine:latest AS build

# install github cli
RUN apk --no-cache add github-cli

# Download specific release of libhg
ARG LIBHG_VERSION
RUN --mount=type=secret,id=libhg-pat,env=LIBHG_PAT \
  echo ${LIBHG_PAT} | gh auth login --with-token
RUN gh release download ${LIBHG_VERSION} \
  --repo equinor/gpa-libhg \
  --pattern 'libhg.so' \
  --output /tmp/libhg.so


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
COPY --from=build /tmp/libhg.so /code/libhg/
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
