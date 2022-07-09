const express = require('express')
const app = express()
const port = 3300
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const {User} = require("./models/user");
//연결 안되고 나네... 뭐지 ....
//몽고 디비랑 몽구스는 무엇이지??
//mongoose를 설치해야 됨
//mongodb+srv://wooguk:<password>@cluster0.2atho59.mongodb.net/?retryWrites=true&w=majority
//몽고디비 모델 스키마 모델은 스키마를 감싸주는 역할을 하고 스키마는 하나하나 역할을 지정해줌

//application/x-ww-form-urlencoded 를 분석해서 가져옴
app.use(bodyParser.urlencoded({extended:true}));
//application/json형태를 분석해서 가져옴 
app.use(bodyParser.json());
app.use(cookieParser());

const config = require('./config/key');
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected..'))
.catch(err => console.log(err));

//npm install nodemon --save-dev (로컬에서만 진행을 하겠다!)

app.get('/', (req, res) => {
  res.send('오마이갓!!! 노드몬!! 재기동 안해도 바로 반영 되')
})

app.post('/register',(req, res)=>{
  //회원가입할때 필요한 정보들을 클라이언트에서 가져오면 그것들을 디비에 넣어준다.
  const user = new User(req.body);
  user.save((err, userInfo) =>{
    if(err){console.log(err); return res.json({success : false, err})}
    return res.status(200).json({
      success :true,
      info : user
    })
  });
})

app.post('/login',(req, res) => {
  //DB에서 요청된 정보 찾기
  User.findOne({emai:req.body.email} , (err,userInfo) => {
    if(!userInfo){
      return res.json({
        loginSuccess : false,
        message : "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
    userInfo.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch){
        return res.json({loginSuccess : false, message : "비밀번호가 틀렷습니다"});
      }
      //비밀번호까지 맞다면 USER를 위한 토큰을 생성해야함.
      userInfo.generateToken((err, userInfo) =>{
          if(err){
            return res.status(400).send(err);
          }
          //토큰을 저장한다. 어디에?? 쿠키, 로컬스트로지
          res.cookie("x_auth",userInfo.token)
          .status(200)
          .json({loginSuccess : true, userId: userInfo._id}) 
      })
    })
  })
  
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})