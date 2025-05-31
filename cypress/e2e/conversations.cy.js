


describe('Conversations Tests', () => {
    beforeEach(() => {
        cy.fixture('testData').then((testData) => {
            cy.login(testData.email, testData.password);
        });
    });

    it('Default Conversation open', () => {
        cy.url().should('include', 'inteligems.odysseyai.ai/workspace')
            .should('be.valid');
      
    });

});


 
 
 
 
 

 
 
 
 
 
 
 

 

    it('Opening Conversation page', () => {
        conv.WorkspacePageOpen();
    })
}) */