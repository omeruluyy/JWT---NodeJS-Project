const mongoose=require('mongoose');
const {isEmail}=require('validator');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
     email:{
        type:String,
        required:[true,'Enter an email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Enter a valid email']
    },
    password:{
        type:String,
        required:[true,'enter a password'],
        minLength:[6,'minimum password length should be 6 characters']
    }
})

//login operation
userSchema.statics.login=async function (email,password){
    const user=await this.findOne({email});
    if(user){
        const validate=await bcrypt.compare(password,user.password);
        if(validate){
            return user;
        }
        throw Error('password is wrong')

    }
    throw Error('incorrect email');

}

userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
})

userSchema.post('save',function(doc,next){
    console.log('new user was created',doc);
    next();
})
const User=mongoose.model('user',userSchema);
module.exports=User;