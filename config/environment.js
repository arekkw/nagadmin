/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'nag-admin',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    firebaseUrl:'https://nag-admin-dev.firebaseio.com/',
    cloudStorageDownload: 'https://www.googleapis.com/storage/v1/b/nag-admin-dev/o/',
    cloudStorageUpload: 'https://www.googleapis.com/upload/storage/v1/b/nag-admin-dev/o/',
    cloudStorageProjectId: '937242013504',
    elasticsearchPath: 'https://whs-2051859060.us-west-2.bonsai.io',
    esUserName: 'dez3usb6ul',
    esPassword: '758uye2hu1'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.firebaseUrl = 'https://nag-admin.firebaseio.com/';
    ENV.cloudStorageDownload = 'https://www.googleapis.com/storage/v1/b/nag-admin/o/';
    ENV.cloudStorageUpload = 'https://www.googleapis.com/upload/storage/v1/b/nag-admin/o/';
    ENV.cloudStorageProjectId = '300568130000';
    ENV.elasticsearchPath = 'https://nagadmin-prod-6126678235.eu-west-1.bonsai.io';
    ENV.esUserName = '2ln2fzexy6';
    ENV.esPassword = 'p2v3nsrvzk';
  }
  
  ENV.contentSecurityPolicy = {
    'default-src': "https://*.firebaseio.com",
    'script-src': "'self' 'unsafe-eval' 'unsafe-inline' https://*.firebaseio.com *.gstatic.com *.googleapis.com",
    'font-src': "'self' *.gstatic.com *.googleapis.com",
    'connect-src': "'self' wss://*.firebaseio.com https://auth.firebase.com *.gstatic.com *.googleapis.com *.bonsai.io https://api.raygun.io",
    'img-src': "'self' data: *.googleapis.com *.googleusercontent.com *.gstatic.com",
    'style-src': "'self' 'unsafe-inline' *.gstatic.com *.googleapis.com",
    'media-src': "'self'",
    'report-uri': "'self' 'unsafe-eval' 'unsafe-inline' https://*.firebaseio.com *.gstatic.com *.googleapis.com"
  }
  
  ENV.googleMap = {
    apiKey: "AIzaSyBkHnoE2Bv1-auewtpm9MQ-e7zNyH7s3I8"
  }

  return ENV;
};
