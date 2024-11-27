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

const Fruit = require('./models/fruits')

//app.use has to be before app.get... place is important

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/fruits/new', (req, res) => {
  res.render('fruits/new.ejs')
})

app.post('/fruits', async (req, res) => {
  if (req.body.isReadyToEat === 'on') {
    req.body.isReadyToEat = true
  } else {
    req.body.isReadyToEat = false
  }
  await Fruit.create(req.body)
  res.redirect('/fruits')
})

app.get('/fruits', async (req, res) => {
  const allFruits = await Fruit.find()
  res.render('fruits/index.ejs', { fruits: allFruits })
})

app.get('/fruits/:fruitId', async (req, res) => {
  const fruit = await Fruit.findById(req.params.fruitId)
  res.render('fruits/show.ejs', { fruit })
})

app.delete('/fruits/:fruitId', async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId)
  res.redirect('/fruits')
})

app.get('/fruits/:fruitId/edit', async (req, res) => {
  const fruit = await Fruit.findById(req.params.fruitId)
  res.render('fruits/edit.ejs', { fruit })
})

app.put('/fruits/:fruitId', async (req,res) => {
  if (req.body.isReadyToEat === 'on'){
    req.body.isReadyToEat = true
  } else {
    req.body.isReadyToEat = false
  }
  await Fruit.findByIdAndUpdate(req.params.fruitId,req.body)
  res.redirect(`/fruits/${req.params.fruitId}`)
})

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})
