import { LoginPage } from '../support/pages/LoginPage';
import { Conversation_page_tests } from '../support/pages/Conversations';

describe('Conversations Tests', () => {
    beforeEach(() => {
        cy.fixture('testData').then((testData) => {
            cy.login(testData.email, testData.password);
        });
    });

    it('should do something with conversations', () => {
        // Your test code here
        // The login is already handled in beforeEach
    });

    // Add more test cases as needed
});

describe('Conversation_page_tests', () => {
    const loginPage = new LoginPage();
    const conv = new Conversation_page_tests; 
    const baseURL = "https://app.odysseyai.ai";
    const email = "shamil@inteligems.io";
    const password = "*****";

    it('Successfull login', () => {
        loginPage.visit(baseURL);
        loginPage.fillEmail(email);
        loginPage.fillPassword(password);
        loginPage.submit();
        loginPage.checkUrlAfterLogin();
        loginPage.selectTeam();

    });

    it('Opening Conversation page', () => {
        conv.WorkspacePageOpen();
    })
})