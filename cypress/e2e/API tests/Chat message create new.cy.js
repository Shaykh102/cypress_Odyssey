const { Conversations } = require('../../support/pages/Conversations');

describe('Create New Chat Message API Tests', () => {
    let testData;
    let userData;
    let conversations;
    let currentDate;

    before(() => {
        // Load test data and user data from fixtures
        cy.fixture('testData.json').then((data) => {
            testData = data;
        });
        cy.fixture('users.json').then((data) => {
            userData = data;
        });
        conversations = new Conversations();
        currentDate = new Date().toISOString().split('T')[0];
    });

    it('should successfully send a chat message with all required fields', () => {
        const payload = {
            workspaceId: testData.workspaceId,
            conversationId: testData.conversationId,
            message: "What drives companies to invest in environmental sustainability?",
           // agentId: testData.agentId,
            isFirst: true
        };

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/chat/message`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: payload
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.have.property('id');
            expect(response.body.data).to.have.property('query');
            expect(response.body.data).to.have.property('followUps');
            expect(response.body.data).to.have.property('sourceSnips');
        });
    });

    it('should return 400 when required fields are missing', () => {
        const payload = {
            message: "Test message"
        };

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/chat/message`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: payload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    it('should return 403 when API key is invalid', () => {
        const payload = {
            workspaceId: testData.workspaceId,
            conversationId: testData.conversationId,
            message: "Test message"
        };

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/chat/message`,
            headers: {
                'x-api-key': 'invalid-api-key',
                'userId': userData.admin.userId
            },
            body: payload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });

    it('should return 403 when userId is missing', () => {
        const payload = {
            workspaceId: testData.workspaceId,
            conversationId: testData.conversationId,
            message: "Test message"
        };

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/chat/message`,
            headers: {
                'x-api-key': userData.admin.apiKey
            },
            body: payload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });

    it('should return 404 when workspaceId is invalid', () => {
        const payload = {
            workspaceId: 'invalid-workspace-id',
            conversationId: testData.conversationId,
            message: "Test message"
        };

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/chat/message`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: payload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
});
