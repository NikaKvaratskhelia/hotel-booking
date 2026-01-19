import "./RoomsPage.scss";
import { useState, useEffect } from "react";
import {
  fetchCategories,
  fetchRooms,
  filterRooms,
} from "../../services/roomsServices";
import Loader from "../../components/loader/Loader";
import HotelCard from "../../components/HotelCard/HotelCard";
import RoomsFilter from "../../components/RoomsFilter/RoomsFilter";

export default function RoomsPage() {
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState(null);
  const [categories, setCategories] = useState(null);
  const [wantedCategory, setWantedCategory] = useState(null);
  const [filters, setFilters] = useState(null);

  const handleFilter = (filterData) => {
    console.log("Data from child:", filterData);
    setFilters(filterData);
  };

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

    const loadFilteredRooms = async () => {
      setLoading(true);
      try {
        const rooms = await filterRooms(filters);

        setRooms(rooms);
      } finally {
        setLoading(false);
      }
    };

    filters == null ? loadRooms() : loadFilteredRooms();
  }, [filters]);

  return loading ? (
    <Loader />
  ) : (
    <main className="roomspage-container">
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
            key={c.id}
            className={wantedCategory === c.id ? "active" : ""}
            onClick={() => {
              setWantedCategory(c.id);
            }}
          >
            {c.name}
          </button>
        ))}
      </div>
      <div className="filters">
        <RoomsFilter categories={categories} onFilter={handleFilter} />
      </div>
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
