const {Router}=require('express');
const router=Router();


const characterController=require('../controllers/characterController')

//this route is created for inserting some initial characters into database
//by using postman.
router.post('/post',characterController.character_post);
module.exports=router;