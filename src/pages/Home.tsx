import usePageTitle from '../hooks/usePageTitle';
// import useLoggedInUser from '../hooks/useLoggedInUser';

const Home = () => {
	usePageTitle('Home');
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
	 * Add some welcoming text
	 * Add buttons for login page and for catalog page
	 */

	return (
		<div className="homepage">
			<h1>Welcome to Private Fictions</h1>
		</div>
	);
};

export default Home;
