import { Link } from "react-router-dom";
import useLeadContext from "../contexts/LeadContext";

export default function Header() {
    const { handleToggleSidebarClick } = useLeadContext(); 
    return (
        <header className="container d-flex align-items-center gap-5">
            <div className="d-flex d-md-none align-items-center justify-content-start gap-5 py-2">
                <button onClick={() => handleToggleSidebarClick(true)} className="btn btn-outline-dark" type="button"  aria-controls="offcanvasExample">
                    ☰
                </button>
                
            </div>
            <div className="nav gap-5 align-items-center">
                <Link to="/" className="navbar-brand text-secondary fw-bold">Anvaya CRM</Link>
                <ul className="navbar nav py-2">
                    <li className="nav-item d-none d-md-inline">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item d-none d-md-inline">
                        <Link to="/leads" className="nav-link">Leads</Link>
                    </li>
                    <li className="nav-item d-none d-md-inline">
                        <Link to="/agents" className="nav-link">Agents</Link>
                    </li>
                    <li className="nav-item d-none d-md-inline">
                        <Link to="/reports" className="nav-link">Reports</Link>
                    </li>
                </ul>
            </div>
            
        </header>
    );
}