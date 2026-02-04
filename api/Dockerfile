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


FROM python:3.13-slim-bookworm AS base
ENV LANG=C.UTF-8 LC_ALL=C.UTF-8
ENV UV_VERSION="0.9.22"
ENV USER="mercury"
ENV PYTHONPATH=/code/src

# add mercury user
RUN adduser \
  --disabled-password \
  --home /code \
  --gecos "" \
  --uid 1000 \
  "$USER"

# install uv
# - byte-compile packages for faster application startups
# - silence uv complaining about not being able to use hard links
# - prevent uv from accidentally downloading isolated Python builds
# - ensure installed tools can be executed out of the box
ENV UV_COMPILE_BYTECODE=1 \
  UV_LINK_MODE=copy \
  UV_PYTHON_DOWNLOADS=never \
  UV_TOOL_BIN_DIR=/usr/local/bin
RUN --mount=type=cache,target=/root/.cache/pip \
  pip install --upgrade pip && \
  pip install "uv==$UV_VERSION"


WORKDIR /code
ENTRYPOINT ["/code/src/init.sh"]
EXPOSE 5000
CMD ["run"]


FROM base AS main-dependencies
# copy libhg build and add to PYTHONPATH
COPY --from=build --chown="$USER:$USER" /tmp/libhg.so /code/libhg/
ENV PYTHONPATH=/code/libhg:$PYTHONPATH

# - use cache, mount pyproject.toml and uv.lock
# - synchronise dependencies without installing the application itself
# - add venv to path
RUN --mount=type=cache,target=/root/.cache/uv \
  --mount=type=bind,source=uv.lock,target=uv.lock \
  --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
  uv sync --locked --no-dev --no-install-project
ENV PATH="/code/.venv/bin:$PATH"


FROM main-dependencies AS dev-dependencies
# install dev dependencies
RUN --mount=type=cache,target=/root/.cache/uv \
  --mount=type=bind,source=uv.lock,target=uv.lock \
  --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
  uv sync --locked --dev --no-install-project


FROM dev-dependencies AS development
COPY --chown="$USER:$USER" . .
USER 1000


FROM main-dependencies AS prod
COPY --chown="$USER:$USER" src src
USER 1000
