const { HttpCode } = require('./constants');

const wrap = fn => async (req, res, next) => {
  try {
    const result = await fn(req, res, next);
    return result, next();
  } catch (err) {
    if (err.name === 'ValidationError') {
      err = {
        status: HttpCode.BAD_REQUEST,
        message: err.message.replace(/"/g, "'"),
      };
    }
    next(err);
  }
};

module.exports = wrap;
