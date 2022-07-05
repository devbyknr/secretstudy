const express = require('express')
const app = express()
const port = 5000 //임의 포트 설정

//몽고DB연결(version 3.0 or later)
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://nuriKim:snflwkfl1!@cluster0.donwl.mongodb.net/?retryWrites=true&w=majority',{
  useNewUrlParser : true, useUnifiedTopology : true
  //, useCreateIndex : true, useFindAndModify : false
  //useCreateIndex, useFindAndModify 옵션 지원안하므로 주석처리

}).then(()=> console.log('MongoDB Connected'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World :) 안녕')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

