import { Star, StarBorder } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { onSnapshot, setDoc } from 'firebase/firestore';

import {
	Story,
	ratingsCollection,
	ratingsDocument,
	storiesDocument
} from '../utils/firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';

type Props = {
	story?: Story;
};

const AddRating = ({ story }: Props) => {
	const user = useLoggedInUser();
	const [stars, setStars] = useState<number | undefined>(undefined);
	const [submitError, setSubmitError] = useState<string>();

	useEffect(
		() =>
			onSnapshot(ratingsCollection, snapshot => {
				const ratings = snapshot.docs
					.map(d => d.data())
					.filter(
						rating => rating.by === user?.email && rating.storyId === story?.id
					);
				if (ratings.length === 1) {
					setStars(ratings[0]?.value || undefined);
				}
			}),
		[user, story]
	);

	const handleSubmit = async (newStars: number) => {
		if (!user?.email) {
			setSubmitError('You are not signed in');
			return;
		}

		try {
			await setDoc(ratingsDocument(user.email), {
				by: user.email,
				storyId: story?.id,
				value: newStars
			});
			if (story) {
				if (stars) {
					// update existing
					const { rating, ...storyRest } = story;
					setDoc(storiesDocument(story.id), {
						rating:
							(story.rating * story.ratingCount - stars + newStars) /
							story.ratingCount,
						...storyRest
					});
				} else {
					// add new rating
					const { rating, ratingCount, ...storyRest } = story;
					setDoc(storiesDocument(story.id), {
						rating:
							(story.rating * story.ratingCount + newStars) /
							(story.ratingCount + 1),
						ratingCount: ratingCount + 1,
						...storyRest
					});
				}
			}
		} catch (err) {
			setSubmitError(
				(err as { message?: string })?.message ?? 'Unknown error occurred'
			);
		}
	};

	return (
		<>
			{/* Stars select */}
			<Box>
				{Array.from(Array(5).keys()).map(i => (
					<IconButton
						key={i}
						color="primary"
						component="span"
						onClick={() => handleSubmit(i + 1)}
					>
						{i < (stars || 1) ? <Star /> : <StarBorder />}
					</IconButton>
				))}
			</Box>
			{submitError && (
				<Typography variant="subtitle2" align="left" color="error" paragraph>
					{submitError}
				</Typography>
			)}
		</>
	);
};

export default AddRating;
