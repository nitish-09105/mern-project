const mongoose=require('mongoose')
const { bool } = require('prop-types')
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken")

const userSchema= new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
    isAdmin:{
        type: Boolean,
        default: false

    }
})



// !secure the password with bcrypt
// the given code runs in middleware before storing the data in db
userSchema.pre("save",async function (next){
    // console.log("pre",this);
    const user=this;
    if(!user.isModified("password")){
        next()
    }
    try {
        // hash the password
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password=hash_password;
    } catch (error) {
        next(error)
    }
})


// compare the password
userSchema.methods.comparePassword= async function(password){
    return bcrypt.compare(password,this.password);
}


// json web token
userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "30d"
        }
    )
    } catch (error) {
        console.error(error)
    }
}


// define the model or the collection name
const User= new mongoose.model('User', userSchema)

module.exports=User;