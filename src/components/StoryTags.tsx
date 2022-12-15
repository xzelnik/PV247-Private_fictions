import { Stack } from '@mui/material';
import Chip from '@mui/material/Chip';
import { FC } from 'react';

type StoryTagProps = {
	tags: string;
};

const StoryTags: FC<StoryTagProps> = ({ tags }) => (
	<Stack direction="row" spacing={1}>
		{!!tags.length && (
			<>
				{tags.split(',').map(tag => (
					<Chip variant="outlined" color="primary" key={tag} label={tag} />
				))}
			</>
		)}
	</Stack>
);

export default StoryTags;
