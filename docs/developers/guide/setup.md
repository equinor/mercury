# Setup

This guide will help you set up the development environment for the project.

First clone the repository and navigate to the project directory.

We will assume that [`mise`](https://mise.jdx.dev) is installed from now on.

## Configuration

To install relevant project tools:

```bash
mise trust .
mise install
prek install
```

Environment variables is used for configuration and must be set before running in a file called `.env`.
Use the `.env-template` to create your own `.env` file and populate with values.

### Note about `LIBHG_PAT` environment variable

The API depends on a custom python module called `libhg`. This module is compiled using
[f2py](https://numpy.org/doc/stable/f2py/) on a proprietary Fortran codebase [gpa-libhg](https://github.com/equinor/gpa-libhg).

The gpa-libhg repository creates the `libhg` python module `.so` file as a release asset.
So when we are building the API docker image, we download this `.so` file and bake it into the API image.
To be able to download the asset, we need read access to the gpa-libhg repository. The simplest way to
get this is by using an access token:

Create a new fine-grained access token with the access to the gpa-libhg repository,
along with read access to code and metadata. Set this token to the `.env` variable `LIBHG_PAT`.
