Feature: Board functionality

  Scenario: Creating a <listName> list within a board
    Given I am on empty home page
    When I type in "<boardName>" and submit
    And Create a list with the name "<listName>"
    Then I should be redirected to the board detail

  Examples:
      | boardName | listName |
      | Shopping list | Groceries |
      | Rocket launch | Preflight checks |