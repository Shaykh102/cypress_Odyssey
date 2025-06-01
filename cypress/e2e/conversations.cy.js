<<<<<<< HEAD
<<<<<<< HEAD
// main page
=======
/*import { LoginPage } from '../support/pages/LoginPage';
import { Conversation_page_tests } from '../support/pages/Conversations'; */
=======
import { Conversation_page_tests } from '../support/pages/Conversations';
>>>>>>> correct_changes

describe('Conversations Tests', () => {
    const conv = new Conversation_page_tests();
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

    beforeEach(() => {
        cy.login(users.admin.email, users.admin.password);
    });

    it('Default Conversation open', () => {
        conv.WorkspacePageOpen();
<<<<<<< HEAD
    })
}) */
>>>>>>> b2c98be0c01a7f338a034af1e51b97e0b0bacb8b
=======
        // Add your conversation test steps here
    });
});
>>>>>>> correct_changes
