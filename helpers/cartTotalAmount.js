const CartItem = require('../models/CartItem.js');
const Cart = require('../models/Cart.js');
const FoodItem = require('../models/FoodItem.js');
const createHttpError = require('http-errors');


async function cartTotalAmount(cartId) {
    try {
        // const allCartItems = await CartItem.find({ cartId }).populate('foodItemId');
        // let total = 0;
        // for (const item of allCartItems) {
        //     total += item.foodItemId.price * item.quantity;
        // }

        const allCartItems = await CartItem.find({ cartId });
        console.log('allCartItems :>> ', allCartItems);
        const total = allCartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        console.log('total :>> ', total);

        const updatedCart = await Cart.findOneAndUpdate({ _id: cartId }, { totalAmount: total }, { new: true, runValidators: true });
        console.log('updatedCart :>> ', updatedCart);
        return updatedCart;
    }
    catch (error) {
        throw new createHttpError(error);
    }
}

module.exports = cartTotalAmount;