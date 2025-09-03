
import useLeadContext from "../contexts/LeadContext";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function Home() {

    const { loading, error } = useLeadContext();

    if (error) {
        return (
            <div className="text-center">
                <p>An Error Occurred..</p>
            </div>
        );
    }

    return (
        <main className="container py-4">
            <div>
                <h1 className="text-center py-4 fw-bold">Anvaya CRM Dashboard</h1>
            </div>

            <div className="row d-flex justify-content-center">
                <div className="col-md-3 border py-4 px-4">
                    <Sidebar />
                </div>
                <div className="col-md-9 border py-4 px-4">
                    { loading ? (<Loading />) : (<ContentBody />) }
                </div>
            </div>
        </main>
    );
}


function Sidebar() {
    return (
        <>
        <div className="mt-5">
            <Link to="/leads" className="btn btn-outline-dark w-100 mb-3">Leads</Link>
            
            <Link to="/agents" className="btn btn-outline-dark w-100 mb-3">Agents</Link>
            
            <Link to="/reports" className="btn btn-outline-dark w-100 mb-3">Reports</Link>
            
            <Link to="/" className="btn btn-outline-dark w-100 mb-3">Settings</Link>
        </div>

        {/* Link to Add New Lead page  */}
        <div className="pt-2 d-flex justify-content-end">
            <Link to="/leads/add-new-lead" className="btn btn-primary fw-bold w-100">Add New Lead</Link>
        </div>
        </>
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
        <h3 className="text-center pb-1 fw-bold">Overview</h3>
        <div>
            {/* latest leads */}
            <div className="border p-3 row">
                {
                    leadsData && leadsData.map((lead, index) => index < 4 && (
                        <span key={lead._id} className="col-md-3 col-6"><Link to={`leads/${lead._id}`}>{lead.name}</Link></span>
                    ))
                }
            </div>

            {/* lead status */}
            <div className="border p-3 row">
                <h5 className="fw-bold ">Lead Status:</h5>
                <div className="py-2 ps-5">
                    <p><strong>New: </strong>{leadStatusObj["New"]} Leads</p>
                    <p><strong>Contacted: </strong>{leadStatusObj["Contacted"]} Leads</p>
                    <p><strong>Qualified: </strong>{leadStatusObj["Qualified"]} Leads</p>
                    <p><strong>Proposal Sent: </strong>{leadStatusObj["Proposal Sent"]} Leads</p>
                    <p><strong>Closed: </strong>{leadStatusObj["Closed"]} Leads</p>
                </div>
            </div>
        </div>
        </>
    );
}