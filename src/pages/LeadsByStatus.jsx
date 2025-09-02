import useLeadContext from "../contexts/LeadContext";
import { Link, useParams } from "react-router-dom";

export default function LeadsByStatus() {

    const { leadsData, agentsData, loading, error } = useLeadContext();

    const { leadStatus } = useParams();
    console.log("leadStatus:", leadStatus);

    const filteredLeadsByStatus = leadsData.filter((lead) => lead.status === leadStatus);
    console.log("filteredLeadsByStatus:", filteredLeadsByStatus);

    if (loading) {
        return <p className="text-center">Loading...</p>
    }

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
                <h1 className="text-center py-4 fw-bold">Leads By Status</h1>
            </div>

            <div className="row d-flex justify-content-center">

                {/* sidebar */}
                <div className="col-lg-3 border py-4 px-4">
                    <h3 className="fw-bold">Sidebar</h3>
                    <Link to="/" >Back to Dashboard</Link>
                </div>
                
                {/* content area */}
                <div className="col-lg-9 border py-4 px-4">
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
                </div>
            </div>
        </main>
    );
}