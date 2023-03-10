const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.ObjectId

// User Schema 
const userSchema = mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        length: {
            max: 10,
            min: 6
        }
    }
})

const User = mongoose.model("users", userSchema)

// Contacts Schema
const contactSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Designation: {
        type: String,
        required: true
    },
    Company: {
        type: String,
        required: true
    },
    Industry: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: false
    },
    Phone_number: {
        type: String,
        required: true,
        unique: false
    },
    Country: {
        type: String,
        required: true,
        // upper_case: true
    },
    user: {
        type: ObjectId,
        ref: "users"
    }
})

const Contact = mongoose.model("entries", contactSchema)

module.exports = { User, Contact }