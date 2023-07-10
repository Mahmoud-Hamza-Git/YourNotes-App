import React from 'react';
import ReactDOM from 'react-dom/client';
import i18n from './utils/i18n.js'; // import it berfore App
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ModeContextProvider } from './context/ModeContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ModeContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ModeContextProvider>
    </Router>
  </React.StrictMode>
);
