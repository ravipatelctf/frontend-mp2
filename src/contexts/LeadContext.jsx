import { createContext, useContext, useState, useEffect } from "react";
import { getAllLeads, getAllAgents } from "../data";

const LeadContext = createContext();

const useLeadContext = () => useContext(LeadContext);

export default useLeadContext;

export function LeadProvider({children}) {

    const [leadsData, setLeadsData] = useState([]);
    const [agentsData, setAgentsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        async function fetchData() {
            try {
                const data1 = await getAllLeads();
                
                if (data1) {
                    setLoading(false)
                    setLeadsData(data1);
                }

                const data2 = await getAllAgents();

                if (data1) {
                    setLoading(false)
                    setAgentsData(data2);
                }

            } catch (error) {
                setLoading(false)
                setError(true)
            }
        }

        fetchData();
    }, []);

    // filter unique agents
    const uniqueAgentEmailPair = agentsData.reduce((acc, curr) => {
        acc[curr.email] = curr.name;
        return acc;
    }, {});

    // filter unique tags into an array
    const tagsArray = leadsData.reduce((acc, curr) => [...acc, ...curr.tags], []);
    const uniqueTags = tagsArray.filter((tag, index) => tagsArray.indexOf(tag) === index);

    const [showToggleSidebar, setShowToggleSidebar] = useState(false);
    function handleToggleSidebarClick(toggleValue) {
        setShowToggleSidebar(toggleValue);
    }

    return (
        <LeadContext.Provider 
            value={{
                leadsData,
                setLeadsData, 
                agentsData,
                setAgentsData, 
                loading, 
                error, 
                uniqueAgentEmailPair, 
                uniqueTags,
                showToggleSidebar, 
                setShowToggleSidebar,
                handleToggleSidebarClick                
            }}>
            {children}
        </LeadContext.Provider>
    );
}