var {Given, When, Then} = require('cucumber');
var context = require('../support/context');

// TODO: Need to be tested

Given(/^I use "([^"]*)" mocked database$/, function (mock, callback) {
        // TODO: Another static url
        var databases = require(process.cwd() + '/test/e2e/support/databases/' + mock);
        databases.initialize();
        context.database = databases;

        this.delayCallback(callback);
});
