import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import ChunkErrorBanner from './components/ChunkErrorBanner'
import './index.css'
import { installChunkReload } from './lib/chunkReload'

installChunkReload();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ChunkErrorBanner />
    <App />
  </HelmetProvider>
);
