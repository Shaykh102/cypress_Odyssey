export class Conversations {
    visit() {
        cy.visit("https://app.odysseyai.ai");
        cy.viewport(1920, 1080);
    }
    WorkspacePageOpen() {
        cy.url({ timeout: 10000 })
            .should('include', '/inteligems')
            .should('be.visible')
    }
}
