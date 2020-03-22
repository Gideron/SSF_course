'use strict';
const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const cors = require('cors');
const cats = require('./routes/catRoute');
const users = require('./routes/userRoute');

const passport = require('./utils/pass.js');
const authRoute  = require('./routes/authRoute.js');

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use('/cat', passport.authenticate('jwt', {session: false}), cats);
app.use('/user', passport.authenticate('jwt', {session: false}), users);
app.use('/auth', passport.authenticate('jwt', {session: false}), authRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

