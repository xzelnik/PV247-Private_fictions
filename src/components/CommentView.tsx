import { Button, Card, CardContent, Typography } from '@mui/material';
import { deleteDoc } from 'firebase/firestore';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { Comment, commentsDocument } from '../utils/firebase';

type Props = {
	comment?: Comment;
};

const CommentView = ({ comment }: Props) => {
	const user = useLoggedInUser();

	const handleDelete = () => {
		deleteDoc(commentsDocument(comment?.id ?? ''));
	};

	return (
		<Card
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				width: '100%',
				textAlign: 'left'
			}}
		>
			<CardContent>
				<div style={{ display: 'flex' }}>
					<Typography
						style={{ marginRight: 'auto' }}
						variant="h5"
						color="textSecondary"
						display="inline"
					>
						{comment?.by}
					</Typography>
					<Typography
						style={{ marginLeft: 'auto' }}
						variant="h6"
						color="textSecondary"
						display="inline"
					>
						{comment?.date?.toDate().toLocaleString()}
					</Typography>
				</div>
				{comment?.text && <Typography>{comment?.text}</Typography>}
			</CardContent>
			{comment?.by === user?.email && (
				<Button
					color="primary"
					component="span"
					// weird fix to string || null
					onClick={() => handleDelete()}
				>
					Delete comment
				</Button>
			)}
		</Card>
	);
};

export default CommentView;
