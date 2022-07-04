const express = require('express')
const app = express()
const port = 3300
//연결 안되고 나네... 뭐지 ....
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://wooGuk:user01@boilerplate.fwjahgt.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false
}).then(() => console.log('MongoDB Connected..'))
.catch(err => console.log(err));



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})