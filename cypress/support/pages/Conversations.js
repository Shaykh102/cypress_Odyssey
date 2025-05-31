export class Conversation_page_tests {
<<<<<<< HEAD
    visit() {
        cy.visit("https://app.odysseyai.ai");
        cy.viewport(1920, 1080);
    }
=======
>>>>>>> b2c98be0c01a7f338a034af1e51b97e0b0bacb8b
    WorkspacePageOpen() {
        cy.url({ timeout: 10000 })
            .should('include', '/inteligems')
            .should('be.visible')
    }
}
