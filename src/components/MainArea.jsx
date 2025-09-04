
import useLeadContext from "../contexts/LeadContext";
import { ToggleableSidebar } from "../components/ToggleableSidebar";
import { Sidebar, SideNavBtn } from "../components/Sidebar";
import Loading from "./Loading";
import Error from "./Error";

export function PageTitle({label, children}) {
    return (
        <div>
            <h1 className="text-center fw-bold">{label}</h1>
            {children}
        </div>
    );
}


export function MainArea({children}) {
    const { loading, error } = useLeadContext();
    return (
        <main className="container">
            {children[0]}
            <div className="row justify-content-start">
                <ToggleableSidebar>
                    <Sidebar />
                </ ToggleableSidebar>
                <div className="border col-md-2 col-sm-0 d-none d-md-block py-5">
                    <Sidebar />
                </div>
                <div className="border col-md-10 py-4 px-4">
                    { error ? <Error /> : loading ? (<Loading />) : children[1]}
                </div>
            </div>
        </main>
    );
}