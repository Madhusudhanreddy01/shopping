import "./statistics.css";
import CommonChart from "../CommonChart/CommonChart";
import { BASE_URL } from "../../constant/data.js";

// import Chart from "../Chart/Chart";
import { useEffect, useState } from "react";
const Statistics = () => {
    const [topItems, setTopItems] = useState(null);
    const [topCategory, settopCategory] = useState(null);

    const fetchTopItems = async () => {
        const res = await fetch(`${BASE_URL}/product/topItems`);
        const data = await res.json();
        setTopItems(data.data);
    };

    const fetchTopCategory = async () => {
        const res = await fetch(`${BASE_URL}/product/topCategory`);
        const data = await res.json();
        settopCategory(data.data);
    };

    useEffect(() => {
        fetchTopItems();
        fetchTopCategory();
    }, []);
    return (
        <div className="statistics_container">
            <div className="statistics_container-content">
                <CommonChart data={topItems} name="Top Items" />
                <CommonChart data={topCategory} name="Top Category" />
            </div>

            {/* <Chart /> */}
        </div>
    );
};

export default Statistics;
