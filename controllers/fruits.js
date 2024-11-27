const Fruit = require('../models/fruits')

const router = require('express').Router()

router.get('/fruits', async (req, res) => {
  const fruits = await Fruit.find()
  res.render('fruits/index.ejs', { fruits })
})

router.get('/fruits/new', (req, res) => {
  res.render('fruits/new.ejs')
})

router.post('/fruits', async (req, res) => {
  if (req.body.isReadyToEat === 'on') {
    req.body.isReadyToEat = true
  } else {
    req.body.isReadyToEat = false
  }
  await Fruit.create(req.body)
  res.redirect('/fruits')
})



router.get('/fruits/:fruitId', async (req, res) => {
  const fruit = await Fruit.findById(req.params.fruitId)
  res.render('fruits/show.ejs', { fruit })
})

router.delete('/fruits/:fruitId', async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId)
  res.redirect('/fruits')
})

router.get('/fruits/:fruitId/edit', async (req, res) => {
  const fruit = await Fruit.findById(req.params.fruitId)
  res.render('fruits/edit.ejs', { fruit })
})

router.put('/fruits/:fruitId', async (req,res) => {
  if (req.body.isReadyToEat === 'on'){
    req.body.isReadyToEat = true
  } else {
    req.body.isReadyToEat = false
  }
  await Fruit.findByIdAndUpdate(req.params.fruitId,req.body)
  res.redirect(`/fruits/${req.params.fruitId}`)
})

module.exports = router