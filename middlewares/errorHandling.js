class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const notFound = (req, res, next) => {
  next(new AppError(`This route does't exist in this server😕`, 404));
};

const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500);
  res.json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

module.exports = { errorHandler, notFound, AppError };
