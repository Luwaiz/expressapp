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

userSchema.statics.login = async function(username,password){
    const user = await this.findOne({username:username})
    if(user){
        const match = await bcrypt.compare(password,user.password);
        if (match) {
            return user
    }
    throw new Error("Invalid password")
    }
    throw new Error(`cannot find user with the username ${username}`)

}

const User = mongoose.model("user",userSchema)

module.exports= User