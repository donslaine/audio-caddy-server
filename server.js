const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

const db = require('./config/db')

const userRoutes = require('./routes/user_routes')
const recordRoutes = require('./routes/record_routes')
const commentRoutes = require('./routes/comment_routes')

const PORT = process.env.PORT || 8000

mongoose.set('strictQuery', true)

mongoose.connect(db,  {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://127.0.0.1:5500' }))

app.use(express.json())

app.use(userRoutes)
app.use(recordRoutes)
app.use(commentRoutes)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

module.exports = app