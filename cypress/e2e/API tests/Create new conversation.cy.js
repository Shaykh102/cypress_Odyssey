const { Conversations } = require('../../support/pages/Conversations');

describe('Create New Conversation API Tests', () => {
    let testData;
    let userData;
    let conversations;

    before(() => {
        // Load test data and user data from fixtures
        cy.fixture('testData.json').then((data) => {
            testData = data;
        });
        cy.fixture('users.json').then((data) => {
            userData = data;
        });
        conversations = new Conversations();
    });

    it('should successfully create a new conversation with all required fields', () => {
        const payload = {
            workspaceId: 'test-workspace-id',
            conversationName: 'Test Conversation',
            agentId: 'test-agent-id'
        };

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/conversations`,
            headers: {
                'x-api-key': userData.apiKey,
                'userId': userData.userId
            },
            body: payload
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('conversationId');
            expect(response.body).to.have.property('conversation');
        });
    });

    it('should create a new conversation without optional fields', () => {
        const payload = {
            workspaceId: 'test-workspace-id'
        };

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/conversations`,
            headers: {
                'x-api-key': userData.apiKey,
                'userId': userData.userId
            },
            body: payload
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('conversationId');
            expect(response.body).to.have.property('conversation');
        });
    });

    it('should return 400 when workspaceId is missing', () => {
        const payload = {
            conversationName: 'Test Conversation'
        };

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/conversations`,
            headers: {
                'x-api-key': userData.apiKey,
                'userId': userData.userId
            },
            body: payload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    it('should return 403 when API key is invalid', () => {
        const payload = {
            workspaceId: 'test-workspace-id'
        };

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/conversations`,
            headers: {
                'x-api-key': 'invalid-api-key',
                'userId': userData.userId
            },
            body: payload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });

    it('should return 403 when userId is missing', () => {
        const payload = {
            workspaceId: 'test-workspace-id'
        };

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/conversations`,
            headers: {
                'x-api-key': userData.apiKey
            },
            body: payload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });
});
