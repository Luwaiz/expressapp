const mongoose=require("mongoose")
const {isEmail}=require("validator")

const userSchema = mongoose.Schema(
    {
        username:{
            type: String,
            required:[true,"Please enter your username"],
            unique:[true,"User already created"]
        },
        email:{
            type: String,
            required:[true,"Please enter your email"],
            validate:[isEmail,"Please enter a valid email"],
            lowercase:true,
           
        },
        password:{
            type:String,
            required:[true,"Please enter password"],
            minlength:[8,"Password must be at least 8 characters long"]
        }
    },
    {
        timestamps:true
    }
)
const User = mongoose.model("user",userSchema)

module.exports=User