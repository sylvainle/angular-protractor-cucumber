# test/e2e/test.feature

Feature: Test predefined step definitions

Scenario: page.js - wait few seconds
    Given I wait 1 seconds

Scenario: page.js - open url - page without angular
    Given I switch OFF angular
    Given I try visit the page "testPage"
