import { FormEvent, useState } from 'react';
import {
	Box,
	Button,
	FormControlLabel,
	FormGroup,
	Paper,
	TextField,
	ToggleButton,
	ToggleButtonGroup
} from '@mui/material';
import { addDoc, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import usePageTitle from '../hooks/usePageTitle';
import TagEnum from '../enums/TagEnum';
import { storiesCollection } from '../utils/firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';

const StoryView = () => {
	usePageTitle('');
	const [story, setStory] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [tags, setTags] = useState<TagEnum[]>([]);

	return (
		<Paper
			variant="outlined"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
				width: '100%',
				px: 2
			}}
		>
			<h1>{title}</h1>
			<p>{story}</p>
		</Paper>
	);
};

export default StoryView;
