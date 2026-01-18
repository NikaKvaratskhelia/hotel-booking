import "./App.scss";
import Footer from "./layout/Footer/Footer";
import Header from "./layout/Header/Header";
import { Routes } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <Header />
      <Routes></Routes>
      <Footer />
    </div>
  );
}

export default App;
