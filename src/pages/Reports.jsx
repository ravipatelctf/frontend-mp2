
import useLeadContext from "../contexts/LeadContext";
import { MainArea, PageTitle } from "../components/MainArea";


export default function Reports() {
    return (
        <MainArea>
            <PageTitle label="Anvaya CRM Reports" />
            <ContentBody />
        </MainArea>
    );
}

function ContentBody() {
    const { leadsData, agentsData } = useLeadContext();
    return (
        <>
        <h3 className="text-center pb-4 fw-bold">Report Overview</h3>
        <ul className="list-group">
            <li className="list-group-item row">
                <span className="col-6 fw-bold">Total Leads:</span>
                <span className="col-6">{leadsData.length}</span>
            </li>
            <li className="list-group-item row">
                <span className="col-6 fw-bold">Total Agents:</span>
                <span className="col-6">{agentsData.length}</span>
            </li>
        </ul>
        </>
    );
}