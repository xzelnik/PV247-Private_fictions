import { Routes, Route } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Catalog from '../pages/Catalog';
import Profile from '../pages/Profile';
import NewStory from '../pages/NewStory';
import StoryView from '../pages/StoryVIew';
import StoryEdit from '../pages/StoryEdit';

const AppRoutes = () => {
	const user = useLoggedInUser();
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/catalog" element={<Catalog />} />
			<Route path="/story-view/:storyId" element={<StoryView />} />
			{user && <Route path="/profile" element={<Profile />} />}
			{user && <Route path="/story-edit/:storyId" element={<StoryEdit />} />}
			{!user && <Route path="/login" element={<Login />} />}
			{user && <Route path="/new-story" element={<NewStory />} />}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
export default AppRoutes;
