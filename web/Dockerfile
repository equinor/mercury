FROM nginx:1.29-alpine AS server
HEALTHCHECK CMD ["nginx", "-t"]

# Set up non root writable directories
RUN apk upgrade --update-cache && \
  deluser nginx && adduser -D -H -u 1000 nginx && \
  rm /etc/nginx/conf.d/default.conf && \
  mkdir -p /var/log/nginx /tmp/nginx && \
  touch /var/run/nginx.pid && \
  chown -R nginx:nginx /var/log/nginx /tmp/nginx /var/run/nginx.pid

# Copy configs
COPY nginx/rootfs/ /

# Run master process as non-root user
USER 1000


FROM node:24-alpine AS base
ARG AUTH_ENABLED=0
ARG OAUTH_AUTH_SCOPE=""
ARG AZURE_CLIENT_ID=""
ARG AZURE_TENANT_ID=""
ARG APPLICATIONINSIGHTS_CONNECTION_STRING=""
ENV VITE_AUTH=${AUTH_ENABLED}
ENV VITE_AUTH_SCOPE=${OAUTH_AUTH_SCOPE}
ENV VITE_AUTH_CLIENT_ID=${AZURE_CLIENT_ID}
ENV VITE_AUTH_TENANT_ID=${AZURE_TENANT_ID}
ENV VITE_APPLICATIONINSIGHTS_CONNECTION_STRING=${APPLICATIONINSIGHTS_CONNECTION_STRING}
ENV VITE_TOKEN_ENDPOINT=https://login.microsoftonline.com/${VITE_AUTH_TENANT_ID}/oauth2/v2.0/token
ENV VITE_AUTH_ENDPOINT=https://login.microsoftonline.com/${VITE_AUTH_TENANT_ID}/oauth2/v2.0/authorize
ENV VITE_LOGOUT_ENDPOINT=https://login.microsoftonline.com/${VITE_AUTH_TENANT_ID}/oauth2/logout

ENV YARN_CACHE_FOLDER=/var/cache/yarn

RUN mkdir /code && \
  chown -R "node:node" /code

WORKDIR /code
USER "node"
COPY --chown="node:node" package.json yarn.lock ./
RUN --mount=type=cache,target=$YARN_CACHE_FOLDER,uid=1000 \
  yarn install

COPY --chown="node:node" public public
COPY --chown="node:node" tsconfig.json vite.config.mts index.html ./
COPY --chown="node:node" src src


FROM base AS development
ENV YARN_CACHE_FOLDER=""
CMD ["yarn", "start"]


FROM server AS nginx-dev
COPY nginx/environments/web.dev.conf  /etc/nginx/environments/


FROM base AS build
RUN --mount=type=cache,target=$YARN_CACHE_FOLDER,uid=1000 \
  yarn build


FROM server AS nginx-prod
COPY nginx/environments/web.prod.conf /etc/nginx/environments/
COPY --from=build /code/build /data/www
