//xpBWZNIcIU6tT1de mongodb

const express = require('express')
const app = express()
const port = 7040

const { User }  = require('./models/User');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/key');
mongoose.connect(config.mongoURI).then(()=>console.log('MongoDB connected...')).catch(err => console.log(err))

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//application/json
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World! 아ㄴ녕ㅏ세asdfasdf')
})

app.post('/register',(req,res)=>{
  //회원가입시 정보 가져오기

  const user = new User(req.body);
  user.save((err,userInfo)=>{
    if(err) return res.json({success:false,err})
    return res.status(200).json({success:true})
  });
  
  //디비에 넣기

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//git remote add origin https://github.com/devbyknr/secretstudy.git
//git branch -M main
//git push -u origin main