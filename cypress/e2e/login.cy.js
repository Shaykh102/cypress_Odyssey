import { LoginPage } from '../support/pages/LoginPage';

describe('Login Tests', () => {
    const loginPage = new LoginPage();
<<<<<<< HEAD
    const baseURL = "https://app.odysseyai.ai";
    const email = "shamil@inteligems.io";
    const password = "******";
=======
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
>>>>>>> b2c98be0c01a7f338a034af1e51b97e0b0bacb8b

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
        loginPage.WorkspacePageOpen();
    });

    it('Successful login as regular user', () => {
        loginPage.visit(testData.baseUrl);
        loginPage.fillEmail(users.regular.email);
        loginPage.fillPassword(users.regular.password);
        loginPage.submit();
        loginPage.checkUrlAfterLogin();
        loginPage.selectTeam();
        loginPage.WorkspacePageOpen();
    });

    it('Successful login as readonly user', () => {
        loginPage.visit(testData.baseUrl);
        loginPage.fillEmail(users.readonly.email);
        loginPage.fillPassword(users.readonly.password);
        loginPage.submit();
        loginPage.checkUrlAfterLogin();
        loginPage.selectTeam();
<<<<<<< HEAD

    }); 
        
=======
        loginPage.WorkspacePageOpen();
    });

<<<<<<< HEAD
    /*it('Opening Conversation page', () => {
        
    });*/
>>>>>>> b2c98be0c01a7f338a034af1e51b97e0b0bacb8b
=======
>>>>>>> correct_changes
});
