const express = require('express')
const app = express()
const port = 3300
//연결 안되고 나네... 뭐지 ....
//몽고 디비랑 몽구스는 무엇이지??
//mongoose를 설치해야 됨
//mongodb+srv://wooguk:<password>@cluster0.2atho59.mongodb.net/?retryWrites=true&w=majority
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://wooguk:jjangws7@cluster0.2atho59.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected..'))
.catch(err => console.log(err));



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})