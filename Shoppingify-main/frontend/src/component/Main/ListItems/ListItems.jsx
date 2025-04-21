import PropTypes from "prop-types";
import { IoIosAdd } from "react-icons/io";
import "./listitems.css";

import { addItemToCart } from "../../../store/slice/shoppingSlice.js";
import { addtoCart } from "../../../store/slice/orderSlice.js";

import { useDispatch } from "react-redux";

const ListItems = ({ items }) => {
    const dispatch = useDispatch();

    const handleAddToCart = async (item) => {
        dispatch(addtoCart(item))
        dispatch(addItemToCart(item));
    };

    return (
        <div className="listitems_container">
            {items?.productList?.map((item, index) => (
                <div key={index} className="productlist_container">
                    <p>{item.item_name}</p>
                    <IoIosAdd
                        size={22}
                        color="#C1C1C4"
                        onClick={() => handleAddToCart(item)}
                        style={{ cursor: "pointer" }}
                    />
                </div>
            ))}
        </div>
    );
};

ListItems.propTypes = {
    items: PropTypes.object,
};

export default ListItems;
