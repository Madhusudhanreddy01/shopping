import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import "./chart.css";

const data = [
    { name: "January", pv: 50, amt: 30 },
    { name: "February", pv: 233, amt: 150 },
    { name: "March", pv: 90, amt: 170 },
    { name: "April", pv: 200, amt: 200 },
    { name: "May", pv: 100, amt: 250 },
    { name: "June", pv: 600, amt: 400 },
    { name: "July", pv: 300, amt: 700 },
];

const Chart = () => {
    return (
        <div className="chartContainer">
            <div className="chartContainer_content">
                <h2 className="chartContainer_title">Monthly Summary</h2>
                <div className="chart_dispayContainer">
                    <LineChart width={550} height={300} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="pv"
                            stroke="#8884d8"
                            strokeDasharray="5 5"
                        />
                    </LineChart>
                </div>
            </div>
        </div>
    );
};

export default Chart;
