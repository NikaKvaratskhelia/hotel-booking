import { Link } from "react-router-dom";
import "./HotelCard.scss";

export default function HotelCard(props) {

  return (
    <div className="card-wrapper">
      <div className="inner-container">
        <img src={props.room.images[0].source} alt="Room" />
        <div className="info">
          <p className="name">{props.room.name}</p>
          <p className="price">
            <span>{props.room.pricePerNight}$</span>
            <span>a night</span>
          </p>
        </div>
        <Link to={`/rooms/${props.room.id}`} className="book-btn">
            Book Now
        </Link>
      </div>
    </div>
  );
}
