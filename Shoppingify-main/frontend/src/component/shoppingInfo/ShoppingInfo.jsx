import { useState } from "react";
import "./shoppinginfo.css";
import ListManager from "../ListManager/ListManger.jsx";
import AddItems from "../AddItems/AddItems.jsx";
const ShoppingInfo = () => {
    const [openForm, setOpenForm] = useState(false);

    return (
        <div className="shoppinginfo">
            {openForm ? (
                <AddItems setOpenForm={setOpenForm} openForm={openForm} />
            ) : (
                <ListManager setOpenForm={setOpenForm} openForm={openForm} />
            )}
        </div>
    );
};

export default ShoppingInfo;
