import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { Loading } from "../components/views/Loading";

// eslint-disable-next-line react/prop-types
const PublicRoute = ({ children }) => {
    const {user, loading} = useContext(AuthContext)
    if(loading){
      return <Loading />
  }
  return user ? <Navigate to="/" /> : children;
};

export default PublicRoute;