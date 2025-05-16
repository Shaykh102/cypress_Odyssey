export class LoginPage {
    visit() {
        cy.visit("https://app.odysseyai.ai");
    }

    fillEmail(email) {
        cy.get('input[type="email"]').type(email);
    }

    fillPassword(password) {
        cy.get('input[type="password"]').type(password);
    }

    submit() {
        cy.get('.mt-3 > .inline-block > .chakra-button').click();
    }

    checkUrlAfterLogin() {
        cy.contains('Select Team', { timeout: 10000 }).should('be.visible')
    }
    selectTeam() {
        cy.get('[class^="chakra-select"]').click().select('Inteigems').should('have.value', 'inteligems')


    }
}