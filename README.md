# NAG Admin

## Our story

"NAGAdmin" is the name of the first installation of this application for an organization called Network Action Group (NAG). I'd love 
to rename it so if you have any ideas, submit an issue. :) 

Checkout http://nag.org.za/

NAG is directly influencing significant sustainable social change in South Africa. They are a network of community-based NGOs focused 
on social topics such as early childhood development, orphan care, elderly, youth development, health & HIV/AIDS programs, etc. NAG 
maintains this network principally through their [future leaders](http://www.nag.org.za/programmes/future-leaders/). These are smart, 
driven, youth who make physical connections with hundreds of NGO's. This face to face approach not only facilitates NAGs mission to 
train, equip, and support these NGO's but also puts them in a perfect place to collect data. That data can significantly improve 
social programs through greater visibility, proving value to funding agencies and NGOs, awareness for governments, etc. 

Its our hope though that this application's scope grows beyond NAG. We see potential for extending the principal users to other NGOs 
and to maybe even government social workers. 

Technology stack:
* [Ember/Ember Data](http://emberjs.com/)
* [Elasticsearch/Kibana](https://www.elastic.co/)
* [Firebase](https://www.firebase.com)

We need more help. If you think you might be intereted in contributing to this project, please let me know!

Thanks,
Bobby (bobbyhubbard at g-mail)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

In order to deploy the application to Firebase, you will also need the following installed.

* [firebase tools](http://firebase.com) - Install via `npm install -g firebase-tools`

## Installation

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
    2. Find the "users" branch in the json and add your google account email. Due to firebase not liking periods in keys, make sure you replace any period (".") with a pipe ("|").
  2. Import the edited nag-admin-starter.json into your firebase.
  3. Setup Login & Auth - the app is currently written for google auth.
2. Create a new project at https://console.developers.google.com
  1. OAuth: Follow instructions from firesabe on how to setup a new oauth clientid
  2. Maps: Add Maps APIs (Embed, Engine, Geolocation, Javascript)
  3. Storage: Add Cloud Storage APIs (JSON)
  4. Compute: Add google compute if you want to use it to run the "setup/nag-es-firebase-lstnr.js"
3. You'll need to edit configuration for your elasticsearch instance as well. 

## Running / Development

* `ember server`
* Visit your app at http://localhost:4200.

### Run via Cloud 9 IDE

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
