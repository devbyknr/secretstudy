const {User} = require('../models/User'); //User모델 불러옴

let auth = (req, res, next)=>{ //인증 처리 수행

    //1. client cookie에서 토큰 가져옴
    let token = req.cookies.x_auth; //쿠키에서 x_auth라는 이름의 필드를 가져옴

    //2. 토큰 복호화한 후, DB에서 유저를 찾음
    User.findByToken(token, function(err, user){
        if(err) throw err;
        if(!user) return res.json({isAuth : false, error : true})

        //request 정보에 세팅 후, middleware 이후 로직 수행
        req.token = token;
        req.user = user;
        next();
    })

    //3. 유저가 있으면 인증 OK
    
    //4. 유저가 없으면 인증 NO
}

module.exports = {auth} //다른 파일에서 쓸 수 있또록 export 처리