import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import {
	Card,
	Grid,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	ToggleButton,
	ToggleButtonGroup,
	Typography
} from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';
import { storiesCollection, Story } from '../utils/firebase';
import StoryPreview from '../components/StoryPreview';
import { SortEnum } from '../enums/SortEnum';
import TagEnum from '../enums/TagEnum';

const Catalog = () => {
	usePageTitle('Catalog');

	const [stories, setStories] = useState<Story[]>([]);
	const [sort, setSort] = useState<SortEnum>(SortEnum.AZ);
	const [tags, setTags] = useState<TagEnum[]>([]);

	const handleSortChange = (event: SelectChangeEvent) => {
		setSort(event.target.value as SortEnum);
	};

	const handleTagsChange = (
		event: React.MouseEvent<HTMLElement>,
		newTags: TagEnum[]
	) => {
		setTags(newTags);
	};

	const mySort = () => {
		switch (sort) {
			case SortEnum.ZA:
				return (lhs: Story, rhs: Story) => rhs.title.localeCompare(lhs.title);
			case SortEnum.AZ:
				return (lhs: Story, rhs: Story) => lhs.title.localeCompare(rhs.title);
			case SortEnum.NEW:
				return (lhs: Story, rhs: Story) => rhs.date.seconds - lhs.date.seconds;
			case SortEnum.OLD:
				return (lhs: Story, rhs: Story) => lhs.date.seconds - rhs.date.seconds;
			default:
				return (lhs: Story, rhs: Story) => rhs.rating - lhs.rating;
		}
	};

	useEffect(() => {
		const unsubscribe = onSnapshot(storiesCollection, snapshot => {
			setStories(
				snapshot.docs
					.map(d => d.data())
					.filter(
						story =>
							tags.length === 0 ||
							story.tags.split(',').some(st => tags.includes(st as TagEnum))
					)
					.sort(mySort())
			);
		});
		return () => {
			unsubscribe();
		};
	}, [sort, tags]);

	return (
		<Paper
			variant="outlined"
			sx={{
				width: '100%',
				justifyContent: 'space-between',
				px: 2,
				py: 1
			}}
		>
			{/* Tags  */}
			<Paper
				variant="outlined"
				sx={{
					display: 'inline-flex',
					width: '100%',
					justifyContent: 'space-between',
					padding: '0 0 0 15px'
				}}
			>
				<p>Choose a category:</p>
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

			{/* Sort  */}
			<Paper
				variant="outlined"
				sx={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between',
					px: 2,
					py: 1
				}}
			>
				<Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					Sort stories:
				</Typography>
				<Select
					labelId="demo-controlled-open-select-label"
					id="demo-controlled-open-select"
					value={sort}
					label="Sort"
					sx={{
						width: '33%'
					}}
					onChange={handleSortChange}
				>
					<MenuItem value={SortEnum.AZ}>A to Z</MenuItem>
					<MenuItem value={SortEnum.ZA}>Z to A</MenuItem>
					<MenuItem value={SortEnum.OLD}>Oldest</MenuItem>
					<MenuItem value={SortEnum.NEW}>Newest</MenuItem>
					<MenuItem value={SortEnum.RATING}>By ratings</MenuItem>
				</Select>
			</Paper>
			{/* Story cards  */}
			{!!stories.length && (
				<Grid container spacing={2} padding={2}>
					{stories.map((story, i) => (
						//TODO add button to read full story
						<Grid key={i} item xs={4}>
							<Card sx={{ padding: 5 }}>
								<StoryPreview
									edit={false}
									key={story.date.nanoseconds}
									id={story.id}
									title={story.title}
									description={story.shortDescription}
									tags={story.tags}
									rating={story.rating}
								/>
							</Card>
						</Grid>
					))}
				</Grid>
			)}
		</Paper>
	);
};

export default Catalog;
