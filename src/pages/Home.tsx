import {
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	Typography
} from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';

import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedInUser';

const Home = () => {
	usePageTitle('Home');
	const user = useLoggedInUser();

	const [matches, setMatches] = useState<Match[]>([]);

	useEffect(
		() =>
			onSnapshot(matchesCollection, snapshot =>
				setMatches(
					snapshot.docs
						.map(d => d.data())
						.sort((lhs, rhs) => rhs.date.seconds - lhs.date.seconds)
				)
			),
		[]
	);

	return (
		<>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<GridOnIcon
					sx={{
						color: 'primary.main',
						fontSize: '24rem',
						mixBlendMode: 'difference'
					}}
				/>
				<Typography variant="h1" fontWeight="bolder">
					Tic Tac Toe
				</Typography>
			</Box>
			{user?.email && (
				<Typography variant="h4" textAlign="center">
					Welcome, {user.email}!
				</Typography>
			)}
			<Button
				component={Link}
				to="/play"
				variant="outlined"
				sx={{
					'color': 'playerO',
					'borderColor': 'playerO',
					'alignSelf': 'center',
					':hover': { color: 'playerX', borderColor: 'playerX' }
				}}
			>
				Let&apos;s start
			</Button>

			{/* Recent matches */}
			{!!matches.length && (
				<>
					<Typography mt={2} variant="h4">
						Recent games:
					</Typography>
					<Box sx={{ display: 'flex', gap: 2 }}>
						{matches.slice(0, 3).map(m => (
							<Card key={m.date.seconds}>
								<CardContent>
									<Typography fontWeight="bold">{m.by}</Typography>
									<Divider sx={{ my: 2 }} />
									<Typography
										sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
									>
										{m.winner === 'Tie' ? (
											'It was a tie'
										) : (
											<>
												Winner was:
												<PlayerIcon>{m.winner}</PlayerIcon>
											</>
										)}
									</Typography>
									<Typography variant="caption">
										{new Date(new Date().getTime() - m.date.toMillis())
											.toISOString()
											.substring(11, 19)}{' '}
										ago
									</Typography>
								</CardContent>
							</Card>
						))}
					</Box>
				</>
			)}
		</>
	);
};

export default Home;
