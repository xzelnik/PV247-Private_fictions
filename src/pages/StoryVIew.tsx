import { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { onSnapshot } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

import usePageTitle from '../hooks/usePageTitle';
import { storiesCollection, Story } from '../utils/firebase';
import AddRating from '../components/AddRating';
import AddComment from '../components/AddComment';
import CommentView from '../components/CommentView';
import CommentList from '../components/CommentList';

const StoryView = () => {
	const { storyId } = useParams();
	usePageTitle('');
	const [story, setStory] = useState<Story>();
	const [comments, setComments] = useState<Comment[]>([]);

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
		<>
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
				{story && <pre>{story.text}</pre>}
			</Paper>
			<AddRating story={story} />
			<AddComment story={story} />
			<CommentList story={story} />
		</>
	);
};

export default StoryView;
