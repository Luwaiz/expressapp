const express = require('express');
const Recipes = require("../models/RecipeModel")
const {getAllRecipes,createRecipes}=require('../controllers/RecipeController')
const router = express.Router();

router.use(express.json())
router.use(express.urlencoded({extended:true}))

// get all recipes
router.get('/', getAllRecipes)
router.post('/', createRecipes)

// get recipe by id
// router.get('/:id', getRecipeById)
// create recipe
// update recipe
// router.put('/:id', updateRecipe)
// //delete recipe
// router.delete('/:id', deleteRecipe)

module.exports = router;