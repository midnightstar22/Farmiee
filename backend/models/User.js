const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phonenumber: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true }, // Fixed typo from 'adress' to 'address'
    location: { type: String, required: true },
    croptype: { type: String, required: true },
    soiltype: { type: String, required: true },
    farmsize: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);
