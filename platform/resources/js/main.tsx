import React from 'react';

import './bootstrap';
import '../css/app.css';

import ReactDOM from 'react-dom/client';
import App from '@/app';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
