# Mercury
Mercury calculator - API and Webapp


## Develop

Building the Dockerfile requires access to a private Github repository.  
The simplest way to manage this is by adding a __deploy key__ to the repository.  
Generate the keypair like so;

```bash
ssh-keygen -t ed25519 -f ./id_ed25519
```

Upload the public key to Github, and add the private key to .env, replacing newlines with `\n` so that it is one line.

```bash
LIBHG_REPO_DEPLOY_KEY=-----BEGIN OPENSSH PRIVATE KEY-----\nb3Blbn...
```