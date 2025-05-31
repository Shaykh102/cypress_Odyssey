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

// Custom command for login
Cypress.Commands.add('login', (email, password) => {
    cy.visit('https://app.odysseyai.ai');
    cy.viewport(1920, 1080);
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('.mt-3 > .inline-block > .chakra-button').click();
    cy.contains('Select Team', { timeout: 10000 }).should('be.visible');
    cy.get('[id="team"]').select("inteligems");
    cy.contains('Confirm').click();
    cy.url({ timeout: 10000 })
        .should('include', '/inteligems')
        .should('be.visible');
});