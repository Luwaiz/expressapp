const mongoose=require("mongoose")
const {isEmail}=require("validator")
const bcrypt = require("bcrypt")

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
        },
        token:{
            type:String,
            required:false
        }
    },
    {
        timestamps:true
    }
)

userSchema.pre("save", async function (next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

const User = mongoose.model("user",userSchema)

module.exports= User