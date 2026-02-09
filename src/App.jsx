import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";

function Placeholder({ title }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-3">{title}</h1>
        <p className="text-gray-600">
          This page is not converted yet. Upload the next HTML file and we’ll build it.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aplaya-cavite" element={<Placeholder title="Aplaya Cavite" />} />
      <Route path="/aplaya-cebu" element={<Placeholder title="Aplaya Cebu" />} />
      <Route path="/aplaya-bohol" element={<Placeholder title="Aplaya Bohol" />} />
    </Routes>
  );
}
