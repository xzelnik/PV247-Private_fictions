import { Box, Button } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import StoryTags from './StoryTags';

type Props = {
	title: string;
	description: string;
	tags: string;
	rating: number;
};

/**
 * TODO
 * Add correct link to story page
 */
const StoryPreview: FC<Props> = ({ title, description, tags, rating }) => (
	<Box
		sx={{
			width: '100%'
		}}
	>
		<h1>{title}</h1>
		<p>Rarting: {rating}/5</p>
		<p>
			<StoryTags tags={tags} />
		</p>
		<p>{description}</p>
		<Button variant="contained" component={Link} to="/new-story">
			Read story
		</Button>
	</Box>
);

export default StoryPreview;
