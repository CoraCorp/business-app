const express = require('express');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const router = require('./router');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://coracorp.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://localhost:80',
  issuer: 'https://coracorp.auth0.com/',
  algorithms: ['RS256']
});

app.use(jwtCheck);

app.use('/api', router);

module.exports = app;
