import { useParams, Link } from "react-router-dom";
import useLeadContext from "../contexts/LeadContext";
import { useEffect, useState } from "react";
import { updateLead, getCommentsByLeadId, addNewComment } from "../data";
import { toast } from "react-toastify";
import { MainArea, PageTitle } from "../components/MainArea";

export default function LeadDetails() {

    const { leadId } = useParams();
    const { leadsData } = useLeadContext();

    const targetLead = leadsData && leadsData.find((lead) => lead._id === leadId);
    return (
        <MainArea>
            <PageTitle label="Lead Management">
                <h5 className="text-center">{targetLead?.name}</h5>
            </PageTitle>
            {targetLead && <ContentBody targetLead={targetLead} />}
        </MainArea>
    );
}

function ContentBody({targetLead}) {
    const [showForm, setShowForm] = useState(false);
    return (
        <>
            { showForm ? (<EditLeadForm targetLead={targetLead} setShowForm={setShowForm} /> ) : (
        <>
        <h3 className="text-center pb-4 fw-bold">Lead Details</h3>
        <ul className="list-group">
            <li className="list-group-item"><strong>Lead Name: </strong>{targetLead.name}</li>
            <li className="list-group-item"><strong>Sales Agent: </strong>
                <Link to={`/leads/agent/${targetLead.salesAgent.email.split("@")[0]}`}>{targetLead.salesAgent.email.split("@")[0]}</Link>
            </li>
            <li className="list-group-item"><strong>Lead Source: </strong>{targetLead.source}</li>
            <li className="list-group-item"><strong>Lead Status: </strong>{targetLead.status}</li>
            <li className="list-group-item"><strong>Priority: </strong>{targetLead.priority}</li>
            <li className="list-group-item"><strong>Time to Close: </strong>{targetLead.timeToClose} {targetLead.timeToClose === 1 ? "day" : "days"}</li>
            <li className="list-group-item"><strong>Tags: </strong>{targetLead.tags.join(", ")}</li>
        </ul>
        <div className="pt-3 d-flex justify-content-end">
            <button 
                className="btn btn-dark fw-bold px-4"
                onClick={() => setShowForm(true)}
            >
                Edit Lead Details
            </button>
        </div>
        </>
        )}

        <CommentSection targetLead={targetLead} />
        </>
    );
}


function CommentSection({ targetLead }) {
    const [commentsData, setCommentsData] = useState([]);
    const [commentText, setCommentText] = useState("");

    const { leadId } = useParams();

    useEffect(() => {
        async function fetchComments() {
            try {
                const comments = await getCommentsByLeadId(leadId);
                if (comments) {
                    setCommentsData(comments)
                }
            } catch (error) {
                throw error;
            }
        }

        fetchComments();

    }, [])

    async function handleCommentSubmit() {

        if (commentText.length === 0) {
            toast.warn("Please type some text before commenting.");
            return;
        }   
        const newComment = await addNewComment(leadId, {"agentId": targetLead.salesAgent._id, "commentText": commentText});

        if (newComment) {
            toast.success("Comment added successfully.")
            setCommentsData((preValues) => [...preValues, newComment])
        }

        setCommentText("")
    }

    return (
        <section className="py-4">
            <h3 className="text-center fw-bold">Comments({commentsData.length})</h3>
            <ul className="list-group">
                {
                    commentsData?.map((comment) => (
                        <li key={comment._id} className="list-group-item">
                            <span><strong>{comment.author.email.split("@")[0]} - </strong>{ new Date(comment.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                            <br />
                            <span><strong>Comment: </strong>{comment.commentText}</span>
                        </li>                        
                    ))
                }
            </ul>
            <div className="my-2">
                <textarea type="text" className="form-control" placeholder="Add a Comment" value={commentText} onChange={(e) => setCommentText(e.target.value)}></textarea>
                <div className={`pt-3 gap-2 d-flex justify-content-end`}>
                    <button className="btn btn-outline-dark fw-bold px-4" onClick={() => setCommentText("")}>Cancel</button>
                    <button className="btn btn-dark fw-bold px-4" onClick={(e) => handleCommentSubmit(e)}>Comment</button>
                </div>
            </div>
        </section>
    );
}

function EditLeadForm({targetLead, setShowForm}) {
    const [leadName, setLeadName] = useState(targetLead.name);
    const [leadSource, setLeadSource] = useState(targetLead.source);
    const [salesAgent, setSalesAgent] = useState(targetLead.salesAgent.email);
    const [leadStatus, setLeadStatus] = useState(targetLead.status);
    const [priority, setPriority] = useState(targetLead.priority);
    const [timeToClose, setTimeToClose] = useState(targetLead.timeToClose);
    const [tags, setTags] = useState([...targetLead.tags]);

    const { agentsData, leadsData, setLeadsData, uniqueAgentEmailPair, uniqueTags } = useLeadContext();

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

        if (timeToClose < 1) {
            toast.warn("Time to Close can't be less than 1");
            return;
        }

        toast.info("Updating Lead Details...");
        const targetAgent = agentsData.find((agent) => agent.email.split("@")[0] === salesAgent.split("@")[0]);

        const leadObj = {
            "name": leadName,
            "source": leadSource,
            "salesAgent": targetAgent._id,
            "status": leadStatus,
            "tags": tags, 
            "timeToClose": parseInt(timeToClose),
            "priority": priority
        };

        const updatedLeadData = await updateLead(targetLead._id, leadObj);
        
        if (updatedLeadData) {
            toast.success("Lead details updated successfully!");
            setShowForm(false)

            const newUpdatedLeadsdata = (preValues) => preValues.map((lead) => {
                if (lead._id !== updatedLeadData._id) {
                    return lead;
                }

                return {
                    ...lead,
                    "name": updatedLeadData.name,
                    "source": updatedLeadData.source,
                    "salesAgent": updatedLeadData.salesAgent,
                    "status": updatedLeadData.status,
                    "tags": updatedLeadData.tags, 
                    "timeToClose": parseInt(updatedLeadData.timeToClose),
                    "priority": updatedLeadData.priority 
                }
            })
            setLeadsData((preValues) => newUpdatedLeadsdata(preValues));
        }
    }
    return (
        <>
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

            <label htmlFor="timeToClose">Time to Close ( in days ):</label>
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

            <div className="d-flex justify-content-between">
                <button 
                    className="btn btn-danger fw-bold px-4"
                    onClick={() => setShowForm(false)}
                >
                Cancel
            </button>
                <button type="submit" className="btn btn-success fw-bold">Update Lead Details</button>
            </div>
            
        </form>
        </>
    );
}