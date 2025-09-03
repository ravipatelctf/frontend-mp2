import { Link } from "react-router-dom";
import useLeadContext from "../contexts/LeadContext";

export default function Header() {
    const { handleToggleSidebarClick } = useLeadContext(); 
    return (
        <header className="container">
            <div className="d-flex d-md-none align-items-center justify-content-start gap-5 py-2">
                <button onClick={() => handleToggleSidebarClick(true)} className="btn btn-outline-dark" type="button"  aria-controls="offcanvasExample">
                    ☰
                </button>
                <h4 className="fw-bold m-0">anvaya CRM</h4>
            </div>
            <div className="d-none d-md-inline">
                <ul className="nav py-2">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/leads" className="nav-link">Leads</Link>
                </li>
                <li className="nav-item">
                    <Link to="/agents" className="nav-link">Agents</Link>
                </li>
                <li className="nav-item">
                    <Link to="/reports" className="nav-link">Reports</Link>
                </li>
            </ul>
            </div>
            
        </header>
    );
}