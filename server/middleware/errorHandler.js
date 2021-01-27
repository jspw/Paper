exports.serverError = (res) => {
  //   function serverError() {
  return res.status(500).json({
    status: "FAILED",
    result: "Something went wrong in server.",
  });
  //   };
};

exports.unauthorizedAccess = (res) => {
  return res.status(401).json({
    status: "FAILED",
    result: "Unauthorized access",
  });
};

exports.unauthorizedEmail = (res) => {
  return res.status(401).json({
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
