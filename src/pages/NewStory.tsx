import { useState } from 'react';
import {
	Button,
	FormControlLabel,
	FormGroup,
	Paper,
	TextField,
	ToggleButton,
	ToggleButtonGroup
} from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';
import TagEnum from '../enums/TagEnum';
// import useLoggedInUser from '../hooks/useLoggedInUser';

const NewStory = () => {
	usePageTitle('New Story');
	// const user = useLoggedInUser();
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
		console.log(title, description, tags, story);
	};

	const handleTagsChange = (
		event: React.MouseEvent<HTMLElement>,
		newTags: TagEnum[]
	) => {
		setTags(newTags);
	};

	/**
	 * TODO
	 * Create form for new story
	 * Add input for title
	 * Add textfield for the story text
	 * Add checkboxes for tags
	 * add addDocument -> takes all data from the form, add 'by' as email of the logged in user
	 */
	return (
		<div className="new-story">
			<h1>New Story Page</h1>
			<Button type="submit" variant="outlined" onClick={() => publishStory()}>
				Publish story
			</Button>
			<FormGroup
				sx={{
					width: '100%',
					justifyContent: 'stretch'
				}}
			>
				<Paper
					variant="outlined"
					sx={{
						width: '100%',
						justifyContent: 'space-between'
					}}
				>
					<ToggleButtonGroup
						value={tags}
						onChange={handleTagsChange}
						aria-label="Select tags:"
					>
						{Object.values(TagEnum).map((tag, i) => (
							<ToggleButton key={i} value={tag} aria-label={tag}>
								{tag}
							</ToggleButton>
						))}
					</ToggleButtonGroup>
				</Paper>
				<FormControlLabel
					control={
						<TextField
							required
							id="story-title"
							label=""
							value={title}
							onChange={handleTitleChange}
							variant="filled"
						/>
					}
					label="Your title"
					labelPlacement="top"
				/>
				<FormControlLabel
					control={
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
					}
					label="Short descriprtion"
					labelPlacement="top"
				/>
				<FormControlLabel
					control={
						<TextField
							multiline
							required
							value={story}
							onChange={handleStoryChange}
							maxRows={120}
							id="story-text"
							label="..."
							variant="filled"
						/>
					}
					labelPlacement="top"
					label="Your story"
				/>
			</FormGroup>
		</div>
	);
};

export default NewStory;
