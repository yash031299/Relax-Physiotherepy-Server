const mongoose = require('mongoose')

//Enquiry Database Schema
const enquirySchema = new mongoose.Schema({
    name:{
        type: 'string',
        required: true,
        trim: true

    },
    message: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 10
    },
    mobile: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
        trim: true
    },
    status:{
        type: Boolean,
        required: true
    }
})


const Enquiry = mongoose.model('Enquiry', enquirySchema)
module.exports = Enquiry