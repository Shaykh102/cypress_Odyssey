// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

/*    - name: Create test configurations
   run: |
     echo '{
       "baseUrl": "https://app.odysseyai.ai",
       "environment": "${{ secrets.CYPRESS_ENVIRONMENT }}"
     }' > cypress/fixtures/testData.json
     
     echo '{
       "admin": {
         "email": "${{ secrets.CYPRESS_ADMIN_EMAIL }}",
         "password": "${{ secrets.CYPRESS_ADMIN_PASSWORD }}",
         "userId": "${{ secrets.CYPRESS_ADMIN_USER_ID }}",
         "apiKey": "${{ secrets.CYPRESS_ADMIN_API_KEY }}"
       },
       "regular": {
         "email": "${{ secrets.CYPRESS_REGULAR_EMAIL }}",
         "password": "${{ secrets.CYPRESS_REGULAR_PASSWORD }}",
         "userId": "${{ secrets.CYPRESS_REGULAR_USER_ID }}",
         "apiKey": "${{ secrets.CYPRESS_REGULAR_API_KEY }}"
       },
       "readonly": {
         "email": "${{ secrets.CYPRESS_READONLY_EMAIL }}",
         "password": "${{ secrets.CYPRESS_READONLY_PASSWORD }}",
         "userId": "${{ secrets.CYPRESS_READONLY_USER_ID }}",
         "apiKey": "${{ secrets.CYPRESS_READONLY_API_KEY }}"
       }
     }' > cypress/fixtures/users.json */