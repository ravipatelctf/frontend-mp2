// deployed URL: https://backend-mp2.vercel.app/
// localhost URL : http://localhost:3000/

// ----------------------------------------------------------------------------------------------------------

export async function createNewLead(newLeadData) {
    try {
        const response = await fetch(`https://backend-mp2.vercel.app/leads`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newLeadData)
        });
        if (!response.ok) {
            throw new Error("Failed to fetch data!");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

// ----------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------

export async function getAllLeads() {
    try {
        const response = await fetch(`https://backend-mp2.vercel.app/leads`);
        if (!response.ok) {
            throw new Error("Failed to fetch data!");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

// ----------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------

export async function updateLead(leadId, updatedLeadData) {
    try {
        const response = await fetch(`https://backend-mp2.vercel.app/leads/${leadId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedLeadData)
        });
        if (!response.ok) {
            throw new Error("Failed to fetch data!");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

// ----------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------

export async function deleteLead(leadId) {
    try {
        const response = await fetch(`https://backend-mp2.vercel.app/leads/${leadId}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error("Failed to fetch data!");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

// ----------------------------------------------------------------------------------------------------------



// ----------------------------------------------------------------------------------------------------------

export async function createNewSalesAgent(newAgentData) {
    try {
        const response = await fetch(`https://backend-mp2.vercel.app/agents`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAgentData)
        });
        if (!response.ok) {
            throw new Error("Failed to fetch data!");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}


// ----------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------

export async function getAllAgents() {
    try {
        const response = await fetch(`https://backend-mp2.vercel.app/agents`);
        if (!response.ok) {
            throw new Error("Failed to fetch data!");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

// ----------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------

export async function deleteSalesAgent(agentId) {
    try {
        const response = await fetch(`https://backend-mp2.vercel.app/agents/${agentId}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error("Failed to fetch data!");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}


// ----------------------------------------------------------------------------------------------------------





// ----------------------------------------------------------------------------------------------------------

export async function getCommentsByLeadId(leadId) {
    try {
        const response = await fetch(`https://backend-mp2.vercel.app/leads/${leadId}/comments`);
        if (!response.ok) {
            throw new Error("Failed to fetch data!");
        }

        const data = await response.json();
        // console.log("comments:", data);
        return data;
    } catch (error) {
        throw error;
    }
}

// ----------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------

export async function addNewComment(leadId, commentData) {
    try {
        const response = await fetch(`https://backend-mp2.vercel.app/leads/${leadId}/comments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(commentData)
        });
        if (!response.ok) {
            throw new Error("Failed to fetch data!");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

// ----------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------

export async function deleteComment(commentId) {
    try {
        const response = await fetch(`https://backend-mp2.vercel.app/leads/${commentId}/comments`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error("Failed to fetch data!");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

// ----------------------------------------------------------------------------------------------------------