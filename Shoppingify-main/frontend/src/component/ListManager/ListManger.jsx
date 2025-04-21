import "./listmanager.css";
import bottle from "../../assets/source.svg";
import ShoppingCart from "../shoppingChart/ShoppingCart";
import { MdEdit } from "react-icons/md";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { submitShoppingCart, emptyItem } from "../../store/slice/orderSlice.js";
import { emptyItemList } from "../../store/slice/shoppingSlice.js";

import { toast } from "react-toastify";

const ListManger = ({ openForm, setOpenForm }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [save, setSave] = useState(false);
    const [completed, setCompleted] = useState(false);

    const handleSubmit = () => {
        dispatch(submitShoppingCart(name));
        dispatch(emptyItemList());
        dispatch(emptyItem())
       setSave(false)
        toast.success("Order Placed");
    };

    const handleSave = () => {
        setCompleted(!completed);
        setSave(true);
    };

    const handleClear = () => {
        dispatch(emptyItemList());
    };

    return (
        <div className="listmanager_container">
            <div className="listmanager_image-container">
                <img src={bottle} alt="" />

                <div className="listmanager_image-content">
                    <p>Didn’t find what you need?</p>
                    <button onClick={() => setOpenForm(!openForm)}>
                        Add item
                    </button>
                </div>
            </div>
            <div className="shopping_heading">
                <h3 className="shoppingcart_title">Shopping list</h3>
                <MdEdit size={25} />
            </div>

            <ShoppingCart />

            <div className="saveOrder">
                <div className={save ? "" : "div"}>
                    {save ? (
                        <div className="div2">
                            <button
                                className="cancel_btn"
                                onClick={handleClear}
                            >
                                Cancel
                            </button>
                            <button
                                className="complete_btn"
                                onClick={handleSubmit}
                            >
                                Complete
                            </button>
                        </div>
                    ) : (
                        <>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter a name"
                                className="inputContainer"
                            />
                            <button
                                className="save_btn"
                                disabled={!name}
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

ListManger.propTypes = {
    setOpenForm: PropTypes.func,
    openForm: PropTypes.bool,
};

export default ListManger;
