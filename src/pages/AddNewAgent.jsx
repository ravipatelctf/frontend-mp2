
import { useState } from "react";
import { createNewSalesAgent } from "../data";
import { toast } from "react-toastify";
import useLeadContext from "../contexts/LeadContext";
import { MainArea, PageTitle } from "../components/MainArea";


export default function AddNewAgent() {
    return (
        <MainArea>
            <PageTitle label="Add New Agent" />
            <ContentBody />
        </MainArea>
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
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-success fw-bold mt-2">Create Agent</button>
            </div>
        </form>
        </>
    );
}