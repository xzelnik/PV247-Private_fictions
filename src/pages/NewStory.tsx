import usePageTitle from '../hooks/usePageTitle';
// import useLoggedInUser from '../hooks/useLoggedInUser';

const NewStory = () => {
	usePageTitle('New Story');
	// const user = useLoggedInUser();

	// useEffect(
	// 	() =>
	// 		onSnapshot(matchesCollection, snapshot =>
	// 			setMatches(
	// 				snapshot.docs
	// 					.map(d => d.data())
	// 					.sort((lhs, rhs) => rhs.date.seconds - lhs.date.seconds)
	// 			)
	// 		),
	// 	[]
	// );

	/**
	 * TODO
	 * Create form for new story
	 * Add input for title
	 * Add textfield for the story text
	 * Add checkboxes for tags
	 * add addDocument -> takes all data from the form, add 'by' as email of the logged in user
	 */
	return (
		<div className="new-story">
			<h1>New Story Page</h1>
		</div>
	);
};

export default NewStory;
