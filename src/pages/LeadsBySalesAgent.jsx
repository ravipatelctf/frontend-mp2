
import useLeadContext from "../contexts/LeadContext";
import { useParams } from "react-router-dom";
import { MainArea, PageTitle } from "../components/MainArea";
import { FiltersAndSort, FilterByStatus } from "../components/FiltersAndSort";

export default function LeadsBySalesAgent() {
    return (
        <MainArea>
            <PageTitle label="Leads By Sales Agent" />
            <ContentBody>
                <FiltersAndSort>
                    <FilterByStatus />
                </FiltersAndSort>
            </ContentBody>
        </MainArea>
    );
}

function ContentBody({children}) {
    const { leadsData, filterLeads } = useLeadContext();
    const { agentUsername } = useParams();
    const filteredLeadsByAgents = leadsData.filter((lead) => lead.salesAgent.email.split("@")[0] === agentUsername);
    return (
        <>
        <h4 className="text-center fw-bold">Lead List By Agent</h4>
        <div className="pb-2">
            {children}
        </div>
        <div>
            <hr />
            <h5 className="py-2">Agent: <strong>{agentUsername}</strong></h5>
            <ul className="list-group">
                {
                    filterLeads(filteredLeadsByAgents).map((lead, index) => (
                        <li key={lead._id} className="list-group-item row">
                            <p className="fw-bold">Lead {index + 1}</p>
                            <p>Lead Name : <span className="fw-bold">{lead.name}</span></p>
                            <p>Status : <span className="fw-bold">{lead.status}</span></p>
                        </li>
                    ))
                }
            </ul>
        </div>
        </>
    );
}