 const mongoose = require("mongoose")


 const CookingTime= mongoose.Schema({
    hours:{
        type : Number,
        required:[false]
    },
    minutes:{
        type : Number,
        required:false
    },
    seconds:{
        type : Number,
        required:false
    }
 })

 const Ingredient = mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please enter the name of the ingredient"]
    },
    quantity:{
        type: Number,
        required:[true,"Please enter the quantity of the ingredient"]
    }
 })

 const Ingredients = mongoose.Schema({
    category:{
        type: String,
        required:[true,"Please enter the category of the ingredient"],
    },
    ingredient:{
        type: [Ingredient],
        required:[true,"Please enter the ingredient"]
    }
 })

 const RecipeModel = mongoose.Schema({
    name:{
        type: String,
        required:["Please enter the name of your recipe"]
    },
    cookingTime:{
        type:CookingTime,
        required:[true,"Please enter the allocated cooking time"],
       
    },
    description:{
        type:String,
        required:false,
    },
    ingredients:{
        type:[Ingredients],
        required:true
    }
 },
 {
    timestamps:true
 }
)

 const Recipes= mongoose.model("recipe",RecipeModel)

 module.exports=Recipes