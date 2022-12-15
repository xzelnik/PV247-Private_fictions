import { FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
	Box,
	Button,
	Paper,
	TextField,
	ToggleButton,
	ToggleButtonGroup
} from '@mui/material';
import { setDoc, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import usePageTitle from '../hooks/usePageTitle';
import TagEnum from '../enums/TagEnum';
import { storiesDocument } from '../utils/firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';

const NewStory = () => {
	usePageTitle('New Story');
	const user = useLoggedInUser();
	const navigate = useNavigate();
	const [story, setStory] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [tags, setTags] = useState<TagEnum[]>([]);

	const handleTitleChange = (event: any) => {
		setTitle(event.target.value);
	};

	const handleStoryChange = (event: any) => {
		setStory(event.target.value);
	};

	const handleDescriptionChange = (event: any) => {
		setDescription(event.target.value);
	};

	const publishStory = () => {
		if (user?.email) {
			const id = uuid();
			setDoc(storiesDocument(id), {
				by: user.email,
				title,
				shortDescription: description,
				text: story,
				date: Timestamp.now(),
				tags: tags.toString(),
				rating: 0,
				id
			});
			navigate('/catalog');
		}
	};

	const handleTagsChange = (
		event: React.MouseEvent<HTMLElement>,
		newTags: TagEnum[]
	) => {
		setTags(newTags);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
				width: '100%'
			}}
		>
			<h1>Create a new story</h1>
			<Paper
				component="form"
				onSubmit={async (e: FormEvent) => {
					e.preventDefault();
					try {
						publishStory();
					} catch (err) {
						window.alert(err);
					}
				}}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%'
				}}
			>
				<Paper
					variant="outlined"
					sx={{
						width: '100%',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						padding: '0 0 0 5px'
					}}
				>
					<p>Select story categories:</p>
					<ToggleButtonGroup
						value={tags}
						onChange={handleTagsChange}
						aria-label="Select tags:"
						sx={{
							display: 'flex',
							justifyContent: 'left'
						}}
					>
						{Object.values(TagEnum).map((tag, i) => (
							<ToggleButton key={i} value={tag} aria-label={tag}>
								{tag}
							</ToggleButton>
						))}
					</ToggleButtonGroup>
				</Paper>
				<Paper
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
						padding: 2
					}}
				>
					<p>Story title:</p>
					<TextField
						required
						id="story-title"
						label=""
						value={title}
						onChange={handleTitleChange}
						variant="filled"
					/>
					<p>Short description of your story:</p>
					<TextField
						multiline
						required
						value={description}
						onChange={handleDescriptionChange}
						maxRows={5}
						id="story-description"
						label="Describe shortly"
						variant="filled"
					/>
					<p>Your story:</p>
					<TextField
						multiline
						required
						value={story}
						onChange={handleStoryChange}
						rows={25}
						maxRows={120}
						id="story-text"
						label="..."
						variant="filled"
					/>
				</Paper>
				<Button type="submit" variant="outlined" onClick={() => publishStory()}>
					Publish story
				</Button>
			</Paper>
		</Box>
	);
};

export default NewStory;
