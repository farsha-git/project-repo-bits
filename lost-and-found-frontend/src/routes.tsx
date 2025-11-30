import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LostList from "./pages/LostList";
import FoundList from "./pages/FoundList";
import ReportForm from "./pages/ReportForm";
import ItemDetail from "./pages/ItemDetail";
import Profile from "./pages/Profile";
import Header from "./components/Header";

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lost" element={<LostList />} />
        <Route path="/found" element={<FoundList />} />
        <Route path="/report" element={<ReportForm />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
