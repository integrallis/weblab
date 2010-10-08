Feature: Manage JavaScript snippets
  In order to work on a JavaScript Exercise
  As a Student
  I want to manage JavaScript Snippets

  Scenario: Register new snippet
    Given I am on the new snippet page
    When I fill in "Title" with "Hello World"
    And I fill in "Body" with "document.write('Hello World');"
    And I uncheck "Submitted"
    And I press "Create"
    Then I should see "Hello World"
    And I should see "document.write('Hello World');"
    And I should see "false"