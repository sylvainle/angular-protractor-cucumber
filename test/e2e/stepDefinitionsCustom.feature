# test/e2e/test.feature

Feature: Test custom step definitions

Scenario: sync custom step
    Given No content - sync

Scenario: async custom step
    Given No content - async

Scenario: predef step - wait few seconds
    Given I wait 1 seconds

Scenario: predef step - open url - page without angular
    Given I switch OFF angular
    Given I try visit the page "testPage"

Scenario: custom assert - open url and verify - page without angular
    Given I switch OFF angular
    Given I try visit the page "testPage"
    Then I should see testPage
