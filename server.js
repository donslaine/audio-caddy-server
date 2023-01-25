const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

const db = require('./config/db')

const userRoutes = require('./routes/user_routes')
const recordRoutes = require('./routes/record_routes')

const PORT = 8000

mongoose.set('strictQuery', true)

mongoose.connect(db,  {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

app.use(cors({ origin: 'http://127.0.0.1:5500' }))

app.use(express.json())

app.use(userRoutes)
app.use(recordRoutes)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

module.exports = app