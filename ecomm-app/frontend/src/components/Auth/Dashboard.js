
import useAuth from "../../hooks/useAuth";

export default function Dashboard () {
    const {logoutUser} = useAuth()
    
    const handleLogout = async (e) => {
        e.preventDefault();

        logoutUser()
        localStorage.removeItem('authToken')
    };
    
    return (
        <>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}