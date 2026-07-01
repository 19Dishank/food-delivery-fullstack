const createHttpError = require('http-errors');
const Cart = require('../../models/Cart');
const CartItem = require('../../models/CartItem');

async function emptyCart(user){
    const userId = user._id;

    const cart = await Cart.findOne({userId: userId});
    if(!cart){
         throw new createHttpError(404, "Cart of the user not found");
    }

    await CartItem.deleteMany({cartId: cart._id});
    cart.totalAmount = 0 ;
    await cart.save();
    
    console.log('cart :>> ', cart);
    return {
        cartId: cart._id,
        userId,
        totalAmount: cart.totalAmount
    };

}
module.exports = emptyCart;