import { createBrowserRouter } from 'react-router-dom';
import { Authentication } from './Authentication';
import { lazy, Suspense } from 'react';
import { Spinner } from './common-components/Spinner/Spinner';

const ProtectedRoute = lazy(() => import('./Authentication/ProtectedRoute'));
const MainPage = lazy(() => import('./GTD/Main'));

export const router = createBrowserRouter([
	{
		path: '/auth/*',
		element: <Authentication />,
	},
	{
		path: '/',
		element: (
			<Suspense fallback={<Spinner />}>
				<MainPage />
			</Suspense>
		),
	},
]);
