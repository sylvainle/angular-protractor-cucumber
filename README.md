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
- add node_modules/.bin to your environment paths
- [windows] close and reopen cmd
- exec "webdriver-manager update"
- update protractor.conf with your current seleniumServerJar release
- npm test
