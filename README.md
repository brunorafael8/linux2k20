# LINUX2k20

## Installation

```sh
yarn install
```

```sh
# Create package environments
cp packages/server/.env.example packages/server/.env

cp packages/web/.env.example packages/web/.env
```

### Note: You need [Creating a personal access token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token) and add it to `packages/server/.env` within `GITHUB_TOKEN`

### NoteTWO: If you do not have mongodb installed, please install it:

### macOS

```sh
brew install mongodb
```

### Linux

Refer to the [installation instructions](https://docs.mongodb.com/manual/administration/install-on-linux/) for available Linux installation options.

## Start Development

Server:

```sh
yarn server
```

Front-end:

```sh
# first compile the relay and schemas
yarn update

# run web project
yarn web

```

## Build

Server:

```sh
yarn build:server
```

Front-end:

```sh
yarn build:web
```

## Other Commands

### Component Test

```sh
yarn component:test
```

### Lint

```sh
yarn lint
```
