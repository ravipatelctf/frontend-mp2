import { Link } from "react-router-dom";
import { useState } from "react";
import useLeadContext from "../contexts/LeadContext";
import { MainArea, PageTitle } from "../components/MainArea";
import { FiltersAndSort, FilterByStatus, FilterByAgent } from "../components/FiltersAndSort";

export default function Leads({children}) {
    return (
        <MainArea>
            <PageTitle label="Leads List" />
            <ContentBody>
                <FiltersAndSort>
                    <FilterByStatus />
                    <FilterByAgent />
                </FiltersAndSort>
            </ContentBody> 
        </MainArea>
    );
}


function ContentBody({children}) {
       const { leadsData, filterLeads } = useLeadContext();
    return (
        <>
            <h3 className="text-center fw-bold">Leads Overview</h3>
            <div className="pb-2">
                {children}
            </div>
            <hr />
            <ul className="list-group">
                {
                    filterLeads(leadsData).map((lead, index) => (
                        <li key={lead._id} className="list-group-item">
                            <p className="row">
                            <span className="col-12 col-md-4 pt-1"><Link to={`/leads/${lead._id}`} >Lead {index + 1}</Link></span>
                            <span className="col-12 col-md-4 pt-1"><Link to={`/leads/status/${lead.status}`}>{lead.status}</Link></span>
                            <span className="col-12 col-md-4 pt-1">{lead.name}</span>
                            </p>
                        </li>
                    ))
                }
            </ul>
            
            <div className="d-flex justify-content-end">  
                <Link to="/leads/add-new-lead" className="btn btn-primary fw-bold mt-2">Add New Lead</Link>
            </div>
        </>
    );
}
