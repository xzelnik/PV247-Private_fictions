import { FormEvent, useEffect, useState } from 'react';
import {
	Box,
	Button,
	Paper,
	TextField,
	ToggleButton,
	ToggleButtonGroup
} from '@mui/material';
import { onSnapshot, setDoc, Timestamp } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';

import usePageTitle from '../hooks/usePageTitle';
import TagEnum from '../enums/TagEnum';
import { storiesCollection, storiesDocument, Story } from '../utils/firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';

type StoryDoc = {
	by: string;
	title: string;
	shortDescription: string;
	text: string;
	date: Timestamp;
	tags: string;
	rating: number;
	id: string;
	docId: string;
};

const StoryEdit = () => {
	usePageTitle('Story Edit');
	const { storyId } = useParams();
	const user = useLoggedInUser();
	const navigate = useNavigate();
	const [story, setStory] = useState<Story>();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [storyText, setStoryText] = useState('');
	const [tags, setTags] = useState<TagEnum[]>([]);

	const handleTitleChange = (event: any) => {
		setTitle(event.target.value);
	};

	const handleStoryChange = (event: any) => {
		setStoryText(event.target.value);
	};

	const handleDescriptionChange = (event: any) => {
		setDescription(event.target.value);
	};

	useEffect(
		() =>
			onSnapshot(storiesCollection, snapshot =>
				setStory(
					snapshot.docs
						.map(d => d.data())
						.filter(story => story.id === storyId)[0] || null
				)
			),
		[]
	);

	useEffect(() => {
		if (story) {
			setTitle(story?.title);
			setDescription(story?.shortDescription);
			setStoryText(story?.text);
		}
	}, [story]);

	const editStory = () => {
		if (user?.email && story) {
			setDoc(storiesDocument(story.id), {
				by: user.email,
				title,
				shortDescription: description,
				text: storyText,
				date: Timestamp.now(),
				tags: tags.toString(),
				rating: 0,
				id: story.id,
				ratingCount: 0
			});
			navigate('/profile');
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
			<h1>Edit your story</h1>
			<Paper
				component="form"
				onSubmit={async (e: FormEvent) => {
					e.preventDefault();
					try {
						editStory();
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
						value={storyText}
						onChange={handleStoryChange}
						rows={25}
						maxRows={120}
						id="story-text"
						label="..."
						variant="filled"
					/>
				</Paper>
				<Button type="submit" variant="outlined" onClick={() => editStory()}>
					Edit story
				</Button>
			</Paper>
		</Box>
	);
};

export default StoryEdit;
