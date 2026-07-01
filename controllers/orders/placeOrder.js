const createHttpError = require('http-errors');
const Orders = require('../../models/Order');
const OrderItems = require('../../models/OrderItem.js')
const Cart = require('../../models/Cart.js');
const CartItem = require('../../models/CartItem.js');
const Address = require('../../models/Address.js');
const FoodItem = require('../../models/FoodItem.js');
const Payment = require('../../models/Payment.js');
const paymentConstants = require('../../constants/payment.constants.js');
const orderConstants = require('../../constants/order.constants.js');


async function placeOrder(body, user) {
    const userId = user._id;
    const { addressId, orderInstructions, paymentMode } = body;

    const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
        throw new createHttpError(404, "User cart not found");
    }
    console.log('cart :>> ', cart);
    console.log(cart._id);

    // finding selected user address
    const selectedAddress = await Address.findOne({ _id: addressId, userId: userId }).select('addressDetail street pincode city -_id');
    console.log('address :>> ', selectedAddress);
    if (!selectedAddress) {
        throw new createHttpError(404, "user address not found ");
    }

    // finding all cart items
    const allCartItems = await CartItem.find({ cartId: cart._id }).populate('foodItemId');
    console.log('allCartItems :>> ', allCartItems);
    if (allCartItems.length === 0) {
        throw new createHttpError(404, "cart is empty, no items in cart");
    }

    // calculating net amounts and order item data from cart items
    let netAmount = 0;
    let orderItemsData = [];
    for (const item of allCartItems) {
        if (!item.foodItemId.isAvailable) {
            throw new createHttpError(400, `${item.foodItemId.name} is not available `);
        }
        const itemTotal = item.foodItemId.price * item.quantity;
        netAmount += itemTotal;
        orderItemsData.push({
            foodItemId: item.foodItemId._id,
            name: item.foodItemId.name,
            quantity: item.quantity,
            price: item.foodItemId.price,
            itemTotal: itemTotal
        })
    }
    console.log('orderItemsData :>> ', orderItemsData);

    const taxAmount = 0.05 * netAmount;
    const totalAmount = netAmount + taxAmount;

    // creating order
    const order = await Orders.create({
        userId,
        netAmount,
        taxAmount,
        totalAmount,
        address: selectedAddress,
        orderInstructions,
    })
    console.log('order._id :>> ', order._id);


    // adding order id to orderitems document
    orderItemsData.forEach((item) => {
        item.orderId = order._id
    })
    console.log('orderItemsData :>> ', orderItemsData);
    const orderItems = await OrderItems.insertMany(orderItemsData);

    // initiating payment
    const payment = await Payment.create({
        userId,
        orderId: order._id,
        amount: totalAmount,
        mode: paymentMode,
    
    })
    
    // if cod then confirm order
    // if(paymentMode === paymentConstants.MODE.COD){
    //     order.status = orderConstants.CONFIRMED;
    //     await order.save();
    // }

    console.log('payment :>> ', payment);
    // clearing cart;
    await CartItem.deleteMany({ cartId: cart._id });
    cart.totalAmount = 0
    await cart.save();

    return {order,payment};

}
module.exports = placeOrder;