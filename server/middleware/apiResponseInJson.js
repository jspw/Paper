
const apiResponseInJson = (res, statusCode, response) => {
  return res.status(statusCode).json({
    status: "OK",
    result: {
      data: response,
    },
  });
};

module.exports = apiResponseInJson;
