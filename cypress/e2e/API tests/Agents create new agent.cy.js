const { Conversations } = require('../../support/pages/Conversations');

describe('Create New Agent API Tests', () => {
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

    const validAgentPayload = {
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
        goal: "To test the create agent endpoint",
        description: "This is a test agent created for API testing purposes",
        stepsBreakdown: [
            {
                type: "rag",
                prompt: "Test prompt for RAG step",
                agentname: "RAG Agent",
                content: {
                    query: "test query",
                    response: "test response"
                },
                external: "none"
            },
            {
                type: "compile",
                prompt: "Test prompt for compile step",
                agentname: "Compile Agent",
                content: {
                    query: "test compile query",
                    response: "test compile response"
                },
                external: "none"
            }
        ]
    };

    it('should successfully create a new agent with all required fields', () => {
        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/agents/create`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: validAgentPayload
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('should return 400 when rootAgentName is missing', () => {
        const invalidPayload = { ...validAgentPayload };
        delete invalidPayload.rootAgentName;

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/agents/create`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: invalidPayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('message');
        });
    });

    it('should return 400 when displayprompt is missing', () => {
        const invalidPayload = { ...validAgentPayload };
        delete invalidPayload.displayprompt;

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/agents/create`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: invalidPayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('message');
        });
    });

    it('should return 400 when goal is missing', () => {
        const invalidPayload = { ...validAgentPayload };
        delete invalidPayload.goal;

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/agents/create`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: invalidPayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('message');
        });
    });

    it('should return 400 when description is missing', () => {
        const invalidPayload = { ...validAgentPayload };
        delete invalidPayload.description;

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/agents/create`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: invalidPayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('message');
        });
    });

    it('should return 400 when stepsBreakdown is missing', () => {
        const invalidPayload = { ...validAgentPayload };
        delete invalidPayload.stepsBreakdown;

        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/agents/create`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: invalidPayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('message');
        });
    });

    it('should return 403 when API key is invalid', () => {
        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/agents/create`,
            headers: {
                'x-api-key': 'invalid-api-key',
                'userId': userData.admin.userId
            },
            body: validAgentPayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });

    it('should return 403 when userId is missing', () => {
        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/agents/create`,
            headers: {
                'x-api-key': userData.admin.apiKey
            },
            body: validAgentPayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });

    it('should return 405 for incorrect HTTP method', () => {
        cy.request({
            method: 'PUT',
            url: `${testData.baseUrl}/api/agents/create`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: validAgentPayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(405);
        });
    });
});
