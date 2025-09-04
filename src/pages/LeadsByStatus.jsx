
import useLeadContext from "../contexts/LeadContext";
import { useParams } from "react-router-dom";
import { MainArea, PageTitle } from "../components/MainArea";
import { FiltersAndSort, FilterByAgent } from "../components/FiltersAndSort";

export default function LeadsByStatus() {
    return (
        <MainArea>
            <PageTitle label="Leads By Status" />
            <ContentBody>
                <FiltersAndSort>
                    <FilterByAgent />
                </FiltersAndSort>
            </ContentBody>
        </MainArea>
    );
}

function ContentBody({children}) {
    const { leadsData, filterLeads } = useLeadContext();
    const { leadStatus } = useParams();
    const filteredLeadsByStatus = leadsData.filter((lead) => lead.status === leadStatus);
    return (
        <>
        <h4 className="text-center fw-bold">Lead List By Status</h4>
        <div className="pb-2">
            {children}
        </div>
        <div>
            <hr />
            <h5 className="fw-bold">Status: {leadStatus}</h5>
            <ul className="list-group">
                {
                    filterLeads(filteredLeadsByStatus).map((lead, index) => (
                        <li key={lead._id} className="list-group-item row">
                            <p className="fw-bold">Lead {index + 1}</p>
                            <p>Lead Name : <span className="fw-bold">{lead.name}</span></p>
                            <p>Sales Agent : <span className="fw-bold">{lead.salesAgent.name}</span></p>
                        </li>
                    ))
                }
            </ul>
        </div>
        </>
    );
}