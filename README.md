* See the app live at https://fancy-fruit.herokuapp.com/
* API docs at https://fancy-fruit.herokuapp.com/docs

# Getting started

1. Install the dependencies and build the app:

  ```
  yarn install
  ```

2. Start the server

  ```
  yarn start
  ```
  
3. Access the app at `http://localhost:5000`. API docs available at `/docs`.

# IntelliJ Setup

## TypeScript support

1. Open Settings > Languages & Frameworks > TypeScript.
2. Check `TypeScript Language Server`.

## Executing Mocha tests

1. Run > Edit Configurations
2. Click + and select Mocha
3. Set the following values:
    * Extra Mocha options: `--require ts-node/register`
    
## ESLint support

1. Open Settings > JavaScript > Code Quality Tools > ESLint
2. Check `Automatic ESLint configuration`

# Developing in the app

1. Install the dependencies and build the app:

  ```
  yarn install
  ```

2. Start up the dev server:

  ```
  yarn watch
  ```
    
3. Access the app at `http://localhost:5000`.

# Accessing the documentation

You can access the documentation for the current release at www.corinnaerin.com/docs. To access the documentation
for the checked-out local version, just open `build/public/docs/index.html` in your browser.

# Deploying the app

1. Before committing, be sure that appropriate tests have been modified/added and release build succeeds.

  ```
  yarn release
  ```
  
2. Push to the `master` branch. Heroku will automatically pick up the changes and deploy.

# All npm targets

## Server targets
_Note: there is no `server:build` task because for development, we will use nodemon which is configured
to compile TypeScript on the fly_

* `server:eslint`: lint the server TypeScript
* `server:release`: clean the `build/server` directory, run `server:eslint`, and compile the TypeScript to JavaScript

## Client targets
* `client:build`: execute webpack to do a development build of the client
* `client:release`: execute webpack to do a production build of the client

## Other

* `postinstall`: runs the tests with code coverage and executes a release build of the client & server
* `release`: alias for `postinstall`
* `coverage`: run the tests through Istanbul to generate code coverage docs
* `docs`: generate the documentation via TypeDoc
* `test`: run all of the tests
* `watch`: start nodemon and webpack dev server
* `start`: run the built server, requires a build to be executed first. This is mostly for production use
* `nodemon`: start nodemon
* `clean`: clean the workspace, removing the `node_modules`, `build` directory, and coverage output

# Testing the app

See below for useful tools to aid in manual testing of both the client & server code. You can (obviously)
run the automated tests via `yarn test`, which includes unit & integration tests for the server. 
A future step for front-end testing would be to add a Selenium test framework to do integration tests, 
user-interaction tests, and cross-browser compatibility testing, as well as shallow rendering unit tests
via enzyme. However, that is a significant time requirement that I'm unable to meet at this time, but 
would consider vital for a real production application. 

# Testing tools

* [Postman](https://www.getpostman.com/): tool for developing and debugging APIs
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi):
a Chrome DevTools extension for the open-source React JavaScript library. 
It allows you to inspect the React component hierarchies in the Chrome Developer Tools.
* [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd): Chrome extension that 
provides power-ups for your Redux development workflow. Apart from Redux, it can be used with any other architectures which handle the state.

# Libraries & languages in use by this app

* [NodeJS](https://nodejs.org) - a JavaScript runtime built on Chrome's V8 JavaScript engine
* [ExpressJS](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [Nodemon](http://nodemon.io/) - a utility that will monitor for any changes in your source and automatically restart your server
* [Webpack](https://webpack.github.io/) - module bundler
* [ReactJS](https://facebook.github.io/react/) - a javascript library for building user interfaces
* [TypeScript](https://www.typescriptlang.org/) - a typed superset of JavaScript that compiles to plain JavaScript
* [Mocha](https://mochajs.org/) - a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun
* [ReduxJS](http://redux.js.org/index.html) - a predictable state container for JavaScript apps
* [Istanbul](https://istanbul.js.org/) - JavaScript test coverage made simple
* [TypeDoc](http://typedoc.org/) - a documentation generator for TypeScript projects.

# Helpful development resources

* [React & Redux tutorial](https://css-tricks.com/learning-react-router/)
* [Official React documentation](https://facebook.github.io/react/docs/getting-started.html)
* [Official NodeJS documentation](https://nodejs.org/dist/latest-v8.x/docs/api/)
* [Official TypeScript documentation](https://www.typescriptlang.org/docs/tutorial.html)
* [Official Redux documentation](http://redux.js.org/index.html)
* [Official React Router documentation](https://reacttraining.com/react-router/)
