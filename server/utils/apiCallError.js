
exports.apiCallError = (errorMessage, statusCode) => {

    res.status(statusCode).json({
        status: "FAILED",
        comment: errorMessage
    });

}