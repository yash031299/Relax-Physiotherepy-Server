const express = require('express')
const router = new express.Router()
const Enquiry = require('../Models/enquiryModel')
const adminAuthenticate = require('../middleware/adminAuthentication')

router.post('/enquiry', async (req, res) => {
    const enquiry = new Enquiry(req.body)
    try{
      enquiry.status = false
      await enquiry.save()
      res.send({message: 'Request Received. You will get the response soon.'})
    }catch(e){
      res.status(203).send(e)
    }
})

//Get Enquiry List
router.get('/admin/enquiry', adminAuthenticate, async (req, res) => {
  try {
      const enquiry = await Enquiry.find({})
      res.send(enquiry)
  } catch (e) {
      res.status(500).send(e)
  }
})

router.delete('/admin/enquiry/delete', adminAuthenticate, async (req, res) => {
  try {
      const enquiry = await Enquiry.findByIdAndDelete(req.body.id)
      res.send({message: "Request Completed"})
  } catch (e) {
      res.status(500).send(e)
  }
})

module.exports = router