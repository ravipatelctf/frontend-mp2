import { useEffect, useState } from "react";
import useLeadContext from "../contexts/LeadContext";


export function ToggleableSidebar({children}) {

    const [animate, setAnimate] = useState(false);
    const {showToggleSidebar, handleToggleSidebarClick} = useLeadContext();


    useEffect(() => {
        if(showToggleSidebar) {
            setAnimate(true);
        } else {
            const timer =  setTimeout(() => setAnimate(false), 300);
            return () => clearTimeout(timer);
        }

    }, [showToggleSidebar]);

    return (
        <>
        <div 
            className={`w-75 offcanvas offcanvas-start ${showToggleSidebar ? "show" : ""}`} 
            tabIndex="-1" 
            id="offcanvasExample" 
            aria-labelledby="offcanvasExampleLabel"
            style={{ visibility: showToggleSidebar ? "visible" : "hidden" }}
        >
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">Anvaya CRM</h5>
                <button onClick={() => handleToggleSidebarClick(false)} type="button" className="btn-close" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                {children}        
            </div>
        </div>

        {/* backdrop to close ToggleableSidebar , when clicked outside it */}
        {
            showToggleSidebar && (
                <div
                    className="offcanvas-backdrop fade show"
                    onClick={() => handleToggleSidebarClick(false)}
                >
                </div>
            )
        }
        </>
    );
}