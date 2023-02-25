import React from 'react';
import './App.css';
import { theme } from './style/theme';
import { ThemeProvider } from 'styled-components';
import { router } from './routes';
import { RouterProvider } from 'react-router-dom';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<RouterProvider router={router} />
		</ThemeProvider>
	);
}

export default App;
