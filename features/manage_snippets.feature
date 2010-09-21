Feature: Manage JavaScript snippets
  In order to work on a JavaScript Exercise
  As a Student
  I want to manage JavaScript Snippets

  @wip
  Scenario: Register new snippet
    Given I am on the new snippet page
    When I fill in "Title" with "Hello World"
    And I fill in "Body" with "document.write('Hello World');"
    And I uncheck "Submitted"
    And I press "Create"
    Then I should see "Hello World"
    And I should see "document.write('Hello World');"
    And I should see "false"

  # Rails generates Delete links that use Javascript to pop up a confirmation
  # dialog and then do a HTTP POST request (emulated DELETE request).
  #
  # Capybara must use Culerity/Celerity or Selenium2 (webdriver) when pages rely
  # on Javascript events. Only Culerity/Celerity supports clicking on confirmation
  # dialogs.
  #
  # Since Culerity/Celerity and Selenium2 has some overhead, Cucumber-Rails will
  # detect the presence of Javascript behind Delete links and issue a DELETE request 
  # instead of a GET request.
  #
  # You can turn this emulation off by tagging your scenario with @no-js-emulation.
  # Turning on browser testing with @selenium, @culerity, @celerity or @javascript
  # will also turn off the emulation. (See the Capybara documentation for 
  # details about those tags). If any of the browser tags are present, Cucumber-Rails
  # will also turn off transactions and clean the database with DatabaseCleaner 
  # after the scenario has finished. This is to prevent data from leaking into 
  # the next scenario.
  #
  # Another way to avoid Cucumber-Rails' javascript emulation without using any
  # of the tags above is to modify your views to use <button> instead. You can
  # see how in http://github.com/jnicklas/capybara/issues#issue/12
  #
  # Scenario: Delete snippet
  #   Given the following snippets:
  #     |title|body|submitted|
  #     |title 1|body 1|false|
  #     |title 2|body 2|true|
  #     |title 3|body 3|false|
  #     |title 4|body 4|true|
  #   When I delete the 3rd snippet
  #   Then I should see the following snippets:
  #     |Title|Body|Submitted|
  #     |title 1|body 1|false|
  #     |title 2|body 2|true|
  #     |title 4|body 4|true|
