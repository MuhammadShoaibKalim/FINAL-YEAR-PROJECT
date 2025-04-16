import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', required: true 
    },
    testOrPackageId: { type: mongoose.Schema.Types.ObjectId, refPath: 'type', required: true },
    type: { type: String, enum: ['Test', 'Package'], required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });

const Cart = mongoose.model('Cart', CartSchema);
export default Cart;