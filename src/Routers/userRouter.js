const express = require('express')
const router = new express.Router()
const User = require("../Models/UserModel")
const authenticate = require('../middleware/authentication')
const jwt = require('jsonwebtoken')

//SignUp Router
router.post('/user/signup', async (req, res) => {
    const user = new User(req.body)
    try{
      await user.save()
      const token = await user.generateAuthToken()
      res.cookie('APP_ID', token)
      res.send({message: 'SignUp Successfully'})
    }catch(e){
      res.status(203).send(e)
    }
})

//Login Router
router.post('/user/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.cookie('APP_ID', token)
    res.send({message: 'Login Successfully'})
  } catch (error) {
    res.status(204).send()
  }
})

//Logout User from current Browser
router.post('/user/logout', authenticate, async (req, res) => {
  try{
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    res.clearCookie("APP_ID")
    await req.user.save()
    res.send({message: 'Logout Successfully'})
  }catch(e){
    res.status(500).send(e)
  }
})

//LogOut User from all Browser
router.post('/user/logoutAll', authenticate, async (req, res) => {
  try {
    req.user.tokens = []
    res.clearCookie("APP_ID")
    await req.user.save()
    res.send({message: "Logged Out Successfully from all devices"})
  } catch (e) {
      res.satus(500).send(e)
  }
})


router.post("/user/token-valiadate", async (req, res) => {
  console.log(req.body)
  try {
    const token = req.body.token;
    const decoded = jwt.verify(token, "relaxphysiotherepy");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    res.send();
  } catch (e) {
    res.clearCookie("APP_ID");
    res.status(401).send();
  }
});
module.exports = router