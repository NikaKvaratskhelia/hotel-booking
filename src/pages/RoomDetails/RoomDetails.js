import "./RoomDetails.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRoomById } from "../../services/roomsServices";
import Loader from "../../components/loader/Loader";

export default function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoom = async () => {
      try {
        const roomData = await fetchRoomById(id);
        setRoom(roomData);
      } catch (err) {
        console.error("Failed to fetch room:", err);
      } finally {
        setLoading(false);
      }
    };
    loadRoom();
  }, [id]);

  if (loading) return <Loader />;
  if (!room) return <div>Room not found</div>;

  return (
    <div className="room-details">
      <h2>{room.name}</h2>
      <p>ID: {room.id}</p>
    </div>
  );
}
