const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const studentSchema = new Schema({

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
        required: [true, 'Please enter a password']
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
    registrationNo: {
        type: Number,
        required: true,
    },
    session: {
        type: String,
        required: true,
    },
    registered_at: {
        type: Date,
        default: Date.now,
    },

});


module.exports = mongoose.model('Student', studentSchema);