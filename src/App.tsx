import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import OccurrenceList from "./pages/OccurrenceList";
import OccurrenceDetails from "./pages/OccurrenceDetails";
import { OccurrenceForm } from "./components/occurrences/OccurrenceForm";

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<OccurrenceList />} />
        <Route path="/occurrences" element={<OccurrenceList />} />
        <Route path="/occurrences/new" element={<OccurrenceForm />} />
        <Route path="/occurrences/:id" element={<OccurrenceDetails />} />
      </Route>
    </Routes>
  );
}

export default App;