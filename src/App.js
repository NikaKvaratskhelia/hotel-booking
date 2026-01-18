import "./App.scss";
import Footer from "./layout/Footer/Footer";
import Header from "./layout/Header/Header";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import RoomsPage from "./pages/RoomsPage/RoomsPage";
import RoomDetails from "./pages/RoomDetails/RoomDetails";

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
