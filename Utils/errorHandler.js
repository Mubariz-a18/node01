module.exports = (err, req, res, next) => {
    console.error(err);
  
    // Default error status and message
    let statusCode = 500;
    let message = 'Internal Server Error';
  
    // Check for specific error types and set appropriate status and message
    if (err.name === 'ValidationError') {
      statusCode = 400;
      message = err.message;
    } else if (err.name === 'CastError') {
      statusCode = 400;
      message = 'Invalid ID format';
    }
    // Add more error checks and responses as needed
  
    res.status(statusCode).json({ error: message });
  };
  