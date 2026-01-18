import "./Homepage.scss";
import Loader from "../../components/loader/Loader";
import { useEffect, useState } from "react";
import { fetchfavRooms } from "../../services/roomsServices";
import { Link } from "react-router-dom";
import HotelCard from "../../components/HotelCard/HotelCard";

export default function Homepage() {
  const [loading, setLoading] = useState(true);
  const [favRooms, setFavRooms] = useState(null);

  useEffect(() => {
    const loadRooms = async () => {
      setLoading(true);
      try {
        const rooms = await fetchfavRooms();
        const sortedRooms = [...rooms]
          .sort((a, b) => b.bookedDates.length - a.bookedDates.length)
          .slice(0, 6);
        setFavRooms(sortedRooms);
      } finally {
        setLoading(false);
      }
    };
    loadRooms();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <main>
      <div className="bg-div">
        <div className="text-wrapper">
          <h1>Five Star Hotels</h1>
          <h2>And We Like To Keep It That Way</h2>
          <Link to={"/hotels"}>See Hotels</Link>
        </div>
      </div>

      <div className="guestfav-wrapper">
        <h3>
          <span>Guests Favorite Rooms</span>
        </h3>
        <div className="guestfavs">
          {favRooms.map((r) => (
            <HotelCard room={r} key={r.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
