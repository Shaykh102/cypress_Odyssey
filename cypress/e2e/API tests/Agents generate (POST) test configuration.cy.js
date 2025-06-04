const { Conversations } = require('../../support/pages/Conversations');

describe('Generate Agent Configuration API Tests', () => {
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

    const validGeneratePayload = {
        description: "Create an AI agent that helps users write unit tests for their code. The agent should analyze the code, identify test cases, and generate comprehensive test suites using popular testing frameworks."
    };

    it('should successfully generate agent configuration with valid description', () => {
        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/agents/generate`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: validGeneratePayload
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('agentDetails');
            
            const agentDetails = response.body.agentDetails;
            expect(agentDetails).to.have.property('rootAgentName').and.to.be.a('string');
            expect(agentDetails).to.have.property('displayPrompt').and.to.be.a('string');
            expect(agentDetails).to.have.property('goal').and.to.be.a('string');
            expect(agentDetails).to.have.property('description').and.to.be.a('string');
            expect(agentDetails).to.have.property('stepsBreakdown').and.to.be.an('array');

            // Validate stepsBreakdown structure if present
            if (agentDetails.stepsBreakdown.length > 0) {
                const firstStep = agentDetails.stepsBreakdown[0];
                expect(firstStep).to.have.property('type').and.to.be.a('string');
                expect(firstStep).to.have.property('prompt').and.to.be.a('string');
                expect(['rag', 'compile', 'structure']).to.include(firstStep.type);
            }
        });
    });

    it('should return 400 when description is missing', () => {
        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/agents/generate`,
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

    it('should return 400 when description is empty', () => {
        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/agents/generate`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: {
                description: ""
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    it('should return 403 when API key is invalid', () => {
        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/agents/generate`,
            headers: {
                'x-api-key': 'invalid-api-key',
                'userId': userData.admin.userId
            },
            body: validGeneratePayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });

    it('should return 403 when userId is missing', () => {
        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/agents/generate`,
            headers: {
                'x-api-key': userData.admin.apiKey
            },
            body: validGeneratePayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });

    it('should return 405 for incorrect HTTP method', () => {
        cy.request({
            method: 'PUT',
            url: `${testData.baseUrl}/api/agents/generate`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: validGeneratePayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(405);
        });
    });

    it('should handle a complex agent description', () => {
        const complexPayload = {
            description: "Create an AI agent that serves as a full-stack development assistant. The agent should be able to help with frontend development using React, backend development with Node.js, database design with PostgreSQL, and API integration. It should provide code examples, best practices, and architectural recommendations."
        };

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/agents/generate`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: complexPayload
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('agentDetails');
            
            const agentDetails = response.body.agentDetails;
            expect(agentDetails.stepsBreakdown).to.be.an('array').and.have.length.greaterThan(0);
            expect(agentDetails.displayPrompt).to.include('{');  // Should contain at least one parameter placeholder
        });
    });
});
