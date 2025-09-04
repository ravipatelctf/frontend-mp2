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

// ------------------------------------------------------------------------------------------------
// filters and sorts
    const [statusSelect, setStatusSelect] = useState("");
    const [agentSelect, setAgentSelect] = useState("");
    const [prioritySort, setPrioritySort] = useState("");
    const [timeToCloseSort, setTimeToCloseSort] = useState("");

    function getSortByTimeToClose(lead) {
        if (timeToCloseSort === "LessThanFiveDays") return lead.timeToClose < 5;
        if (timeToCloseSort === "BetweenFiveToTenDays") return lead.timeToClose >= 5 && lead.timeToClose <= 10;
        if (timeToCloseSort === "MoreThanTenDays") return lead.timeToClose > 10;
    }
    
    const filterLeads = (data) => data
        .filter((lead) => {
            const filterByStatus = !statusSelect || lead.status === statusSelect;
            const filterByAgent = !agentSelect || lead.salesAgent.email === agentSelect;
            return filterByStatus && filterByAgent;
        })
        .sort((a, b) => {
            if (prioritySort === "LowToHigh") {
                return priorityOrder[a.priority] - priorityOrder[b.priority]; 
            }
            
            if (prioritySort === "HighToLow") {
                return priorityOrder[b.priority] - priorityOrder[a.priority]; 
            }

            if (timeToCloseSort === "Ascending") {
                return a.timeToClose - b.timeToClose;
            }

            if (timeToCloseSort === "Descending") {
                return b.timeToClose - a.timeToClose;
            }

            return 0;
        });

    const priorityOrder = {
        High: 3,
        Medium: 2,
        Low: 1
    }
    
    // filterLeads.sort((a, b) => {
    //     if (prioritySort === "LowToHigh") {
    //         return priorityOrder[a.priority] - priorityOrder[b.priority]; 
    //     }
        
    //     if (prioritySort === "HighToLow") {
    //         return priorityOrder[b.priority] - priorityOrder[a.priority]; 
    //     }

    //     if (timeToCloseSort === "Ascending") {
    //         return a.timeToClose - b.timeToClose;
    //     }

    //     if (timeToCloseSort === "Descending") {
    //         return b.timeToClose - a.timeToClose;
    //     }

    //     return 0;
    // });

    function handleClearFilters() {
        setStatusSelect("");
        setAgentSelect("");
        setPrioritySort("");
        setTimeToCloseSort("");
    }

    function handleStatusSelect(event) {
        setStatusSelect(event.target.value);
    }

    function handleAgentSelect(event) {
        setAgentSelect(event.target.value);
    }
// -------------------------------------------------------------------------------------------

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
                handleToggleSidebarClick,
                
                filterLeads,
                statusSelect, 
                agentSelect, 
                prioritySort, 
                timeToCloseSort, 
                handleClearFilters, 
                handleStatusSelect, 
                handleAgentSelect,  
                setPrioritySort, 
                setTimeToCloseSort
            }}>
            {children}
        </LeadContext.Provider>
    );
}