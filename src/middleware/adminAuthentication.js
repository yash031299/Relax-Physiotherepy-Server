const jwt = require('jsonwebtoken')
const Admin = require('../Models/adminModel')


const adminAuthentication = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, "relaxphysiotherepy")
        const admin = await Admin.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!admin) {
            throw new Error()
        }
        req.token = token
        req.admin = admin
        next()
    } catch (e) {
        res.status(401).send({ message: 'Please Authenticate' })
    }
}

module.exports = adminAuthentication