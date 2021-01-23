const express = require('express');
const universityController = require('../controllers/university');

const router = express.Router();

router
    .route('/all')
    .get(universityController.getUniversities);

module.exports = router;