import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';

import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { Story, storiesCollection } from "../utils/firebase";
import StoryPreview from "../components/StoryPreview";

const Catalog = () => {
	usePageTitle('Catalog');
	const user = useLoggedInUser();

	const [stories, setStories] = useState<Story[]>([]);

	useEffect(
		() =>
			onSnapshot(storiesCollection, snapshot =>
				setStories(
					snapshot.docs
						.map(d => d.data())
						.sort((lhs, rhs) => rhs.date.seconds - lhs.date.seconds)
				)
			),
		[]
	);

	return (
		<>
			<div className="catalog-filter">
			</div>
			{!!stories.length && (
				<>
					<div className="stories">
						{stories.map(story => (
							<StoryPreview
								key={story.date.nanoseconds}
								title={story.title}
								description={story.shortDescription}
								tags={story.tags}
								rating={story.rating}
							/>
						))}
					</div>
				</>
			)}
		</>
	);
};

export default Catalog;