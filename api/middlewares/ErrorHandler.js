export const ErrorHandler = (err, req, res, next) => {
  console.log("Middleware Error Handling");
  const errStatus = err.status || 500;
  const errMsg = err.message || 'Something went wrong';
  const responseBody = err.responseBody || {};

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    responseBody: responseBody
    //stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
}
