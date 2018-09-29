var context = require('../../../src/support/context');
var {Given, When, Then} = require('cucumber');
var webdriver = require('selenium-webdriver');

// No angular
Given(/^No content - sync$/, function () {
});

// No angular
Given(/^No content - async$/, function (callback) {
  callback();
});

// No angular
Then(/^I should see testPage$/, function (callback) {
  callback();
});

// No angular
Then('I put string {string} in element {string}', function (aText, aSelector, callback) {
  browser.driver.findElement({css : aSelector}).then(function(element) {
    element.sendKeys(aText).then(function(){
      callback();
    },function(error){
      callback(error);
    });
  }, function(error) {
    callback(error);
  });
});

// No angular
Then('I see string {string} in element {string}', function (aText, aSelector, callback) {
  browser.driver.findElement({css : aSelector}).then(function(element) {
    element.getText().then(function(text){
      if (text == aText) {
        callback();
      } else {
        callback('Text should be "' + aText + '" but is "' + text + '"');
      }
    },function(error){
      callback(error);
    });
  }, function(error) {
    callback(error);
  });
});

Then('I see scenario name {string} coming from setCurrentScenario', function (aScenarioName, callback) {
  try {
    scenarioName = context.getCurrentScenario().pickle.name;
    if (aScenarioName == scenarioName) {
      callback();
    } else {
      callback('Text should be "' + aScenarioName + '" but is "' + scenarioName + '"');
    }
  } catch (e) {
    callback(e);
  }
});

Then('I see step name coming from setCurrentStep', function (callback) {
  try {
    aStepName = 'I see step name coming from setCurrentStep';
    stepName = context.getCurrentStep().text;
    if (aStepName == stepName) {
      callback();
    } else {
      callback('Text should be "' + aStepName + '" but is "' + stepName + '"');
    }
  } catch (e) {
    callback(e);
  }
});
