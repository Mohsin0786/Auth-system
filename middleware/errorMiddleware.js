exports.notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.statusCode = 404
    next(error);
  };
  
  exports.errorHandler = (err, req, res, next) => {
    console.error(err); // Log the error in the console for debugging
    const statusCode = err.statusCode || 500; // Use the error's status code or default to 500
    res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};