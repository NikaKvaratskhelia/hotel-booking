import "./App.scss";
import Footer from "./layout/Footer/Footer";
import Header from "./layout/Header/Header";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
