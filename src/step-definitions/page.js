var {Given, When, Then} = require('cucumber');
var context = require('../support/context');

Given(/^I switch OFF angular$/, function (callback) {
  browser.ignoreSynchronization = true;
  this.delayCallback(callback);
});

Given(/^I switch ON angular$/, function (callback) {
  browser.ignoreSynchronization = false;
  this.delayCallback(callback);
});

Then(/^I wait ([^"]*) seconds$/, function (time, callback) {
    var _this = this;
    setTimeout(function() {
      _this.delayCallback(callback)
    }, time * 1000);
});

/**
 * Try go to the given page
 */
Given(/^I try visit the page "([^"]*)"$/, function (pageName, callback) {
    this.tryVisit(context.loadPageInstance(pageName), {}, callback);
});

/**
 * Refresh the current Url
 */
Given(/^I refresh the page$/, function (callback) {
    var _this = this;
    this.refresh().then(function(){
        _this.delayCallback(callback);
    });
});

/**
 * Redirect to the given page
 */
Given(/^I am on the "([^"]*)"$/, function (pageName, callback) {
    this.visit(context.loadPageInstance(pageName), {}, callback);
});

/**
 * Redirect to the given page changing base url
 */
Given(/^I am on the "([^"]*)" of the domain "([^"]*)"$/, function (pageName, pageBaseDomain, callback) {
    // TODO: WTF another static url !
    var helper = require(process.cwd() + '/test/e2e/support/helper/model/domain');
    this.changeBaseUrl(helper.get(pageBaseDomain));
    this.visit(context.loadPageInstance(pageName), {}, callback);
});

/**
 * Redirect to the given page
 */
Given(/^I am on the "([^"]*)" of ([a-z0-9]+) "([^"]*)"$/, function (pageName, objectName, param, callback) {
    // TODO: WTF another static url !
    var helper = require(process.cwd() + '/test/e2e/support/helper/model/' + objectName);

    this.visit(context.loadPageInstance(pageName), helper.get(param), callback);
});

/**
 * Click on a button
 */
When(/^I click on the button "([^"]*)"$/, function (buttonName, callback) {
    var _this = this;

    var elementBinding = by.css(context.getCurrentPageInstance().getButtonByName(buttonName));
    var elementFinder = element(elementBinding);

    _this.isPresentAndDisplayed(elementFinder).then(function isPresentAndDisplayedSuccess() {
        elementFinder.click().then(function elementClickSuccess() {
            _this.delayCallback(callback);
        });
    }, function isPresentAndDisplayedError(errorMessage) {
        _this.handleError(errorMessage, callback);
    });
});

/**
 * Click on a button and accept/dismiss the popup
 */
When(/^I click on the button "([^"]*)" and ([^"]*) the popup$/, function (buttonName, action, callback) {
    var _this = this;

    var elementBinding = by.css(context.getCurrentPageInstance().getButtonByName(buttonName));
    var elementFinder = element(elementBinding);

    _this.isPresentAndDisplayed(elementFinder).then(function isPresentAndDisplayedSuccess() {
        elementFinder.click().then(function elementClickSuccess() {
            // thread sleep before switch
            setTimeout(function() {
                if (action !== "accept" && action !== "dismiss") {
                    browser.switchTo().alert().dismiss();
                    _this.handleError("Action " + action + " unknown", callback);
                    return;
                }
                if (action === "accept") {
                    browser.switchTo().alert().accept();
                }
                if (action === "dismiss") {
                    browser.switchTo().alert().dismiss();
                }
                _this.delayCallback(callback);
            }, 200);
        });
    }, function isPresentAndDisplayedError(errorMessage) {
        _this.handleError(errorMessage, callback);
    });
});

/**
 * See a button
 */
Then(/^I should see the button "([^"]*)"$/, function (buttonName, callback) {
    var _this = this;

    var elementBinding = by.css(context.getCurrentPageInstance().getButtonByName(buttonName));
    var elementFinder = element(elementBinding);

    _this.isPresentAndDisplayed(elementFinder).then(function isPresentAndDisplayedSuccess() {
        _this.delayCallback(callback);
    }, function isPresentAndDisplayedError(errorMessage) {
        _this.handleError(errorMessage, callback);
    });
});

/**
 * See a diabled button
 */
Then(/^I should see the button "([^"]*)" disabled$/, function (buttonName, callback) {
    var _this = this;

    var elementBinding = by.css(context.getCurrentPageInstance().getButtonByName(buttonName));
    var elementFinder = element(elementBinding);

    _this.isPresentAndDisplayed(elementFinder).then(function isPresentAndDisplayedSuccess() {
        elementFinder.isEnabled().then(function isDisplayedSuccess(isEnabled) {
            if(!isEnabled) {
                return _this.delayCallback(callback);
            }

            _this.handleError("Button "+ buttonName +" present but enabled", callback);
        });
    }, function isPresentAndDisplayedError(errorMessage) {
        _this.handleError(errorMessage, callback);
    });
});

/**
 * See an enabled button
 */
