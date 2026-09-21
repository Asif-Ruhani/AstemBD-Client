// src/pdfWorker.js
import * as pdfjsLib from 'pdfjs-dist';

// Official CDN theke worker load kora (CORS free & zero-config)
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export default pdfjsLib;