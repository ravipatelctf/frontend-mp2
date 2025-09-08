

import useLeadContext from "../contexts/LeadContext";
import { Link } from "react-router-dom";
import { MainArea, PageTitle } from "../components/MainArea";


export default function SalesAgent() {
    return (
        <MainArea>
            <PageTitle label="Sales Agents Management" />
            <ContentBody />
        </MainArea>
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
        <div className="d-flex justify-content-end">
            <Link to="/agents/add-new-agent" className="btn btn-success fw-bold mt-2">Add New Agent</Link>
        </div>
        </>
    );
}