const express = require('express');
const studentController = require('../controllers/student');
const authenticateJWT = require('../middleware/authenticateJWS')

const router = express.Router();

router
    .route('/:id')
    .get(authenticateJWT, studentController.getStudent);

module.exports = router;