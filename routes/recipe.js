const express = require('express');
const Recipes = require("../models/RecipeModel")
const {getAllRecipes,createRecipes,deleteRecipe,getRecipeById}=require('../controllers/RecipeController');
const { verifyToken } = require('../controllers/UserController');
const router = express.Router();

router.use(express.json())
router.use(express.urlencoded({extended:true}))

// get all recipes
router.get('/recipes', getAllRecipes)
router.post('/',verifyToken, createRecipes)
router.get('/delete/:id', deleteRecipe)
router.get('/:id',getRecipeById)

// get recipe by id
// router.get('/:id', getRecipeById)
// create recipe
// update recipe
// router.put('/:id', updateRecipe)
// //delete recipe
// router.delete('/:id', deleteRecipe)

module.exports = router;