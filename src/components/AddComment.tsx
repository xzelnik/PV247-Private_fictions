import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Timestamp, setDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import useField from '../hooks/useField';
import { Story, commentsDocument } from '../utils/firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';

type Props = {
	story?: Story;
};

const AddComment = ({ story }: Props) => {
	const user = useLoggedInUser();

	// Fields
	const [comment, commentProps] = useField('comment');
	const [submitError, setSubmitError] = useState<string>();

	// Submit handler
	const handleSubmit = async () => {
		if (!user?.email) {
			setSubmitError('You are not signed in');
			return;
		}

		try {
			const id = uuid();
			await setDoc(commentsDocument(id), {
				id,
				by: user.email,
				text: comment,
				storyId: story?.id ?? '',
				date: Timestamp.now()
			});
		} catch (err) {
			setSubmitError(
				(err as { message?: string })?.message ?? 'Unknown error occurred'
			);
		}
		commentProps.onChange({ target: { value: '' } } as never);
	};

	return (
		<>
			<TextField label="Your comment" fullWidth {...commentProps} />
			<Button onClick={() => handleSubmit()} variant="contained">
				Submit
			</Button>
			{submitError && (
				<Typography variant="subtitle2" align="left" color="error" paragraph>
					{submitError}
				</Typography>
			)}
		</>
	);
};

export default AddComment;
