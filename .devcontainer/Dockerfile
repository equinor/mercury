FROM ghcr.io/jdx/mise:2026.10.22 AS mise
FROM mcr.microsoft.com/devcontainers/base:3.0.12-ubuntu26.04

# Trust the Equinor proxy root CA, which Equinor's firewalls and Zscaler use to inspect HTTPS traffic.
# It is downloaded over plain HTTP, so the pinned SHA-256 fingerprint is what guarantees it is the real one.
# Outside Equinor's network (e.g. Codespaces) it is not needed, so a failed download only prints a warning.
ARG EQUINOR_PROXY_ROOT_CA_FINGERPRINT=54:22:BD:84:AE:9A:8C:2D:2D:AD:A2:1F:07:9F:56:56:35:57:A0:C6:5A:CE:6B:20:F1:1A:66:69:FC:2C:B9:18
RUN if curl -fsSL --max-time 30 -o /tmp/equinor-proxy-root.crt http://pki.equinor.com/aia/ecppr.crt; then \
      openssl x509 -in /tmp/equinor-proxy-root.crt -noout -fingerprint -sha256 \
        | grep -q "=${EQUINOR_PROXY_ROOT_CA_FINGERPRINT}$" \
      && mv /tmp/equinor-proxy-root.crt /usr/local/share/ca-certificates/ \
      && update-ca-certificates; \
    else \
      echo "WARNING: could not download the Equinor proxy root CA, skipping it"; \
    fi

# Make VS Code's Node.js and the project's Node.js trust the system certificates, including the one above
ENV NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt

# mise is the single source of truth for the toolchain (.mise/config.toml) and tasks (.mise/tasks/).
# It installs python, uv, node, yarn and prek at attach time, so none of them are installed here.
COPY --from=mise /usr/local/bin/mise /usr/local/bin/mise

# Make mise-managed tools available as plain commands, also in the non-interactive postAttachCommand
ENV PATH="/home/vscode/.local/share/mise/shims:${PATH}"

# Pre-create the volume mount targets owned by vscode, so the named volumes get the right owner on first mount
ARG WORKSPACE=/workspaces/mercury
RUN mkdir -p \
        /home/vscode/.cache/uv \
        "${WORKSPACE}/api/.venv" \
        "${WORKSPACE}/web/node_modules" \
    && chown -R vscode:vscode \
        /home/vscode/.cache \
        "${WORKSPACE}/api/.venv" \
        "${WORKSPACE}/web/node_modules"
