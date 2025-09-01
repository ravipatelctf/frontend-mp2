import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Leads from "./pages/Leads";
import Header from "./components/Header";
import LeadDetails from "./pages/LeadDetails";
import AddNewLead from "./pages/AddNewLead";
import { LeadProvider } from "./contexts/LeadContext";
import SalesAgent from "./pages/SalesAgents";
import AddNewAgent from "./pages/AddNewAgent";


export default function App() {

    return (
        <LeadProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/leads" element={<Leads />} />
                    <Route path="/leads/:leadId" element={<LeadDetails />} />
                    <Route path="/leads/add-new-lead" element={<AddNewLead />} />
                    <Route path="/agents" element={<SalesAgent />} />
                    <Route path="/agents/add-new-agent" element={<AddNewAgent />} />
                </Routes>
            </Router>
        </LeadProvider>
    );
}

