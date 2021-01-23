const express = require('express');
const teacherController = require('../controllers/teacher');
const authenticateJWT = require('../middleware/authenticateJWS')

const router = express.Router();

router
    .route('/:id')
    .get(authenticateJWT, teacherController.getTeacher);

module.exports = router;