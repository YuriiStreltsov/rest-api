const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { HttpCode } = require('./helper/constants');

const contactsRouter = require('./routes/contacts');
const usersRouter = require('./routes/users');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const status = err.status || HttpCode.SERVER_ERROR;
  res.status(status).json({
    status: status === HttpCode.SERVER_ERROR ? 'fail' : 'error',
    code: status,
    message: err.message,
  });
});

module.exports = app;
