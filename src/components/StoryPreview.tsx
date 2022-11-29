import { FC } from 'react';

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
	<div className="story-preview">
		<h1>{title}</h1>
		<p>{rating}/5</p>
		<StoryTags tags={tags} />
		<p>{description}</p>
		<button>
			<a href="/">Read story</a>
		</button>
	</div>
);

export default StoryPreview;
