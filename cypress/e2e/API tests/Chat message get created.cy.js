/// <reference types="cypress" />

describe('Chat Messages API Tests', () => {
    let testData;
    let userData;
    
    before(() => {
        cy.fixture('testData').then((data) => {
            testData = data;
        });
        cy.fixture('users').then((data) => {
            userData = data;
        });
    });

    it('should successfully retrieve chat messages', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}/api/chat/messages`,
            qs: {
                workspaceId: testData.workspaceId,
                conversationId: testData.conversationId
            },
            headers: {
                'x-api-key': userData.apiKey,
                'userId': userData.userId
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.be.an('array');
            
            // Validate the structure of the response
            if (response.body.data.length > 0) {
                const message = response.body.data[0];
                expect(message).to.have.property('query');
                expect(message).to.have.property('type');
                expect(message).to.have.property('queryresponseid');
                expect(message).to.have.property('createdat');
                expect(message).to.have.property('name');
                expect(message).to.have.property('ownerid');
                expect(message).to.have.property('followUps').to.be.an('array');
                expect(message).to.have.property('sourceSnips').to.be.an('array');
            }
        });
    });

    it('should return 400 for missing required parameters', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}/api/chat/messages`,
            qs: {
                // Missing required parameters
            },
            headers: {
                'x-api-key': userData.apiKey,
                'userId': userData.userId
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    it('should return 403 for invalid API key', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}/api/chat/messages`,
            qs: {
                workspaceId: testData.workspaceId,
                conversationId: testData.conversationId
            },
            headers: {
                'x-api-key': 'invalid-api-key',
                'userId': userData.userId
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });

    it('should return 404 for non-existent conversation', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}/api/chat/messages`,
            qs: {
                workspaceId: testData.workspaceId,
                conversationId: 'non-existent-conversation'
            },
            headers: {
                'x-api-key': userData.apiKey,
                'userId': userData.userId
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
}); 