# Mercury &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) ![CI)](https://github.com/equinor/mercury/actions/workflows/on-push-main-branch.yaml/badge.svg)

Mercury calculator - API and Webapp

## About

This calculator performs phase equilibrium calculations for mercury. It can be used to provide mercury distribution results for hydrocarbon mixtures at different temperatures and pressures. Depending on the corresponding conditions used, the calculator can provide results up to 4 separate phases: Hydrocarbon Gas/Hydrocarbon Liquid/Aqueous/Pure Mercury (liquid or solid).

The core of the calculator is the UMR model (1-4). This model has been qualified for mercury calculations through the research activity “Mercury distribution in the oil & gas value chain” [colab link](https://colab.equinor.com/technologies/75C06E9B-49E4-4746-940E-EE6E33ED7F3E/summary).

The model was tested and qualified for gas/condensate systems for the following conditions:

**Offshore applications:** -30 to 110°C, 1 to 160 bara.

- The model can be used for hydrocarbon systems with an overall uncertainty of 50% for gas systems and an order of magnitude for liquid systems. For the gas systems, the model tends to underpredict mercury concentration, while for condensate systems the model tends to overpredict with values up to appr. 10 times higher (non-stabilized).

- The model can be used for produced water calculations, with estimated uncertainty an order of magnitude (overestimation).

**Onshore applications:** -50 to 150°C, 1 to 90 bara.

- The model can be used for hydrocarbon/Hg calculations, and it will provide realistic and representative Hg concentrations and distribution. For gas systems, the model tends to predict higher concentrations but in the same order of magnitude as the measurements. For hydrocarbon liquid systems, the model tends to predict higher Hg concentrations, which can be up to an order of magnitude higher.

It is also possible to use the model for glycol systems (MEG and TEG) but the uncertainty of the model is not defined for such calculations.

- The architecture contract for the calculator can be found [here](https://github.com/equinor/architecturecontract/blob/master/contracts/Mercury.md) (requires sign in)

- Test fluids for calculations can be found [here](https://github.com/equinor/mercury/blob/main/api/src/tests/test_data/multiflash_data.py)

- For technical support and improvement suggestions please contact: <fg_team_hermes@equinor.com>

**References**

1. Voutsas E, Magoulas K, Tassios D. Universal mixing rule for cubic equations of state applicable to symmetric and asymmetric systems: results with the Peng−Robinson equation of state. Ind Eng Chem Res 2004; 43(19):6238–46.

2. Novak N, Louli V, Skouras S, Voutsas E. Prediction of dew points and liquid dropouts of gas condensate mixtures. Fluid Phase Equilibria 2018; 457:62–73.

3. Koulocheris V, Louli V, Panteli E, Skouras S, Voutsas E, Modelling of elemental mercury solubility in natural gas components, Fuel 233 (2018) 558-564.

4. Koulocheris V, Plakia A, Louli V, Panteli E, Voutsas E, Calculating the chemical and phase equilibria of mercury in natural gas, Fluid Phase Equilibria, 544-545 (2021) 113089.

## Develop

### Prerequisites

In order to run the application locally, you need:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Make sure you have Python installed. version 3.10 or higher is required.

Building the Dockerfile requires access to the private Github repository with the fortan library source (<https://github.com/equinor/gpa-libhg>).  
The simplest way to manage this is by adding a **deploy key** to the repository.  
Generate the keypair like so;

```bash
ssh-keygen -t ed25519 -f ./id_ed25519
```

Upload the public key to Github, and add the private key to .env, replacing newlines with **`\n`** so that it is one line.

```bash
LIBHG_REPO_DEPLOY_KEY=-----BEGIN OPENSSH PRIVATE KEY-----\nb3Blbn...
```

### Testing

Depending on your OS/CPU, tests can be run locally or via Docker. In order to test locally, Intel's Fortran compiler
must be installed and libhg must be compiled (see <https://github.com/equinor/gpa-libhg>) for more details on how to
compile the library. Tests are then run through pytest from the command line.

To run tests in docker you first have to build the Docker image. When the build is done, unit tests can be run with the
command:

```bash
docker compose run --rm api pytest
```

Integration tests are run with the command:

```bash
docker compose run --rm api pytest --integration
```

### Common issues

- <b>gpg: no valid OpenPGP data found.</b><br>
  If this error occurs when you try to run `docker-compose up` locally, it might be caused by you being connected to the Access_Restricted_WInternetwork network. Try instead to connect to Statoil-Approved.

<a id="Contributing"></a>

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
