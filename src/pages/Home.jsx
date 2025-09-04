
import { Link } from "react-router-dom";
import useLeadContext from "../contexts/LeadContext";
import { MainArea, PageTitle } from "../components/MainArea";


export default function Home() {
    return (
        <MainArea>
            <PageTitle label="Anvaya CRM Dashboard" />
            <ContentBody />
        </MainArea>
    );
}

function ContentBody() {
    const {leadsData} = useLeadContext();
    const leadStatusObj = leadsData.reduce((acc, curr) => {
        if (!acc[curr.status]) {
            acc[curr.status] = 0;
        }
        acc[curr.status] += 1
        return acc;
    }, {})

    return (
        <>
        <h3 className="text-center fw-bold">Overview</h3>
        <div>
            {/* latest leads */}
            <div className="p-3 row">
                {
                    leadsData && leadsData.map((lead, index) => index < 4 && (
                        <span key={lead._id} className="col-md-4 py-1"><Link to={`leads/${lead._id}`}>{lead.name}</Link></span>
                    ))
                }
            </div>

            {/* lead status */}
            <div className="p-3 row">
                <hr />
                <h5 className="fw-bold">Lead Status:</h5>
                <div className="py-2 ps-5">
                    <p><strong>New: </strong>{leadStatusObj["New"]} Leads</p>
                    <p><strong>Contacted: </strong>{leadStatusObj["Contacted"]} Leads</p>
                    <p><strong>Qualified: </strong>{leadStatusObj["Qualified"]} Leads</p>
                    <p><strong>Proposal Sent: </strong>{leadStatusObj["Proposal Sent"]} Leads</p>
                    <p><strong>Closed: </strong>{leadStatusObj["Closed"]} Leads</p>
                </div>
                <div className="d-flex justify-content-end">
                    <Link to="/leads/add-new-lead" className="btn btn-primary fw-bold">Add New Lead</Link>
                </div>
            </div>
        </div>
        </>
    );
}