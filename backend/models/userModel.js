const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,   
        required: true
    },
}, {timestamps: true});

const UserCollection = mongoose.model("UserCollection", userSchema);

module.exports = UserCollection; 