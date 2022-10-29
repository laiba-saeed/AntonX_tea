const mongoose = require('mongoose');

const memberSchema = mongoose.Schema ({
    fullname: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    DateOfBirth: {
        type: Date,
        required: true
    },
    atnNumber: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Member', memberSchema);