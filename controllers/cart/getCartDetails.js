const createHttpError = require('http-errors');
const Cart = require('../../models/Cart');
const CartItem = require('../../models/CartItem');


async function getCartDetails(user) {
    const userId = user._id;
    const cart = await Cart.findOne({ userId });
    console.log('cart :>> ', cart);
    if (!cart) {
        return {
            userId,
            res: "Cart is empty",
            cartItems: []
        }
    }
    const items = await CartItem.find({ cartId: cart._id });
    const itemCount = items.length;
    return {
        cartId: cart._id,
        items,
        itemCount,
        totalAmount: cart.totalAmount
    }
}

module.exports = getCartDetails;