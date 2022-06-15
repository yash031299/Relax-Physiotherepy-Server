const express = require('express')
const mongoose = require('mongoose')
const router = new express.Router()
const userAuthenticate = require('../middleware/authentication')
const adminAuthenticate = require('../middleware/adminAuthentication')
const Appointment = require('../Models/appointmentsModel')
const AvailableAppointments = require('../Models/availableAppointmentsModel')

//Router to Book Appointment by user
router.post('/user/appointment/book', userAuthenticate, async (req, res) => {
    const appointment = new Appointment(req.body)
    try {
        appointment.owner = req.user._id
        //Integrate Payment Gateway Code here
        
        // if(paymentStatus != "SuccessFul"){
        //     throw new Error("Payment Failed. Refund Will be Initiated")
        // }
        appointment.payment_status = 1
        appointment.appointment = mongoose.Types.ObjectId(req.body.appointment)
        appointment.status = 1
        await appointment.save()
        const availableAppointment = await AvailableAppointments.findById(req.body.appointment);
        availableAppointment.no_of_appointments = availableAppointment.no_of_appointments - 1
        await availableAppointment.save()
        res.send(appointment._id)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Router to Show Appointment by user
router.get('/user/appointment/show', userAuthenticate, async (req, res) => {
    try {
        const appointment = await Appointment.find({
            owner: req.user.id,
            status: 1
        })
        res.send(appointment)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/admin/appointment/show', adminAuthenticate ,async (req, res) => {
    try {
        const appointment = await Appointment.find({
            status:1
        })
        res.send(appointment)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/user/appointment/cancel', userAuthenticate, async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.body.id)
        appointment.status = 2
        await appointment.save()
        const availableAppointment = await AvailableAppointments.findById(appointment.appointment)
        availableAppointment.no_of_appointments = availableAppointment.no_of_appointments + 1
        await availableAppointment.save()
        res.send({message: 'Appointment Cancelled'})
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/admin/appointment/cancel', adminAuthenticate, async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.body.id)
        appointment.status = 2
        await appointment.save()
        const availableAppointment = await AvailableAppointments.findById(appointment.appointment)
        availableAppointment.no_of_appointments = availableAppointment.no_of_appointments + 1
        await availableAppointment.save()
        res.send({message: 'Appointment Cancelled'})
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router