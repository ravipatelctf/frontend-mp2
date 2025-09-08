
import useLeadContext from "../contexts/LeadContext";
import { MainArea, PageTitle } from "../components/MainArea";

import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

export default function Reports() {
    return (
        <MainArea>
            <PageTitle label="Anvaya CRM Reports" />
            <ContentBody />
        </MainArea>
    );
}


function ContentBody() {
    const { leadsData, agentsData } = useLeadContext();

    const { dataStatus, dataAgent } = useChartsData();

    return (
        <>
        <h3 className="text-center pb-4 fw-bold">Report Overview</h3>
        <div className="row gap-2 justify-content-center px-3">

            <div className="border border-dark rounded-5 col-lg-5 py-2">
                <h4 className="fw-bold text-center text-secondary pt-1">Lead Status Distribution:</h4>
                <div className="py-3">
                    <Doughnut data={dataStatus}/>
                </div>
            </div>

            <div className="border border-dark rounded-5 col-lg-5 py-2">
                <h4 className="fw-bold text-center text-secondary pt-1">Total Leads in Pipeline by Agent:</h4>
                <div className="row justify-content-center text-secondary">
                    <div className="col-md-5">
                        <span className="col-6 fw-bold">Total Leads: </span>
                        <span className="col-6">{leadsData.length}</span>
                    </div>
                    <div className="col-md-5">
                        <span className="col-6 fw-bold">Total Agents: </span>
                        <span className="col-6">{agentsData.length}</span>
                    </div>
                </div> 
                <div className="py-3">
                    <Bar data={dataAgent}/>
                </div>
            </div>

            <div className="border border-dark rounded-5 col-lg-5 py-2">
                <h4 className="fw-bold text-center text-secondary pt-1">Total Leads in Pipeline by Status:</h4>
                <div className="row justify-content-center text-secondary">
                    <div className="col-md-5">
                        <span className="col-6 fw-bold">Total Leads: </span>
                        <span className="col-6">{leadsData.length}</span>
                    </div>
                </div> 
                <div className="py-3">
                    <Bar data={dataStatus}/>
                </div>
            </div>

            <div className="border border-dark rounded-5 col-lg-5 py-2">
                <h4 className="fw-bold text-center text-secondary pt-1">Total Number of Leads Closed :</h4>
                <div className="row justify-content-center text-secondary">
                    <div className="col-md-5">
                        <span className="col-6 fw-bold">Total Leads: </span>
                        <span className="col-6">{leadsData.length}</span>
                    </div>
                    <div className="col-md-5">
                        <span className="col-6 fw-bold">Leads Closed: </span>
                        <span className="col-6">{leadsData.filter(lead => lead.status === "Closed").length}</span>
                    </div>
                </div> 
                <div className="py-3">
                    <Bar data={dataStatus}/>
                </div>
            </div>

        </div>
        <br />
        </>
    );
}


function useChartsData() {
    const { leadsData, agentsData } = useLeadContext();

    const dataForStatusDataset = leadsData.reduce((acc, curr) => {
        if (!acc[curr.status]) {
            acc[curr.status] = 0;
        }
        acc[curr.status] = acc[curr.status] + 1;
        return acc;
    }, {});

    const dataForAgentDataset = leadsData.reduce((acc, curr) => {
        if (!acc[curr.salesAgent.email.split("@")[0]]) {
            acc[curr.salesAgent.email.split("@")[0]] = 0;
        }
        acc[curr.salesAgent.email.split("@")[0]] = acc[curr.salesAgent.email.split("@")[0]] + 1;
        return acc;
    }, {});

    // data for charts
    const dataStatus = {
        labels: [...Object.keys(dataForStatusDataset)],
        datasets: [
            {
                label: "Number of Leads by status",
                data: [...Object.values(dataForStatusDataset)],
                backgroundColor: ["lightcoral", "lightgreen", "greenyellow", "palevioletred", "lightpink", "lightgrey"],
                borderColor: ["lightcoral", "lightgreen", "greenyellow", "palevioletred", "lightpink", "lightgrey"],
            },
        ],
    };

    const dataAgent = {
        labels: [...Object.keys(dataForAgentDataset)],
        datasets: [
            {
                label: "Number of Leads by Agents",
                data: [...Object.values(dataForAgentDataset)],
                backgroundColor: ["lightcoral", "lightgreen", "greenyellow", "palevioletred", "lightpink", "lightgrey"],
                borderColor: ["lightcoral", "lightgreen", "greenyellow", "palevioletred", "lightpink", "lightgrey"],
            },
        ],
    };

    return { 
        dataForStatusDataset,
        dataForAgentDataset,
        dataStatus,
        dataAgent
     };
}