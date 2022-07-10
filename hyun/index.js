//xpBWZNIcIU6tT1de mongodb

const express = require('express')
const app = express()
const port = 7040

const { auth } = require('./middleware/auth');
const { User }  = require('./models/User');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/key');
mongoose.connect(config.mongoURI).then(()=>console.log('MongoDB connected...')).catch(err => console.log(err))

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World! 아ㄴ녕ㅏ세asdfasdf')
})

app.post('/api/register',(req,res)=>{
  //회원가입시 정보 가져오기

  const user = new User(req.body);

  user.save((err,userInfo)=>{
    if(err) return res.json({success:false,err})
    return res.status(200).json({success:true})
  });
  
  //디비에 넣기

})

app.post('/login',(req,res)=>{
  //find requested email from db
  User.findOne({ email: req.body.email},(err,user) =>{
    if(!user) {
      return res.json({
        loginSuccess:false,
        message:"이메일에 해당하는 유저가 없읍니다."
      })
    } else {

    //비밀번호 검증
      user.comparePassword(req.body.password , (err,isMatch) =>{

        if(!isMatch) {
          return res.json({loginSuccess:false,message:"비밀번호가 트렷습니다."})
        } else {
          //비밀번호가 맞다면 토큰생성
          user.generateToken((err,user)=>{
            if(err) {
              return res.status(400).send(err)
            } else {
              //token 을 저장한다. 어디에? 쿠키/로컬스토리지/세션스토리지
              return res.cookie("x_auth",user.token).status(200).json({loginSuccess:true,userId:user._id});
            }
          })
        }
      })
  }
  
  })
})

// role - 1: admin , 2 : spec admin , 0:normal user
app.post('/api/users/auth', auth ,(req,res)=>{
  //미들웨어를 통과해 옴 == (auth == true)
  res.status(200).json({
    _id : req.user._id,
    isAdmin : req.user.role === 0? false : true,
    isAuth:true,
    email : req.user.email,
    name : req.user.name,
    lastname : req.user.lastname,
    role : req.user.role,
    image : req.user.image
  })
    
})

app.post('/api/users/logout',auth,(req,res)=>{

  User.findOneAndUpdate({_id:req.user._id},{token:""},(err,user)=>{
    if(err) return res.json({success:false,err});
    return res.status(200).json({
      success:true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

