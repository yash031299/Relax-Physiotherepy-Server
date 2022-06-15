const express = require('express')
const router = new express.Router()
const adminAuthenticate = require('../middleware/adminAuthentication')
const userAuthenticate = require('../middleware/authentication')
const AvailableAppointments = require('../Models/availableAppointmentsModel')

//Show Users Appointment to Book
router.get('/user/appointment', userAuthenticate ,async (req, res) => {
    try {
        const appointment = await AvailableAppointments.find({
            date:{$gte: new Date().toDateString()},
            no_of_appointments:{ $gte: 1}
        })
        res.send(appointment)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Show Admin Appointment for Approval
router.get('/admin/appointment', adminAuthenticate ,async (req, res) => {
    try {
        const appointment = await AvailableAppointments.find({
            date:{$gte: new Date().toDateString()}
        })
        res.send(appointment)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Add Appointment
router.post('/admin/appointment/add', adminAuthenticate, async(req, res) => {
    const availableAppointment = new AvailableAppointments(req.body)
    try {
        await availableAppointment.save()
        res.send({message: 'Appointment Added'})
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router