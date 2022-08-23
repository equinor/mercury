# Fails to build styled-components with node 18
FROM node:16 as base
ARG AUTH_ENABLED=0
ARG REDIRECT_URI=https://proxy-mercury-dev.radix.equinor.com
# Azure AD requires a scope.
ENV REACT_APP_AUTH_SCOPE=api://0cd10735-a40c-4ff6-84c8-74e3b54ed93f/All
ENV REACT_APP_AUTH=$AUTH_ENABLED
ENV REACT_APP_AUTH_CLIENT_ID=0cd10735-a40c-4ff6-84c8-74e3b54ed93f
ENV REACT_APP_AUTH_TENANT=3aa4a235-b6e2-48d5-9195-7fcf05b459b0
ENV REACT_APP_TOKEN_ENDPOINT=https://login.microsoftonline.com/3aa4a235-b6e2-48d5-9195-7fcf05b459b0/oauth2/v2.0/token
ENV REACT_APP_AUTH_ENDPOINT=https://login.microsoftonline.com/3aa4a235-b6e2-48d5-9195-7fcf05b459b0/oauth2/v2.0/authorize
ENV REACT_APP_LOGOUT_ENDPOINT=https://login.microsoftonline.com/3aa4a235-b6e2-48d5-9195-7fcf05b459b0/oauth2/logout
ENV REACT_APP_AUTH_REDIRECT_URI=$REDIRECT_URI

WORKDIR /code
COPY ./ ./
RUN yarn install --immutable --immutable-cache

FROM base as development
CMD ["yarn", "start"]

FROM base as build
RUN yarn build

FROM node:18-alpine as prod
RUN npm install -g serve
COPY --from=build /code/build /code/build
USER 1000
CMD ["serve", "--single", "/code/build", "--listen", "3000"]
EXPOSE 3000
