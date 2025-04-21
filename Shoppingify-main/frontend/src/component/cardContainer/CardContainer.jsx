import { PiCalendar } from "react-icons/pi";
import { RiArrowRightSLine } from "react-icons/ri";
import PropTypes from "prop-types";

const CardContainer = ({ list }) => {
    return (
        <>
            {list?.map((item, index) => (
                <div className="card" key={index}>
                    <h5>{item.name}</h5>
                    <div className="card-container">
                        <div className="calendar-container">
                            <PiCalendar size={20} color="#C1C1C4" />
                            <span>{item.date}</span>
                        </div>
                        <button className="completed-btn">{item.status}</button>
                        <RiArrowRightSLine size={26} color="#F9A109" />
                    </div>
                </div>
            ))}
        </>
    );
};

CardContainer.propTypes = {
      name: PropTypes.string,
      list: PropTypes.array,
  };

export default CardContainer;
