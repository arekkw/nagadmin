# NAG Admin

This README outlines the details of collaborating on this Ember application.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Ember CLI](http://www.ember-cli.com/) - `npm install -g ember-cli`
* [PhantomJS](http://phantomjs.org/) - Required for tests

In order to deploy the application to Firebase, you will also need the following installed.

* [firebase tools](http://firebase.com) - Install via `npm install -g firebase-tools`

## Installation

* Ensure that the above prerequisites are installed first.
* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `ember install`

## Logging in
For security reasons, we've locked down the main application db to only known users at 
this time. If you'd like to get added to our main development db, send me a note. This
is the fastest setup option. :) 

However, if you would like to spin up your own environment, follow these instructions (10-15min):

1. Setup a new firebase (https://www.firebase.com).
  1. Find "setup/nag-admin-starter.json". This includes all the expected reference and starter data.
    1. You need to have at least one user administrator in order to log in and get stuff started.
    2. Find the "users" branch in the json and add your google account email. Make sure you replace and periods (".") with a pipe ("|").
  2. Import the edited nag-admin-starter.json into your firebase.
  3. Setup Login & Auth - the app is currently written for google auth.
2. Create a new project at https://console.developers.google.com
  1. OAuth: Follow instructions from firesabe on how to setup a new oauth clientid
  2. Maps: Add Maps APIs (Embed, Engine, Geolocation, Javascript)
  3. Storage: Add Cloud Storage APIs (JSON)
  4. Compute: Add google compute if you want to use it to run the "setup/nag-es-firebase-lstnr.js"

## Running / Development

* `ember server`
* Visit your app at http://localhost:4200.

### Run via Cloud 9 IDE - Requires more than 512MB of memory

* Create a new run configuration
* Choose a name
* Set the command: `ember server --port $PORT --live-reload false`
* Visit the application at <workspace-name>-<user-name>.c9.io
* You will need to add your domain to Google and/or Firebase oauth in order to log in.

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

## Thanks

* Error Reporting provided by Raygun - https://raygun.io
