const express = require('express');

const app = express();
const cors = require('cors');
var path = require("path");

app.use(cors());
const Signup = require('./routes/Signup');
const Signin = require('./routes/Signin');
const Subscription = require('./routes/Subscription');
const RegisterApplicationDetails = require('./routes/register-application-details');
const RegisterYaml = require('./routes/register-yaml');
const RenderTable = require('./routes/RenderTable');
const GenerateToken = require('./routes/generate-register-token');


// Routes which should handle requests
app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/Signup', Signup);
app.use('/login', Signin);
app.use('/register-yaml', RegisterYaml);
app.use('/get_data',GenerateToken);
app.use('/register-name', RegisterApplicationDetails);
app.use('/subscription', Subscription);
app.use('/render-table', RenderTable);
module.exports = app;

