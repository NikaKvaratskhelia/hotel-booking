import "./RoomsPage.scss";
import { useState, useEffect } from "react";
import { fetchCategories, fetchRooms } from "../../services/roomsServices";
import Loader from "../../components/loader/Loader";
import HotelCard from "../../components/HotelCard/HotelCard";

export default function RoomsPage() {
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState(null);
  const [categories, setCategories] = useState(null);
  const [wantedCategory, setWantedCategory] = useState(null);

  useEffect(() => {
    const loadRooms = async () => {
      setLoading(true);
      try {
        const rooms = await fetchRooms();
        const categories = await fetchCategories();

        setCategories(categories);
        setRooms(rooms);
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
      <div className="categories">
        <button
          className={wantedCategory === null ? "active" : ""}
          onClick={() => {
            setWantedCategory(null);
          }}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            className={wantedCategory === c.id ? "active" : ""}
            onClick={() => {
              setWantedCategory(c.id);
            }}
          >
            {c.name}
          </button>
        ))}
      </div>
      <div className="filters"></div>
      <div className="rooms">
        {(wantedCategory
          ? rooms.filter((r) => r.roomTypeId === wantedCategory)
          : rooms
        ).map((r) => (
          <HotelCard room={r} key={r.id} />
        ))}
      </div>
    </main>
  );
}
