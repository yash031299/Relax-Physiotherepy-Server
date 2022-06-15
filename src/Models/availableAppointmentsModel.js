const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

//Available Appointments Database Schema
const avilableAppointmentsSchema = new mongoose.Schema({
    place:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    no_of_appointments:{
        type: Number,
        required: true
    },
    open:{
        type: Boolean,
        required: true
    }
})


const AvailableAppointments = mongoose.model('AvailableAppointments', avilableAppointmentsSchema)
module.exports = AvailableAppointments