import PropTypes from "prop-types";
import "./category.css";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constant/data.js";
import { toast } from "react-toastify";

const CategoryList = ({
    setCategoryModel,
    setProductDetails,
    productDetails,
}) => {
    const [categoreylist, setCategorylist] = useState([]);

    useEffect(() => {
        const fetchCategoryList = async () => {
            try {
                const res = await fetch(`${BASE_URL}/product/categorey`);
                const data = await res.json();
                setCategorylist(data.data);
            } catch (error) {
                console.log(error);
                toast.error("Error while fetching Categories");
            }
        };

        fetchCategoryList();
    }, []);

    const handleSelected = (id, value) => {
        setProductDetails({ ...productDetails, categoryName: value });
        setCategoryModel(false);
    };
    return (
        <div className="categorylist_container">
            {categoreylist?.map((category) => {
                const { _id, categoryName } = category;
                return (
                    <div
                        key={_id}
                        onClick={() => handleSelected(_id, categoryName)}
                        className="categorylist_name"
                    >
                        {categoryName}
                    </div>
                );
            })}
        </div>
    );
};

CategoryList.propTypes = {
    setProductDetails: PropTypes.func.isRequired,
    setCategoryModel: PropTypes.func.isRequired,
    productDetails: PropTypes.object,
};

export default CategoryList;
