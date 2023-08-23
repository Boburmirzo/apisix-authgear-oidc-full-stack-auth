# How to build a full-stack authentication app

This repo demonstrates how to develop a full-stack authentication flow for a web application using [Apache APISIX](https://apisix.apache.org/), [Authgear](https://www.authgear.com/) and [OIDC](https://openid.net/developers/how-connect-works/) (OpenID Connect).

## Full-stack Authentication App with APISIX, Authgear and OIDC

For the demo, we used Docker to install and run 3 components (backend, API Gateway and frontend) with a single command. We employed [ExpressJS](https://expressjs.com/) for the frontend web app, hosting our single page app at [localhost:3000](http://localhost:3000/). The APISIX Gateway can be accessed at [localhost:9080](http://localhost:9080/), while our backend API (it can be any API you build using Python, Java, NodeJS and etc.) is set up on [localhost:9081](http://localhost:9081/).

## How to run the project

## Prerequisites

Before you begin, you'll need the following:

- A **free Authgear account**. [Sign up](https://oursky.typeform.com/to/S5lvI8rN) if you don't have one already.
- **Configure an application in Authgear**. If you don't have any applications that use Authgear, you can create a new Authgear OIDC Client application by following this [guide](https://docs.authgear.com/how-to-guide/authenticate/oidc-provider#setting-up-authgear-in-the-portal).
- [Docker](https://docs.docker.com/get-docker/) is used to install all services.

Start by cloning the project into your local machine:

```bash
git clone https://github.com/Boburmirzo/apisix-authgear-oidc-full-stack-auth.git
```

Make the project directory your current working directory:

```bash
cd apisix-authgear-oidc-full-stack-auth
```

In the root directory of your project where Docker compose yaml file, create a file `.env` with the following environment variables:

```bash
CLIENT_ID={AUTHGEAR_APP_CLIENT_ID}
CLIENT_SECRET={AUTHGEAR_APP_CLIENT_SECRET}
ISSUER={AUTHGEAR_ISSUER}
REDIRECT_URI=http://localhost:3000
```

Replace values in the brackets with your Authgear app settings values from **Configure Authgear** such as `Issuer`, `ClientId`, `ClientSecret`

After you added the environment file, run the `docker compose up` command from the root directory.

## Testing authentication flow

After the installation went successful, browse to [localhost:3000](http://localhost:3000/). You should be redirected to the Authgear login screen. If you are first time authenticating, you will be asked to sign up first.
