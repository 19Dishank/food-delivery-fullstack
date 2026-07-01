const createHttpError = require('http-errors');
const CartItem = require('../../models/CartItem');
const cartTotalAmount = require('../../helpers/cartTotalAmount');


async function removeCartItem(params) {

    const cartItemId = params.id;
    const cartItem = await CartItem.findById(cartItemId);
    if (!cartItem) {
        throw new createHttpError(404, "Item not found in cart ");
    }
    await CartItem.deleteOne({ _id: cartItemId });
    const updatedCart = await cartTotalAmount(cartItem.cartId);
    return {
        updatedCart
    }
}

module.exports = removeCartItem;