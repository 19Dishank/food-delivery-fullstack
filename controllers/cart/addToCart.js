const createHttpError = require('http-errors');
const FoodItem = require('../../models/FoodItem');
const Cart = require('../../models/Cart');
const CartItem = require('../../models/CartItem');
const cartTotalAmount = require('../../helpers/cartTotalAmount');

async function addToCart(body, user) {

    const { foodItemId, quantity } = body;
    const userId = user._id;

    const foodItem = await FoodItem.findById(foodItemId);
    if (!foodItem) {
        throw new createHttpError(404, "this food item not found");
    }
    if (!foodItem.isAvailable) {
        throw new createHttpError(400, "Food item currently unavailable");
    }
    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = await Cart.create({ userId, totalAmount: 0 });
        console.log('cart :>> ', cart);
    }
    console.log(cart);

    let cartItem = await CartItem.findOne({ cartId: cart._id, foodItemId: foodItemId })
    console.log('cartItem :>> ', cartItem);
    if (cartItem) {
        cartItem.quantity += quantity;
        await cartItem.save();
    }
    else {
        await CartItem.create({
            cartId: cart._id,
            foodItemId: foodItemId,
            name: foodItem.name,
            quantity: quantity,
            price: foodItem.price
        })
    }
    const updatedCart = await cartTotalAmount(cart._id);
    return updatedCart;
}
module.exports = addToCart;