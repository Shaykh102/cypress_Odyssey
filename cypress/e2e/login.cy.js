import { LoginPage } from '../support/pages/LoginPage';

describe('Login Tests', () => {
    const loginPage = new LoginPage();
    let testData;

    before(() => {
        cy.fixture('testData').then((data) => {
            testData = data;
        });
    });

    it('Display error on invalid login', () => {
        loginPage.visit(testData.baseUrl);
        loginPage.fillEmail('wrong@email.com');
        loginPage.fillPassword('wrongpass');
        loginPage.submit();
        cy.get('[role="alert"]').should('be.visible');
    });

    it('Successful login', () => {
        loginPage.visit(testData.baseUrl);
        loginPage.fillEmail(testData.email);
        loginPage.fillPassword(testData.password);
        loginPage.submit();
        loginPage.checkUrlAfterLogin();
        loginPage.selectTeam();
        loginPage.WorkspacePageOpen();
    });

    /*it('Opening Conversation page', () => {
        
    });*/
});
