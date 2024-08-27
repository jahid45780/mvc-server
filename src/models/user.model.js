const { Schema, default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");


const userSchema = new Schema(
    {
       userName:{
          type:String,
          required:true,
          unique:true,
          lowercase:true,
          trim:true,
          index:true
       },
       email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
     },
     fullName:{
        type:String,
        required:true,
        trim:true,
        index:true
     },
     password:{
        type:String,
        required:true,
     },
   }, {timestamps:true}
)

userSchema.methods.generateAccessToken = function (){
  return jwt.sign({
      _id: this._id,
      email:this.email,
      userName: this.userName,
      fullName: this.fullName 
   },
   process.env.ACCESS_TOKEN_SECRET,
   {
       expiresIn:process.env.ACCESS_TOKEN_EXPIRY
   }
)
}
userSchema.methods.generateRefreshToken = function (){
   return jwt.sign({
      _id: this._id,
   },
   process.env.REFRESH_TOKEN_SECRET,
   {
       expiresIn:process.env.REFRESH_TOKEN_EXPIRY
   }
)
}

export const User = mongoose.model("User", userSchema)