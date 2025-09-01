import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="container">
            <ul className="nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/leads" className="nav-link">Leads</Link>
                </li>
                <li className="nav-item">
                    <Link to="/leads/add-new-lead" className="nav-link">Add New Lead</Link>
                </li>
                <li className="nav-item">
                    <Link to="/agents" className="nav-link">Sales Agents</Link>
                </li>
            </ul>
        </header>
    );
}