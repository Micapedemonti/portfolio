import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/global.css';
import App from '@/App.tsx';
import './i18n'

const root = document.getElementById('root');
if (!root) throw new Error('No se encontró #root en index.html');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
