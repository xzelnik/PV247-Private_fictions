import { useEffect, useState } from 'react';
import { Timestamp } from 'firebase/firestore';
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
import { Story } from '../utils/firebase';
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

	useEffect(
		() =>
			// onSnapshot(storiesCollection, snapshot =>
			// 	setStories(
			// 		snapshot.docs
			// 			.map(d => d.data())
			// 			.sort((lhs, rhs) => rhs.date.seconds - lhs.date.seconds)
			// 	)
			// ),
			setStories(
				[
					{
						by: 'Kiki',
						title: 'AStor',
						shortDescription: 'good',
						text: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbbbb  aaaaaaa',
						date: Timestamp.now(),
						tags: TagEnum.FANTASY.toString(),
						rating: 2
					},
					{
						by: 'Kiki2',
						title: 'ZStor2',
						shortDescription: 'good2',
						text: 'a asa aaaaa aaa a aaa   aa  aaaaa',
						date: Timestamp.now(),
						tags: `${TagEnum.CRIME.toString()},${TagEnum.POETRY.toString()}`,
						rating: 5
					}
				]
					.filter(
						story =>
							tags.length === 0 ||
							story.tags.split(',').some(st => tags.includes(st as TagEnum))
					)
					.sort(mySort())
			),
		[sort, tags]
	);
	/**
	 * TODO
	 * Add filters -> add functionality for the filters -- tags, authors
	 * Add sorting -> ratings, title
	 */

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
				<Typography sx={{ display: 'flex', alignItems: 'left', gap: 1 }}>
					There are X stories
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
					<MenuItem value={SortEnum.AZ}>{'A->Z'}</MenuItem>
					<MenuItem value={SortEnum.ZA}>{'Z->A'}</MenuItem>
					<MenuItem value={SortEnum.OLD}>{'old->new'}</MenuItem>
					<MenuItem value={SortEnum.NEW}>{'new->old'}</MenuItem>
					<MenuItem value={SortEnum.RATING}>Ratings</MenuItem>
				</Select>
			</Paper>
			{/* Story cards  */}
			{!!stories.length && (
				<Grid container spacing={2}>
					{stories.map((story, i) => (
						//TODO add button to read full story
						<Grid key={i} item xs={12}>
							<Card sx={{ maxWWidth: 345 }}>
								<StoryPreview
									key={story.date.nanoseconds}
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
