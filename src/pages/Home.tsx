import { Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedInUser';

const Home = () => {
	usePageTitle('Home');
	const user = useLoggedInUser();

	/**
	 * TODO
	 * Add some welcoming text
	 * Add buttons for login page and for catalog page
	 */

	return (
		<div className="homepage">
			<h1>Welcome to Private Fictions</h1>
			{user?.email && (
				<Typography variant="h4" textAlign="center">
					{user.email}!
				</Typography>
			)}
		</div>
	);
};

export default Home;
