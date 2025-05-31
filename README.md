# Odyssey Application Autotests

This repository contains automated tests for the Odyssey web application. The tests are written using Cypress, a modern end-to-end testing framework for web applications.

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up test configuration:
   - Copy `cypress/fixtures/testData.json` to `cypress/fixtures/testData.json`
   - Update `testData.json` with your credentials
   ```bash
   cp cypress/fixtures/testData.template.json cypress/fixtures/testData.json
   ```
   Note: `testData.json` is ignored by git to protect sensitive data

## Test Suite Description

The autotests cover the following key areas of the Odyssey application:

- Authentication
  - User login/logout

- Conversation Management
  - Conversation creation/deletion
  - Chat messages sending
  - Agents creation

  -API
   - Healthcheck of created instances

## Technical Stack

- Testing Framework: Cypress 12.0+
- Programming Language: JavaScript
- Additional Tools:
  - Cypress Dashboard for test reporting
  - GitHub Actions for CI/CD integration
  - Allure reports for test visualization

## Important 

- You should create an account on https://app.odysseyai.ai/
- Create your own `users.json` file with your credentials (never commit this file)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
