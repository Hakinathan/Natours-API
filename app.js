const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

const base = '/api/v1';

// Add a middleware in the middleware stack. Middleware to parse the body of the request.
// 👉🏻 This is the middle between the request and the response
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use(express.static(`${__dirname}/public`));

app.use(`${base}/tours`, tourRouter);
app.use(`${base}/users`, userRouter);

module.exports = app;
