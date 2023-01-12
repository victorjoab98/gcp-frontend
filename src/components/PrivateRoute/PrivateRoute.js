import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function PrivateRoute({ children }) {
    const authUser  = useSelector( state => state.auth.logged );
    
    if (!authUser) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/auth/login" />
    }

    // authorized so return child components
    return children;
}