Then(/^I should see the button "([^"]*)" enabled$/, function (buttonName, callback) {
    var _this = this;

    var elementBinding = by.css(context.getCurrentPageInstance().getButtonByName(buttonName));
    var elementFinder = element(elementBinding);

    _this.isPresentAndDisplayed(elementFinder).then(function isPresentAndDisplayedSuccess() {
        elementFinder.isEnabled().then(function isDisplayedSuccess(isEnabled) {
            if(isEnabled) {
                return _this.delayCallback(callback);
            }

            _this.handleError("Button "+ buttonName +" present but enabled", callback);
        });
    }, function isPresentAndDisplayedError(errorMessage) {
        _this.handleError(errorMessage, callback);
    });
});

/**
 * Not see a button
 */
Then(/^I should not see the button "([^"]*)"$/, function (buttonName, callback) {
    var _this = this;

    var elementBinding = by.css(context.getCurrentPageInstance().getButtonByName(buttonName));
    var elementFinder = element(elementBinding);

    _this.isPresentAndDisplayed(elementFinder).then(function isPresentAndDisplayedSuccess() {
        _this.handleError("Button found", callback);
    }, function isPresentAndDisplayedError() {
        _this.delayCallback(callback);
    });
});

/**
 * Click on a tab
 */
When(/^I click on the tab "([^"]*)"$/, function (tagName, callback) {
    var _this = this;

    var elementBinding = by.css(context.getCurrentPageInstance().getTabByName(tagName));
    var elementFinder = element(elementBinding);

    _this.isPresentAndDisplayed(elementFinder).then(function isPresentAndDisplayedSuccess() {
        elementFinder.click().then(function elementClickSuccess() {
            _this.delayCallback(callback);
        });
    }, function isPresentAndDisplayedError(errorMessage) {
        _this.handleError(errorMessage, callback);
    });
});

/**
 * Check the current page
 */
Then(/^I should be redirected on "([^"]*)"$/, function (pageName, callback) {
    var _this = this;

    context.loadPageInstance(pageName).then(function onPageLoaded(pageInstance) {
        context.setCurrentPageInstance(pageInstance);

        _this.isOnPage(pageInstance, callback);
    });
});

/**
 * Check content page in data line (form)
 */
Then(/^I can see "([^"]*)" at line "([^"]*)"$/, function (valueObject, keyObject, callback) {
    var _this = this;
    valueObject = _this.generateValue(valueObject);

    var keyBinding = by.css(context.getCurrentPageInstance().getFieldByName(keyObject));
    var elementFinder = element(keyBinding);

    _this.isPresentAndDisplayed(elementFinder).then(function isPresentAndDisplayedSuccess() {
        elementFinder.element(by.css('.like-input span')).getText().then(function (contentField) {
            if (contentField === valueObject) {
                _this.delayCallback(callback);
            } else {
                _this.handleError("contentField and valueObject doesn't match. contentField: " + contentField + ", valueObject: " + valueObject + ", Binding: " + JSON.stringify(keyBinding) + ", currentPageInstance.url: " + context.getCurrentPageInstance().url, callback);
            }
        });
    }, function isPresentAndDisplayedError(errorMessage) {
        _this.handleError(errorMessage, callback);
    });
});

/**
* Check content page (in line)
*/
Then(/^I can see "([^"]*)" in element "([^"]*)"$/, function (valueObject, nameElement, callback) {
    var _this = this;
    valueObject = _this.generateValue(valueObject);

    var keyBinding = by.css(context.getCurrentPageInstance().getElementByName(nameElement));
    var elementFinder = element(keyBinding);

    // escape double quotes
    valueObject = valueObject.replace(/''/g, '"');

    _this.isPresentAndDisplayed(elementFinder).then(function isPresentAndDisplayedSuccess() {
        elementFinder.getText().then(function (contentField) {
            if (contentField === valueObject) {
                _this.delayCallback(callback);
            } else {
                _this.handleError("contentField and valueObject doesn't match. contentField: " + contentField + ", valueObject: " + valueObject + ", Binding: " + JSON.stringify(keyBinding) + ", currentPageInstance.url: " + context.getCurrentPageInstance().url, callback);
            }
        });
    }, function isPresentAndDisplayedError(errorMessage) {
        _this.handleError(errorMessage, callback);
    });
});

/**
* Check content input
*/
Then(/^I can see "([^"]*)" in input "([^"]*)"$/, function (valueObject, nameElement, callback) {
    var _this = this;
    valueObject = _this.generateValue(valueObject);

    var keyBinding = by.css(context.getCurrentPageInstance().getElementByName(nameElement));
    var elementFinder = element(keyBinding);

    _this.isPresentAndDisplayed(elementFinder).then(function isPresentAndDisplayedSuccess() {
        elementFinder.getAttribute('value').then(function (value) {
            if (value === valueObject) {
                _this.delayCallback(callback);
            } else {
                _this.handleError("contentField and valueObject doesn't match. value: " + value + ", valueObject: " + valueObject + ", Binding: " + JSON.stringify(keyBinding) + ", currentPageInstance.url: " + context.getCurrentPageInstance().url, callback);
            }
        });
    }, function isPresentAndDisplayedError(errorMessage) {
        _this.handleError(errorMessage, callback);
    });
});

/**
* Check content iframe
*/
Then(/^I can see "([^"]*)" in element "([^"]*)" in iframe "([^"]*)"$/, function (valueObject, nameElement, iframeElement, callback) {
    var _this = this;
    valueObject = _this.generateValue(valueObject);
    browser.ignoreSynchronization = true;

    var iframe = by.css(context.getCurrentPageInstance().getIframeByName(iframeElement));
    element(iframe).getWebElement().then(function(frame) {
      browser.switchTo().frame(frame);

      var keyBinding = by.css(context.getCurrentPageInstance().getElementByName(nameElement));
      var elementFinder = element(keyBinding);

      _this.isPresentAndDisplayed(elementFinder).then(function isPresentAndDisplayedSuccess() {
          elementFinder.getText().then(function (contentField) {
              if (contentField === valueObject) {
                  _this.delayCallback(callback);
              } else {
                  _this.handleError("contentField and valueObject doesn't match. contentField: " + contentField + ", valueObject: " + valueObject + ", Binding: " + JSON.stringify(keyBinding) + ", currentPageInstance.url: " + context.getCurrentPageInstance().url, callback);
              }
          });
      }, function isPresentAndDisplayedError(errorMessage) {
          _this.handleError(errorMessage, callback);
      });
    });
});

