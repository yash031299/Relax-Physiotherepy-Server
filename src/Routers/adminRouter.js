const express = require("express");
const router = new express.Router();
const Admin = require("../Models/adminModel");
const authenticate = require("../middleware/adminAuthentication");
const jwt = require('jsonwebtoken')
//Admin Login Router
router.post("/admin/login", async (req, res) => {
  try {
    const admin = await Admin.findByCredentials(
      req.body.username,
      req.body.password
    );
    const token = await admin.generateAuthToken();
    res.cookie("ADMIN_APP_ID", token);
    res.send({ message: "Login Successfully" });
  } catch (error) {
    res.status(204).send();
  }
});

//Testing
router.post("/admin/signup", async (req, res) => {
  const admin = new Admin(req.body);
  try {
    admin.mode = "Doctor";
    await admin.save();
    const token = await admin.generateAuthToken();
    res.cookie("ADMIN_APP_ID", token);
    res.send(admin);
  } catch (error) {
    res.status(203).send(error);
  }
});

//Admin logout Roueter
router.post("/admin/logout", authenticate, async (req, res) => {
  try {
    req.admin.tokens = req.admin.tokens.filter((token) => {
      return token.token !== req.token;
    });
    res.clearCookie("ADMIN_APP_ID");
    await req.admin.save();
    res.send({ message: "Logout Successfully" });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/admin/token-valiadate", async (req, res) => {
  try {
    const token = req.body.token;
    const decoded = jwt.verify(token, "relaxphysiotherepy");
    const admin = await Admin.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!admin) {
      throw new Error();
    }
    res.send();
  } catch (e) {
    res.clearCookie("ADMIN_APP_ID");
    res.status(401).send();
  }
});

module.exports = router;
