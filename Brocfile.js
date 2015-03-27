/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var aceVersion = 'vendor/ace-v1.3.3-bs-v3.3.1';

var app = new EmberApp({
    vendorFiles: {
        'handlebars.js': null
    }
});

// Moment
app.import('bower_components/moment/min/moment.min.js');

// Raygun (Logging)
app.import('bower_components/raygun4js/tracekit/tracekit.js');
app.import('bower_components/raygun4js/src/raygun.js');
app.import('bower_components/raygun4js/src/raygun.js-url.js');
app.import('bower_components/raygun4js/src/raygun.tracekit.jquery.js');

// Ace Sytlesheets
app.import(aceVersion + '/assets/css/bootstrap.css');
app.import(aceVersion + '/assets/css/font-awesome.css');
app.import(aceVersion + '/assets/css/datepicker.css');
app.import(aceVersion + '/assets/css/colorbox.css');
app.import(aceVersion + '/assets/css/ace-fonts.css');
app.import(aceVersion + '/assets/css/ace.css');
app.import(aceVersion + '/assets/css/ace-part2.css');
app.import(aceVersion + '/assets/css/ace-skins.css');
app.import(aceVersion + '/assets/css/ace-rtl.css');

// Ace Javascript
app.import(aceVersion + '/assets/js/ace-extra.js');
app.import(aceVersion + '/assets/js/bootstrap.js');
app.import(aceVersion + '/assets/js/jquery.colorbox.js');
app.import(aceVersion + '/assets/js/date-time/bootstrap-datepicker.js');
app.import(aceVersion + '/assets/js/dropzone.js');
app.import(aceVersion + '/assets/js/ace.js');
app.import(aceVersion + '/assets/js/ace-elements.js');
app.import(aceVersion + '/assets/js/ace/ace.touch-drag.js');

// Ace Fonts
app.import(aceVersion + '/assets/fonts/fontawesome-webfont.eot', {
	destDir: 'fonts'
});
app.import(aceVersion + '/assets/fonts/fontawesome-webfont.woff', {
	destDir: 'fonts'
});
app.import(aceVersion + '/assets/fonts/fontawesome-webfont.ttf', {
	destDir: 'fonts'
});
app.import(aceVersion + '/assets/fonts/fontawesome-webfont.svg', {
	destDir: 'fonts'
});
app.import(aceVersion + '/assets/fonts/OpenSans-300.woff', {
	destDir: 'fonts'
});
app.import(aceVersion + '/assets/fonts/OpenSans-400.woff', {
	destDir: 'fonts'
});
app.import(aceVersion + '/assets/fonts/glyphicons-halflings-regular.eot', {
	destDir: 'fonts'
});
app.import(aceVersion + '/assets/fonts/glyphicons-halflings-regular.svg', {
	destDir: 'fonts'
});
app.import(aceVersion + '/assets/fonts/glyphicons-halflings-regular.ttf', {
	destDir: 'fonts'
});
app.import(aceVersion + '/assets/fonts/glyphicons-halflings-regular.woff', {
	destDir: 'fonts'
});
  

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

module.exports = app.toTree();
