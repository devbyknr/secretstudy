//xpBWZNIcIU6tT1de mongodb

const express = require('express')
const app = express()
const port = 7040

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://hcpark:xpBWZNIcIU6tT1de@boilerplate.bvlwj.mongodb.net/?retryWrites=true&w=majority').then(()=>console.log('MongoDB connected...')).catch(err => console.log(err))





app.get('/', (req, res) => {
  res.send('Hello World! 아ㄴ녕ㅏ세')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//git remote add origin https://github.com/devbyknr/secretstudy.git
//git branch -M main
//git push -u origin main