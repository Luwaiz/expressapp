 const mongoose = require("mongoose")

 const RecipeModel = mongoose.Schema({
    name:{
        type: String,
        required:["Please enter the name of your recipe"]
    },
    cookingTime:{
        type:Date,
        required:[true,"Please enter the allocated cooking time"]
    },
    description:{
        type:String,
        required:false,
    }

 },
 {
    timestamps:true
 }
)

 const Recipes= mongoose.model("recipe",RecipeModel)

 module.exports=Recipes