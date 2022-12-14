import { Card, Grid } from '@mui/material';
import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { Comment, Story, commentsCollection } from '../utils/firebase';

import CommentView from './CommentView';

type Props = {
	story?: Story;
};

const CommentList = ({ story }: Props) => {
	const [comments, setComments] = useState<Comment[]>([]);

	useEffect(
		() =>
			onSnapshot(commentsCollection, snapshot =>
				setComments(
					snapshot.docs
						.map(d => d.data())
						.filter(comment => comment.storyId === story?.id)
						.sort((lhs, rhs) => rhs.date.seconds - lhs.date.seconds)
				)
			),
		[story]
	);

	return (
		<Grid container spacing={2}>
			{comments.map((com, i) => (
				<Grid key={i} item xs={12}>
					<Card sx={{ maxWWidth: 345 }}>
						<CommentView comment={com} />
					</Card>
				</Grid>
			))}
		</Grid>
	);
};

export default CommentList;
