import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../component/sidebarcomponent/SideBar";
import "./layout.css";

import ShoppingInfo from "../component/shoppingInfo/ShoppingInfo";

const Layout = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex h-screen">
            <SideBar open={open} setOpen={setOpen} />
            <Outlet />
            <ShoppingInfo />
        </div>
    );
};

export default Layout;
