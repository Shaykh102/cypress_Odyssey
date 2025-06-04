const { Conversations } = require('../../support/pages/Conversations');

describe('Create New Conversation API Tests', () => {
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

    it('should successfully create a new conversation with all required fields', () => {
        const payload = {
            workspaceId: testData.workspaceId,
            conversationName: `Test Conversation ${currentDate}`,
            agentId: testData.agentId
        };

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/conversations`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: payload
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('conversationId');
            testData.conversationId = response.body.conversationId;
            cy.writeFile('cypress/fixtures/testData.json', testData);
            expect(response.body).to.have.property('conversation');
        });
    });

    it('should create a new conversation without optional fields', () => {
        const payload = {
            workspaceId: testData.workspaceId
        };

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/conversations`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
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
            conversationName: `Test Conversation ${currentDate}`
        };

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/conversations`,
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
            workspaceId: testData.workspaceId
        };

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/conversations`,
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
            workspaceId: testData.workspaceId
        };

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/conversations`,
            headers: {
                'x-api-key': userData.admin.apiKey
            },
            body: payload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });
});
