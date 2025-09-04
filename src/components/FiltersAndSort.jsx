
import useLeadContext from "../contexts/LeadContext";


export function FilterByStatus() {
    const { statusSelect, handleStatusSelect} = useLeadContext();
    return (
        <div className="col-md-4">
            {/* <label htmlFor="statusSelect" className="fw-bold">Filters:</label> */}
            <select 
                id="statusSelect"
                value={statusSelect}
                onChange={(event) => handleStatusSelect(event)}
                className="form-select"
            >
                <option value="" disabled>FilterBy: Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Closed">Closed</option>
            </select>
        </div>
    );
}

export function FilterByAgent() {
    const { agentSelect, handleAgentSelect, uniqueAgentEmailPair } = useLeadContext();
    return (
        <div className="col-md-4">
            <select 
                id="agentSelect"
                value={agentSelect}
                onChange={(event) => handleAgentSelect(event)}
                className="form-select">
                <option value="" disabled>FilterBy: Agent</option>
                {
                    uniqueAgentEmailPair && Object.entries(uniqueAgentEmailPair).map(([key, value]) => (
                        <option key={key} value={key}>{key.split("@")[0]}</option>
                    ))
                }
            </select>
        </div>
    );
}


export function SortByPriority() {
    const { prioritySort, setPrioritySort } = useLeadContext();
    return (
        <div className="col-md-4">
            <select 
                id="priority"
                value={prioritySort}
                onChange={(event) => setPrioritySort(event.target.value)}
                className="form-select"
            >
                <option value="" disabled>SortBy: Priority</option>
                <option value="HighToLow">High To Low</option>
                <option value="LowToHigh">Low To High</option>
            </select>
        </div>
    );
}

export function SortByTimeToClose() {
    const { timeToCloseSort, setTimeToCloseSort } = useLeadContext();
    return (
        <div className="col-md-4">
            <select 
                id="timeToClose"
                value={timeToCloseSort}
                onChange={(event) => setTimeToCloseSort(event.target.value)}
                className="form-select"
            >
                <option value="" disabled>SortBy: Time to Close</option>
                <option value="Ascending">Shortest To Longest</option>
                <option value="Descending">Longest To Shortest</option>
            </select>
        </div>
    );
}


export function FiltersAndSort({children}) {
    const { handleClearFilters } = useLeadContext();
    return (
        <>
            <div className="d-flex justify-content-between align-items-center py-2">
                <span className="fw-bold">Filters & Sort:</span>
                <span className="btn btn-sm btn-outline-danger" onClick={() => handleClearFilters()}>Clear</span>
            </div>

            <div className="row py-2 gap-2 justify-content-between">
                <label htmlFor="statusSelect" className="fw-bold col-md-2">Filters:</label>
                {children}
            </div>
            
            <div className="row gap-2 justify-content-between">
                <label htmlFor="priority" className="fw-bold col-md-2">Sort By:</label>
                <SortByPriority />
                <SortByTimeToClose />
            </div>
        </>  
    );
}