const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const universitySchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },

    shortform: {
        type: String,
    },

    emails: [
        {
            email: {
                type: String,
                unique: true,
                lowercase: true,
                unique: true
            },
        }
    ],
    departments: [
        {
            name: {
                type: String,
                unique:false
            },
            shortform: {
                type: String,
                unique:false
            }
        }
    ],

});


module.exports = mongoose.model('University', universitySchema);