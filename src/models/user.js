
const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require("bcryptjs")


const userSchema = new mongoose.Schema({    name: {
  type: String,
  required: true,
  trim : true
},
email:{
  type: String,
  required : true,
  trim : true, 
  lowercase : true,
  validate(value){
      if(!validator.isEmail(value)){
          throw new Error ("That's not a valid email.")
      }
  }
},
password:{
  type: String,
  required: true,
  trim: true,
  minlength: 7,
  validate(value){
      if(validator.contains(value, "password", {ignoreCase: true})){
          throw new Error ("Password can't be password")
      }
  }

},
age: {
  type: Number,
  default:0,
  validate(value) {
      if(value <0 ){
          throw new Error ("Age must be a positive number")
      }
  }
}})

userSchema.pre('save', async function(next){


  console.log("hashing")
    if(this.isModified('password')){
      this.password = await bcrypt.hash(this.password, 8)
    }

      next()
})

const User = mongoose.model("User", userSchema)


module.exports = User