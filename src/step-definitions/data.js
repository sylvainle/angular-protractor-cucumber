var {Given, When, Then} = require('cucumber');
var context = require('../support/context');

Given(/^I use "([^"]*)" mocked database$/, function (mock, callback) {
        var databases = require(process.cwd() + '/test/e2e/support/databases/' + mock);
        databases.initialize();
        context.database = databases;

        this.delayCallback(callback);
});
