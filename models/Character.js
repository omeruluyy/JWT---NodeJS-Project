const mongoose=require('mongoose');

const characterSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Enter a name'],
        unique:true,
    },
    photo:{
        type:String,
        required:true,
        
    },
    description:{
        type:String,
        required:true
    }

})
const Character=mongoose.model('character',characterSchema);
module.exports=Character;