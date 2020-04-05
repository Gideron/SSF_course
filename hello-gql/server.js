'use strict';

require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema/schema');

const app = express();
const db = require('./db/db');

app.use(
  '/graphql',
  graphqlHTTP( async () => ({
    schema: MyGraphQLSchema,
    graphiql: true,
  })),
);

//app.listen(3000);
db.on('connected', () => {
    app.listen(3000);
});