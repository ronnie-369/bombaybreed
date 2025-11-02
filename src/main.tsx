import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initGA4, trackScrollDepth, trackTimeOnPage } from './utils/analytics'

// Initialize GA4 (replace with your actual Measurement ID)
const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with actual ID
if (import.meta.env.PROD) {
  initGA4(GA4_MEASUREMENT_ID);
  trackScrollDepth();
  trackTimeOnPage();
}

createRoot(document.getElementById("root")!).render(<App />);
