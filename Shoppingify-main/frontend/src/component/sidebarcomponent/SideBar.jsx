import { useState } from "react";
import { TfiMenuAlt } from "react-icons/tfi";
import { MdRefresh } from "react-icons/md";
import { MdInsertChartOutlined } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import PropTypes from "prop-types";

const SideBar = ({ open, setOpen }) => {
    const [selectedItem, setSelectedItem] = useState(
        localStorage.getItem("key")
    );
    const navigate = useNavigate();

    const handleNavigate = (value, location) => {
        setSelectedItem(localStorage.setItem("key", value));
        navigate(location);
    };

    return (
        <div className="flex flex-col items-center justify-between py-7 w-[90px] shadow-2xl relative sm:py-8">
            <Link to="/">
                <div>
                    <img src={Logo} alt="logo" />
                </div>
            </Link>

            <div className="flex flex-col gap-11">
                <div className="flex ">
                    <div
                        className={
                            selectedItem === 0
                                ? "w-[6px] h-[35px] bg-light-orange rounded-tr-2xl rounded-br-xl absolute left-0"
                                : "hidden"
                        }
                    />
                    <TfiMenuAlt
                        size={30}
                        className="cursor-pointer"
                        onClick={() => handleNavigate(0, "/")}
                    />
                </div>

                <div className="flex justify-start">
                    <div
                        className={
                            selectedItem === 1
                                ? "w-[6px] h-[35px] bg-light-orange rounded-tr-2xl rounded-br-xl absolute left-0"
                                : "hidden"
                        }
                    />
                    <MdRefresh
                        size={30}
                        className="cursor-pointer"
                        onClick={() => handleNavigate(1, "/history")}
                    />
                </div>

                <div className="flex justify-start">
                    <div
                        className={
                            selectedItem === 2
                                ? "w-[6px] h-[35px] bg-light-orange rounded-tr-2xl rounded-br-xl absolute left-0"
                                : "hidden"
                        }
                    />
                    <MdInsertChartOutlined
                        size={30}
                        className="cursor-pointer"
                        onClick={() => handleNavigate(2, "/chart")}
                    />
                </div>
            </div>

            <div className="bg-amber-400 rounded-3xl w-[40px] h-[40px]  bg-light-orange">
                <MdShoppingCart
                    size={35}
                    color="white"
                    className="cursor-pointer pl-2 pt-1"
                    onClick={() => setOpen(!open)}
                />
            </div>
        </div>
    );
};

SideBar.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
};

export default SideBar;
