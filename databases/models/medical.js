const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({

    user: {
        type: String,
        ref: 'User'
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    insertDate: {
        type: Date,
        default: Date.now
    },
    lastModified: {
        type: Date,
        default: Date.now
    },
    medicine: [],
    surgery: [],
    allergies: [],
    medicalHistory: []
})