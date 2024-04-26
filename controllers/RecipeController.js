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
        req.body.userId=req.decodedToken.id
        const recipe= await Recipes.create(req.body)
        console.log(req.decodedToken.id)
        console.log(recipe.userId)
        await recipe.save()
        console.log(req.body)
        res.status(201).json(recipe)
    }
    catch(e){
        res.status(500).json({message:`Could not create ${e.message}`});
        console.log(Object(e.message))
    }
}
const deleteRecipe = async (req, res) => {
    try{
        const {id} = req.params
        if(id===""){
            return res.status(400).json({message:"id is required"})
        }
        if(id==!Recipes.id){
            return res.status(400).json({message:"id is not valid"})
        }
        const recipe = await Recipes.findByIdAndDelete(id)
        res.status(200).json(recipe)
    }
    catch(e){
        console.log(e)
        throw new Error(e)
    }
}

const getRecipeById = async (req, res) => {
    try{
        const {id} = req.params
        console.log(id)
        if(id===""){
            return res.status(400).json({message:"id is required"})
        }
        if(id==!Recipes.id){
            return res.status(400).json({message:"id is not valid"})
        }
        const recipe = await Recipes.findById(id)
        res.status(200).json(recipe)
    }
    catch(e){
        console.log(e)
        throw new Error(e)
    }
}

module.exports= {
    getAllRecipes,
    createRecipes,
    deleteRecipe,
    getRecipeById
}