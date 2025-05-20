import { LoginPage } from '../support/pages/LoginPage';
import { Conversation_page_tests } from '../support/pages/Conversations';



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