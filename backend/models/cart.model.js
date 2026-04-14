import mongoose, { Types } from "mongoose"

const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    products:[{
        type: mongoose.Types.ObjectId,
        ref: "Product"
    }]
}, {timestamps: true});

export default mongoose.model("Cart",  cartSchema);