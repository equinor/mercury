FROM python:3.10-slim
ARG LIBHG_REPO_DEPLOY_KEY

ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/code
ENV LANG=C.UTF-8 LC_ALL=C.UTF-8
WORKDIR /code

# Update and install Fortran compiler
RUN apt-get update && apt-get install gfortran git -y

# Install poetry
RUN pip install --upgrade pip && \
    pip install poetry && \
    poetry config virtualenvs.create false

# Install python dependencies
COPY pyproject.toml pyproject.toml
COPY poetry.lock poetry.lock
RUN poetry install

# Clone libhg fortran repo (cfortan compatible branch)
COPY ./id_rsa /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa
RUN ssh-keyscan github.com > ~/.ssh/known_hosts
RUN git clone git@github.com:equinor/gpa-libhg.git
RUN cd gpa-libhg && git checkout cfortan-compatible && cd ..
RUN mv gpa-libhg/libhg /code/libhg

# Compile fortran library and create python .so file
COPY ./generate.sh /code/libhg/
RUN cd libhg && ./generate.sh