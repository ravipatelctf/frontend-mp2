import { useState } from "react";
import { createNewSalesAgent } from "../data";


export default function AddNewAgent() {

    const [agentName, setAgentName] = useState("");
    const [agentEmail, setAgentEmail] = useState("");


    async function handleAgentSubmit(event) {
        event.preventDefault();

        const agentObj = {
            "name": agentName,
            "email": agentEmail
        }

        const createdAgent = await createNewSalesAgent(agentObj);

        if (createdAgent) {
            console.log("createdAgent:", createdAgent);
        }

        setAgentName("");
        setAgentEmail("");
    }

    return (
        <main className="container py-4">
            <h1 className="text-center">Add New Agent</h1>
            <form className="py-4" onSubmit={(event) => handleAgentSubmit(event)}>
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
            
        </main>
    );
}