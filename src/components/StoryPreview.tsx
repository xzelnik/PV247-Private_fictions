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
	<Box>
		<h1>{title}</h1>
		<p>{rating}/5</p>
		<StoryTags tags={tags} />
		<p>{description}</p>
		<Button component={Link} to="/new-story">
			Read story
		</Button>
	</Box>
);

export default StoryPreview;
