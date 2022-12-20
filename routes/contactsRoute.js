const express = require("express")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const router = express.Router()
const { Contact } = require("../models/contactSchema")
const body_parser = require("body-parser")
router.use(body_parser.json())
router.post("/import", async (req, res) => {
    try {
        const data = req.body
        data.forEach((item) => {
            item.user = "63a15b279d52ce44a15042d5"
        })
        const contact = await Contact.create(data)
        res.json(contact)
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

router.delete("/delete", async (req, res) => {
    const selectedIDs = req.body
    try {
        if (selectedIDs.length) {
            selectedIDs.forEach(async (item) => {
                const post = await Contact.find({ _id: item })
                if (post.length != 0) {
                    await Contact.deleteOne({ _id: item })
                    res.json({
                        message: "deleted succesfully"
                    })
                } else {
                    res.json({
                        message: "no such id"
                    })
                }
            })
        } else {
            res.json({
                message: "please select ids and delete"
            })
        }
    } catch (error) {
        res.json({
            message: error.message
        })
    }

})

router.get("/", async (req, res) => {
    try {
        const contacts = await Contact.find({
            user: "63a15b279d52ce44a15042d5"
        })
        res.status(200).json({
            status: "Fetched",
            contacts: contacts
        })
    } catch (e) {
        res.status(401).json({
            status: "failed to fetch",
            message: e.message
        })
    }
})

router.post("/search", async (req, res) => {
    try {
        const contacts = await Contact.find({ Email: req.body.Email })
        res.status(200).json({
            status: "Fetched",
            contacts: contacts
        })
    } catch (e) {
        res.status(401).json({
            status: "failed to fetch",
            message: e.message
        })
    }
})

module.exports = router