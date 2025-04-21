import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    orderDate: {
      type: Date,
      default: Date.now
    },
    orderList: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true
  }
);

export const Order = mongoose.model("Order", orderSchema);



