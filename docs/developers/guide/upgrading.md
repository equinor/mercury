# Upgrading

## Packages

> _Any changes you make to these files will only come into effect after you restart the server.
If you run the application using containers, you need to do docker compose build and then
docker compose up to get the changes._

### API dependencies

Make changes to `api/pyproject.toml` and run:

```bash
mise run install-api-dependencies
```

### Web dependencies

Make changes to `web/package.json` and run:

```bash
mise run install-web-dependencies
```
