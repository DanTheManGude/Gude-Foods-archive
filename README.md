# Gude Foods

## Table of Contents

- [Gude Foods](#gude-foods)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [How to Use It](#how-to-use-it)
    - [Technical Requirements](#technical-requirements)
    - [Getting Started](#getting-started)
    - [What is in the Folder](#what-is-in-the-folder)
      - [What is in Documentation](#what-is-in-documentation)
    - [What does `npm run` do?](#what-does-npm-run-do)
  - [How to contribute](#how-to-contribute)
    - [Pull Request Checklist](#pull-request-checklist)
    - [Guidelines](#guidelines)
    - [Branches](#branches)
    - [Linting](#linting)
    - [Versioning](#versioning)
  - [How does it work though?](#how-does-it-work-though)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [API paths](#api-paths)
    - [Tests](#tests)
  - [Heroku Deployment](#heroku-deployment)

## Description

([Return to Table of Contents](#Table-of-Contents))\
This application is to serve as a personal collection of food recipies that is also shareable to friends and strangers.
Production url: http://gudefoods.recipes

## How to Use It

([Return to Table of Contents](#Table-of-Contents))

### Technical Requirements

- [Node.js](https://nodejs.org/ "Node.js Homepage")
  - v13.8.0 (or latest)
  - `node -v` to check which version
  - `nvm ls` to see which versions installed
  - `nvm alias default <desired version>` signify which version of Node to use
  - To install Node from the command line
    - `sudo apt install nodejs`
    - `wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash`
- npm
  - v6.13.6 (or latest)
  - `npm -v` to check which version
  - npm comes bundled with installations of Node from the website
  - To install from command line: `sudo apt install npm`

### Getting Started

- `git clone` or download the project
- `npm start` (this may take a minute)
- open <http://localhost:3030> in your favorite web browser
- Be sure to checkout the **[npm scripts](#what-does-npm-run-do)** for running it in other ways

### What is in the Folder

- .circleci/ –– Configuration for running [CircleCI](https://circleci.com/gh/DanTheManGude/Gude-Foods "CircleCI for the application")
- .gitignore –– Configuration for Git to not include certain files
- frontend/ –– All the code and content for the [frontend](#Frontend)
- src/ –– Source code for the [backend](#Backend)
- Documentation/ –– various Documentation files
- LICENSE –– ISC License
- Procfile –– Settings for [Heroku deployment](#Heroku-Deployment)
- README.md –– Specifications of how to use the application
- app.json –– Configuration for deploying an [Heroku](#Heroku-Deployment) app for each PR
- package.json –– Data about the application including [scripts](#what-does-npm-run-do) and dependencies declarations
- node_modules/ –– Loaded [Node](#Technical-Requirements) dependencies (don't edit this folder or include in VC)
- package-lock.json –– Verbose data on dependencies (don't edit this file or include in VC)

#### What is in Documentation

- API.json –– Documentation on the [API](#API-paths)
- HEROKU.md –– Instructions to set up your own [Heroku](#Heroku-Deployment) app
- REQUIREMENTS.md –– Technical requirements of the application

### What does `npm run` do?

[npm](#Technical-Requirements) allows for very easy scripting of an application. There are quite a few for this project.

- `npm test` runs the tests defined by `/src/app.test.js`
- `npm start` installs dependencies for [frontend](#Frontend) and [backend](#Backend) AND runs a production build of the application _Note: you only need to run this on the first startup_
- `npm run check` checks the version of [Node and npm](#Technical-Requirements)
- `npm run hard-update` removes the `node_modules` and `package-lock.json` for the backend and frontend AND reinstalls dependencies
- `npm run update` installs dependencies for frontend and backend
- `npm run dev` starts the frontend in development mode ALSO starts the server
- `npm run deploy` runs the application in a production state using port 80
- `npm run prod` builds a production build of the frontend AND starts the server
- `npm run build` builds a production build of the frontend
- `npm run server` starts the server _Note: use this to run the server rather than calling `node` directly_
- `npm run frontend` starts the frontend in development mode
- `npm run heroku-postbuild` runs during [Heroku](#Heroku-Deployment) deploy to build the frontend

## How to contribute

([Return to Table of Contents](#Table-of-Contents))\
Hit me up at [dgude31@gmail.com](mailto:dgude31@gmail.com "My Email").

### Pull Request Checklist

Be sure to follow these guidelines for making a [PR](https://circleci.com/gh/DanTheManGude/Gude-Foods "CircleCI for the application").

- The current history of the target branch is reflected in your branch
- Dependencies are up to date (`npm run update`)
- The code compiles without errors
- The code compiles without warnings as a result of code changes in this PR
- New tests are created where applicable
- All [tests](#Tests) pass locally and on [CircleCI](https://help.github.com/en/articles/about-pull-requests "About GitHub PRs") (`npm test`)
- The new code follows the [Prettier](#Prettier) rules
- The PR is running on the [deployment](#Heroku-Deployment) app
- The new code works on the deployment app
- README sections are updated appropriately
- API.json is updated appropriately
- The PR description includes a step by step of the use case created or modified.

Open PRs will be built and deployed using [Heroku](#Heroku-Deployment) to test on mobile devices as well. With direct push access be sure to subscribe to the following [guidelines](#Guidelines) as close as you can.

### Guidelines

- To work on an open issue, create a [branch](#Branches) with a name that pertains to that task, and assign it to yourself.
- Follow the existing coding pattern and practicies.
- Use good judgment

### Branches

- `master` source for PROD deploys <https://gudefoods.recipes>
- `qa` Staging QA area before rolling something out to PROD. <https://qa.gudefoods.recipes>
- `dev` has a live DEV deploy to test changes <https://dev.gudefoods.recipes>
- _Note: the history on `dev` may be overwitten at anytime_
- Create feature branches as you see fit.
- When done with your feature, make a PR into `qa`.
- Delete branches after merging when a feature is finished.

### Prettier

[Prettier](https://prettier.io "Prettier website") is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary. It integrates with many popular editors.

### Versioning

Version changes shall be done at the time of merging the PR (not before hand). Tag the commit that updates the version with `git tag vX.Y.Z` `git push --tags`
You should update the version value in `/package.json` accordingly in format x.y.z

- x is incremented with major application changes
- y is incremented with every merged PR to `master`
- z is incremented with every merged PR to `qa`

## How does it work though?

([Return to Table of Contents](#Table-of-Contents))\
This website has its frontend and backend split into 2 separate projects.

### Frontend

Under `/frontend/` has the source-code for the frontend as well as its own package.json and such. The frontend is a [React](https://reactjs.org "React Homepage") app using [React Router](https://reacttraining.com/react-router/web/guides/quick-start "React Router Quick Guide") for client side routing and [Firebase](https://reactjs.org "Firebase Homepage") for Google login. The `public` folder contains the main html file that is the base of the entire frontend (you don't have to modify this basically at all). When React is built for production, all the source-code, assets, ect is packaged into a `build` folder. This is what the [backend](#Backend) utilizes in production. `index.js` is the starting point of code for the frontend which initiates the rendering of the React components. `components/` contains the main components that are rendered starting with `App.js`. In `components/Routes.js`, React Router is utilized to determine which component to render depending on the route.

### Backend

The "server" utilizes [Express.js](https://expressjs.com "Express.js Homepage") which is a web application framework for [Node.js](#Technical-Requirements). Running `npm run server` or `node src/server.js` starts the server exposed on port 3030 unless otherwise specified in an environment variable). `/src/server.js` runs the server that calls to `/src/app.js` which contains the application logic The various [API end points](#API-Paths) can be found here. If a path foes not math an endpoint then the server responds with sending a production build of the [frontend](#Frontend) and follows [routes](#Routes).

#### API paths

See [`Documentation/API.json`](/Documentation/API.json) for all paths with detailed descriptions

- `/ping` – Test path to check if the server is running
- `/api/revision` returns the package version and commit hash of the latest commit the application is using
- `/api/logs` returns all the logs in JSON format
- `/*` is a catchall if another path doesn't match –– serves the production build of the [frontend](#Frontend) following the [routes](#Routes)

#### Tests

Testing is powered by Chai and Mocha. To run the test use `npm test`. Tests are defined in `/src/app.test.js` and test the methods in `/src/app.js`. [CircleCI](https://circleci.com/gh/DanTheManGude/Gude-Foods "CircleCI for the application") runs the tests automatically on every push. Be sure all tests pass especially when opening a PR.

## Heroku Deployment

([Return to Table of Contents](#Table-of-Contents))\
[Heroku](http://heroku.com "Heroku Homepage") is used to for continuous deployment. Any open PRs coming from within the repo (ie not outside people), Heroku will make a temporary app to deploy it. The url that it can be found at is <https://gude-foods-pr-#.herokuapp.com/> where the # is replaced with your PR number.\
Please reference the [Heroku](/Documentation/HEROKU.md) file for instructions on how to setup your own Heroku app.
