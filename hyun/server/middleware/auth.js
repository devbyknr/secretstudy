const {User} = require('../models/User');

let auth = (req,res,next) =>{
    //인증처리


    //클라이언트에서 쿠키 토큰 가져온
    let token = req.cookies.x_auth;

    //쿠키 토큰 복호화 한 후 유저 찾기
    User.findByToken(token,(err,user)=>{
        if(err) {throw err;}
        else{
          if(!user) { return res.json({ isAuth:false, error:true})}
          else {
            req.token = token;
            req.user = user;
            next();
          }
        }
    })

    //유저 있으면 오케이

    // 유저 없으면 인증 NO
}

module.exports = {auth};