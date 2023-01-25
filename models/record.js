const mongoose = require('mongoose')
const commentSchema = require('./comment')

const Schema = mongoose.Schema

const recordSchema = new Schema(
    {
        artist: {
            type: String,
            required: true
        },
        album: {
            type: String,
            required: true
        },
        genre: [{
            type: String,
            required: true
        }],
        condition: {
            type: String,
            required: true
        },
        printYear: {
            type: Number,
            required: false,
        },
        comments: [commentSchema],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

const Record = mongoose.model('Record', recordSchema)

module.exports = Record