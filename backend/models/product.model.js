import mongoose, { Types } from "mongoose"

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true
    },
    image:{
        type:String,
        required: false,
    },
    price:{
        type: Number,
        required: true,
    },

    categoryId:{
        type: mongoose.Types.ObjectId,
        required: true,
    },

    inStock:{
        type: Number,
        required:true,
        default: 0,
    },
    

}, {timestamps: true});

export default mongoose.model("Product", productSchema);