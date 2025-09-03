import useLeadContext from "../contexts/LeadContext";
import { Link, useParams } from "react-router-dom";

export default function LeadsBySalesAgent() {

    const { leadsData, agentsData, loading, error } = useLeadContext();

    const { agentUsername } = useParams();
    console.log("agentUsername:", agentUsername);

    const filteredLeadsByAgents = leadsData.filter((lead) => lead.salesAgent.email.split("@")[0] === agentUsername);
    console.log("filteredLeadsByAgents:", filteredLeadsByAgents);

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
                <h1 className="text-center py-4 fw-bold">Leads By Sales Agent</h1>
            </div>

            <div className="row d-flex justify-content-center">

                {/* sidebar */}
                <div className="col-lg-3 border py-4 px-4">
                    <h3 className="fw-bold">Sidebar</h3>
                    <Link to="/" >Back to Dashboard</Link>
                </div>
                
                {/* content area */}
                <div className="col-lg-9 border py-4 px-4">
                    <h4 className="text-center fw-bold">Lead List By Agent</h4>
                    <div>
                        <h5 className="py-2">Sales Agent Username: <strong>{agentUsername}</strong></h5>
                        <ul className="list-group">
                            {
                                filteredLeadsByAgents.map((lead, index) => (
                                    <li key={lead._id} className="list-group-item row">
                                        <p className="fw-bold">Lead {index + 1}</p>
                                        <p>Lead Name : <span className="fw-bold">{lead.name}</span></p>
                                        <p>Status : <span className="fw-bold">{lead.status}</span></p>
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