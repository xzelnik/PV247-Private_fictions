import { Routes, Route } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Catalog from '../pages/Catalog';
import Profile from '../pages/Profile';

const AppRoutes = () => {
	const user = useLoggedInUser();
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/catalog" element={<Catalog />} />
			{user && <Route path="/profile" element={<Profile />} />}
			{!user && <Route path="/login" element={<Login />} />}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
export default AppRoutes;