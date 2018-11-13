# EightySix Application
=======
# EightySix-front-end
>>>>>>> 880a02cfcc5147ebe8325423663b9984fdabdbba

Project consists of the following parts:

* [Client](README.md#client)  (Frontend application written in React + Redux)

Project is written in React + Redux with the following libs:

* axios
* Redux-Saga
* Reselect
* Redux-Immutable
* Reactstrap
* React-Router
* Semantic-UI-React
* Validator
* crypto-js
* js-cookie

## Config

```console
cp .env.example .env
```

## Setup

```console
npm i
```

Fill out the `.env` file.

### Run development servers

```console
npm run start:webpack
```

#### Run in development mode

```console
npm run start:webpack
```

#### Run in production mode

```console
npm run build
```
This will create the new release of the app inside the /client/public folder which can be deployed.

