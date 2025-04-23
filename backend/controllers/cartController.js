import userModel from "../models/userModel.js";

// Utility function to fetch and update user cart data
const getCartData = async (userId) => {
  const userData = await userModel.findById(userId);
  return userData.cartData;
};

const updateCartData = async (userId, cartData) => {
  await userModel.findByIdAndUpdate(userId, { cartData });
};

// Add products to user cart
const addToCart = async (req, res) => {
  const { userId, itemId, size } = req.body;

  try {
    const cartData = await getCartData(userId);

    if (cartData[itemId]) {
      cartData[itemId][size] = cartData[itemId][size] ? cartData[itemId][size] + 1 : 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    await updateCartData(userId, cartData);

    return res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// Update user cart with specific quantity
const updateCart = async (req, res) => {
  const { userId, itemId, size, quantity } = req.body;

  try {
    const cartData = await getCartData(userId);

    if (cartData[itemId] && cartData[itemId][size]) {
      cartData[itemId][size] = quantity;
      await updateCartData(userId, cartData);
      return res.json({ success: true, message: "Cart Updated" });
    } else {
      return res.json({ success: false, message: "Item not found in cart" });
    }
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// Get user cart data
const getUserCart = async (req, res) => {
  const { userId } = req.body;

  try {
    const cartData = await getCartData(userId);
    return res.json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
