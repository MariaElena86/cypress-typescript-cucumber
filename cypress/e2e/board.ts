import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on empty home page", () => {
  cy.visit('https://google.com/')

 
  cy.get('.V5OCtd').click()
  cy.get(':nth-child(2) > [aria-label="‪Español (España)‬"]').click()
 
  
  cy.get('#L2AGLb > .QS5gu')
    .click()
});

When("I type in {string}", (boardName) => {
  cy.get('#APjFqb')
    .should('have.class', 'active')
});

Then("Enter the text", (boardName) => {
  cy.wait(3000)
  cy.get('#APjFqb')
    .type(`${boardName}{enter}`)
});