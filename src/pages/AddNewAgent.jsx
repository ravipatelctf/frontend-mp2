import { useState } from "react";
import { createNewSalesAgent } from "../data";
import { toast } from "react-toastify";
import useLeadContext from "../contexts/LeadContext";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";


export default function AddNewAgent() {
    const { loading } = useLeadContext();
    return (
        <main className="container py-4">
            <div>
                <h1 className="text-center py-4 fw-bold">Add New Agent</h1>
            </div>

            <div className="row d-flex justify-content-center mx-1">
                <div className="col-lg-3 border py-4 px-4">
                    <Sidebar />
                </div>
                <div className="col-lg-9 border py-4 px-4">
                    <ContentBody />
                </div>
            </div>
        </main>
    );
}


function Sidebar() {
    return (
        <>
        <Link to="/" >Back to Dashboard</Link>
        </>
    );
}

function ContentBody() {
    const [agentName, setAgentName] = useState("");
    const [agentEmail, setAgentEmail] = useState("");

    const { setAgentsData } = useLeadContext();

    async function handleAgentSubmit(event) {
        event.preventDefault();

        toast.info("Adding New Sales Agent...");

        const agentObj = {
            "name": agentName,
            "email": agentEmail
        }

        const createdAgent = await createNewSalesAgent(agentObj);

        if (createdAgent) {
            toast.success("New Sales Agent Added Successfully!");
            setAgentsData(((preValues) => [...preValues, createdAgent]));
        }

        setAgentName("");
        setAgentEmail("");
    }
    return (
        <>
        <form className="py-2" onSubmit={(event) => handleAgentSubmit(event)}>
            <label htmlFor="agentName" className="form-label">Agent Name:</label>
            <input 
                type="text"
                id="agentName"
                className="form-control"
                value={agentName}
                placeholder="Enter Agent Name" 
                onChange={(event) => setAgentName(event.target.value)}
                required
            />
            <br />

            <label htmlFor="agentEmail" className="form-label">Agent Email:</label>
            <input 
                type="text"
                id="agentEmail"
                className="form-control"
                value={agentEmail}
                placeholder="Enter Agent Email" 
                onChange={(event) => setAgentEmail(event.target.value)}
                required
            />

            <br />
            <button type="submit" className="btn btn-success fw-bold my-4">Create Agent</button>
        </form>
        </>
    );
}