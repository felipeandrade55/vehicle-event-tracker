import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Associates from "./pages/Associates";
import Plan from "./pages/Plan";
import OccurrenceList from "./pages/OccurrenceList";
import OccurrenceDetails from "./pages/OccurrenceDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/associates" element={<Associates />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/occurrences" element={<OccurrenceList />} />
        <Route path="/occurrences/:id" element={<OccurrenceDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;