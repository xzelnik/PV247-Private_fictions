import { useEffect } from 'react';

const usePageTitle = (title: string) => {
	useEffect(() => {
		document.title = `${title} | Private Fictions`;
	}, [title]);
};

export default usePageTitle;
