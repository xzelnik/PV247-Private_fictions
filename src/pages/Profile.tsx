import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';

import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { Story, storiesCollection } from "../utils/firebase";

const Profile = () => {
	usePageTitle('Profile');
	const user = useLoggedInUser();

	const [stories, setStories] = useState<Story[]>([]);

	useEffect(
		() =>
			onSnapshot(storiesCollection, snapshot =>
				setStories(
					snapshot.docs
						.map(d => d.data())
						.sort((lhs, rhs) => rhs.date.seconds - lhs.date.seconds)
				)
			),
		[]
	);

	return (
		<>
			{!!stories.length && (
				<>
					<div className="stories">
						{stories.map(story => (
							<StoryPreview
								key={story.date.seconds}
							/>
						))}
					</div>
				</>
			)}
			<div className="add-story-button">
				+ Create story
			</div>
		</>
	);
};

export default Profile;
