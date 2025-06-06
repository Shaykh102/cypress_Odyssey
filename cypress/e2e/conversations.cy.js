import { Conversations } from '../support/pages/Conversations';

describe('Conversations Tests', () => {
    const conv = new Conversations();
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
    })
}) 







