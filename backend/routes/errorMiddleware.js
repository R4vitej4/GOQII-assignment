
// errorMiddleware.js
function errorMiddleware(err, req, res, next) {
    res.status(500).json({
      success: false,
      message : "Internal Server Error"
    });
  }
  
  module.exports = errorMiddleware;
  