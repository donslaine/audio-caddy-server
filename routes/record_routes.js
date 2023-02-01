const express = require('express')
const { handle404 } = require('../lib/custom_errors')
const { requireToken } = require('../config/auth')

const Record = require('../models/record')

const router = express.Router()

// INDEX
// GET /records
// filtered by user so only the logged in user's collection is shown
router.get('/records', requireToken, (req, res, next) => {
    const user = req.user._id
    Record.find({ "owner": user })
        .then(records => {
            return records.map(record => record)
        })
        .then(records => {
            res.status(200).json({ records: records })
        })
        .catch(next)
})

// SHOW
// GET /records/:id
router.get('/records/:id', requireToken, (req, res, next) => {
    Record.findById(req.params.id)
        .then(handle404)
        .then(record => {
            res.status(200).json({ record: record })
        })
        .catch(next)
})

// CREATE
// POST /record
router.post('/records', requireToken, (req, res, next) => {
    const record = req.body.record
    record.owner = req.user._id
    Record.create(req.body.record)
        .then(record => {
            res.status(201).json({ record: record })
        })
        .catch(next)
}) 

// UPDATE
// PATCH /records/:id
router.patch('/records/:id', requireToken, (req, res, next) => {
    Record.findById(req.params.id)
        .then(handle404)
        .then(record => {
            // only the user who created the record can edit it
            if(record.owner.equals(req.user._id)) {
                return record.updateOne(req.body.record)
            } else {
                res.sendStatus(401)
            } 
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE
// DELETE /records/:id
router.delete('/records/:id', requireToken, (req, res, next) => {
    Record.findById(req.params.id)
        .then(handle404)
        .then(record => {
            // only the user who created the record can delete it
            if (record.owner.equals(req.user._id)) {
                return record.deleteOne()
            } else {
                res.sendStatus(401)
            }
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router