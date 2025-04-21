import Orderitem from "../OrderItems/Orderitem";
import "./shoppingcart.css";
import { useSelector } from "react-redux";
import { selectAllShoppingCart } from "../../store/slice/shoppingSlice.js";

const ShoppingCart = () => {
    const shoppingCart = useSelector(selectAllShoppingCart);
    return (
        <div className="shoppingcart_container">
            {shoppingCart && shoppingCart.length === 0 ? (
                // If shoppingCart exists and is empty
                <p className="noItem">No items</p>
            ) : (
                // If shoppingCart exists and is not empty
                <>
                    {shoppingCart?.map((product) => (
                        <div
                            className="item_category"
                            key={product?.category_id}
                        >
                            <h5 className="item_category-title">
                                {product.category_name}
                            </h5>
                            <Orderitem productData={product} />
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default ShoppingCart;
