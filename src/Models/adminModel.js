const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
    mode:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minLength:8
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

//Method for Validating Login Details for Admin
adminSchema.statics.findByCredentials = async (username, password) => {
    const user = await Admin.findOne({ username })

    if (!user) {
        throw new Error('User does not Exist')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Invalid Credentials')
    }
    return user
}

//Method for Generating Authentication Token for Admin
adminSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, "relaxphysiotherepy")
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

//Middlewarefor Hashing Password before saving to Database
adminSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const Admin = mongoose.model("Admin", adminSchema)
module.exports = Admin