import "./history.css";
import CardContainer from "../cardContainer/CardContainer";
import { history } from "../../constant/data";

const History = () => {
    
    return (

        <div className="history_container">
            <h1>{history?.history_container?.title}</h1>

            {history?.history_container?.history.map((data,index) => (
                <div className="history" key={index}>
                     <p>{data.date}</p>
                    <CardContainer list={data.items} key={index+data.date}/>
                </div>
            ))}

        </div>
    );
};

export default History;
