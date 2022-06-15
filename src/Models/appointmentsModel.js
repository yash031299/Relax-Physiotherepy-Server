const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    patient_name: {
        type: String,
        required: true,
    },
    mobile:{
        type: String,
        minLength:10,
        maxLength:10,
        required: true
    },
    payment_status:{
        type: Number,
        required: true
    },
    status:{
        type: Number,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    appointment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required:true
    }
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment