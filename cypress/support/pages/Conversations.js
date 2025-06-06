export class Conversations {
    visit() {
    
        cy.viewport(1920, 1080);
        cy.viewport(1024, 768);
        cy.viewport(800, 600);

    }
    WorkspacePageOpen() {
        // Wait for navigation to complete and URL to change from login page
        cy.url({ timeout: 30000 }).should('not.include', '/auth/login');
        
        // Handle cross-origin navigation
        cy.origin('https://inteligems.odysseyai.ai', () => {
            // First check for dashboard
            cy.url().should('include', 'dashboard');
            
            // Then wait for and check workspace URL
            cy.url({ timeout: 30000 }).should('include', 'workspace');
        });
    }
}
