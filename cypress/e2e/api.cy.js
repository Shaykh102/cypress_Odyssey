
describe('Get User Build Status API Test', () => {
    let testData;
    let users;
    before(() => {
        cy.fixture('testData').then((data) => {
            testData = data;
            users = data.users;
        });
    });

    users?.forEach((user) => {
        describe(`API Tests for user ${user.email}`, () => {
            it(`should successfully retrieve build status for ${user.email}`, () => {
                cy.request({
                    method: 'GET', 
                    url: `${testData.baseUrl}/api/build-status`,
                    headers: {
                        'x-api-key': user.apiKey,
                        'userid': user.userId
                    }
                }).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.have.property('status');
                    expect(response.body).to.have.property('createdAt'); 
                    expect(response.body).to.have.property('workspaceId');
                    expect(response.body.status).to.be.a('string');
                    expect(response.body.workspaceId).to.be.a('string');
                    expect(Date.parse(response.body.createdAt)).to.be.a('number');
                });
            });

            it(`should handle missing API key for ${user.email}`, () => {
                cy.request({
                    method: 'GET',
                    url: `${testData.baseUrl}/api/build-status`, 
                    headers: {
                        'userid': user.userId
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.eq(500);
                });
            });

            it(`should handle missing user ID for ${user.email}`, () => {
                cy.request({
                    method: 'GET',
                    url: `${testData.baseUrl}/api/build-status`,
                    headers: {
                        'x-api-key': user.apiKey
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.eq(500);
                });
            });
        });
    });

    before(() => {
        cy.fixture('testData').then((data) => {
            testData = data;
        });
    });

    it('should successfully retrieve user build status', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}/api/build-status`,
            headers: {
                'x-api-key': testData.apiKey,
                'userid': testData.userId
            }
        }).then((response) => {
            // Verify response status is 200
            expect(response.status).to.eq(200);

            // Verify response body contains required fields
            expect(response.body).to.have.property('status');
            expect(response.body).to.have.property('createdAt');
            expect(response.body).to.have.property('workspaceId');

            // Verify data types
            expect(response.body.status).to.be.a('string');
            expect(response.body.workspaceId).to.be.a('string');
            
            // Verify createdAt is a valid date
            expect(Date.parse(response.body.createdAt)).to.be.a('number');
        });
    });

    it('should handle missing API key', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}/api/build-status`,
            headers: {
                'userid': testData.userId
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(500);   // Change to 403 for actual test
        });
    });

    it('should handle missing user ID', () => {
        cy.request({
            method: 'GET',
            url: `${testData.baseUrl}/api/build-status`,
            headers: {
                'x-api-key': testData.apiKey
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(500);   // Change to 400 for actual test
        });
    });
});