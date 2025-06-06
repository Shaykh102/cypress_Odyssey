export class LoginPage {
    visit() {
        cy.visit("https://app.odysseyai.ai");
        cy.viewport(1920, 1080);
        cy.viewport(1024, 768);
        cy.viewport(800, 600);
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
        cy.contains('Select Team', { timeout: 10000 })
            .should('be.visible')
    }
    selectTeam() {
        cy.get('[class^="chakra-select"]')
            .should('have.length', 4)
            .should('contain', 'Inteligems')

        cy.get('[id="team"]').select("inteligems")
        cy.contains('Confirm').click()
    }
                
    }