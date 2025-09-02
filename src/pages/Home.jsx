import { toast } from "react-toastify";


export default function Home() {

    function handleClick() {
        toast("Test message fired...")
    }

    return (
        <main className="container py-4">
            <h1>Home Page</h1>
            <button onClick={() => handleClick()}>Test button</button>
        </main>
    );
}