import useLeadContext from "../contexts/LeadContext";
import { Link } from "react-router-dom";

export default function SalesAgent() {

    const { agentsData, loading, error } = useLeadContext();

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
                <h1 className="text-center py-4 fw-bold">Sales Agents Management</h1>
            </div>

            <div className="row d-flex justify-content-center">

                {/* sidebar */}
                <div className="col-lg-3 border py-4 px-4">
                    <h3 className="fw-bold">Sidebar</h3>
                    <Link to="/" >Back to Dashboard</Link>

                    <div className="py-4">
                        <Link to="/agents/add-new-agent" className="btn btn-primary w-100 fw-bold">Add New Agent</Link>
                    </div>
                </div>

                {/* all leads in a list */}
                <div className="col-lg-9 border py-4 px-4">
                    <h3 className="text-center pb-4 fw-bold">Sales Agents List</h3>
                    <ul className="list-group">
                        {
                            agentsData.map((agent, index) => (
                                <li key={agent._id} className="list-group-item">
                                    <p className="row">
                                    <span className="col-12 col-md-4 pt-1">Agent: {index + 1}</span>
                                    <span className="col-12 col-md-4 fw-bold pt-1"><Link to={`/leads/agent/${agent.email.split("@")[0]}`}>{agent.name}</Link></span>
                                    <span className="col-12 col-md-4 pt-1">{agent.email}</span>
                                    </p>
                                </li>
                            ))
                        }
                        
                    </ul>
                </div>

            </div>
        </main>
    );
}