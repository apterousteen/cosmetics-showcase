import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from 'wouter';
import './index.css';
import App from './App.tsx';
import { CatalogProvider } from './context/CatalogContext.tsx';
import { theme } from './theme.ts';

// BASE_URL берём из Vite.
// wouter не принимает завершающий слэш в base, поэтому он обрезается.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Router base={BASE}>
        <CatalogProvider>
          <App />
        </CatalogProvider>
      </Router>
    </MantineProvider>
  </StrictMode>,
);
