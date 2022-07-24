const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10 //10자리인 salt를 생성한 후, 이것을 사용해 암호화

const jwt = require('jsonwebtoken')

//스키마 선언
const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 50
    },
    email : {
        type : String,
        trim : true, //문자열 내부 공백 제거
        unique : true //distinct
    },
    password : {
        type : String,
        maxlength : 100
    },
    lastname : {
        type : String,
        maxlength : 50
    },
    role : { //관리자 or 일반유저 등
        type : Number,
        defalut : 0

    },
    image : String,
    token : { //유효성 관리
        type : String
    },
    tokenExp : {//토큰 유효기간
        type : Number
    }
})

//usermodel의 정보를 저장(save function) 전, pre function 설정
userSchema.pre('save', function(next){
    var user = this; //userSchema 객체

    if(user.isModified('password')){ //model > password 필드가 수정하는 경우
        //bcrypt library로 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err) //err 나면 save 실행

            bcrypt.hash(user.password, salt, function(err, hash){
                //user.password = 사용자가 입력한 비밀번호 평문, hash = salt를 이용해 평문을 암호화한 값
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    }else{
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, callbackfunc){
    //평문을 암호화해서 db 값과 비교
    console.log("UserSchema object : "+this);
    console.log("comparePassword : "+ plainPassword, this.password)
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return callbackfunc(err)
        callbackfunc(null, isMatch)
    })
}

userSchema.methods.generateToken = function(callbackfunc){
    //jsonwebtoken 이용해 토큰 생성
    var user = this;

    //user._id + secretToken이란 txt를 이용해 Token 생성
    //secretToken을 이용해 user._id 도출 가능
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function(err, user) {
        if(err) return callbackfunc(err)
        callbackfunc(null, user)
    })
}

userSchema.statics.findByToken = function(token, callbackFunc){
    var user = this;
    
    //토큰 복호화(토큰은 user._id + secretToken)
    jwt.verify(token, 'secretToken', function(err, decoded) {
        //1. decoded UserId를 이용해 User를 찾음
        //2. 클라이언트에서 가져온 토큰과 DB에 보관된 토큰 일치 여부 확인
        user.findOne({"_id" : decoded, "token" : token}, function(err, user){
            if(err) return callbackFunc(err)
            callbackFunc(null, user)
        })
    })
}
//모델은 스키마를 감싸주는 역할 model(모델명, 스키마)
const User = mongoose.model('User', userSchema)

//모델을 다른 파일에서 쓸 수 있도록 export 해줌
module.exports = {User}