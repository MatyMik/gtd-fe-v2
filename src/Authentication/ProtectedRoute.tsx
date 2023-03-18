import { Navigate } from "react-router-dom";
import { selectAccessToken } from "./Authentication.store";
import { useAppSelector } from "../app.hook";

export const ProtectedRoute = ({
                                 children
                               }: ProtectedRouteProps): JSX.Element => {
  const accessToken = useAppSelector(selectAccessToken);
  console.log("ProtectedRoute accessToken: ", accessToken);
  if (!accessToken) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};

type ProtectedRouteProps = {
  children: JSX.Element;
};

export default ProtectedRoute;
