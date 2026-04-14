import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
        trim:true
    },

    age:{
        type: Number,
        min:25,
        max:60
    },

    password:{
        type: String,
        required: true,
        trim:true,
        minlength: 6 
    },

    email:{
        type: String,
        required:true,
        unique: true,
        trim:true
    },
    image: {
        type: String
    },
    
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    

}, {timestamps: true});

export default mongoose.model("User", userSchema);