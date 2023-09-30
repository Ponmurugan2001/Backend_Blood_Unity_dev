const mongoose = require('mongoose');

const Successfullschema = new mongoose.Schema({
    appointments: {
        type: Object,
        required: true
    }
}, { timestamps: true });

// Define the SuccessDonation model
const SuccessDonation = mongoose.model('SuccessDonation', Successfullschema);

module.exports = SuccessDonation;