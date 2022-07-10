const express = require('express')
const app = express()
const port = 5000 //임의 포트 설정

const config = require('./config/key');
const {auth} = require("./middleware/auth")
const {User} = require("./models/User");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//application/x-www-form-urlencoded
//이렇게된 데이터를 분석해서 가져올 수 있게 해주는 것
app.use(bodyParser.urlencoded({extended : true}));

//applicationjson
//json타입을 분석해서 가져오는 역할
app.use(bodyParser.json());

//몽고DB연결(version 3.0 or later)
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
  useNewUrlParser : true, useUnifiedTopology : true
  //, useCreateIndex : true, useFindAndModify : false
  //useCreateIndex, useFindAndModify 옵션 지원안하므로 주석처리

}).then(()=> console.log('MongoDB Connected'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World :) 안녕')
})

//회원가입을 위한 route 생성 (endpoint는 register)
app.post('api/users/register', (req, res) => {
  //회원가입에 필요한 정보를 client에서 가져오면
  //그것들을 DB에 넣어준다.
    const user = new User(req.body)
    //req.body에 client에서 보내는 정보를 담음

    //save 전, 비밀번호 암호화 로직 추가
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

//로그인 route 생성(endpoint는 login)
app.post('/api/users/login', (req, res) => {
  //1. DB에서 요청된 이메일 찾기
  User.findOne({email : req.body.email}, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess : false,
        message : "이메일에 해당하는 회원 없음"
      })
    }
  
    //2. 이메일의 비밀번호가 같은지 확인
    user.comparePassword(req.body.password, (err, isMatch)=>{
      //comparePassword User모델에 생성
      if(!isMatch) 
        return json({loginSuccess : false, message : '비밀번호 틀림'})
      
      //3. 비밀번호가 일치하면 토큰 생성
      user.generateToken((err, user)=>{
      if(err) {
        res.status(400).send(err)
        console.log(err)
      }

      //토큰 저장 -> 쿠키/세션/ 로컬스토리지 등
      //일단 쿠키에 저장해보기 -> express Cookie parser 설치
      console.log("user token : "+user.token)
      res.cookie("x_auth", user.token) //cookie에 x_auth란 이름의 필드에 토큰 저장
      .status(200)
      .json({loginSuccess : true, userId : user._id})
      })
    })
  })
})

//Auth route 생성
app.get('api/users/auth', auth,(req, res)=>{
  //auth middleware 추가 -> endpoint 실행 후 callback 전 수행되는 부분

  //여기가 실행된다면 authentication = true
  console.log('authentification is true')

  //client에게 정상 상태와 user 정보를 전달
  res.status(200)
  .json({
    _id : req.user._id,
    isAdmin : req.user.role == 0 ? false : true,
    isAuth : true,
    email : req.user.email,
    name : req.user.name,
    lastname : req.user.lastname,
    role : req.user.role,
    iamge : req.user.iamge
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
