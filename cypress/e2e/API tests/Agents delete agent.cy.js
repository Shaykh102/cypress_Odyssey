const { Conversations } = require('../../support/pages/Conversations');

describe('Delete Agent API Tests', () => {
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

    const validDeletePayload = {
        agentId: "test-agent-id"
    };

    it('should successfully delete an existing agent', () => {
        cy.request({
            method: 'DELETE',
            url: `${testData.baseUrl}/api/agents/delete`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: validDeletePayload
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message');
        });
    });

    it('should return 400 when agentId is missing', () => {
        cy.request({
            method: 'DELETE',
            url: `${testData.baseUrl}/api/agents/delete`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: {},
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    it('should return 400 when agentId is empty', () => {
        cy.request({
            method: 'DELETE',
            url: `${testData.baseUrl}/api/agents/delete`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: {
                agentId: ""
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    it('should return 404 when agent does not exist', () => {
        cy.request({
            method: 'DELETE',
            url: `${testData.baseUrl}/api/agents/delete`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: {
                agentId: "non-existent-agent-id"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });

    it('should return 403 when API key is invalid', () => {
        cy.request({
            method: 'DELETE',
            url: `${testData.baseUrl}/api/agents/delete`,
            headers: {
                'x-api-key': 'invalid-api-key',
                'userId': userData.admin.userId
            },
            body: validDeletePayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });

    it('should return 403 when userId is missing', () => {
        cy.request({
            method: 'DELETE',
            url: `${testData.baseUrl}/api/agents/delete`,
            headers: {
                'x-api-key': userData.admin.apiKey
            },
            body: validDeletePayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });

    it('should return 405 for incorrect HTTP method', () => {
        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/agents/delete`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: validDeletePayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(405);
        });
    });
});
