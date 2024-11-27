require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const app = express()

const PORT = 3000

//Home route
app.get('/', (req, res) => {
  res.render('index.ejs')
})

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})



//app.use has to be before app.get... place is important

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

const fruitCtrl = require('./controllers/fruits')

app.use('/',fruitCtrl)

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})
