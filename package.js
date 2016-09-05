Package.describe({
  name: 'classroom',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'local package for study-service, provide classrom function and view',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/duongtdn/classroom',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.1');
  api.use('ecmascript');

  /* awesome font included, app can use them
     load for dev, deploy should use CDN
   */ 
  api.addFiles('font-awesome-4.6.3/css/font-awesome.css');
  api.addAssets([
    'font-awesome-4.6.3/fonts/fontawesome.otf',
    'font-awesome-4.6.3/fonts/fontawesome-webfont.eot',
    'font-awesome-4.6.3/fonts/fontawesome-webfont.ttf',
    'font-awesome-4.6.3/fonts/fontawesome-webfont.woff',
    'font-awesome-4.6.3/fonts/fontawesome-webfont.woff2'
  ], 'client');

  /* style sheet */
  api.addFiles([
    'stylesheets/whiteboard.css'
  ], 'client');

  api.mainModule('classroom.js');
});

