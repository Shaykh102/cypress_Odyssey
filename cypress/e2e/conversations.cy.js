<<<<<<< HEAD
// main page
=======
/*import { LoginPage } from '../support/pages/LoginPage';
import { Conversation_page_tests } from '../support/pages/Conversations'; */

describe('Conversations Tests', () => {
    beforeEach(() => {
        cy.fixture('testData').then((testData) => {
            cy.login(testData.email, testData.password);
        });
    });

    it('Default Conversation open', () => {
        // Your test code here
        // The login is already handled in beforeEach
    });

});

/*describe('Conversation_page_tests', () => {
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
}) */
>>>>>>> b2c98be0c01a7f338a034af1e51b97e0b0bacb8b
