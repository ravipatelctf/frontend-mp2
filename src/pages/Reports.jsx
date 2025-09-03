import Loading from "../components/Loading";
import useLeadContext from "../contexts/LeadContext";
import { Link } from "react-router-dom";

export default function Reports() {

    const { leadsData, agentsData, loading, error } = useLeadContext();

    if (error) {
        return (
            <div className="text-center">
                <p>An Error Occurred..</p>
                <Link to="/">Go Back Home</Link>
            </div>
        );
    }

    return (
        <main className="container py-4">
            <div>
                <h1 className="text-center py-4 fw-bold">Anvaya CRM Reports</h1>
            </div>

            <div className="row d-flex justify-content-center mx-1">
                <div className="col-lg-3 border py-4 px-4">
                    <Sidebar />
                </div>
                <div className="col-lg-9 border py-4 px-4">
                    { loading ? (<Loading />) : (<ContentBody />) }
                </div>
            </div>
        </main>
    );
}

function Sidebar() {
    return (
        <>
        <Link to="/" >Back to Dashboard</Link>
        </>
    );
}


function ContentBody() {
    const { leadsData, agentsData } = useLeadContext();
    return (
        <>
        <h3 className="text-center pb-4 fw-bold">Report Overview</h3>
        <ul className="list-group">
            <li className="list-group-item row">
                <span className="col-6 fw-bold">Total Leads:</span>
                <span className="col-6">{leadsData.length}</span>
            </li>
            <li className="list-group-item row">
                <span className="col-6 fw-bold">Total Agents:</span>
                <span className="col-6">{agentsData.length}</span>
            </li>
        </ul>
        </>
    );
}