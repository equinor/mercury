# syntax=docker/dockerfile:1
FROM intel/oneapi-hpckit:2024.0.1-devel-ubuntu22.04 as dependencies
ENV LANG=C.UTF-8 LC_ALL=C.UTF-8
WORKDIR /build

# Installing build dependencies. Including f2py(Fortan to python, included in numpy)
RUN <<EOF
#!/usr/bin/env bash
set -euo pipefail

apt-get update || true
apt-get install -y --no-install-recommends \
        curl ca-certificates gnupg2 git openssh-client procps
apt-get install python3-pip -y
pip install numpy==2.2.3
EOF

# Install Intel Fortran compiler
#RUN curl -fsSL https://apt.repos.intel.com/intel-gpg-keys/GPG-PUB-KEY-INTEL-SW-PRODUCTS-2023.PUB | gpg --dearmor > /usr/share/keyrings/oneAPI-keyring.gpg
#RUN echo "deb [signed-by=/usr/share/keyrings/oneAPI-keyring.gpg] https://apt.repos.intel.com/oneapi all main " > /etc/apt/sources.list.d/oneAPI.list
#RUN apt-get update && \
#    apt-get install -y --no-install-recommends \
#    build-essential openssh-client && \
#    rm -rf /var/lib/apt/lists/*

# Install Intel Fortran compiler
RUN apt-get install -y gpg-agent
#RUN wget -O- https://apt.repos.intel.com/intel-gpg-keys/GPG-PUB-KEY-INTEL-SW-PRODUCTS.PUB | gpg --dearmor | tee /usr/share/keyrings/oneapi-archive-keyring.gpg > /dev/null
#RUN echo "deb [signed-by=/usr/share/keyrings/oneapi-archive-keyring.gpg] https://apt.repos.intel.com/oneapi all main" | tee /etc/apt/sources.list.d/oneAPI.list
#RUN --mount=type=cache,target=/var/lib/apt/ \
#    apt-get update && \
#    apt-get install -y --no-install-recommends \
#    openssh-client

# Clone libhg fortran repo
#FROM dependencies as build
#ARG LIBHG_REPO_DEPLOY_KEY
#ENV GITHASH=14ce571e2af87fce039de2a30721980e2dafe54b
# RUN mkdir /root/.ssh && echo "$LIBHG_REPO_DEPLOY_KEY" > /root/.ssh/id_ed25519
# RUN chmod -R 600 /root/.ssh
# RUN ssh-keyscan github.com > ~/.ssh/known_hosts
# RUN git clone git@github.com:equinor/gpa-libhg.git

# Pulls latest stabile commit from libhg repository:
# RUN git -C gpa-libhg checkout $GITHASH
# RUN mv gpa-libhg/libhg ./libhg

# Load env variables, compile fortran library and create python .so file
#SHELL ["/bin/bash", "-c"]
#COPY libhg ./libhg
#COPY compile.sh ./libhg/
#RUN cd libhg && ./compile.sh

FROM python:3.10-slim as base
ENV PYTHONUNBUFFERED=1
ENV LANG=C.UTF-8 LC_ALL=C.UTF-8
ENV PYTHONPATH=/usr/local/lib/
ENV LD_LIBRARY_PATH="/code/lib:$LD_LIBRARY_PATH"
ENTRYPOINT ["/code/init.sh"]
CMD ["api"]
EXPOSE 5000
WORKDIR /code

# Install poetry
RUN pip install --upgrade pip && \
    pip install poetry && \
    poetry config virtualenvs.create false

# Install python dependencies
COPY pyproject.toml pyproject.toml
COPY poetry.lock poetry.lock
COPY ./lib ./lib
COPY ./libhg.so ./libhg.so

FROM base as development
RUN poetry install
COPY ./src .
USER 1000

FROM base as prod
RUN poetry install --only=main
COPY ./src .
USER 1000