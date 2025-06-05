const { Conversations } = require('../../support/pages/Conversations');

describe('Get All Agents API Tests', () => {
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

    it('should successfully retrieve all agents', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}/api/agents`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.be.an('array');
            
            // Validate the structure of agents data if array is not empty
            if (response.body.data.length > 0) {
                const firstAgent = response.body.data[0];
                expect(firstAgent).to.have.property('active');
                expect(firstAgent).to.have.property('agentid');
                expect(firstAgent).to.have.property('agenttype');
                expect(firstAgent).to.have.property('createdat');
                expect(firstAgent).to.have.property('description');
                expect(firstAgent).to.have.property('displayprompt');
                expect(firstAgent).to.have.property('goal');
                expect(firstAgent).to.have.property('inputparameters');
                expect(firstAgent).to.have.property('lastused');
                expect(firstAgent).to.have.property('rootAgentName');
                expect(firstAgent).to.have.property('stepsBreakdown');
                
                // Validate stepsBreakdown structure if present
                if (firstAgent.stepsBreakdown.length > 0) {
                    const firstStep = firstAgent.stepsBreakdown[0];
                    expect(firstStep).to.have.property('agentname');
                    expect(firstStep).to.have.property('content');
                    expect(firstStep.content).to.have.property('query');
                    expect(firstStep.content).to.have.property('response');
                    expect(firstStep).to.have.property('external');
                    expect(firstStep).to.have.property('type');
                   // expect(firstStep).to.have.property('prompt');
                }
            }
        });
    });

    it('should return 403 when API key is invalid', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}/api/agents`,
            headers: {
                'x-api-key': 'invalid-api-key',
                'userId': userData.admin.userId
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });

    it('should return 403 when userId is invalid', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}/api/agents`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': 'invalid-user-id'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });

    it('should return 403 when API key is missing', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}/api/agents`,
            headers: {
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
            url: `${testData.baseUrl}/api/agents`,
            headers: {
                'x-api-key': userData.admin.apiKey
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });

    it('should return 405 for incorrect HTTP method', () => {
        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/agents`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(405);
        });
    });
});
