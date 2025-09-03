import Loading from "../components/Loading";
import useLeadContext from "../contexts/LeadContext";
import { Link, useParams } from "react-router-dom";
import { ToggleableSidebar } from "../components/ToggleableSidebar";

export default function LeadsByStatus() {

    const { loading, error } = useLeadContext();

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
            <ToggleableSidebar>
                <Sidebar />
            </ToggleableSidebar>
            <div>
                <h1 className="text-center py-4 fw-bold">Leads By Status</h1>
            </div>

            <div className="row d-flex justify-content-center mx-1">
                <div className="col-lg-3 d-none d-md-block border py-4 px-4">
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
    const { leadsData } = useLeadContext();
    const { leadStatus } = useParams();
    const filteredLeadsByStatus = leadsData.filter((lead) => lead.status === leadStatus);
    return (
        <>
        <h4 className="text-center fw-bold">Lead List By Status</h4>
        <div>
            <h5>Status: {leadStatus}</h5>
            <ul className="list-group">
                {
                    filteredLeadsByStatus.map((lead, index) => (
                        <li key={lead._id} className="list-group-item row">
                            <p className="fw-bold">Lead {index + 1}</p>
                            <p>Lead Name : <span className="fw-bold">{lead.name}</span></p>
                            <p>Sales Agent : <span className="fw-bold">{lead.salesAgent.name}</span></p>
                        </li>
                    ))
                }
            </ul>
        </div>
        </>
    );
}