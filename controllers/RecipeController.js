const Recipes = require('../models/RecipeModel')


const getAllRecipes = async (req, res) => {
    try{
        const recipes = await Recipes.find({})
        res.status(201).json(recipes)
    }
    catch(e){
        res.status(500).json({message:`Could not find ${e.message}`});
    }
}
const createRecipes =async (req,res)=>{
    try{
        console.log(req.decodedToken)
        console.log(req.decodedToken.id)
        req.body.userId=req.decodedToken.id
        const recipe= await Recipes.create(req.body)
        console.log(req.decodedToken.id)
        
        console.log(recipe.userId)
        await recipe.save()
        console.log(req.body)
        res.status(201).json({successful:recipe})
    }
    catch(e){
        res.status(500).json({message:`Could not create ${e.message}`});
        console.log(Object(e.message))
    }
}
module.exports= {
    getAllRecipes,
    createRecipes
}