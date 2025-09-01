// deployed URL: https://backend-mp2.vercel.app/


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