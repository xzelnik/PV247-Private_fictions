import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import theme from './utils/theme';
import { LanguageProvider } from './hooks/useTranslation';
import Layout from './components/Layout';
import AppRoutes from './components/Routes';

const App = () => (
	<LanguageProvider>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<CssBaseline />
				<Layout>
					<AppRoutes />
				</Layout>
			</BrowserRouter>
		</ThemeProvider>
	</LanguageProvider>
);

export default App;
