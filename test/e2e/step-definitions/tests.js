var context = require('../../../src/support/context');
var {Given, When, Then} = require('cucumber');

Given('No content - sync', function () {
});

Given('No content - async', function (callback) {
  callback();
});

Then('I should see testPage', function (callback) {
  callback();
});
