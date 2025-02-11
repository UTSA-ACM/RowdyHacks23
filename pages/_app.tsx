import Head from 'next/head';
import { AppProps } from 'next/dist/shared/lib/router/router';
import 'firebase/auth';
import AppHeader from '../components/AppHeader';
import { initFirebase } from '../lib/firebase-client';
import { AuthProvider } from '../lib/user/AuthContext';
import '../styles/globals.css';
import '../styles/tailwind.css';
import { FCMProvider } from '../lib/service-worker/FCMContext';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Analytics } from '@vercel/analytics/react';

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css';
// used for code syntax highlighting
import 'prismjs/themes/prism-tomorrow.css';
// used for rendering equations
import 'katex/dist/katex.min.css';

initFirebase();

/**
 * A Wrapper for the HackPortal web app.
 *
 * This is the root of the component heirarchy. When the site is hydrated, this
 * will load into memory and never re-initialize unless the page refreshes.
 */
function PortalApp({ Component, pageProps }: AppProps) {
	return (
		<DndProvider backend={HTML5Backend}>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<AuthProvider>
					<FCMProvider>
						<Head>
							<meta charSet="utf-8" />
							<meta
								name="viewport"
								content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
							/>
							<title>RowdyHacks</title>
							<meta
								name="description"
								content="The official website for RowdyHacks 2023: Into The Unknown!"
							/>
							{process.env.ENABLE_PWA ||
								(process.env.NODE_ENV !== 'development' && (
									<link rel="manifest" href="/manifest.json" />
								))}
							<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
							<meta name="theme-color" content="#FF583D" />
						</Head>
						<div className="min-h-screen overflow-x-hidden bg-white max-w-screen">
							<AppHeader />
							<Component {...pageProps} />
							<Analytics />
						</div>
					</FCMProvider>
				</AuthProvider>
			</LocalizationProvider>
		</DndProvider>
	);
}

export default PortalApp;
