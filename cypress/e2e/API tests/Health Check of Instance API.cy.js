describe('Health Check of Instance API ', () => {
    let testData;
    let users;

    before(() => {
        cy.fixture('testData').then((data) => {
            testData = data;
        });
        cy.fixture('users').then((userData) => {
            users = userData;
        });
    });

    it('Get User Build Status - Success', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}/api/build-status`,
            headers: {
                'x-api-key': users.admin.apiKey,
                'userid': users.admin.userId
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('status');
            expect(response.body).to.have.property('createdAt');
            expect(response.body).to.have.property('workspaceId');
        });
    });

    it('Get User Build Status - Invalid API Key', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}/api/build-status`,
            headers: {
                'x-api-key': 'invalid_key',
                'userid': users.admin.userId
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });

    it('Get User Build Status - Invalid User ID', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}/api/build-status`,
            headers: {
                'x-api-key': users.admin.apiKey,
                'userid': 'invalid_user_id'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
});
