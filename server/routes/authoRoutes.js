const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router
    .route('/login')
    .post(authController.getLogin);

router
    .route('/create-student')
    .post(authController.postCreateStudent);

router
    .route('/create-teacher')
    .post(authController.postCreateTeacher);


router
    .route('/create-university')
    .post(authController.postCreateUniversity);

module.exports = router;