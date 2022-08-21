const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name : {
        type: String,
        manlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength:5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function(next){
    //비밀번호 암호화 시키기
    // salt use

    //salt create
    const saltRounds = 10;
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err) return next(err);
                user.password=hash;
                next();
            });
        });
    } else {
        next();
    }
})

userSchema.methods.comparePassword = function(plainPassword,cb){
    //평문 패스워드 암호화시키기
    bcrypt.compare(plainPassword, this.password, function(err,isMatch){
        if(!isMatch) {return cb(err)}
        else {cb(null, isMatch)};
    })
}

userSchema.methods.generateToken = function(cb){
    
    var user = this;
    
    //jwt 이용해서 token 생성
    var token = jwt.sign(user._id.toHexString(),'secretToken');

    user.token = token;
    user.save(function(err,user){
        if(err) {return cb(err)}
        else {cb(null,user)}
    })

}

userSchema.statics.findByToken = function(token,cb){
    var user = this;

    //token decode
    jwt.verify(token, 'secretToken', function(err, decoded) {
        user.findOne({"_id":decoded,"token":token},function(err,user){
            if(err) {return cb(err);}
            else { cb(null,user);}

        });
      });
}

const User = mongoose.model('User',userSchema)

module.exports = {User}