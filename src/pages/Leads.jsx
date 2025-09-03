import { Link } from "react-router-dom";
// import { getAllLeads, getAllAgents } from "../data";
import { useState } from "react";
import useLeadContext from "../contexts/LeadContext";
import Loading from "../components/Loading";


export default function Leads() {

    const [statusSelect, setStatusSelect] = useState("");
    const [agentSelect, setAgentSelect] = useState("");
    const [prioritySort, setPrioritySort] = useState("");
    const [timeToCloseSort, setTimeToCloseSort] = useState("");

    const {leadsData, loading, error, uniqueAgentEmailPair} = useLeadContext();


    function getSortByTimeToClose(lead) {
        if (timeToCloseSort === "LessThanFiveDays") return lead.timeToClose < 5;
        if (timeToCloseSort === "BetweenFiveToTenDays") return lead.timeToClose >= 5 && lead.timeToClose <= 10;
        if (timeToCloseSort === "MoreThanTenDays") return lead.timeToClose > 10;
    }
    
    const filteredLeads = leadsData.filter((lead) => {
        const filterByStatus = !statusSelect || lead.status === statusSelect;
        const filterByAgent = !agentSelect || lead.salesAgent.email === agentSelect;
        const sortByPriority = !prioritySort || lead.priority === prioritySort;
        const sortByTimeToClose = !timeToCloseSort || getSortByTimeToClose(lead);
        return filterByStatus && filterByAgent && sortByPriority & sortByTimeToClose;
    });    

    function handleClearFilters() {
        setStatusSelect("");
        setAgentSelect("");
        setPrioritySort("");
        setTimeToCloseSort("");
    }

    function handleStatusSelect(event) {
        setStatusSelect(event.target.value);
    }

    function handleAgentSelect(event) {
        setAgentSelect(event.target.value);
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

            <div className="row d-flex justify-content-center mx-1">
                <div className="col-lg-3 border py-4 px-4">
                    <Sidebar
                        statusSelect={statusSelect}
                        agentSelect={agentSelect}
                        prioritySort={prioritySort}
                        timeToCloseSort={timeToCloseSort}
                        handleClearFilters={handleClearFilters}
                        handleStatusSelect={handleStatusSelect}
                        handleAgentSelect={handleAgentSelect}
                        uniqueAgentEmailPair={uniqueAgentEmailPair}
                        setPrioritySort={setPrioritySort}
                        setTimeToCloseSort={setTimeToCloseSort}
                    />
                </div>
                <div className="col-lg-9 border py-4 px-4">
                    {loading ? (<Loading />) : ( <ContentBody filteredLeads={filteredLeads} /> )}
                </div>
            </div>
        </main>
    );
}


function Sidebar({ statusSelect, agentSelect, prioritySort, timeToCloseSort, handleClearFilters, handleStatusSelect, handleAgentSelect, uniqueAgentEmailPair, setPrioritySort, setTimeToCloseSort }) {
    return (
        <>
            <Link to="/" >Back to Dashboard</Link>
            <hr />

            {/* filters & sort */}
            <div className="py-2">
                <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Filters & Sort:</span>
                    <span className="btn btn-outline-danger" onClick={() => handleClearFilters()}>Clear</span>
                </div>

                {/* filter by status */}
                <div className="mt-4">
                    <label htmlFor="statusSelect" className="fw-bold">Filter By Status:</label>
                    <select 
                        id="statusSelect"
                        value={statusSelect}
                        onChange={(event) => handleStatusSelect(event)}
                        className="form-select pt-1"
                    >
                        <option value="" disabled>Filter By Status</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>

                {/* filter by sales agent */}
                <div className="mt-4">
                    <label htmlFor="agentSelect" className="fw-bold">Filter By Agent:</label>
                    <select 
                        id="agentSelect"
                        value={agentSelect}
                        onChange={(event) => handleAgentSelect(event)}
                        className="form-select"
                    >
                        <option value="" disabled>Filter By Sales Agent Username</option>
                        {
                            uniqueAgentEmailPair && Object.entries(uniqueAgentEmailPair).map(([key, value]) => (
                                <option key={key} value={key}>{key.split("@")[0]}</option>
                            ))
                        }
                    </select>
                </div>

                {/* sort by priority */}
                <div className="mt-4">
                    <label htmlFor="priority" className="fw-bold">Sort By Priority:</label>
                    <br />
                    <input type="radio" checked={prioritySort === "High"} name="priority" id="High" value="High" onChange={(event) => setPrioritySort(event.target.value)} /> High
                    <br />
                    <input type="radio" checked={prioritySort === "Medium"} name="priority" id="Medium" value="Medium" onChange={(event) => setPrioritySort(event.target.value)}  /> Medium
                    <br />
                    <input type="radio" checked={prioritySort === "Low"} name="priority" id="Low" value="Low" onChange={(event) => setPrioritySort(event.target.value)}  /> Low
                </div>

                {/* sort by timeToClose */}
                <div className="mt-4">
                    <label htmlFor="timeToClose" className="fw-bold">Sort By Time to Close:</label>
                    <br />
                    <input type="radio" checked={timeToCloseSort === "LessThanFiveDays"} name="timeToClose" id="LessThanFiveDays" value="LessThanFiveDays" onChange={(event) => setTimeToCloseSort(event.target.value)} /> Less Than Five Days
                    <br />
                    <input type="radio" checked={timeToCloseSort === "BetweenFiveToTenDays"} name="timeToClose" id="BetweenFiveToTenDays" value="BetweenFiveToTenDays" onChange={(event) => setTimeToCloseSort(event.target.value)}  /> Between Five To Ten Days
                    <br />
                    <input type="radio" checked={timeToCloseSort === "MoreThanTenDays"} name="timeToClose" id="MoreThanTenDays" value="MoreThanTenDays" onChange={(event) => setTimeToCloseSort(event.target.value)}  /> More Than Ten Days
                </div>
                <hr />
                {/* Link to Add New Lead page  */}
                <div className="pt-2">
                    <Link to="/leads/add-new-lead" className="btn btn-primary w-100 fw-bold">Add New Lead</Link>
                </div>

            </div>
        </>
    );
}

function ContentBody({filteredLeads}) {

    const {loading} = useLeadContext();
    return (
        <>
            <h3 className="text-center pb-4 fw-bold">Leads Overview</h3>
            {
                loading ? (
                    <Loading />
                ) : (
            <ul className="list-group">
                {
                    (filteredLeads ? filteredLeads : leadsData).map((lead, index) => (
                        <li key={lead._id} className="list-group-item">
                            <p className="row">
                                <span className="col-md-4">
                                    <Link to={`/leads/${lead._id}`} >Lead {index + 1}</Link>    
                                </span>
                                <span className="col-md-4">
                                    <Link to={`/leads/status/${lead.status}`}>{lead.status}</Link>
                                </span>
                                <span className="col-md-4">{lead.name}</span>
                            </p>
                        </li>
                    ))
                }
            </ul>
            )}
        </>
    );
}