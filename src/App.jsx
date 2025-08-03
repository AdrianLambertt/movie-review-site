import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster"; // or wherever it's defined
import Navbar from "./components/navbar";
import Home from "./pages/home";
import About from "./pages/about";
import ReviewPage from "./pages/ReviewPage";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
      <Toaster />
    </>
  );
}
