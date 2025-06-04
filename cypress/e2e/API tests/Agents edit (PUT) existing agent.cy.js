const { Conversations } = require('../../support/pages/Conversations');

describe('Edit Existing Agent API Tests', () => {
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

    const validUpdatePayload = {
        agentId: "test-agent-id",
        rootAgentName: "Updated Test Agent",
        displayprompt: "Hello, I am an updated test agent. Parameters: {param1}, {param2}",
        inputparameters: {
            param1: {
                type: "string",
                description: "Updated first parameter"
            },
            param2: {
                type: "string",
                description: "Updated second parameter"
            }
        },
        goal: "To test the update agent endpoint",
        description: "This is an updated test agent for API testing purposes",
        stepsBreakdown: [
            {
                type: "rag",
                prompt: "Updated test prompt for RAG step",
                agentname: "Updated RAG Agent",
                content: {
                    query: "updated test query",
                    response: "updated test response"
                },
                external: "none"
            },
            {
                type: "compile",
                prompt: "Updated test prompt for compile step",
                agentname: "Updated Compile Agent",
                content: {
                    query: "updated test compile query",
                    response: "updated test compile response"
                },
                external: "none"
            }
        ]
    };

    it('should successfully update an existing agent with all required fields', () => {
        cy.request({
            method: 'PUT',
            url: `${testData.baseUrl}/api/agents/edit`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: validUpdatePayload
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message');
        });
    });

    it('should return 400 when agentId is missing', () => {
        const invalidPayload = { ...validUpdatePayload };
        delete invalidPayload.agentId;

        cy.request({
            method: 'PUT',
            url: `${testData.baseUrl}/api/agents/edit`,
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

    it('should return 400 when rootAgentName is missing', () => {
        const invalidPayload = { ...validUpdatePayload };
        delete invalidPayload.rootAgentName;

        cy.request({
            method: 'PUT',
            url: `${testData.baseUrl}/api/agents/edit`,
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

    it('should return 400 when displayprompt is missing', () => {
        const invalidPayload = { ...validUpdatePayload };
        delete invalidPayload.displayprompt;

        cy.request({
            method: 'PUT',
            url: `${testData.baseUrl}/api/agents/edit`,
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

    it('should return 400 when goal is missing', () => {
        const invalidPayload = { ...validUpdatePayload };
        delete invalidPayload.goal;

        cy.request({
            method: 'PUT',
            url: `${testData.baseUrl}/api/agents/edit`,
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

    it('should return 400 when description is missing', () => {
        const invalidPayload = { ...validUpdatePayload };
        delete invalidPayload.description;

        cy.request({
            method: 'PUT',
            url: `${testData.baseUrl}/api/agents/edit`,
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

    it('should return 400 when stepsBreakdown is missing', () => {
        const invalidPayload = { ...validUpdatePayload };
        delete invalidPayload.stepsBreakdown;

        cy.request({
            method: 'PUT',
            url: `${testData.baseUrl}/api/agents/edit`,
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

    it('should return 404 when agent does not exist', () => {
        const nonExistentPayload = { ...validUpdatePayload };
        nonExistentPayload.agentId = 'non-existent-agent-id';

        cy.request({
            method: 'PUT',
            url: `${testData.baseUrl}/api/agents/edit`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: nonExistentPayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });

    it('should return 403 when API key is invalid', () => {
        cy.request({
            method: 'PUT',
            url: `${testData.baseUrl}/api/agents/edit`,
            headers: {
                'x-api-key': 'invalid-api-key',
                'userId': userData.admin.userId
            },
            body: validUpdatePayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });

    it('should return 403 when userId is missing', () => {
        cy.request({
            method: 'PUT',
            url: `${testData.baseUrl}/api/agents/edit`,
            headers: {
                'x-api-key': userData.admin.apiKey
            },
            body: validUpdatePayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });

    it('should return 405 for incorrect HTTP method', () => {
        cy.request({
            method: 'POST',
            url: `${testData.baseUrl}/api/agents/edit`,
            headers: {
                'x-api-key': userData.admin.apiKey,
                'userId': userData.admin.userId
            },
            body: validUpdatePayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(405);
        });
    });
});
