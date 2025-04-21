import PropTypes from "prop-types";
import "./orderitems.css";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import {
    incrementItem,
    decrementItem,
    removeItemFromCart,
} from "../../store/slice/shoppingSlice.js";

import {incrementCount,  decrementCount, removeitem} from "../../store/slice/orderSlice.js";

import { useDispatch } from "react-redux";

const Orderitem = ({ productData }) => {
    const dispatch = useDispatch();

    const handleDecrement = (orderItem) => {
        dispatch(decrementItem(orderItem));
        dispatch(decrementCount(orderItem))
    };

    const handleIncrement = (orderItem) => {
        console.log("orderItem inside the orderitem")
        dispatch(incrementItem(orderItem));
        dispatch(incrementCount(orderItem))
    };

    const handleRemove = (orderItem) => {
        dispatch(removeitem(orderItem));
        dispatch(removeItemFromCart(orderItem));

    };

    return (
        <>
            {productData &&
                productData.orderList.map((order) => (
                    <div key={order.item_id} className="order_items-container">
                        <p className="order_item-name">{order.item_name}</p>

                        <div className="order_item-quantity">
                            <div className="deleteBtn">
                                <MdDeleteOutline
                                    size={18}
                                    color={"#fff"}
                                    onClick={() => handleRemove(order)}
                                />
                            </div>

                            <div className="buttons_container">
                                <FaMinus
                                    size={24}
                                    color={"#f9a109"}
                                    onClick={() => handleDecrement(order)}
                                />
                                <div className="quantity_container">
                                    <p>
                                        {" "}
                                        <span>{order.item_quantity}</span> pcs
                                    </p>
                                </div>

                                <FaPlus
                                    color={"#f9a109"}
                                    size={24}
                                    onClick={() => handleIncrement(order)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
};

Orderitem.propTypes = {
    productData: PropTypes.object,
};

export default Orderitem;
``;
