import { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { onSnapshot } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

import usePageTitle from '../hooks/usePageTitle';
import { storiesCollection, Story } from '../utils/firebase';

const StoryView = () => {
	const { storyId } = useParams();
	usePageTitle('');
	const [story, setStory] = useState<Story>();

	useEffect(
		() =>
			onSnapshot(storiesCollection, snapshot =>
				setStory(
					snapshot.docs
						.map(d => d.data())
						.filter(story => story.id === storyId)[0] || null
				)
			),
		[]
	);

	return (
		<Paper
			variant="outlined"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
				width: '100%',
				px: 2
			}}
		>
			{story && <h1>{story.title}</h1>}
			{story && <div>{story.text}</div>}
		</Paper>
	);
};

export default StoryView;
