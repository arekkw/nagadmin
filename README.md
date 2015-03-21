# NAG Admin

This README outlines the details of collaborating on this Ember application.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

In order to deploy the application you will also need the following installed.

* [firebase tools](http://firebase.com) - Install via `npm install -g firebase-tools`

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at http://localhost:4200.

### Run via Cloud 9 IDE

* Create a new run configuration
* Choose a name
* Set the command: `ember server --port $PORT --live-reload false`
* Visit the application at <workspace-name>-<user-name>.c9.io

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Build & Deploy Development

* `ember build` (development)
* `firebase deploy`

### Build & Deploy Production

* `ember build --environment production` (production)
* `firebase deploy -f nag-admin`

## Further Reading / Useful Links

* ember: http://emberjs.com/
* ember-cli: http://www.ember-cli.com/
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)