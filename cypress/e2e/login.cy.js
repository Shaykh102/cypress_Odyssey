import { LoginPage } from '../support/pages/LoginPage';


describe('Login Tests', () => {
    const loginPage = new LoginPage();
    const baseURL = "https://app.odysseyai.ai";
    const email = "********";
    const password = "*******";

    it('Display error on invalid login', () => {
        loginPage.visit(baseURL);
        loginPage.fillEmail('wrong@email.com');
        loginPage.fillPassword('wrongpass');
        loginPage.submit();
        cy.get('[role="alert"]').should('be.visible');
    });

    it('Successfull login', () => {
        loginPage.visit(baseURL);
        loginPage.fillEmail(email);
        loginPage.fillPassword(password);
        loginPage.submit();
        loginPage.checkUrlAfterLogin();
        loginPage.selectTeam();
    });
    it('Opening Conversation page', () => {
        loginPage.WorkspacePageOpen();

    })
});
