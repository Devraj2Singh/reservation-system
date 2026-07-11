export const notFound = (req, res, next) => {
  const error = new Error(`Route Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Invalid Mongo ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    err.message = "Invalid ID";
  }

  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack:
      process.env.NODE_ENV === "production"
        ? null
        : err.stack,
  });
};