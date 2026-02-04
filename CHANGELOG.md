# Changelog

## [1.1.8](https://github.com/equinor/mercury/compare/v1.1.7...v1.1.8) (2026-02-04)


### Continuous Integration

* update release workflows ([9125e43](https://github.com/equinor/mercury/commit/9125e43f91f89442e8f30713b3e3c4f634cc70f7))

## [1.1.7](https://github.com/equinor/mercury/compare/v1.1.6...v1.1.7) (2026-02-04)


### Miscellaneous Chores

* correct casing ([ea422bf](https://github.com/equinor/mercury/commit/ea422bf06b9faf6d147a1a58751d2682068ecd75))
* lock python to version 3.10 ([0ff4d5b](https://github.com/equinor/mercury/commit/0ff4d5b8c3045af27ed628d95924227dfca1aebd))
* make release-please update versions ([099bc63](https://github.com/equinor/mercury/commit/099bc6390da1c5bf9c648e28ff1e3dc561aa5979))
* mypy error ([b2a0b6f](https://github.com/equinor/mercury/commit/b2a0b6fdf11f41ed78f93d11d2ac851c6453164f))
* refactor mock authentication ([9037424](https://github.com/equinor/mercury/commit/903742420b78af9b09592343f4e1f74b38aedd33))
* run prek ([65f4e7d](https://github.com/equinor/mercury/commit/65f4e7dfe7e8540b85eb55d5849b090bb38f8df0))
* update api dependencies ([6f07dbf](https://github.com/equinor/mercury/commit/6f07dbfdeff1ab964bd86b66eae9ae8c87cd066e))
* update api dependencies ([ca4fab5](https://github.com/equinor/mercury/commit/ca4fab58381ff32aea8d62d186bfc9e531e8bd92))
* update dependencies ([5c18fe7](https://github.com/equinor/mercury/commit/5c18fe7315c74cd8630726fb675e88c8e5885ce7))
* update docs ([efd8549](https://github.com/equinor/mercury/commit/efd85496da91c0e5dc1804074730baf316350948))
* update to python 3.13 ([f121d5e](https://github.com/equinor/mercury/commit/f121d5ef646a081069b122d0d91e9a808e8b8e4a))
* update web dependencies ([c1df82b](https://github.com/equinor/mercury/commit/c1df82b19866829ada2bd3ad6203235182267891))
* update web dependencies ([53440df](https://github.com/equinor/mercury/commit/53440df305a91b6e6ae2da0d90cb45d072d3182e))
* upgrade biome ([0da0144](https://github.com/equinor/mercury/commit/0da01446ebf3ac0f0db04364dc4a1d1f367ceb2c))
* upgrade pre commit hooks ([918d159](https://github.com/equinor/mercury/commit/918d1590a4060272c4637506dfc9a645051f71e5))


### Code Refactoring

* add cli ([d3e43f1](https://github.com/equinor/mercury/commit/d3e43f14e22ef4d7760417f29c3945530df2f72e))
* add environment enum ([5d49433](https://github.com/equinor/mercury/commit/5d49433c5a34a0ea1a5dda0881ef692cf2bf43a7))
* add local logger middleware ([3884f71](https://github.com/equinor/mercury/commit/3884f71b842720f93fd7f33e9643410ce14ff0c6))
* adjust local telemetry setting ([fb15dbc](https://github.com/equinor/mercury/commit/fb15dbc6bfe8ff191445c0a0e4d12f018c22c965))
* authentication exception logic ([8244590](https://github.com/equinor/mercury/commit/8244590b16c1cd7c9d3d952a04e90ae7870873c9))
* change from poetry to uv ([629fd08](https://github.com/equinor/mercury/commit/629fd087ff2822816c1993b73fb83f6c8eb3b699))
* download libhg asset from repo ([9d8c3b3](https://github.com/equinor/mercury/commit/9d8c3b324a4716637bd3f9b37ace0955b0515603))
* make AppBar feature from Header ([802a692](https://github.com/equinor/mercury/commit/802a6924e3549ce99b57437a3407524de9cba1e0))
* make applicationinsight con string secret ([8374c78](https://github.com/equinor/mercury/commit/8374c782e67c5cb8bb2b68151bd8d2bf60e30f7c))
* move components into components ([43b60d9](https://github.com/equinor/mercury/commit/43b60d9e22c87e0efc79bc3d81af456f67ecb054))
* move tests out of src ([02cfb56](https://github.com/equinor/mercury/commit/02cfb5603a34d682c749f9c5b517045893332521))
* reorder files ([97a756d](https://github.com/equinor/mercury/commit/97a756dc71d5f53114667e55cd452f95e4fe2da5))
* use vite ([b606f2d](https://github.com/equinor/mercury/commit/b606f2d0205b601c9aba6145c751c19653f88539))
* uvicorn log config ([e5c8efa](https://github.com/equinor/mercury/commit/e5c8efa4b4012da5beb946cd23bfce359e1d78eb))


### Tests

* change pytest collection marker ([7497457](https://github.com/equinor/mercury/commit/7497457466dfb80fedb93cdfc16302364d593f04))
* fix broken front end test ([b6cfe8f](https://github.com/equinor/mercury/commit/b6cfe8f0f71fc2d6ac0d6781b2002e50550879bc))
* use conftest for mocking ([1b7b6f4](https://github.com/equinor/mercury/commit/1b7b6f4e12513fa2c08e057941e30ac473fed176))


### Continuous Integration

* add libhg repository deploy key secret to release ([fc5ddb1](https://github.com/equinor/mercury/commit/fc5ddb1106537272192619af285943e3ed8f40a4))
* add mypy to linting ([317008a](https://github.com/equinor/mercury/commit/317008a40a4854d746c4c5887c74028cc185cee4))
* add typescript type generation to pre-commit ([c10e063](https://github.com/equinor/mercury/commit/c10e06326c321a1c7aadb8c5ea74b8c9460c754b))
* enable release please PAT ([c4cfc46](https://github.com/equinor/mercury/commit/c4cfc460bf5481e1a02511d3f69280a23f57db95))
* fix broken regex ([26a1db7](https://github.com/equinor/mercury/commit/26a1db7853391b9dfedf9db912671b9945f2c19e))
* fix broken release workflow ([43b23c0](https://github.com/equinor/mercury/commit/43b23c015076231f7fd89806d5bca27263346368))
* fix incorrect input name ([a8a03e7](https://github.com/equinor/mercury/commit/a8a03e76bbc006b15c3da2f20571632a2db8f921))
* make docker compose override use amd64 ([efca6a7](https://github.com/equinor/mercury/commit/efca6a760ba31c3b915f85c478dfa0b06530feff))
* no auto deploy for prod environment ([0f4cf8a](https://github.com/equinor/mercury/commit/0f4cf8a97f95bedcdbe8b526e575f4996c56cfca))
* release please config and workflow ([1a823ad](https://github.com/equinor/mercury/commit/1a823ad8f66d3524a4742a0e2b969407d92e90ae))
* remove duplicated workflows ([515b57a](https://github.com/equinor/mercury/commit/515b57afdb1686aabbc3d803a1085813dba9acf9))
* switch back to old PAT ([625c5db](https://github.com/equinor/mercury/commit/625c5db96fc1208eb42b646f5ed9b7f3c8b6722b))
* update actions ([e4389be](https://github.com/equinor/mercury/commit/e4389beebe0d76952b525b73be0ff1e8092d1a17))
* update dependabot config ([05eedb4](https://github.com/equinor/mercury/commit/05eedb4e0ad8e2c340706b9d74971ea6954a6693))
* update dependabot settings ([1d64e66](https://github.com/equinor/mercury/commit/1d64e6661255c041ece3d558aecefc081fc58d81))
* update deploy.yaml workflow ([af1e10a](https://github.com/equinor/mercury/commit/af1e10a41566e0f5396d9d0fd05d6684ffebbe4c))
* update oauth to v2 ([8d2d7be](https://github.com/equinor/mercury/commit/8d2d7bee218bd64f877f01b7683c2461ea65015c))
* update pre-commit hooks ([af3d20c](https://github.com/equinor/mercury/commit/af3d20c50c81464a12d2e88170e0b5426ce03f0f))
* update publish.yaml workflow ([551b646](https://github.com/equinor/mercury/commit/551b64676719998b83d3e4cc8c10e6fcdb403799))
* update radixconfig ghcr config ([3ce1228](https://github.com/equinor/mercury/commit/3ce1228a37db948ed2f219861d0f02a1507af114))
* update release workflow ([29fe03b](https://github.com/equinor/mercury/commit/29fe03b288e50c3ba501371e39ce9a2808aa8be2))
* update tests.yaml workflow ([8151724](https://github.com/equinor/mercury/commit/81517249931c4d62c5e5d3a1055b54b038ebcdd8))
* upgrade release-please action ([93742e3](https://github.com/equinor/mercury/commit/93742e39b4e8340ca807ecbf16f73eaa11a6133b))
* use docker secrets for libhg repository deploy key ([65752bd](https://github.com/equinor/mercury/commit/65752bd2229b15ea60a69ca94ad9b2bae236ec96))
* use exec when running app ([ab5e4ad](https://github.com/equinor/mercury/commit/ab5e4ad0f5f45cd319a6565c6064ce85e4ee9094))
* use non deprecated release please ([1c79649](https://github.com/equinor/mercury/commit/1c79649cc5fafdfe5b080245a660416e060094d1))
* use prek instead of pre-commit ([22baa7a](https://github.com/equinor/mercury/commit/22baa7ae0873d6df49a4643920fd5ca606652e16))
* use uv venv in docker ([6bbbd8a](https://github.com/equinor/mercury/commit/6bbbd8a301641bfcea015e57cdf02ad0af7838e2))

## [1.1.6](https://github.com/equinor/mercury/compare/v1.1.5...v1.1.6) (2025-02-28)


### Bug Fixes

* reduce the number of worker connections ([617c052](https://github.com/equinor/mercury/commit/617c052339c682c453da4d4699e5d2697bd03d49))

## [1.1.5](https://github.com/equinor/mercury/compare/v1.1.4...v1.1.5) (2025-02-28)


### Bug Fixes

* bump pydantic and fastapi ([3a40678](https://github.com/equinor/mercury/commit/3a4067864e495e843ff9499362454c0a676d2a4c))
* install poetry without dev ([ea96db6](https://github.com/equinor/mercury/commit/ea96db63b6acf6dfbe2b0d1e6cb3820733bf59eb))
* poetry lock ([3a40678](https://github.com/equinor/mercury/commit/3a4067864e495e843ff9499362454c0a676d2a4c))
* pre-commit ([3a40678](https://github.com/equinor/mercury/commit/3a4067864e495e843ff9499362454c0a676d2a4c))
* replace opencensus and export telemetry with exception handling ([3a40678](https://github.com/equinor/mercury/commit/3a4067864e495e843ff9499362454c0a676d2a4c))
* tet ([3a40678](https://github.com/equinor/mercury/commit/3a4067864e495e843ff9499362454c0a676d2a4c))


### Miscellaneous Chores

* bump GH action versions ([dfc37cc](https://github.com/equinor/mercury/commit/dfc37cc0f37c62097353a28a121a3b66a2be6b4c))
* **deps:** bump numpy from 1.26.4 to 2.2.3 in /api ([7fa9bb1](https://github.com/equinor/mercury/commit/7fa9bb12acc966d85b18bb215dd68089ecb7a8da))
* **deps:** bump the front-end group in /web with 14 updates ([3330e0e](https://github.com/equinor/mercury/commit/3330e0e0d52967c145c241735d128fce42b62125))
* poetry 2.0 support ([0cc5f33](https://github.com/equinor/mercury/commit/0cc5f33164272c610fb2c7c19be6d085a60754b2))


### Continuous Integration

* add federated credentials for radix deploy ([cb14006](https://github.com/equinor/mercury/commit/cb14006432c91db78e8557ef3db8785c14e85499))
* added dependabot for github actions and docker ([430d860](https://github.com/equinor/mercury/commit/430d860d93b3a1786bb77278427f913fd9dcb99a))
* run workflow on release please pr updated ([4e60171](https://github.com/equinor/mercury/commit/4e6017179a953f4919dceb65b49592294bc2f5e7))
* substitute deprecated ifort compiler with ifx ([1476666](https://github.com/equinor/mercury/commit/14766666ceedf92f0434ca3a2dd70d5df940c78d))
* update to new docker compose syntax ([fc8128a](https://github.com/equinor/mercury/commit/fc8128a36f1e859f0eab4d104304534e7a5480bd))

## [1.1.4](https://github.com/equinor/mercury/compare/v1.1.3...v1.1.4) (2024-06-24)


### Bug Fixes

* typescript errors with eds ([48d4e18](https://github.com/equinor/mercury/commit/48d4e18e156c855a5bf33eec51d0b55aaf114559))


### Miscellaneous Chores

* **deps:** bump azure-identity from 1.16.0 to 1.16.1 in /api ([43bb1f5](https://github.com/equinor/mercury/commit/43bb1f5a923b85fe6bc80636fc1a08f0ee9434cb))
* **deps:** bump braces from 3.0.2 to 3.0.3 in /web ([47882c7](https://github.com/equinor/mercury/commit/47882c7d8d00d846b5232c0f92135f0993801874))
* **deps:** bump urllib3 from 2.2.1 to 2.2.2 in /api ([34d141c](https://github.com/equinor/mercury/commit/34d141c2119e3f3cf5abf6d4babecfcd91b396b5))
* **deps:** bump ws from 7.5.9 to 7.5.10 in /web ([0704882](https://github.com/equinor/mercury/commit/070488274c4cef43238e2405d0e984b2ba6cf1c7))

## [1.1.3](https://github.com/equinor/mercury/compare/v1.1.2...v1.1.3) (2024-06-06)


### Miscellaneous Chores

* bump dependencies ([29604f7](https://github.com/equinor/mercury/commit/29604f7feb938cce0471fad1cb45a9d0772d394b))
* **deps-dev:** bump httpx ([fcd56fd](https://github.com/equinor/mercury/commit/fcd56fd221ad36d67d53a6fc36361263040f9c41))
* **deps-dev:** bump pytest from 7.4.4 to 8.2.2 in /api ([a45fd9e](https://github.com/equinor/mercury/commit/a45fd9e9da961b561a302dfa918a4b5086a79219))
* **deps:** bump cryptography from 42.0.2 to 42.0.4 in /api ([3daa50d](https://github.com/equinor/mercury/commit/3daa50d69cbec2aac0e3560bc4c195b3af5ca501))

## [1.1.2](https://github.com/equinor/mercury/compare/v1.1.1...v1.1.2) (2024-02-12)


### Miscellaneous Chores

* bump deps ([17bbdc8](https://github.com/equinor/mercury/commit/17bbdc84ec8b4a75a5bb2ea9ddb2cc004cb60afd))
* **deps:** bump the back-end group in /api with 2 updates ([21c9402](https://github.com/equinor/mercury/commit/21c9402f8a5adb0dc6f258202a4552e4d650645d))


### Continuous Integration

* replace multiple tools with ruff ([cb30eb6](https://github.com/equinor/mercury/commit/cb30eb6a5c1b453b8cb5817160153b3919f983c4))

## [1.1.1](https://github.com/equinor/mercury/compare/v1.1.0...v1.1.1) (2023-11-30)


### Miscellaneous Chores

* **deps:** bump cryptography from 41.0.5 to 41.0.6 in /api ([608f380](https://github.com/equinor/mercury/commit/608f38068f1a778e9fa3062f0463bea2c06ccad5))
* linting, formatting and import sorting ([8499fa5](https://github.com/equinor/mercury/commit/8499fa5b4f54853a7b9b997dcd625d98ae1e4413))


### Code Refactoring

* add SECURITY.md ([adbf01a](https://github.com/equinor/mercury/commit/adbf01adaeda468ee64f66d2bb17cfa26f926e14))
* make license markdown ([19f1402](https://github.com/equinor/mercury/commit/19f140237d8a7e3b9205e186bc14383fafec70c6))


### Build System

* rebuild yarn.lock ([85d78ec](https://github.com/equinor/mercury/commit/85d78ec481c1bbd61b405f852ed8a100d2d12940))


### Continuous Integration

* switch to biome ([ffbff48](https://github.com/equinor/mercury/commit/ffbff484be057794ca5f983a9616de699dbf8959))
* use pre-commit action ([b8e3fc5](https://github.com/equinor/mercury/commit/b8e3fc593c075e441e9a3cea95b319d42d69922b))

## [1.1.0](https://github.com/equinor/mercury/compare/v1.0.1...v1.1.0) (2023-11-17)


### Features

* make help popover open on load ([b3ae175](https://github.com/equinor/mercury/commit/b3ae175a48091b70415049d788788c8b6081ef3b))


### Bug Fixes

* **eslint:** add appinsight as dependency ([0226292](https://github.com/equinor/mercury/commit/0226292b51d524fb26489dc9302e8ed3b77b50be))


### Miscellaneous Chores

* add timeout to get requests ([4b2e316](https://github.com/equinor/mercury/commit/4b2e31677affcf47e14cac6197efa3330c6be1af))
* eslint disable line ([13b9aa1](https://github.com/equinor/mercury/commit/13b9aa16453f6638356a07e9660d12d24da73c19))
* remove unsued MongoDB config vars ([6633bfb](https://github.com/equinor/mercury/commit/6633bfb90d0d4c0d889d2e4ffebca8e97cfdcfd0))
* update api dependencies ([c0f17b9](https://github.com/equinor/mercury/commit/c0f17b96d273d649aea3cbb270fcc30e20ffaec7))
* update CODEOWNERS ([2a21603](https://github.com/equinor/mercury/commit/2a2160371cb914dbb66080f57f5371e7cf843fee))
* update web dependencies ([8ae1503](https://github.com/equinor/mercury/commit/8ae15038afd28a2d6fab43034b3bf953c5736aea))


### Code Refactoring

* remove nested ternaries ([da696ca](https://github.com/equinor/mercury/commit/da696ca325c82b7fe3062436e0671fceeee4a0c2))


### Continuous Integration

* adjust eslint pre-commit settings ([f1ab8b7](https://github.com/equinor/mercury/commit/f1ab8b73b6f31a0db6070b0e376d62c3a5cbb859))
* change group-&gt;groups ([b9c634c](https://github.com/equinor/mercury/commit/b9c634c715638237feff73ee3b2c7e679e6acad1))

## [1.0.1](https://github.com/equinor/mercury/compare/v1.0.0...v1.0.1) (2023-11-10)


### Miscellaneous Chores

* **deps:** bump fastapi from 0.99.1 to 0.103.1 in /api ([4abd8bb](https://github.com/equinor/mercury/commit/4abd8bb5f9bc998730ca3194cae8416264f2d621))
* remove yarn pnp ([804610a](https://github.com/equinor/mercury/commit/804610aca54cc7e39e2f2ab5ac8ac1240587a604))
* upgrade web dependencies ([bf978c0](https://github.com/equinor/mercury/commit/bf978c07114d7b432ac5cb2fdc86170d8bf2695a))


### Build System

* bump insecure dependencies ([17395f0](https://github.com/equinor/mercury/commit/17395f02d1be1a465393fbe4fca0936c3da19c0d))
* lock pydantic to &gt;v2 ([09b260c](https://github.com/equinor/mercury/commit/09b260ccc262ab569b4b1806aad77788b6667b43))
* update privateImageHub config ([76114fb](https://github.com/equinor/mercury/commit/76114fbbec1fcb2a156c84f4eedcbe84c51f925a))


### Continuous Integration

* unlock release-please version ([e9596fd](https://github.com/equinor/mercury/commit/e9596fd2834f6e1782d7d826bffcb99b0d259cac))

## [1.0.0](https://github.com/equinor/mercury/compare/v0.6.0...v1.0.0) (2023-09-05)


### Bug Fixes

* bug with components having zero value ([0a27ef6](https://github.com/equinor/mercury/commit/0a27ef6f99a09d98a385b8d9fe9720f4f285efaf))
* remove wrongly commited files ([1efe71e](https://github.com/equinor/mercury/commit/1efe71eafac12b56fd5bd1f8f4dce8efda6ca961))


### Documentation

* add a minimal runbook ([7d49b75](https://github.com/equinor/mercury/commit/7d49b755d263f52a4918d26483f26e7eb589d2f3))
* add info about pgp error ([a5062ae](https://github.com/equinor/mercury/commit/a5062ae3b7612cf7d3c32100844336ef515bd7e4))


### Miscellaneous Chores

* add yarn upgrade script ([54f8901](https://github.com/equinor/mercury/commit/54f89011c873d02cfd46f69325fd838f6a92000f))
* bump dependencies in api and web ([dca3297](https://github.com/equinor/mercury/commit/dca329770b3dbd46c67a6409390461f97e7673b2))
* bump remaining packages ([faf3ccb](https://github.com/equinor/mercury/commit/faf3ccb2bdf5f026aab445b28d9ff4a1fd57bfa2))
* **deps:** bump cryptography from 39.0.0 to 39.0.1 in /api ([1638116](https://github.com/equinor/mercury/commit/16381164d0816c6e3864e0d759ea69e5eae45ac0))
* update api dependencies ([a3e6144](https://github.com/equinor/mercury/commit/a3e614485658d6f6bc45755b420cb79871279c34))
* update link to eds fonts ([3a9e3c6](https://github.com/equinor/mercury/commit/3a9e3c6da283a1c0c3bd0036d97ac9b88c386911))
* update web dependencies ([75f64dd](https://github.com/equinor/mercury/commit/75f64dd1af3d5870637073503736867af476b445))
* update yarn version ([598f393](https://github.com/equinor/mercury/commit/598f3937b1a6482b0572ef48e785d325f22629f1))
* upgrade api dependencies ([c373ddb](https://github.com/equinor/mercury/commit/c373ddb53031c393867077384d518350a5478b06))


### Tests

* add test for component composition with zero value ([2643d3a](https://github.com/equinor/mercury/commit/2643d3a804a05ffc14cab617749e97a32d3dcbe4))


### Build System

* Update api dependencies ([414aede](https://github.com/equinor/mercury/commit/414aedeab58a05566bf035fd3bc41fe1645bb5c3))
* Update web dependencies ([e6b73f6](https://github.com/equinor/mercury/commit/e6b73f6afc5693cf403c1241c5ae7905a8913aab))


### Continuous Integration

* add dependency groups to dependabot ([aadafb8](https://github.com/equinor/mercury/commit/aadafb8f9a7348dc6c1e700763d96ff8ac36af65))
* add release-please to workflow ([4e08c68](https://github.com/equinor/mercury/commit/4e08c68e4a89de0ca253d6148a54ad88db739606))
* fix eslint failure ([7086c50](https://github.com/equinor/mercury/commit/7086c50ce498c107ff22df48ecf8c5b71bf40032))
