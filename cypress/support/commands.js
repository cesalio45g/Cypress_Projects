// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('sessionLogin', (username, password) => {
   cy.session(
      [username, password],
      () => {
         cy.visit('/');
         cy.get('#login2').click();
         cy.get('#loginusername').should('be.visible');
         cy.get('#loginusername').clear().type(username);
         cy.get('#loginpassword').clear().type(password);
         cy.get('[onclick="logIn()"]').click();
         // had to add this assertion because the script was going to fast
         cy.get('#logout2').should('be.visible');
      },
      {
         cacheAcrossSpecs: true,
      }
   );
});
