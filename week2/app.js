'use strict';
const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const cors = require('cors');
const cats = require('./routes/catRoute');
const users = require('./routes/userRoute');

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use('/cat', cats);
app.use('/user', users);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

