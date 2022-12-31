
const Character=require('../models/Character');

module.exports.characters_get=async(req,res)=>{
    try {
    var characters= await Character.find({});
    res.render('characters',{title:'Express',characters:characters})
        
    } catch (error) {
        res.status(500).json({message : "Une erreur est survenue"})
    }
    

}

module.exports.character_post=async (req,res)=>{
    const character={
        name:req.body.name,
        photo:req.body.photo,
        description:req.body.description
    }
    await Character.create(character).then(data=>{
        console.log(data)
        res.status(201).json(data);
    }).catch(err=>{
        console.log(err)
        res.status(400).json(err)
    });

}
