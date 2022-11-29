import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';

import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { Story, storiesCollection } from '../utils/firebase';
import StoryPreview from '../components/StoryPreview';

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

	const createStory = () => {
		console.log('story');
	};

	return (
		<>
			{!!stories.length && (
				<div className="stories">
					{stories.map(story => (
						<StoryPreview
							key={story.date.nanoseconds}
							title={story.title}
							description={story.shortDescription}
							tags={story.tags}
							rating={story.rating}
						/>
					))}
				</div>
			)}
			<button className="add-story-button" onClick={() => createStory()}>
				+ Create story
			</button>
		</>
	);
};

export default Profile;
