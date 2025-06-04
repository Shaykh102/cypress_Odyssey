const { Conversations } = require('../../support/pages/Conversations');

describe('Get Team Members API Tests', () => {
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

    it('should successfully retrieve team members', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}/api/teams/${testData.teamSlug}/members`,
            headers: {
                'x-api-key': userData.admin.apiKey
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.be.an('array');
            
            // Validate the structure of team members data
            if (response.body.data.length > 0) {
                const firstMember = response.body.data[0];
                expect(firstMember).to.have.property('id');
                expect(firstMember).to.have.property('name');
                expect(firstMember).to.have.property('email');
            }
        });
    });

    it('should return 403 when API key is invalid', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}/api/teams/${testData.teamSlug}/members`,
            headers: {
                'x-api-key': 'invalid-api-key'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });

    it('should return 404 when team slug does not exist', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}/api/teams/non-existent-team/members`,
            headers: {
                'x-api-key': userData.admin.apiKey
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });

    it('should return 403 when API key is missing', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}/api/teams/${testData.teamSlug}/members`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });
});
