import usePageTitle from '../hooks/usePageTitle';
// import useLoggedInUser from '../hooks/useLoggedInUser';

const StoryView = () => {
	usePageTitle('Story');

	/**
	 * TODO
	 * Add props with story parameters
	 * Display story parameters
	 * Add rating option
	 * Add comment section
	 */
	return (
		<div className="new-story">
			<h1>New Story Page</h1>
		</div>
	);
};

export default StoryView;
