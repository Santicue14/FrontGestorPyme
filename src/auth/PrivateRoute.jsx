import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { Loading } from "../components/views/Loading";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    if(loading){
        return <Loading />
    }
    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
