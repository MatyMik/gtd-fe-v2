import { lazy, useState } from 'react';
import { Main } from './components';
import { useAutoLogin } from '../Authentication/Authentication.hook';

const Tab = lazy(() => import('../common-components/tab/tab'));
export const MainPage = () => {
	const [tags, setTags] = useState<[]>([]);
	useAutoLogin();
	console.log('Here');

	return (
		<Main>
			<Tab label={'All'} clickHandler={() => console.log('All')} />
			mains
		</Main>
	);
};

export default MainPage;
