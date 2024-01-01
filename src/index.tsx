import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './views/App';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <MantineProvider>
      <ModalsProvider>
        <App />
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>
);
