# angular-protractor-cucumber

github : https://github.com/sylvainle/angular-protractor-cucumber/

(Forked from https://github.com/donkeycode/angular-protractor-cucumber/)

BREAKING CHANGES :
- Support cucumber js releases >= 2.x.x (but releases < 2.0.0 must stay on forked lib)
- Steps and support file upgraded
- Hooks upgraded

New features :
- Test added to angular-protractor-cucumber
- Add beforeFeature (file) capabilities

Usage :
- npm install angular-protractor-cucumber
- [if needed] add node_modules/.bin to your environment paths
- [under windows] close and reopen cmd
- exec "webdriver-manager update"
- create/update your protractor.conf.js with your downloaded seleniumServerJar release version
- create/update your tests (example under node_modules/@sylvainle/angular-protractor-cucumber/test)
- available steps are under node_modules/@sylvainle/angular-protractor-cucumber/src/step-definitions
- available support content is under node_modules/@sylvainle/angular-protractor-cucumber/src/support
- don't forget to include angular-protractor-cucumber step-definitions and support content in your protractor.conf.js (cucumberOpts.require) :
```
// protractor.conf.js
exports.config = {
    allScriptsTimeout: 99999,
    directConnect: true,
    capabilities: {'browserName': 'chrome'},
    baseUrl: 'https://angularjs.org',

    framework: 'custom',
    frameworkPath: 'node_modules/protractor-cucumber-framework',

    specs: ['test/e2e/**/*.feature'],

    cucumberOpts: {
        require: [
            'node_modules/@sylvainle/angular-protractor-cucumber/src/step-definitions/**/*.js',
            'node_modules/@sylvainle/angular-protractor-cucumber/src/step-definitions/support/**/*.js',
            'test/e2e/step-definitions/**/*.js',
            'test/e2e/support/**/*.js'
        ],
        format: 'progress',
    },

    resultJsonOutputFile: './results/e2e/results.json'
};
```
- test it with a simple example :
```
Feature: Simple feature
Scenario: Simple test
Given I wait 2 seconds
```
