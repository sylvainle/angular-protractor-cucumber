# test/e2e/supportHook.feature
Feature: Test hooks

Scenario: Test scenario before hook
    Then I see scenario name "Test scenario before hook" coming from setCurrentScenario

Scenario: Test step before hook
    Then I see scenario name "Test step before hook" coming from setCurrentScenario
    Then I see step name coming from setCurrentStep
