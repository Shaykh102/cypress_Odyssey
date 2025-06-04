const { Conversations } = require('../../support/pages/Conversations');

describe('Generate Agent Edit API Tests', () => {
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

    const currentAgentConfig = {
        rootAgentName: "Test Agent",
        displayprompt: "Hello, I am a test agent. Parameters: {param1}, {param2}",
        inputparameters: {
            param1: {
                type: "string",
                description: "First parameter"
            },
            param2: {
                type: "string",
                description: "Second parameter"
            }
        },
        goal: "To test the agent functionality",
        description: "This is a test agent for API testing",
        stepsBreakdown: [
            {
                type: "rag",
                prompt: "Test prompt for RAG step",
                agentname: "RAG Agent"
            }
        ]
    };

    const validEditPayload = {
        description: "Add support for code review functionality and improve the test coverage analysis",
        currentAgent: currentAgentConfig
    };

    it('should successfully generate updated agent configuration', () => {
        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/agents/generate-edit`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: validEditPayload
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('agentDetails');
            
            const agentDetails = response.body.agentDetails;
            expect(agentDetails).to.have.property('rootAgentName').and.to.be.a('string');
            expect(agentDetails).to.have.property('displayPrompt').and.to.be.a('string');
            expect(agentDetails).to.have.property('goal').and.to.be.a('string');
            expect(agentDetails).to.have.property('description').and.to.be.a('string');
            expect(agentDetails).to.have.property('stepsBreakdown').and.to.be.an('array');

            // Validate stepsBreakdown structure
            if (agentDetails.stepsBreakdown.length > 0) {
                const firstStep = agentDetails.stepsBreakdown[0];
                expect(firstStep).to.have.property('type').and.to.be.a('string');
                expect(firstStep).to.have.property('prompt').and.to.be.a('string');
                expect(['rag', 'compile', 'structure']).to.include(firstStep.type);
            }
        });
    });

    it('should return 400 when description is missing', () => {
        const invalidPayload = {
            currentAgent: currentAgentConfig
        };

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/agents/generate-edit`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: invalidPayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    it('should return 400 when currentAgent is missing', () => {
        const invalidPayload = {
            description: "Add code review functionality"
        };

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/agents/generate-edit`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: invalidPayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    it('should return 400 when currentAgent is incomplete', () => {
        const invalidPayload = {
            description: "Add code review functionality",
            currentAgent: {
                rootAgentName: "Test Agent"
                // Missing required fields
            }
        };

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/agents/generate-edit`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: invalidPayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    it('should return 403 when API key is invalid', () => {
        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/agents/generate-edit`,
            headers: {
                'x-api-key': 'invalid-api-key',
                'userId': userData.admin.userId
            },
            body: validEditPayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });

    it('should return 403 when userId is missing', () => {
        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/agents/generate-edit`,
            headers: {
                'x-api-key': userData.admin.apiKey
            },
            body: validEditPayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });

    it('should return 405 for incorrect HTTP method', () => {
        cy.request({
            method: 'PUT',
            url: `${testData.baseUrl}/api/agents/generate-edit`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: validEditPayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(405);
        });
    });

    it('should handle complex edit description', () => {
        const complexEditPayload = {
            description: "Add advanced code analysis capabilities including security vulnerability scanning, performance optimization suggestions, and integration with CI/CD pipelines. Also, enhance the agent with multi-language support for Python, JavaScript, and Java.",
            currentAgent: currentAgentConfig
        };

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/agents/generate-edit`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: complexEditPayload
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('agentDetails');
            
            const agentDetails = response.body.agentDetails;
            expect(agentDetails.stepsBreakdown).to.be.an('array').and.have.length.greaterThan(1);
            expect(agentDetails.description).to.include('security');
            expect(agentDetails.description).to.include('performance');
        });
    });
});
