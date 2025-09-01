import { useState } from "react";
import useLeadContext from "../contexts/LeadContext";
import {createNewLead} from "../data";


export default function AddNewLead() {

    const [leadName, setLeadName] = useState("");
    const [leadSource, setLeadSource] = useState("");
    const [salesAgent, setSalesAgent] = useState("");
    const [leadStatus, setLeadStatus] = useState("New");
    const [priority, setPriority] = useState("Medium");
    const [timeToClose, setTimeToClose] = useState(1);
    const [tags, setTags] = useState([]);

    const { agentsData, uniqueAgentEmailPair, uniqueTags } = useLeadContext();

    function handleTagSelect(event) {
        const {checked, value} = event.target;
        if (checked) {
            setTags((preValues) => [...preValues, value])
        } else {
            setTags((preValues) => preValues.filter((pv => pv !== value)))
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        // find sales agent
        const targetAgent = agentsData.find((agent) => agent.email === salesAgent)

        const leadObj = {
            "name": leadName,
            "source": leadSource,
            "salesAgent": targetAgent._id,
            "status": leadStatus,
            "tags": tags,
            "timeToClose": parseInt(timeToClose),
            "priority": priority
        };

        const createdLead = await createNewLead(leadObj);
        
        if (createdLead) {
            console.log("createdLead:", createdLead);
        }
    
        setLeadName("");
        setLeadSource("");
        setSalesAgent("");
        setLeadStatus("");
        setPriority("Medium");
        setTimeToClose(1);
        setTags([]);
    }

    return (
        <main className="container py-4">
            <h1 className="text-center">Add New Lead</h1>
            <form className="py-4" onSubmit={(event) => handleSubmit(event)}>
                <label htmlFor="leadName" className="form-label">Lead Name:</label>
                <input 
                    type="text"
                    id="leadName"
                    className="form-control"
                    value={leadName}
                    placeholder="Enter Lead Name" 
                    onChange={(event) => setLeadName(event.target.value)}
                    required
                />
                <br />
                <label htmlFor="leadSource" className="form-label">Lead Source:</label>
                <select 
                    id="leadSource"
                    required
                    className="form-select"
                    value={leadSource}
                    onChange={(event) => setLeadSource(event.target.value)}
                >
                    <option value="" disabled>Select Lead Source</option>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Cold Call">Cold Call</option>
                    <option value="Advertisement">Advertisement</option>
                    <option value="Email">Email</option>
                    <option value="Other">Other</option>
                </select>
                <br />
                
                <label htmlFor="salesAgent">Sales Agent:</label>
                <select 
                    id="salesAgent"
                    required
                    className="form-select"
                    value={salesAgent}
                    onChange={(event) => setSalesAgent(event.target.value)}
                >
                    <option value="" disabled>Select sales agent username</option>
                    {
                        uniqueAgentEmailPair && Object.entries(uniqueAgentEmailPair).map(([key, value]) => (
                            <option key={key} value={key}>{key.split("@")[0]}</option>
                        ))
                    }
                </select>
                <br />
    
                <label htmlFor="leadStatus">Lead Status:</label>
                <select 
                    id="leadStatus"
                    required
                    className="form-select"
                    value={leadStatus}
                    onChange={(event) => setLeadStatus(event.target.value)}
                >
                    <option value="" disabled>Select Lead Status</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Closed">Closed</option>
                </select>
                <br />
                {/* ['High', 'Medium', 'Low'] */}
                <label htmlFor="priority">Priority:</label>
                <select 
                    id="priority"
                    required
                    className="form-select"
                    value={priority}
                    onChange={(event) => setPriority(event.target.value)}
                >
                    <option value="" disabled>Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <br />

                <label htmlFor="timeToClose">Time to Close:</label>
                <input 
                    type="number" 
                    id="timeToClose"
                    required
                    value={timeToClose}
                    className="form-control"
                    onChange={(event) => setTimeToClose(event.target.value)}
                />
                <br />

                <label htmlFor="tags">Tags:</label>
                <div className="row">
                {uniqueTags.length !== 0 ? (
                    uniqueTags.map((tag, index) => (
                        <div key={index} className="col-lg-3 col-md-6 ">
                            <span className="form-check">
                                <input 
                                    type="checkbox" 
                                    id="tag"
                                    checked={tags.includes(tag)}
                                    value={tag}
                                    className="me-2"
                                    onChange={(event) => handleTagSelect(event)}
                                />{tag}
                            </span>
                            
                        </div> 
                    ))
                    ) : (<p className="text-center">Loading Tags...</p>)
                }
                </div>
                <br />
                <button type="submit" className="btn btn-success fw-bold my-4">Create Lead</button>
            </form>
            
        </main>
    );
}