import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function PrivateRoute({children}) {
    const {isAuthenticated} = useAuth();
    console.log('Authenticated: ', isAuthenticated);

    if (!isAuthenticated)
        return <Navigate to='/login'  replace/>
    return children
}
