Create a new project with Cypress-Typescript and cucumber
url: https://filiphric.com/cucumber-in-cypress-a-step-by-step-guide

1-npm init -y
2-npm install cypress
3-npm install typescript --save-dev
4-Create a new file tsconfig.json whit this code
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress", "node"]
  },
  "include": ["**/*.ts"]
}
5-npx cypress open
y se configura el proyecto cypress, y genera el fichero cypress.config.ts con extencion typescript

6-npm install @badeball/cypress-cucumber-preprocessor
este permite convertir todos los ficheros(.ts y .jsx) en javascript simple para que lo pueda reconocer el navegador

7-npm i @bahmutov/cypress-esbuild-preprocessor
 recommend installing the esbuild bundler by Gleb Bahmutov,
 which will make your run much faster.

8-Configurar el fichero cypress.config.ts con el siguiente codigo
import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      return config;
    },
  },
});

***esto dara algunos errores y es que becesitamos mover el file tsconfig.json para la carpeta cypress

------------------------------------------------------------------
writing tests in VS Code, I recommend installing the extension by Alexander Krechik.
https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete
---------------------------------------------------------------------------
Writing TEST with Cucumber in Cypress

1-Definir los Scenarios en la carpeta e2e con la extension .feature
ejemplo "cypress/e2e/board.feature"
Feature: Board functionality

  Scenario: Create a board
    Given I am on empty home page
    When I type and submit in the board name
    Then I should be redirected to the board detail

2-Create step definitions for each step in the scenario
se puede crear el file board.ts dentro de "cypress/e2e/" o se puede crear una carpeta "step" dentro de "support"
ejemplo "cypress/support/steps/board.ts" y definir el siguienete codigo
import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on empty home page", () => {
  cy.visit("/");
});

When("I type and submit in the board name", () => {
  cy.get("[data-cy=first-board]").type('new board{enter}');
});

Then("I should be redirected to the board detail", () => {
  cy.location("pathname").should('match', /\/board\/\d/);
});