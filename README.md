# ATD Mobile Signals Work Orders

This repo hosts code for our a mobile first, reactive UI application built for Signal Technicians out in the field working from Android tablets. This project uses a React.js custom client interface and connects with Knack databases via their [REST API](https://www.knack.com/developer-documentation/#using-the-api).

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Deployments

`production` branch is our deployed production code.
It deploys via Netlify to [mobile-signals.austintexas.io](https://mobile-signals.austintexas.io). It consumes data from the production Data Tracker labeled as "Austin Transportation Data Tracker | Production". _We should be very cautious changing any data in the production app environment_.

`master` branch is our staging branch.
It deploys via Netlify to [master--atd-mobile-signals.netlify.com](https://master--atd-mobile-signals.netlify.com). It consumes data from the test instance of Data Trackers labeled as "13 AUG 2019 | TEST - Austin Transportation Data Tracker".

Any feature development should be done in feature branches branched from the `master`/staging branch. They should be tested against our test Knack database. Once merged to staging, we can then create a pull request comparing base:production to compare:master for final review before pushing to production.

### Updating Knack App IDs

Knack App IDs are stored in two places:

1. As environment variables in ./netlify.toml
2. As reference variables in ./src/constants/api.js

If the production or test Knack database changes, you'll need to update the IDs in both places.

## Getting Started

Install dependencies

`npm install`

Run development server

`npm start`

In development, this project uses [Prettier](https://prettier.io/) for code formatting which is set in .prettierrc. Visit link for installation or install the [extension for VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

## Reference Documentation

Initial notes on the project can be found [here](https://gist.github.com/mateoclarke/8a16b1a212d390c00b01b7fdc33c2b94).

Documentation on the current Knack frontend for Markings Work Orders: https://github.com/cityofaustin/data-tracker-guides/blob/master/signs_markings/work_order_management.md#managing-work-orders

Documentation for what Tech and Supers can do to Signals Work Orders depending on the status of the Work Order can be found here: https://docs.google.com/spreadsheets/d/1kyqQnyC3gqMo3X0EeqUumRO0RZx0PRaEDfmeC1WGC5E/edit?usp=sharing

## License

As a work of the City of Austin, this project is in the public domain within the United States.

Additionally, we waive copyright and related rights of the work worldwide through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
