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
    userId:{
        type: String,
        required:["User Id required"]
    },
    name:{
        type: String,
        required:["Please enter the name of your recipe"]
    },
    image:{
        public_id:{
            type: String,
            required:[true,"Please upload an image"]
        },
        url:{
        type: String,
        required:[true,"image needed to be uploaded"]
        }
    },
    cookingTime:{
        type:CookingTime,
        required:[true,"Please enter the allocated cooking time"],
       
    },
    description:{
        type:String,
        required:false,
    },
    servings:{
        type:Number,
        required:true,
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