import { Cart } from "../Models/Cart.js";

// add to cart
export const addToCart = async (req, res) => {
  const { productId, title, price, qty } = req.body;

  const userId = req.user;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() == productId,
  );
  if (itemIndex > -1) {
    cart.items[itemIndex].qty += qty;
    cart.items[itemIndex].price += price * qty;
  } else {
    cart.items.push({ productId, title, price, qty });
  }
  await cart.save();
  res.json({ message: "Items added to cart", cart, success: true });
};
