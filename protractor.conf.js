// protractor.conf.js

exports.config = {
    allScriptsTimeout: 99999,

    // The address of a running selenium server.
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    directConnect: true,

    // The location of the selenium standalone server .jar file, relative
    // to the location of this config. If no other method of starting selenium
    // is found, this will default to
    // node_modules/protractor/selenium/selenium-server...
    seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-3.14.0.jar',

    // The port to start the selenium server on, or null if the server should
    // find its own unused port.
    seleniumPort: 4444,

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://www.google.fr',

    framework: 'custom',
    frameworkPath: 'node_modules/protractor-cucumber-framework',

    // Spec patterns are relative to the current working directly when protractor is called.
    specs: [
        'test/e2e/**/*.feature'
    ],

    // Options to be passed to Cucumber.
    cucumberOpts: {
        // Require files before executing the features.
        require: [
            'src/step-definitions/**/*.ts',
            'src/step-definitions/**/*.js',
            'src/support/**/*.ts',
            'src/support/**/*.js',
            'test/e2e/step-definitions/**/*.ts',
            'test/e2e/step-definitions/**/*.js',
            'test/e2e/support/**/*.ts',
            'test/e2e/support/**/*.js'
        ],
        // Only execute the features or scenarios with tags matching @dev.
        // This may be an array of strings to specify multiple tags to include.
        // tags: '@dev',
        // How to format features (progress, summary, json)
        format: 'progress',
    },

    resultJsonOutputFile: './results/e2e/results.json'
};
