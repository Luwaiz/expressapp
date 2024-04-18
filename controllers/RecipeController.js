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
        const recipe= await Recipes.create(req.body)
        console.log(req.body)
        res.status(201).json(recipe,{successful:true})
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