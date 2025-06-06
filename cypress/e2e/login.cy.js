import { LoginPage } from '../support/pages/LoginPage';
import { Conversations } from '../support/pages/Conversations';


describe('Login Tests', () => {
    const loginPage = new LoginPage();
    const conversationPage = new Conversations();
    let testData;
    let users;

    before(() => {
        cy.fixture('testData').then((data) => {
            testData = data;
        });
        cy.fixture('users').then((userData) => {
            users = userData;
        });
    });

    it('Display error on invalid login', () => {
        loginPage.visit(testData.baseUrl);
        loginPage.fillEmail('wrong@email.com');
        loginPage.fillPassword('wrongpass');
        loginPage.submit();
        cy.get('[role="alert"]').should('be.visible');
    });

    it('Successful login as admin', () => {
        loginPage.visit(testData.baseUrl);
        loginPage.fillEmail(users.admin.email);
        loginPage.fillPassword(users.admin.password);
        loginPage.submit();
        loginPage.checkUrlAfterLogin();
        loginPage.selectTeam();
        conversationPage.WorkspacePageOpen();
    });
                                                
        
    });


    
