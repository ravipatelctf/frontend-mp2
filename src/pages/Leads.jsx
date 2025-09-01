import { Link } from "react-router-dom";
// import { getAllLeads, getAllAgents } from "../data";
import { useEffect, useState } from "react";
import useLeadContext from "../contexts/LeadContext";



export default function Leads() {

    const [statusSelect, setStatusSelect] = useState("");
    const [agentSelect, setAgentSelect] = useState("");

    const {leadsData, agentsData, loading, error, uniqueAgentEmailPair} = useLeadContext();

    const filteredLeads = leadsData.filter((lead) => {
        const filter1 = !statusSelect || lead.status === statusSelect
        const filter2 = !agentSelect || lead.salesAgent.email === agentSelect
        return filter1 && filter2;
    });    
    
    function handleClearFilters() {
        setStatusSelect("");
        setAgentSelect("");
    }

    function handleStatusSelect(event) {
        setStatusSelect(event.target.value);
    }

    function handleAgentSelect(event) {
        setAgentSelect(event.target.value);
    }

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
                <h1 className="text-center py-4 fw-bold">Leads List</h1>
            </div>

            <div className="row d-flex justify-content-center">

                {/* sidebar */}
                <div className="col-lg-4 border py-4 px-4">
                    <h3 className="fw-bold">Sidebar</h3>
                    <Link to="/" >Back to Dashboard</Link>

                    {/* filters */}
                    <div className="py-4">
                        <div className="d-flex justify-content-between py-2 align-items-center">
                            <span className="fw-bold">Filters:</span>
                            <span className="btn btn-outline-danger" onClick={() => handleClearFilters()}>Clear</span>
                        </div>
                        {/* filter by status */}
                        <select 
                            id="statusSelect"
                            value={statusSelect}
                            onChange={(event) => handleStatusSelect(event)}
                            className="form-select mt-4"
                        >
                            <option value="" disabled>Filter By Status</option>
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Proposal Sent">Proposal Sent</option>
                            <option value="Closed">Closed</option>
                        </select>

                        {/* filter by sales agent */}
                        <select 
                            id="agentSelect"
                            value={agentSelect}
                            onChange={(event) => handleAgentSelect(event)}
                            className="form-select mt-4"
                        >
                            <option value="" disabled>Filter By Sales Agent Username</option>
                            {
                                uniqueAgentEmailPair && Object.entries(uniqueAgentEmailPair).map(([key, value]) => (
                                    <option key={key} value={key}>{key.split("@")[0]}</option>
                                ))
                            }
                        </select>

                        {/* Link to Add New Lead page  */}
                        <div className="mt-4">
                            <Link to="/leads/add-new-lead" className="btn btn-primary w-100 fw-bold">Add New Lead</Link>
                        </div>

                    </div>
                </div>

                {/* all leads in a list */}
                <div className="col-lg-8 border py-4 px-4">
                    <h3 className="text-center pb-4 fw-bold">Leads Overview</h3>
                    <ul className="list-group">
                        {
                            (filteredLeads ? filteredLeads : leadsData).map((lead, index) => (
                                <li key={lead._id} className="list-group-item">
                                    <p className="d-flex justify-content-between">
                                        <span>
                                            <Link to={`/leads/${lead._id}`} >Lead {index + 1}</Link>    
                                        </span>
                                        <span>{lead.status}</span>
                                        <span>{lead.name}</span>
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