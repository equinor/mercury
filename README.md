# Mercury &middot; [![License][license-badge]][license] [![On push main branch][on-push-main-branch-badge]][on-push-main-branch-action]

Mercury calculator - API and Webapp


## Develop

### Prerequisites

In order to run the application locally, you need:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Make sure you have Python installed. version 3.10 or higher is required.

Building the Dockerfile requires access to the private Github repository (TODO: Link to fortran repo here).  
The simplest way to manage this is by adding a __deploy key__ to the repository.  
Generate the keypair like so;

```bash
ssh-keygen -t ed25519 -f ./id_ed25519
```

Upload the public key to Github, and add the private key to .env, replacing newlines with `\n` so that it is one line.

```bash
LIBHG_REPO_DEPLOY_KEY=-----BEGIN OPENSSH PRIVATE KEY-----\nb3Blbn...
```

<a id="Contributing"></a>
## :+1: Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
