import { FC } from 'react';

type StoryTagProps = {
	tags: string;
};

const StoryTags: FC<StoryTagProps> = ({ tags }) => (
	<div className="story-tags">
		{!!tags.length && (
			<>
				{tags.split(',').map(tag => (
					<div key={tag} className="tag">
						{tag}
					</div>
				))}
			</>
		)}
	</div>
);

export default StoryTags;
