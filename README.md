# Hire an Esquire Challenge

This is my solution to the Hire an Esquire coding challenge.

The stack I have chosen for this challenge, is as follows:

- Frontend
    - [Vue.js](http://vuejs.org) for the frontend
    - [Vue-Router](http://router.vuejs.org/en/index.html) handling the routing
    - [Moment.js](http://momentjs.com/) for handling parsing of dates and times
    - [Popsicle](https://github.com/blakeembrey/popsicle) for promisified HTTP requests
- Backend
    - [Express](http://expressjs.com/) for the backend framework
    - [knex](https://www.npmjs.com/package/knex) for query building
    - [sqlite3](https://www.npmjs.com/package/sqlite3) for the database, though this can be changed easily with knex
    - [bcrypt](https://www.npmjs.com/package/bcrypt) for hashing
    - [cors](https://www.npmjs.com/package/cors) for handling CORS requests
    - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for JWTs

The application uses JWT for authentication, as such the backend is completely stateless. The ideal scenario, is that we separate out the backend to run as a number of AWS'. API gateway collecting requests, Lambda processing them and a RDS bringing up the rear.

The backend is written in ES6, so depending on your version of node, it may not work. The best way to get around this is to use [babel-cli](https://babeljs.io/docs/usage/cli/)

    # Install babel-cli
    npm i --global babel-cli

This gives `babel-node`, so now you can setup and run the backend as follows:

    cd backend/
    npm install
    babel-node server.js
    # The server should now be running on port 3000

You can setup and run the frontend as follows:

    cd frontend/
    npm install
    npm run dev
    # a dev server should now be running on port 8080

I have been running unit tests on the backend, these can be run with:

    npm run unit

On the frontend, I am doing e2e testing, which can be run with:

    npm run e2e

## Notes

I think there is a lot more that can be done with this app!

Here are some things I would like to see implemented:

- [ ] Message and alert system
- [ ] Validation of fields
- [ ] Make the site responsive
- [ ] Options for different currencies
- [ ] Make the app production ready both frontend and backend
- [ ] Error handling on the backend, specifically on failing errors and bad input
- [ ] Set up environment configs for production
- [ ] Accessibility issues

I think the security should be passable, of course provided that the application is served over https. Encrypting all data could be considered.

There is currently no currency, everything is in a mysterious 'dollar'.

Date and time should be acceptable. The date and time is sent from the client, so there shouldn't be any issue with locality. Though if you are viewing from another time zone and want to see times from this time zone, that nay be an issue (but it seems like a bizarre edge case).

The client is treated as the single source of truth. As objects are added, they are added straight to the store on the client. As a result, if changes are made from another browser tab, they will not be propagated. Caching all data client side and using `storage` events would solve this. If a change is made from another client all together (from a phone for instance) then one solution is to poll the server, a more sensible but perhaps over-engineered solution is to use WebSockets that publish any changes from the server.
