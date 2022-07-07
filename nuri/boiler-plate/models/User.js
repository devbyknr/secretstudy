const mongoose = require('mongoose')

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
        maxlength : 5
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

//모델은 스키마를 감싸주는 역할 model(모델명, 스키마)
const User = mongoose.model('User', userSchema)

//모델을 다른 파일에서 쓸 수 있도록 export 해줌
module.exports = {User}