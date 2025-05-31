import { LoginPage } from '../support/pages/LoginPage';

describe('Login Tests', () => {
    const loginPage = new LoginPage();
<<<<<<< HEAD
    const baseURL = "https://app.odysseyai.ai";
    const email = "shamil@inteligems.io";
    const password = "******";
=======
    let testData;

    before(() => {
        cy.fixture('testData').then((data) => {
            testData = data;
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

    it('Successful login', () => {
        loginPage.visit(testData.baseUrl);
        loginPage.fillEmail(testData.email);
        loginPage.fillPassword(testData.password);
        loginPage.submit();
        loginPage.checkUrlAfterLogin();
        loginPage.selectTeam();
<<<<<<< HEAD

    }); 
        
=======
        loginPage.WorkspacePageOpen();
    });

    /*it('Opening Conversation page', () => {
        
    });*/
>>>>>>> b2c98be0c01a7f338a034af1e51b97e0b0bacb8b
});
