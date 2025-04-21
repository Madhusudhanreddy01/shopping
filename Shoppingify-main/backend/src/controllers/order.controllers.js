import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Order } from "../models/oder.model.js";

export const orderProduct = asyncHandler(async (req, res) => {
  const { name, shoppingCart } = req.body;

  if (!name || !shoppingCart) {
    throw new  ApiError(400, "All fields ar required");
  }
  const order = await Order.create({
    name,
    orderList:shoppingCart,
  });

  if (!order) {
    throw new  ApiError(400, "something went wrong while creating the order");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order Created Sucessfully"));
});