/**
* Check content page with binding
*/
Then(/^I can see "([^"]*)" for data "([^"]*)"$/,function (textWanted, keyName, callback) {
    var _this = this;

    textWanted = _this.generateValue(textWanted);
    var keyBinding = by.binding(context.getCurrentPageInstance().getBindingByName(keyName));
    var elementFinder = element(keyBinding);
    _this.isPresentAndDisplayed(elementFinder).then(function isPresentAndDisplayedSuccess() {
        elementFinder.getText().then(function getTextSuccess(textElementBinding) {
            if (textElementBinding === textWanted) {
                _this.delayCallback(callback);
            } else {
                _this.handleError("Not match betwen text element binding " + textElementBinding + " and wanted text " + textWanted, callback);
            }

        }, function getTextError() {
            _this.handleError("Not find text element binding " + keyBinding + " " + error, callback);
        });

    }, function isPresentAndDisplayed(error) {
        _this.handleError("Not find element binding " + keyBinding + " " + error, callback);
    });
});

/**
* Check content page in frame (text with key translate)
*/
Then(/^I can see text "([^"]*)" at frame "([^"]*)"$/, function (valueObject, nameFrame, callback) {
    var _this = this;
    valueObject = _this.generateValue(valueObject);

    var keyBinding = by.css(context.getCurrentPageInstance().getContainerByName(nameFrame));
    var elementFinder = element(keyBinding);

    _this.isPresentAndDisplayed(elementFinder).then(function isPresentAndDisplayedSuccess() {
        elementFinder.element(by.css(context.getCurrentPageInstance().getTextByName(valueObject))).then(function (contentField) {
            _this.delayCallback(callback);
        });
    }, function isPresentAndDisplayedError(errorMessage) {
        _this.handleError(errorMessage, callback);
    });

});

/**
 * scroll down
 */
When(/^I scroll (down|up)$/, function (direction, callback) {
  var _this = this;
  if (direction === 'down') {
    browser.executeScript('window.scrollTo(0,100000);');
  } else {
    browser.executeScript('window.scrollTo(0,0);');
  }
  _this.delayCallback(callback);
});

/**
 * scroll down
 */
When(/^I scroll to "([^"]*)"$/, function (elementClass, callback) {
  var _this = this;
  var location = context.getCurrentPageInstance().getLocationByName(elementClass);
  var elementFinder = element(by.css(location));

  elementFinder.getLocation().then(function locate(elementLocation) {
    browser.executeScript('window.scrollTo(0, 0);');
    browser.executeScript('window.scrollTo(' + elementLocation.x + ',' + elementLocation.y + ');');
    _this.delayCallback(callback);
  });
});

/**
 *  Check if element is present
 */
Then(/^I should see element "([^"]*)"$/, function (elementClass, callback) {
    var _this = this;
    var mappedElement = context.getCurrentPageInstance().getElementByClass(elementClass);

    var elementFinder = element(by.css(mappedElement));

    _this.isPresentAndDisplayed(elementFinder).then(function isPresent() {
        _this.delayCallback(callback);
    }, function isNotPresent() {
        _this.handleError("Element '" + mappedElement + "' is present", callback);
    });
});

/**
 *  Check if element is present
 */
Then(/^I should not see element "([^"]*)"$/, function (elementClass, callback) {
    var _this = this;
    var mappedElement = context.getCurrentPageInstance().getElementByClass(elementClass);

    var elementFinder = element(by.css(mappedElement));

    _this.isPresentAndDisplayed(elementFinder).then(function isPresent() {
        _this.handleError("Element '" + mappedElement + "' is present", callback);
    }, function isNotPresent() {
        _this.delayCallback(callback);
    });
});

Then('J\'écris {string} dans la console', function (chaine, callback) {
    console.log(chaine);
    callback();
});
