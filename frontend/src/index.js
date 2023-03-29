import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import { Router } from '@reach/router';

import AllTracks from './pages/AllTracks';
import { queryClient } from './queryClient';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Router>
      <AllTracks />
    </Router>
  </QueryClientProvider>
    </React.StrictMode>
);