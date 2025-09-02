import { useParams, Link } from "react-router-dom";
import useLeadContext from "../contexts/LeadContext";

export default function AgentDetails() {

    const { agentId } = useParams();

    const {agentsData,  loading, error} = useLeadContext();

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

    const targetAgent = agentsData.find((agent) => agent._id === agentId);

    return (
        <main className="container py-4">
            <div>
                <h1 className="text-center py-4">Agent Management: <strong>{targetAgent.name}</strong></h1>
            </div>

            <div className="row d-flex justify-content-center">

                {/* sidebar */}
                <div className="col-md-4 border py-4 px-4">
                    <h3 className="fw-bold">Sidebar</h3>
                    <Link to="/agents" >Back to Agents Page</Link>
                </div>

                {/* all leads in a list */}
                <div className="col-md-8 border py-4 px-4">
                    <h3 className="text-center pb-4 fw-bold">Lead Details</h3>
                    <ul className="list-group">
                        <li className="list-group-item"><strong>Agent Name: </strong>{targetAgent.name}</li>
                        <li className="list-group-item"><strong>Agent Email: </strong>{targetAgent.email}</li>
                    </ul>
                </div>

            </div>
        </main>
    );
}