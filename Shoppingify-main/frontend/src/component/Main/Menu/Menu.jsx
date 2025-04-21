import "./menu.css";
import ListItems from "../ListItems/ListItems.jsx";
import { BASE_URL } from "../../../constant/data.js";
import { useDispatch, useSelector } from "react-redux";
import {
    addItemToMenu,
    selectAllmenu,
} from "../../../store/slice/menuSlice.js";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect } from "react";

const Menu = () => {
    const dispatch = useDispatch();

    const menu = useSelector(selectAllmenu);

    useEffect(() => {
        const fetchAllProducts = async () => {
            const res = await fetch(`${BASE_URL}/product/menu`);
            const data = await res.json();

            dispatch(addItemToMenu(data.data));
        };
        fetchAllProducts();
    }, [dispatch]);

    return (
        <div className="main_container">
            <div className="header_container">
                <p>
                    <span>Shoppingify</span> allows you take your shopping list
                    wherever you go
                </p>
                <div className="search_container">
                    <IoSearchOutline size={20} style={{ marginRight: "5px" }} />
                    <input type="text" placeholder="search" />
                </div>
            </div>
            <div className="product_container">
                {menu[0]?.map((products) => (
                    <div key={products.productList[0].item_categoryId}>
                        <h2 className="product_category--name">
                            {products._id}
                        </h2>
                        <ListItems items={products} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;
