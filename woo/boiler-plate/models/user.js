const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 50
    },
    email : {
        type : String,
        trim : true,
        unique : 1
    },
    lastname : {
        type : String,
        maxlength : 50
    },
    password: {
        type : String,
        minlength:5
    },
    lastname : {
        type : String,
        maxlength : 50
    },
    role : {
        type : Number,
        default : 0
    },
    image: String,
    token : {
        type : String
    },
    tokenExp : {
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
    console.log(plainPassword+" vs "+this.password)
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        console.log(plainPassword+" vs2 "+this.password)
        console.log("isMatch : "+isMatch);
        if(err) return callbackfunc(err)
        callbackfunc(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){

    let user = this;
    //jsonwebtoken을 이용해서 token을생성하기
    let token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null,user)
    })

}

const User = mongoose.model('User',userSchema)

module.exports = {User}