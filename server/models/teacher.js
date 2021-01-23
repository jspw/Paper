const mongoose = require('mongoose');
const validator = require('validator');

const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({

    role: {
        type: String,
        required: true,
        enum: ['student', 'teacher']
    },
    username: {
        type: String,
        require: true,
        unique: true,
        minlength: 3,
    },

    email: {
        type: String,
        unique: true,
        // validate: {
        //     validator: validator.email,
        //     message: 'This is not a valid email',
        // },
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    department: {
        type: String,
        required: true,
    },
    varsity: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    registered_at: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model('Teacher', teacherSchema);