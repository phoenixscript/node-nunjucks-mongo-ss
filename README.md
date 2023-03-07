# Node.js app with Nunjucks Template and MongoDB
#### (Server side validation)

This is a simple Node.js application that uses the Nunjucks template engine to render HTML views. The app is set up with an Express server and responds to GET requests on the root route (/) by rendering an index.html template and passing form data which persisted in a Mongo database. The template uses server side validation to validate the form entries using express validator and displays the error messages to the user.

> Note: The application uses a thrird party api (getCountries)[https://restcountries.com/v3.1/region/europe] to load the countries dropdown in the form, sometimes could take a long time to load based on the performance of the API.
## Prerequisites

* Node.js (v10 or higher)
* npm (v6 or higher)

## Dependencies
The app uses the following dependencies:
Express - A minimal and flexible Node.js web application framework.
Express-validator - A class validation framework
Bootstrap - A CSS framework
Nunjucks - A powerful template engine for JavaScript.
Mocha - A feature-rich JavaScript test framework.
Chai - A BDD/TDD assertion library for Node.js and the browser.
Supertest - A library for testing Node.js HTTP servers using a fluent API.
Axios - A promise-based HTTP client for Node.js and the browser.

## Installation

Clone this repository to your local machine or download and extract the ZIP file.
```bash
git clone https://github.com/phoenixscript/node-nunjucks-mongo-ss.git
```

Navigate into the project directory.
```bash
cd node-nunjucks-mongo-ss
```
Install the necessary dependencies.

```bash
npm install
```
Start the app
```bash
node src/app.js
```
Open your web browser and navigate to http://localhost:3001 to see the app in action.

## Testing

The app can be tested using Supertest, Mocha, and Chai. To run the tests, navigate into the test directory and run the following command:

```bash
npm run tests
```

> Note: As some of the test depends on  3rd party getCountries API if the API fails would fail some of the POST / test. There is a timeout set for test of 20000ms set for waiting for theh API to resolve in case of delays.
## License
This project is licensed under the MIT License. Feel free to use and modify this code for your own purpose.