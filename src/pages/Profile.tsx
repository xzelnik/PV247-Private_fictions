import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Button, Card, Grid } from '@mui/material';

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
						.filter(story => story.by === user?.email)
						.sort((lhs, rhs) => rhs.date.seconds - lhs.date.seconds)
				)
			),
		[user]
	);

	return (
		<>
			{!!stories.length && (
				<Grid container spacing={2}>
					{stories.map((story, i) => (
						<Grid key={i} item xs={12}>
							<Card sx={{ maxWWidth: 345 }}>
								<StoryPreview
									id={story.id}
									key={story.date.nanoseconds}
									title={story.title}
									description={story.shortDescription}
									tags={story.tags}
									rating={story.rating}
								/>
							</Card>
						</Grid>
					))}
				</Grid>
			)}
			<Button component={Link} to="/new-story">
				+ Create New Story
			</Button>
		</>
	);
};

export default Profile;
