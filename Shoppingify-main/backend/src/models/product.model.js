import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    categoryName: {
      type: String,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    quantity: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
