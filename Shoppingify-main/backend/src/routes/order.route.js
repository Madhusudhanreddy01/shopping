import { Router } from "express";
import { orderProduct } from "../controllers/order.controllers.js";

const router = Router();

router.route("/create-order").post(orderProduct);



export default router;