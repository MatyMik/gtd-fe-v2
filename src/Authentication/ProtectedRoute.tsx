import { Navigate } from 'react-router-dom';
import { selectAccessToken } from './Authentication.store';
import { useAppSelector } from '../app.hook';
import { useAutoLogin } from './Authentication.hook';

export const ProtectedRoute = ({
	children,
}: ProtectedRouteProps): JSX.Element => {
	useAutoLogin();
	const accessToken = useAppSelector(selectAccessToken);

	if (!accessToken) {
		return <Navigate to="/auth/login" replace />;
	}
	return children;
};

type ProtectedRouteProps = {
	children: JSX.Element;
};

export default ProtectedRoute;
