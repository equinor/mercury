# Testing

## API tests

API tests are written using `pytest`.

Since the API depends on the `libhg` python module we primarily run tests via Docker, since the module
is baked into the Docker image.

### Unit tests

To run the unit tests inside a Docker container, use the following command:

```bash
mise run test-api-unit
```

### Integration tests

To run the integration tests, use the following command:

```bash
mise run test-api-integration
```

## Web tests

Unit tests are written using `vitest`.

To run the unit tests, use the following command:

```bash
mise run test-web-unit
```
