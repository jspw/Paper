const express = require('express');
const studentController = require('../controllers/student');
const authenticateJWT = require('../middleware/authenticateJWS')

const router = express.Router();

router
    .route('/user/:id')
    .get(authenticateJWT, studentController.getStudent);

    router
    .route("/user/edit/:id")
    .get(authenticateJWT, studentController.getEditStudent)
    .post(authenticateJWT, studentController.postEditStudent);

module.exports = router;