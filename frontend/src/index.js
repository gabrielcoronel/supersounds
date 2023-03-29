import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import { Router } from '@reach/router';

import Root from './pages/Root';
import AllTracks from './pages/AllTracks';
import UploadTrack from './pages/UploadTrack';
import EditTrack from './pages/EditTrack';
import NotFound from './pages/NotFound';
import { queryClient } from './queryClient';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Root path="/">
          <AllTracks path="tracks" />
          <UploadTrack path="upload" />
          <EditTrack path="edit/:id" />
        </Root>

        <NotFound default />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);