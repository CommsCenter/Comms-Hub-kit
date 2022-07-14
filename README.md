# Comms Hub kit

This repository contains:

- [Documentation](./docs/) for [Comms Hub](https://hub.comms.dev) shares
- [Docker](./docker/) image files for [Comms CLI - @comms/cli](https://www.npmjs.com/package/@comms/cli)

# Requirements

- [Docker](https://www.docker.com/) to run a dev environment with all dependencies packed
- [Node](https://nodejs.org/en/) to run [Comms CLI](/CommsCenter/Comms-CLI)
- [GIT](https://git-scm.com/) - well, not really a dependency :)
- A bit of a command line knowledge to run commands

# Setup

Install the latest version of `@comms/cli`

`$ npm install -g @comms/cli`

Update our `comms-cli` alias in our profile.

`$ nano ~/.zshrc`

`alias comms-cli="/usr/local/lib/node_modules/@comms/cli/build/cli-linux"`

Or update the symlink directly.

`$ ln -sf /usr/local/lib/node_modules/@comms/cli/build/cli-linux /usr/local/bin/comms-cli`

Reload the profile (or open another terminal).

`$ . ~/.zshrc`

Update docker image used for building assets.

`$ docker pull commsdev/hub-dev:latest`

And try running the tool.

`$ comms-cli`

**All commands will autodiscover templates in the current working directory. Shares need to be organized in
`./$vendor/$type/$name/$name.vue` directories/files for the autodiscovery, build and publish processes to work.**

# Configuration

Comms CLI connects to [Comms Supervisor](https://supervisor.comms.dev) and [Comms Hub](https://hub.comms.dev). You need
to login there and get your API keys. Then you can manually login to both sites in CLI by running:

`$ comms-cli auth:login`

You can also skip this step and enter API keys once you'll access features for which the API keys are needed.

**Your configuration will be encrypted and stored at `./.comms-cli/`.**

# Features

## Creating a demo store

You can create a free development [Comms.dev store](https://comms.dev) by running `comms-cli store:create`. You will
install your local shares to the store so you can preview your work.

## Bootstraping files for shares

You can scaffold files for shares by running `comms-cli hub:bootstrap`. This command will create a Vue2
Single-File-Component and default `comms.json` file with the definition for your share.

## Installing shares to the development store

Virtually install shares to the store by running `comms-cli hub:mock`. This will add selected shares to the Library and
make the store fetch assets (`.js` and `.css`) files from your local environment - see below.

## Running local development server

Run local webpack development server and preview your work by running `comms-cli hub:serve`. This will start webpack dev
server, run the autodiscovery process and serve your local shares from https://0.0.0.0:9005. You can now see your work
by visiting your dev store.

**Important: You need to confirm security exception in your browser at https://0.0.0.0:9005 or you will not be able to
preview changes.**

_For advanced setups, you can change your hostname under Settings > Comms Developer extension and/or use custom
certificate for the webpack server using the `comms-cli hub:share --cert=./path/to/cert.pem` flag_

## Publishing your work

Publish your work (shares) to Comms Hub by running `comms-cli hub:publish`. This will create a `.zip` file with webpack
build, check `comms.json` for a valid share definition, and upload it to the Hub so it can be installed on Comms stores.

## Installing/using your work

You can install shares to the store from the [Comms Hub](https://hub.comms.dev), or you can install shares to the store
directly from your store Library which you can find under Theme settings.

# Tutorial

See [./docs/DEMO.md](./DEMO.md)

# Help

info@comms.dev
