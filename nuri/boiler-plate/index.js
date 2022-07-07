const express = require('express')
const app = express()
const port = 5000 //임의 포트 설정

const {User} = require("./models/User");
const bodyParser = require('body-parser');

//application/x-www-form-urlencoded
//이렇게된 데이터를 분석해서 가져올 수 있게 해주는 것
app.use(bodyParser.urlencoded({extended : true}));

//applicationjson
//json타입을 분석해서 가져오는 역할
app.use(bodyParser.json());

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

//회원가입을 위한 route 생성 (endpoint는 register)
app.post('/register', (req, res) => {
  //회원가입에 필요한 정보를 client에서 가져오면
  //그것들을 DB에 넣어준다.
    const user = new User(req.body)
    //req.body에 client에서 보내는 정보를 담음

    user.save((err, doc) => {//정보를 user 모델에 저장
      if(err) return res.json({
        success : false, err //suceess false, 에러메세지 json타입으로 리턴
      })
      return res.status(200).json({
        success : true,
        message : "회원가입 완료"
      });
    })
    
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
