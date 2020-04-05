'use strict';

require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema/schema');
const db = require('./db/db');
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const passport = require('./utils/pass');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// dummy function to set user (irl: e.g. passport-local)
/*const auth = (req, res, next) => {
    req.user = true;
    next();
};*/

const checkAuth = (req, res) => {
    passport.authenticate('jwt', {session: false}, (err, user) => {
        if (err || !user) {
            throw new Error ('Failed to authenticate');
        }
    })(req, res);
};
  
//app.use(auth);
app.use('/auth', authRoute);

app.use(
    '/graphql', (req, res) => {
        graphqlHTTP({
            schema: MyGraphQLSchema,
            graphiql: true,
            context: {req, res, checkAuth},
        })(req, res);
    }
);

//app.listen(3000);
db.on('connected', () => {
    app.listen(3000);
});