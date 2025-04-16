import express from 'express';
import { 
    addToCart, 
    removeFromCart, 
    getUserCart, 
    getCartItem, 
    clearCart 
} from '../controllers/cart.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/add', isAuthenticated, addToCart);       
router.get('/', isAuthenticated, getUserCart);         
router.get('/:id', isAuthenticated, getCartItem);      
router.delete('/remove/:id', isAuthenticated, removeFromCart); 
router.delete('/clear', isAuthenticated, clearCart);  

export default router;
