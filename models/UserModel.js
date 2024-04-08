const mongoose=require("mongoose")

const userSchema = mongoose.Schema(
    {
        username:{
            type:String,
            required:[true,"Please enter your username"],
        },
        email:{
            type: String,
            required:[true,"Please enter your username"],
        },
    },
    {
        timestamps:true
    }
)

const User = mongoose.model("user",userSchema)

module.exports=User