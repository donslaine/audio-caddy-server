// requireToken is removed for testing, don't forget to add it in later

const express = require('express')
const { handle404 } = require('../lib/custom_errors')
const { requireToken } = require('../config/auth')

const Record = require('../models/record')

const router = express.Router()

// INDEX
// GET /characters
router.get('/records', (req, res, next) => {
    Record.find()
        .then(records => {
            return records.map(record => record)
        })
        .then(records => {
            res.status(200).json({ records: records })
        })
        .catch(next)
})

// SHOW
// GET /characters/:id
router.get('/records/:id', (req, res, next) => {
    Record.findById(req.params.id)
        .then(handle404)
        .then(record => {
            res.status(200).json({
                record: record
            })
        })
        .catch(next)
})

// create paths
// POST /record
router.post('/records', (req, res, next) => {
    // record.owner = req.user._id
    Record.create(req.body.record)
        .then(record => {
            res.status(201).json({ record: record })
        })
        .catch(next)
})

// UPDATE
// PATCH /records/:id
router.patch('/records/:id', (req, res, next) => {
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
router.delete('/records/:id', (req, res, next) => {
    Record.findById(req.params.id)
        .then(handle404)
        .then(record => {
            return record.deleteOne()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router