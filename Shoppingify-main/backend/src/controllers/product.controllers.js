import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Order } from "../models/oder.model.js";

export const CreateProduct = asyncHandler(async (req, res) => {
  const { name, url, note, categoryName } = req.body;

  if ([name, url, note, categoryName].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existingCategory = await Category.findOne({ categoryName });

  let newCategory;

  if (!existingCategory || existingCategory.length === 0) {
    newCategory = await Category.create({
      categoryName,
    });

    if (!newCategory || newCategory.length === 0) {
      throw new ApiError(
        400,
        "Something went wrong while creating the category"
      );
    }
  }

  const product = await Product.create({
    name,
    url,
    note,
    categoryName: existingCategory?.categoryName || newCategory?.categoryName,
    categoryId: existingCategory?._id || newCategory?._id,
  });

  if (!product) {
    throw new ApiError(400, "something went wrong");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});

export const allProducts = asyncHandler(async (req, res) => {
  const productslist = await Product.aggregate([
    {
      $group: {
        _id: "$categoryName",
        productList: {
          $push: {
            item_id: "$_id",
            item_name: "$name",
            item_url: "$url",
            item_note: "$note",
            item_category: "$categoryName",
            item_categoryId: "$categoryId",
            item_quantity: "$quantity",
          },
        },
      },
    },
    { $project: { categoryName: 1, categoryId: 1, productList: 1 } },
    { $sort: { _id: 1 } },
  ]);

  if (!productslist || productslist.length === 0) {
    throw new ApiError(400, "something went wrong");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, productslist, "products list"));
});

export const allCategoryList = asyncHandler(async (req, res) => {
  const category = await Category.find({}, { _id: 1, categoryName: 1 }).sort({
    categoryName: 1,
  });

  if (!category) {
    throw new ApiError(400, "No Category Found");
  }

  return res.status(200).json(new ApiResponse(200, category, "Category Found"));
});

export const topItems = asyncHandler(async (req, res) => {
  const totalQuantityResult = await Order.aggregate([
    { $unwind: "$orderList" },
    {
      $group: {
        _id: null,
        totalQuantity: { $sum: "$orderList.item_quantity" },
      },
    },
    { $project: { _id: 0, totalQuantity: 1 } },
  ]);

  const totalQuantity = totalQuantityResult[0].totalQuantity;

  const topItemsResult = await Order.aggregate([
    { $unwind: "$orderList" },
    {
      $group: {
        _id: {
          item_id: "$orderList.item_id",
          item_name: "$orderList.item_name",
        },
        itemCount: { $sum: "$orderList.item_quantity" },
      },
    },
    {
      $project: {
        _id: 0,
        item_id: "$_id.item_id",
        item: "$_id.item_name",
        itemCount: 1,
      },
    },
    { $sort: { itemCount: -1 } },
    { $limit: 3 },
  ]);

  let itemsWithPercentage = topItemsResult.map(function (item) {
    item.percentage = ((item.itemCount / totalQuantity) * 100).toFixed(0);
    return item;
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        itemsWithPercentage,
        "Top items with percentage of total sales"
      )
    );
});



export const topCategory = asyncHandler(async (req, res) => {
  const topCategory = await Order.aggregate
  ([
    { $unwind: "$orderList" },
    {
      $group: {
        _id: {
          itemCategoryId: "$orderList.item_categoryId",
          itemCategory: "$orderList.item_category"
        },
        categoryCount: { $sum: 1 }
      }
    },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: "$categoryCount" },
        categories: {
          $push: {
            itemCategoryId: "$_id.itemCategoryId",
            itemCategoryName: "$_id.itemCategory",
            categoryCount: "$categoryCount"
          }
        }
      }
    },
    { $unwind: "$categories" },
    {
      $project: {
        _id: 0,
        itemCategoryId: "$categories.itemCategoryId",
        item: "$categories.itemCategoryName",
        categoryCount: "$categories.categoryCount",
        percentage: { $multiply: [{ $divide: ["$categories.categoryCount", "$totalOrders"] }, 100] }
      }
    },
    { $sort: { categoryCount: -1 } },
    { $limit: 3 }
  ])

 return res.status(200).json(new ApiResponse(200, topCategory, "Top 3 categories retrieved successfully."))
})
