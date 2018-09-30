# test/e2e/supportEnv.feature
Feature: Test predefined step definitions

Scenario: page.js - verify 60 seconds setup by env - wait 6 seconds (default is 5)
    Given I switch OFF angular
    Given I try visit the page "testPage"
    Given I wait 6 seconds
