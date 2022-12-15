import { Box, Button } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import StoryTags from './StoryTags';

type Props = {
	edit: boolean;
	id: string;
	title: string;
	description: string;
	tags: string;
	rating: number;
};

const StoryPreview: FC<Props> = ({
	edit,
	id,
	title,
	description,
	tags,
	rating
}) => (
	<Box
		sx={{
			width: '100%'
		}}
	>
		<h1>{title}</h1>
		<p>Rarting: {rating}/5</p>
		<div>
			<StoryTags tags={tags} />
		</div>
		<p>{description}</p>
		{edit && (
			<Button variant="contained" component={Link} to={`/story-edit/${id}`}>
				Edit story
			</Button>
		)}
		<Button variant="contained" component={Link} to={`/story-view/${id}`}>
			Read story
		</Button>
	</Box>
);

export default StoryPreview;
