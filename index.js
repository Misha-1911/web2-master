const express = require('express');
const bodyParser = require('body-parser');
const setup = require('./DB/mongoose');
require('dotenv').config();
const addUserRouter = require('./api/user/addUser');
const getUserRouter = require('./api/user/getUser');
const addLinkRouter = require('./api/links/addLink');
const getLinkRouter = require('./api/links/getLink');
const getShortLinkRouter = require('./api/links/getShortLink');

const app = express();

app.use(bodyParser.json());
app.use(addUserRouter);
app.use(getUserRouter);
app.use(addLinkRouter);
app.use(getLinkRouter);
app.use(getShortLinkRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server started ${process.env.PORT}`);
});

setup();