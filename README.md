# Project Title

`The Cooper Test Challenge`

# Problem Statement

We have a client request to build a fitness tracking application. The idea is that the app will allow users to track their condition using a specific test called The Cooper Test.

The challenge is to build a software solution that will make it possible not to only make the calculation, but to record the data over time. Another requirement is that the app should have functionality that presents historical data of tests if a user has saved any historical data.

# Prerequisites

You must have `Ruby`, `Ruby on Rails`, `Node.js`, `Bundler` and `PostgreSQL` installed in your system to be able to view this app and run all feature, unit and acceptance tests. After forking the repository run `bundle install` so that you download all the gems used in the project.

# Installing

* To fire up the rails API server, first you will have to create and migrate the databases. To do that, you run in your terminal `rails db:create` and `rails db:migrate`. For the server to activate, run `rails server` in your terminal.
* To fire up the react client, run `npm start` in your terminal.

# Running the tests

* The API was unit tested using Rspec. To run the tests in your terminal use `bundle exec rspec`.
* The client was tested using Cypress and Enzyme. To run the acceptance tests of Cypress use `npm run cy:open`. To run the react component Enzyme tests use `npm run test`.

# Built With

* [Ruby version 2.4.1](https://www.ruby-lang.org/en/)
* [Ruby on Rails version 5.2.0](https://rubyonrails.org/)
* [React](https://reactjs.org/)

# Tested With

* [Rspec - Behvavior Driven Development for Ruby](https://rspec.info/)
* [Cypress - a complete end-to-end testing experience](https://www.cypress.io/) 
* [Jest & Enzyme testing frameworks for React](https://www.npmjs.com/package/jest-enzyme)

# Deployment

* The API was deployed using Heroku. The link to access it is [here](https://crafted-cooper-api.herokuapp.com).
* The CLIENT was deployed via Netlify. You can visit it [here](https://1cooper.netlify.com/).

<!-- You can use the following credentials if you want to see the application in full action.
* email: *user@mail.com*
* password: *password*
 -->

# Authors

* **SnailCoder1** - [GitHub](https://github.com/SnailCoder1) - [Portfolio](https://boa.netlify.com/)
* **stefankarlberg** - [GitHub](https://github.com/stefankarlberg) - [Portfolio](https://mystifying-einstein-390384.netlify.com/)
