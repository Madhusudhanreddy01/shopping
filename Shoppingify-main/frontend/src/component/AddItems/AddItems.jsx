import "./additems.css";

import { useState } from "react";
import CategoryList from "../CategoryList/CategoryList";
import { BASE_URL } from "../../constant/data";
import PropTypes from "prop-types";

const AddItems = ({ openForm, setOpenForm }) => {
    const [categoryModel, setCategoryModel] = useState(false);

    const [productDetails, setProductDetails] = useState({});

    const saveProduct = async () => {
        try {
            const res = await fetch(`${BASE_URL}/product/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productDetails),
            });
            const data = await res.json();
          
        } catch (error) {
            console.log(error);
        }

        setProductDetails({});
        setOpenForm(!openForm);
    };
    // Call the function to trigger the side effect

    const handleFocus = () => {
        setCategoryModel(!categoryModel);
    };

    const handleSave = () => {
        saveProduct();
    };

    const handleCancel = () => {
        setProductDetails({});
        setOpenForm(!openForm);
    };

    const handleOnChange = (e) => {
        setProductDetails((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };

    return (
        <div className="addItem_container">
            <h1 className="addItem_container-title">Add a new item</h1>

            <form className="formDiv">
                <div className="inputfield">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter a name"
                        onChange={handleOnChange}
                    />
                </div>

                <div className="inputfield">
                    <label>Note (optional)</label>

                    <textarea
                        id="note"
                        rows={3}
                        onChange={handleOnChange}
                    ></textarea>
                </div>

                <div className="inputfield">
                    <label>Image (optional)</label>
                    <input
                        type="text"
                        id="url"
                        placeholder="Enter a url"
                        onChange={handleOnChange}
                    />
                </div>

                <div className="inputfield">
                    <label>Category</label>
                    <input
                        onFocus={handleFocus}
                        type="text"
                        id="categoryName"
                        value={productDetails.categoryName}
                        placeholder="Enter a category"
                        onChange={handleOnChange}
                    />
                </div>
            </form>
            {categoryModel ? (
                <CategoryList
                    setProductDetails={setProductDetails}
                    productDetails={productDetails}
                    categoryModel={categoryModel}
                    setCategoryModel={setCategoryModel}
                />
            ) : (
                ""
            )}

            <div className="btn_container">
                <button onClick={handleCancel} className="can_btn">
                    cancel
                </button>
                <button onClick={handleSave} className="Save_btn">
                    Save
                </button>
            </div>
        </div>
    );
};

AddItems.propTypes = {
    setOpenForm: PropTypes.func,
    openForm: PropTypes.bool,
};

export default AddItems;
