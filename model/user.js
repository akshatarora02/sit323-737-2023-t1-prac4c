const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema(
    {
        email: {type: String,
            trim:true,
            lowercase:true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Email is not valid!')
            }
        }},
        password:{type:String,minlength:8,required:true},
    }
)
userSchema.pre(
    'save',
    async function(next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);
  
      this.password = hash;
      next();
    }
  );

userSchema.methods.isValidPassword = async function(password) 
{
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }
module.exports  =  mongoose.model("User", userSchema)