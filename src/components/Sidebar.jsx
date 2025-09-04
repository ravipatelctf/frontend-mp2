
import { Link, useLocation } from "react-router-dom";


export function SideNavBtn({btnLabel, toValue}) {
    return (
        <Link to={toValue} className="btn btn-outline-dark w-100 mb-3">{btnLabel}</Link>
    );
}

export function Sidebar() {
    const {pathname} = useLocation();
    return (
        <div className="">
            {pathname === "/" ? "" : (<SideNavBtn toValue="/" btnLabel="Back to Dashboard" />)}
            <SideNavBtn toValue="/leads" btnLabel="Leads" />
            <SideNavBtn toValue="/agents" btnLabel="Agents" />
            <SideNavBtn toValue="/reports" btnLabel="Reports" />
            {/* <SideNavBtn btnLabel="Settings" /> */}
            <SideNavBtn toValue="/agents/add-new-agent" btnLabel="Add New Agent" />
            <SideNavBtn toValue="/leads/add-new-lead" btnLabel="Add New Lead" />
        </div>
    );
}