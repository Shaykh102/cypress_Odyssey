export class Conversation_page_tests {
    WorkspacePageOpen() {
        cy.url({ timeout: 10000 })
            .should('include', '/inteligems')
            .should('be.visible')
    }
}
