import { Router } from "express";
import {
  // productCreated,
  allProducts,
  allCategoryList,
  CreateProduct,
  topItems,
  topCategory,
} from "../controllers/product.controllers.js";

const router = Router();

// router.route("/create").post(productCreated);

//create the product based on the categoryId or categoryName

router.route("/create").post(CreateProduct);

//get  all the products and displayed based on the catergory

router.route("/menu").get(allProducts);

//get all category list in the DB

router.route("/categorey").get(allCategoryList);

//router.route("/product/:catergoryId/:productId").get(singleProduct)

router.route("/topItems").get(topItems);

router.route("/topCategory").get(topCategory);

export default router;
