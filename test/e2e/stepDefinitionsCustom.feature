# test/e2e/stepDefinitionsCustom.feature
Feature: Test custom step definitions

Scenario: sync custom step
    Given No content - sync

Scenario: async custom step
    Given No content - async

Scenario: custom assert - open url and verify - page without angular
    Given I switch OFF angular
    Given I try visit the page "testPage"
    Then I should see testPage
    Then I put string "Ernest" in element "div[app-run=\"hello.html\"] input.ng-empty[type=text]"
    Then I see string "Hello Ernest!" in element "div[app-run=\"hello.html\"] h1"
