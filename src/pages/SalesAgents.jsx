import Loading from "../components/Loading";
import useLeadContext from "../contexts/LeadContext";
import { Link } from "react-router-dom";

export default function SalesAgent() {

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
            <div>
                <h1 className="text-center py-4 fw-bold">Sales Agents Management</h1>
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

        <div className="py-4">
            <Link to="/agents/add-new-agent" className="btn btn-primary w-100 fw-bold">Add New Agent</Link>
        </div>
        </>
    );
}


function ContentBody() {

    const {agentsData} = useLeadContext();
    return (
        <>
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
        </>
    );
}