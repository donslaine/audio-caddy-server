const express = require('express')

const Record = require('../models/record')
const { handle404 } = require('../lib/custom_errors')
const { requireToken } = require('../config/auth')

const router = express.Router()

// CREATE
// POST /comments
router.post('/comments', requireToken, (req, res, next) => {
    const recordId = req.body.comment.recordId  

    const comment = req.body.comment
    comment.owner = req.user._id

    Record.findById(recordId)
        .then(handle404)
        .then(record => {
            record.comments.push(comment)

            return record.save()
        })
        .then(record => {
            res.status(201).json({ record: record})
        })
        .catch(next)
})

// DELETE
// DELETE /comments/:commentId
router.delete('/comments/:commentId', requireToken, (req, res, next) => {
    const recordId = req.body.comment.recordId
    Record.findById(recordId)
        .then(handle404)
        .then(record => {
            record.comments.id(req.params.commentId).remove()

            return record.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router