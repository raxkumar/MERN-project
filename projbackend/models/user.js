const mongoose = require("mongoose");
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlenght: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlenght: 32,
        trim: true
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    userinfo:{
        type: String,
        trim: true
    },
    encry_password:{
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases:{
        type: Array,
        default: []
    }
},{timestamps: true});

userSchema.virtual("password")
    .set(function(password){
        this._password=password;
        this.salt=uuidv1();
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this._password;
    })

userSchema.methods ={

    authenticate: function(pass){
        return this.securePassword(pass)===this.encry_password;
    },

    securePassword: function(pass){
        if(!pass) return "";
        try{
            return crypto.createHmac('sha256',this.salt)
            .update(pass)
            .digest('hex');
        }catch(err){

        }
    }
}

module.exports = mongoose.model("User",userSchema);