const createHttpError = require('http-errors');
const CartItem = require('../../models/CartItem');
const cartTotalAmount = require('../../helpers/cartTotalAmount');


async function updateCart(params, body) {
    const cartItemId = params.id;
    const { quantity } = body;

    const cartItem = await CartItem.findById(cartItemId);
    if (!cartItem) { throw new createHttpError(404, "Cart item not found "); }
    if (quantity === 0) {
        await CartItem.deleteOne({ _id: cartItem._id });
    }
    else {
        cartItem.quantity = quantity;
        await cartItem.save();
    }
    const updatedCart = await cartTotalAmount(cartItem.cartId);
    console.log('updatedCart :>> ', updatedCart);
    return {
        updatedCart
    };
}

module.exports = updateCart;