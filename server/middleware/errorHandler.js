exports.serverError = (res) => {
  //   function serverError() {
  return res.status(400).json({
    status: "FAILED",
    result: "Something went wrong in server.",
  });
  //   };
};

exports.unauthorizedEmail = (res) => {
  return res.status(402).json({
    status: "FAILED",
    result: "Unauthorized access",
  });
};

exports.unauthorizedAccess = (res) => {
  return res.status(402).json({
    status: "FAILED",
    result: "Unauthorized email address",
  });
};

exports.validationError = (res, statusCode, errorMessage) => {
  return res.status(statusCode).json({
    status: "FAILED",
    result: errorMessage,
  });
};
