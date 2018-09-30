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
- create/update your tests (example under node_modules/angular-protractor-cucumber/test)
- available steps are under node_modules/angular-protractor-cucumber/src/step-definitions
- available support content is under node_modules/angular-protractor-cucumber/src/support
- don't forget to include angular-protractor-cucumber step-definitions and support content in your protractor.conf.js (cucumberOpts.require)
- test it with a simple example :

    Feature: Simple feature

    Scenario: Simple test
    
      Given I wait 2 seconds
