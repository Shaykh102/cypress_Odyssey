const { Conversations } = require('../../support/pages/Conversations');

describe('Get Conversations API Tests', () => {
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

    it('should successfully retrieve conversations with valid parameters', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}/api/conversations`,
            qs: {
                workspaceId: testData.workspaceId
            },
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('conversations').to.be.an('array');
            if (response.body.conversations.length > 0) {
                expect(response.body.conversations[0]).to.have.property('conversationid');
                expect(response.body.conversations[0]).to.have.property('createdat');
                expect(response.body.conversations[0]).to.have.property('name');
                expect(response.body.conversations[0]).to.have.property('ownerid');
            }
        });
    });

    it('should return 400 when workspaceId is missing', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}/api/conversations`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    it('should return 403 when API key is invalid', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}/api/conversations`,
            qs: {
                workspaceId: testData.workspaceId
            },
            headers: {
                'x-api-key': 'invalid-api-key',
                'userId': userData.admin.userId
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });

    it('should return 403 when userId is missing', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}/api/conversations`,
            qs: {
                workspaceId: testData.workspaceId
            },
            headers: {
                'x-api-key': userData.admin.apiKey
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });

    it('should return 404 when workspaceId is invalid', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}/api/conversations`,
            qs: {
                workspaceId: 'invalid-workspace-id'
            },
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
});
