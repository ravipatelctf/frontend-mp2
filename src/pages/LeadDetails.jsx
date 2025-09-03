import { useParams, Link } from "react-router-dom";
import useLeadContext from "../contexts/LeadContext";

export default function LeadDetails() {

    const { leadId } = useParams();

    const {leadsData, agentsData, loading, error} = useLeadContext();

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

    const targetLead = leadsData.find((lead) => lead._id === leadId);

    return (
        <main className="container py-4">
            <div>
                <h1 className="text-center py-4">Lead Management: <strong>{targetLead.name}</strong></h1>
            </div>

            <div className="row d-flex justify-content-center">

                {/* sidebar */}
                <div className="col-md-4 border py-4 px-4">
                    <h3 className="fw-bold">Sidebar</h3>
                    <Link to="/leads" >Back to Leads Page</Link>
                </div>

                {/* all leads in a list */}
                <div className="col-md-8 border py-4 px-4">
                    <h3 className="text-center pb-4 fw-bold">Lead Details</h3>
                    <ul className="list-group">
                        <li className="list-group-item"><strong>Lead Name: </strong>{targetLead.name}</li>
                        <li className="list-group-item"><strong>Sales Agent: </strong>
                            <Link to={`/leads/agent/${targetLead.salesAgent.email.split("@")[0]}`}>{targetLead.salesAgent.name}</Link>
                        </li>
                        <li className="list-group-item"><strong>Lead Source: </strong>{targetLead.source}</li>
                        <li className="list-group-item"><strong>Lead Status: </strong>{targetLead.status}</li>
                        <li className="list-group-item"><strong>Priority: </strong>{targetLead.priority}</li>
                        <li className="list-group-item"><strong>Time to Close: </strong>{targetLead.timeToClose} days</li>
                    </ul>
                </div>

            </div>
        </main>
    );
}