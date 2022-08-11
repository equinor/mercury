FROM python:3.10-slim as build
ARG LIBHG_REPO_DEPLOY_KEY
ENV LANG=C.UTF-8 LC_ALL=C.UTF-8
WORKDIR /build

# Update and install Fortran compiler and f2py(Fortan to python, included in numpy)
RUN apt-get update && \
    apt-get install gfortran git -y && \
    pip install numpy=="1.23.0"

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

RUN apt-get update && \
    apt-get install gfortran -y
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