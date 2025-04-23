import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';
import razorpay from 'razorpay';

// Global constants
const currency = 'myr';
const deliveryCharge = 10;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Helper function to create a new order
const createOrder = async (userId, items, amount, address, paymentMethod) => {
    const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod,
        payment: false,
        date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    return newOrder;
};

// Helper function to clear user cart
const clearUserCart = async (userId) => {
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
};

// Order placement with COD method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const newOrder = await createOrder(userId, items, amount, address, 'COD');
        await clearUserCart(userId);
        res.json({ success: true, message: 'Order Placed' });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Order placement with Stripe method
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const newOrder = await createOrder(userId, items, amount, address, 'Stripe');
        const line_items = items.map(item => ({
            price_data: {
                currency,
                product_data: { name: item.name },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency,
                product_data: { name: 'Delivery Charges' },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Stripe payment verification
const verifyStripe = async (req, res) => {
    try {
        const { orderId, success, userId } = req.body;

        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await clearUserCart(userId);
            res.json({ success: true });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Order placement with Razorpay method
const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const newOrder = await createOrder(userId, items, amount, address, 'Razorpay');
        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),
        };

        razorpayInstance.orders.create(options, async (error, order) => {
            if (error) {
                console.error(error);
                return res.json({ success: false, message: error });
            }
            res.json({ success: true, order });
        });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Razorpay payment verification
const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id } = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            await clearUserCart(userId);
            res.json({ success: true, message: 'Payment Successful' });
        } else {
            res.json({ success: false, message: 'Payment Failed' });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Fetch all orders for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Fetch user orders for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Update order status from admin panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Status Updated' });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    verifyRazorpay,
    verifyStripe,
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus,
};
