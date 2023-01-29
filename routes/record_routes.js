const express = require('express')
const { handle404 } = require('../lib/custom_errors')
const { requireToken } = require('../config/auth')

const Record = require('../models/record')

const router = express.Router()

// INDEX
// GET /records
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
        // .then(populate())
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
            return record.updateOne(req.body.record)
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
            return record.deleteOne()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router