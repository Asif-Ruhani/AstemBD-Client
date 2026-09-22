// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import pdfjsLib from '../pdfWorker';
// import { PDFDocument } from 'pdf-lib';
// import {
//     Pencil,
//     Eraser,
//     Undo,
//     ZoomIn,
//     ZoomOut,
//     Download,
//     Upload,
//     RotateCcw,
//     Trash2,
//     Palette,
//     X
// } from 'lucide-react';

// // IndexedDB Helper Functions for Persistence
// const DB_NAME = 'PdfEditorDB';
// const STORE_NAME = 'pdfStore';

// function initDB() {
//     return new Promise((resolve, reject) => {
//         const req = indexedDB.open(DB_NAME, 1);
//         req.onupgradeneeded = () => {
//             req.result.createObjectStore(STORE_NAME);
//         };
//         req.onsuccess = () => resolve(req.result);
//         req.onerror = () => reject(req.error);
//     });
// }

// async function persistData(key, value) {
//     const db = await initDB();
//     const tx = db.transaction(STORE_NAME, 'readwrite');
//     tx.objectStore(STORE_NAME).put(value, key);
//     return tx.complete;
// }

// async function retrieveData(key) {
//     const db = await initDB();
//     return new Promise((resolve) => {
//         const tx = db.transaction(STORE_NAME, 'readonly');
//         const req = tx.objectStore(STORE_NAME).get(key);
//         req.onsuccess = () => resolve(req.result);
//         req.onerror = () => resolve(null);
//     });
// }

// async function clearPersistedData() {
//     const db = await initDB();
//     const tx = db.transaction(STORE_NAME, 'readwrite');
//     tx.objectStore(STORE_NAME).clear();
// }

// export default function PdfEditor({ initialPdfUrl = null }) {
//     const [pdfDoc, setPdfDoc] = useState(null);
//     const [pdfBytes, setPdfBytes] = useState(null);
//     const [scale, setScale] = useState(1.0);
//     const [pages, setPages] = useState([]);

//     const [tool, setTool] = useState(null); // null | 'pen' | 'eraser'
//     const [strokeColor, setStrokeColor] = useState('#ef4444');
//     const [strokeWidth, setStrokeWidth] = useState(3);

//     // Mobile color picker dropdown state
//     const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
//     const colorPickerRef = useRef(null);

//     const pageAnnotationsRef = useRef({});
//     const [history, setHistory] = useState([]);

//     const pdfCanvasRefs = useRef({});
//     const drawCanvasRefs = useRef({});
//     const renderTasksRef = useRef({});
//     const activeDrawingPage = useRef(null);
//     const isDrawingRef = useRef(false);

//     const fileInputRef = useRef(null);

//     // Close color dropdown on outside click
//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
//                 setIsColorPickerOpen(false);
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside);
//         document.addEventListener("touchstart", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//             document.removeEventListener("touchstart", handleClickOutside);
//         };
//     }, []);

//     // 1. Initial Load & Restore from IndexedDB
//     useEffect(() => {
//         async function init() {
//             try {
//                 const savedBytes = await retrieveData('active_pdf_bytes');
//                 const savedAnnotations = await retrieveData('active_pdf_annotations');

//                 if (savedAnnotations) {
//                     pageAnnotationsRef.current = savedAnnotations;
//                 }

//                 if (savedBytes && savedBytes.length > 0) {
//                     setPdfBytes(savedBytes);
//                     return;
//                 }

//                 if (initialPdfUrl) {
//                     const res = await fetch(initialPdfUrl);
//                     const arrayBuf = await res.arrayBuffer();
//                     const uint8 = new Uint8Array(arrayBuf);
//                     setPdfBytes(uint8);
//                     persistData('active_pdf_bytes', uint8);
//                 } else {
//                     const doc = await PDFDocument.create();
//                     doc.addPage([600, 800]);
//                     const bytes = await doc.save();
//                     setPdfBytes(bytes);
//                     persistData('active_pdf_bytes', bytes);
//                 }
//             } catch (err) {
//                 console.error("IndexedDB restore error:", err);
//             }
//         }
//         init();
//     }, [initialPdfUrl]);

//     // 2. Load PDF document cleanly
//     useEffect(() => {
//         if (!pdfBytes || pdfBytes.length === 0) return;

//         let isMounted = true;
//         const buffer = pdfBytes.buffer.slice(pdfBytes.byteOffset, pdfBytes.byteOffset + pdfBytes.byteLength);

//         const loadingTask = pdfjsLib.getDocument({
//             data: new Uint8Array(buffer),
//             cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@latest/cmaps/',
//             cMapPacked: true,
//         });

//         loadingTask.promise
//             .then((loadedDoc) => {
//                 if (!isMounted) return;
//                 setPdfDoc(loadedDoc);
//                 const pageList = Array.from({ length: loadedDoc.numPages }, (_, i) => i + 1);
//                 setPages(pageList);
//             })
//             .catch((err) => {
//                 console.error("PDF.js load error:", err);
//             });

//         return () => {
//             isMounted = false;
//             try { loadingTask.destroy(); } catch { }
//         };
//     }, [pdfBytes]);

//     // 3. Render PDF Pages with cancellation for smooth Zoom
//     useEffect(() => {
//         if (!pdfDoc || pages.length === 0) return;

//         pages.forEach((pNum) => {
//             if (renderTasksRef.current[pNum]) {
//                 try {
//                     renderTasksRef.current[pNum].cancel();
//                 } catch { }
//             }

//             pdfDoc.getPage(pNum).then((page) => {
//                 const viewport = page.getViewport({ scale, rotation: page.rotate || 0 });
//                 const pdfCanvas = pdfCanvasRefs.current[pNum];
//                 const drawCanvas = drawCanvasRefs.current[pNum];

//                 if (!pdfCanvas || !drawCanvas) return;

//                 const dpr = window.devicePixelRatio || 1;
//                 pdfCanvas.width = Math.floor(viewport.width * dpr);
//                 pdfCanvas.height = Math.floor(viewport.height * dpr);
//                 pdfCanvas.style.width = `${viewport.width}px`;
//                 pdfCanvas.style.height = `${viewport.height}px`;

//                 drawCanvas.width = Math.floor(viewport.width * dpr);
//                 drawCanvas.height = Math.floor(viewport.height * dpr);
//                 drawCanvas.style.width = `${viewport.width}px`;
//                 drawCanvas.style.height = `${viewport.height}px`;

//                 const pdfCtx = pdfCanvas.getContext('2d');
//                 pdfCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

//                 const renderContext = {
//                     canvasContext: pdfCtx,
//                     viewport: viewport,
//                 };

//                 const task = page.render(renderContext);
//                 renderTasksRef.current[pNum] = task;

//                 task.promise.catch(() => { });

//                 const drawCtx = drawCanvas.getContext('2d');
//                 drawCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
//                 drawCtx.clearRect(0, 0, viewport.width, viewport.height);

//                 const savedDrawing = pageAnnotationsRef.current[pNum];
//                 if (savedDrawing) {
//                     const img = new Image();
//                     img.onload = () => {
//                         drawCtx.drawImage(img, 0, 0, viewport.width, viewport.height);
//                     };
//                     img.src = savedDrawing;
//                 }
//             });
//         });
//     }, [pdfDoc, pages, scale]);

//     // 4. File Upload Handler with Auto-Save
//     const handleFileChange = async (e) => {
//         const files = e.target.files;
//         if (!files || files.length === 0) return;

//         const file = files[0];
//         try {
//             const arrayBuffer = await file.arrayBuffer();
//             const uint8 = new Uint8Array(arrayBuffer);
//             setPdfBytes(uint8);
//             pageAnnotationsRef.current = {};
//             setHistory([]);
//             await persistData('active_pdf_bytes', uint8);
//             await persistData('active_pdf_annotations', {});
//         } catch (err) {
//             console.error("File reading error:", err);
//             alert("ফাইল রিড করতে সমস্যা হয়েছে।");
//         } finally {
//             if (fileInputRef.current) fileInputRef.current.value = '';
//         }
//     };

//     const savePageState = async (pNum) => {
//         const canvas = drawCanvasRefs.current[pNum];
//         if (!canvas) return;
//         const dataUrl = canvas.toDataURL();
//         pageAnnotationsRef.current[pNum] = dataUrl;
//         setHistory((prev) => [...prev, { page: pNum, data: dataUrl }]);
//         await persistData('active_pdf_annotations', pageAnnotationsRef.current);
//     };

//     const getCoordinates = (e, canvas) => {
//         const rect = canvas.getBoundingClientRect();
//         const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//         const clientY = e.touches ? e.touches[0].clientY : e.clientY;

//         const dpr = window.devicePixelRatio || 1;
//         const scaleX = (canvas.width / dpr) / rect.width;
//         const scaleY = (canvas.height / dpr) / rect.height;

//         return {
//             x: (clientX - rect.left) * scaleX,
//             y: (clientY - rect.top) * scaleY,
//         };
//     };

//     const startDrawing = (e, pNum) => {
//         if (!tool) return;
//         if (e.touches && e.touches.length > 1) return;

//         isDrawingRef.current = true;
//         activeDrawingPage.current = pNum;
//         const canvas = drawCanvasRefs.current[pNum];
//         const ctx = canvas.getContext('2d');
//         const { x, y } = getCoordinates(e, canvas);

//         ctx.beginPath();
//         ctx.moveTo(x, y);

//         if (tool === 'eraser') {
//             ctx.globalCompositeOperation = 'destination-out';
//             ctx.lineWidth = strokeWidth * 6;
//         } else {
//             ctx.globalCompositeOperation = 'source-over';
//             ctx.strokeStyle = strokeColor;
//             ctx.lineWidth = strokeWidth;
//             ctx.lineCap = 'round';
//             ctx.lineJoin = 'round';
//         }
//     };

//     const draw = (e, pNum) => {
//         if (!isDrawingRef.current || activeDrawingPage.current !== pNum || !tool) return;
//         if (e.cancelable) e.preventDefault();

//         const canvas = drawCanvasRefs.current[pNum];
//         const ctx = canvas.getContext('2d');
//         const { x, y } = getCoordinates(e, canvas);
//         ctx.lineTo(x, y);
//         ctx.stroke();
//     };

//     const stopDrawing = () => {
//         if (!isDrawingRef.current || !activeDrawingPage.current) return;
//         const pNum = activeDrawingPage.current;
//         isDrawingRef.current = false;
//         activeDrawingPage.current = null;
//         savePageState(pNum);
//     };

//     const handleUndo = async () => {
//         if (history.length === 0) return;
//         const lastAction = history[history.length - 1];
//         const targetPage = lastAction.page;
//         const updatedHistory = history.slice(0, -1);
//         setHistory(updatedHistory);

//         const prevItemsForPage = updatedHistory.filter((i) => i.page === targetPage);
//         const canvas = drawCanvasRefs.current[targetPage];
//         if (!canvas) return;
//         const ctx = canvas.getContext('2d');
//         const dpr = window.devicePixelRatio || 1;

//         ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

//         if (prevItemsForPage.length > 0) {
//             const prevData = prevItemsForPage[prevItemsForPage.length - 1].data;
//             pageAnnotationsRef.current[targetPage] = prevData;
//             const img = new Image();
//             img.onload = () => ctx.drawImage(img, 0, 0, canvas.width / dpr, canvas.height / dpr);
//             img.src = prevData;
//         } else {
//             delete pageAnnotationsRef.current[targetPage];
//         }
//         await persistData('active_pdf_annotations', pageAnnotationsRef.current);
//     };

//     const clearAllDrawings = async () => {
//         const dpr = window.devicePixelRatio || 1;
//         pages.forEach((pNum) => {
//             const canvas = drawCanvasRefs.current[pNum];
//             if (canvas) {
//                 const ctx = canvas.getContext('2d');
//                 ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
//             }
//         });
//         pageAnnotationsRef.current = {};
//         setHistory([]);
//         await persistData('active_pdf_annotations', {});
//     };

//     const handleResetAll = async () => {
//         if (confirm("আপনি কি নতুন ডকুমেন্ট শুরু করতে চান? সংরক্ষিত ড্রয়িং ও ফাইল রিমুভ হবে।")) {
//             await clearPersistedData();
//             window.location.reload();
//         }
//     };

//     const handleSavePdf = async () => {
//         if (!pdfBytes) return;
//         try {
//             const pdfDocObj = await PDFDocument.load(pdfBytes);
//             const pdfDocPages = pdfDocObj.getPages();

//             for (let i = 0; i < pdfDocPages.length; i++) {
//                 const pageIdx = i + 1;
//                 const annotationData = pageAnnotationsRef.current[pageIdx];
//                 if (annotationData) {
//                     const pngImage = await pdfDocObj.embedPng(annotationData);
//                     const page = pdfDocPages[i];
//                     const { width, height } = page.getSize();
//                     page.drawImage(pngImage, {
//                         x: 0,
//                         y: 0,
//                         width: width,
//                         height: height,
//                     });
//                 }
//             }

//             const modifiedBytes = await pdfDocObj.save();
//             const blob = new Blob([modifiedBytes], { type: 'application/pdf' });
//             const link = document.createElement('a');
//             link.href = URL.createObjectURL(blob);
//             link.download = 'annotated_document.pdf';
//             link.click();
//         } catch (err) {
//             console.error('Save error:', err);
//             alert('PDF সংরক্ষণ করতে ব্যর্থ হয়েছে।');
//         }
//     };

//     return (
//         <div className="flex flex-col h-screen w-full bg-slate-100 text-slate-800 select-none">
//             <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="application/pdf,.pdf"
//                 onChange={handleFileChange}
//                 className="hidden"
//             />

//             {/* Top Toolbar: Fully responsive, no horizontal scroll needed on small screen */}
//             <header className="w-full bg-white border-b border-slate-200 px-2 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between gap-1 sm:gap-2 shrink-0 shadow-xs z-30">

//                 {/* 1. Tools: Pen & Eraser */}
//                 <div className="flex items-center gap-1 bg-slate-100 p-0.5 sm:p-1 rounded-lg sm:rounded-xl border border-slate-200 shrink-0">
//                     <button
//                         type="button"
//                         onClick={() => setTool(tool === 'pen' ? null : 'pen')}
//                         className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-md sm:rounded-lg transition-all ${tool === 'pen' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200 active:scale-95'
//                             }`}
//                         title="Pen Tool"
//                     >
//                         <Pencil className="w-4 h-4 sm:w-5 sm:h-5" />
//                     </button>
//                     <button
//                         type="button"
//                         onClick={() => setTool(tool === 'eraser' ? null : 'eraser')}
//                         className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-md sm:rounded-lg transition-all ${tool === 'eraser' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200 active:scale-95'
//                             }`}
//                         title="Eraser"
//                     >
//                         <Eraser className="w-4 h-4 sm:w-5 sm:h-5" />
//                     </button>
//                 </div>

//                 {/* 2. Colors: Mobile Dropdown vs Medium/Desktop Inline */}
//                 {/* 2A. Mobile Dropdown Picker (Visible on Small Screens only) */}
//                 <div className="relative flex md:hidden items-center shrink-0" ref={colorPickerRef}>
//                     <button
//                         type="button"
//                         onClick={() => {
//                             setIsColorPickerOpen(!isColorPickerOpen);
//                             setTool('pen');
//                         }}
//                         className="w-7 h-7 rounded-full border-2 border-slate-800 shadow-xs flex items-center justify-center transition-transform active:scale-90"
//                         style={{ backgroundColor: strokeColor }}
//                         title="Choose Color & Size"
//                     >
//                         <Palette size={12} className="text-white drop-shadow mix-blend-difference" />
//                     </button>

//                     {isColorPickerOpen && (
//                         <div className="absolute top-10 left-0 bg-white border border-slate-200 rounded-xl shadow-2xl p-3 z-50 flex flex-col gap-2.5 min-w-[170px] animate-in fade-in slide-in-from-top-2 duration-150">
//                             <div className="flex items-center justify-between border-b border-slate-100 pb-1">
//                                 <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Color & Size</span>
//                                 <button
//                                     type="button"
//                                     onClick={() => setIsColorPickerOpen(false)}
//                                     className="text-slate-400 hover:text-slate-600 p-0.5"
//                                 >
//                                     <X size={14} />
//                                 </button>
//                             </div>
//                             <div className="flex items-center justify-between gap-1.5">
//                                 {['#ef4444', '#3b82f6', '#10b981', '#000000'].map((color) => (
//                                     <button
//                                         key={color}
//                                         type="button"
//                                         onClick={() => {
//                                             setStrokeColor(color);
//                                             setTool('pen');
//                                             setIsColorPickerOpen(false);
//                                         }}
//                                         className={`w-6 h-6 rounded-full border-2 transition-transform ${strokeColor === color ? 'border-slate-900 scale-110 shadow' : 'border-transparent'
//                                             }`}
//                                         style={{ backgroundColor: color }}
//                                     />
//                                 ))}
//                             </div>
//                             <div className="flex flex-col gap-1 mt-1">
//                                 <div className="flex items-center justify-between text-[11px] text-slate-600">
//                                     <span>Thickness</span>
//                                     <span className="font-mono font-bold">{strokeWidth}px</span>
//                                 </div>
//                                 <input
//                                     type="range"
//                                     min="1"
//                                     max="15"
//                                     value={strokeWidth}
//                                     onChange={(e) => setStrokeWidth(Number(e.target.value))}
//                                     className="w-full accent-sky-500 cursor-pointer h-1.5"
//                                 />
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* 2B. Medium & Large Screens: Inline Colors (Hidden on Small Screens) */}
//                 <div className="hidden md:flex items-center gap-2 shrink-0">
//                     {['#ef4444', '#3b82f6', '#10b981', '#000000'].map((color) => (
//                         <button
//                             key={color}
//                             type="button"
//                             onClick={() => { setStrokeColor(color); setTool('pen'); }}
//                             className={`w-7 h-7 rounded-full border-2 transition-all active:scale-90 ${strokeColor === color && tool === 'pen' ? 'border-slate-800 scale-110 shadow-sm' : 'border-white'
//                                 }`}
//                             style={{ backgroundColor: color }}
//                         />
//                     ))}
//                     <input
//                         type="range"
//                         min="1"
//                         max="15"
//                         value={strokeWidth}
//                         onChange={(e) => setStrokeWidth(Number(e.target.value))}
//                         className="w-16 sm:w-24 accent-sky-500 cursor-pointer"
//                         title="Line Thickness"
//                     />
//                 </div>

//                 {/* 3. Undo & Clear */}
//                 <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
//                     <button
//                         type="button"
//                         onClick={handleUndo}
//                         disabled={history.length === 0}
//                         className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-slate-700 hover:bg-slate-200 disabled:opacity-30 rounded-md sm:rounded-lg active:scale-95"
//                         title="Undo"
//                     >
//                         <Undo className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
//                     </button>
//                     <button
//                         type="button"
//                         onClick={clearAllDrawings}
//                         className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-slate-700 hover:text-rose-600 hover:bg-rose-50 rounded-md sm:rounded-lg active:scale-95"
//                         title="Clear Page"
//                     >
//                         <RotateCcw className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
//                     </button>
//                 </div>

//                 {/* 4. Zoom Controls (Compact on mobile) */}
//                 <div className="flex items-center gap-0.5 sm:gap-1.5 bg-slate-100 px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg sm:rounded-xl border border-slate-200 shrink-0">
//                     <button
//                         type="button"
//                         onClick={() => setScale((s) => Math.max(0.4, Number((s - 0.15).toFixed(2))))}
//                         className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-slate-700 hover:bg-slate-200 rounded active:scale-95"
//                         title="Zoom Out"
//                     >
//                         <ZoomOut className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" />
//                     </button>
//                     <span className="text-[10px] sm:text-xs font-mono font-semibold w-7 sm:w-10 text-center">
//                         {Math.round(scale * 100)}%
//                     </span>
//                     <button
//                         type="button"
//                         onClick={() => setScale((s) => Math.min(2.5, Number((s + 0.15).toFixed(2))))}
//                         className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-slate-700 hover:bg-slate-200 rounded active:scale-95"
//                         title="Zoom In"
//                     >
//                         <ZoomIn className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" />
//                     </button>
//                 </div>

//                 {/* 5. Right Actions: Delete/Reset, Upload, Save */}
//                 <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 ml-auto">
//                     <button
//                         type="button"
//                         onClick={handleResetAll}
//                         className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-rose-500 hover:bg-rose-50 rounded-md sm:rounded-lg active:scale-95"
//                         title="Reset Cache"
//                     >
//                         <Trash2 className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
//                     </button>

//                     <button
//                         type="button"
//                         onClick={() => fileInputRef.current?.click()}
//                         className="h-8 sm:h-10 px-2 sm:px-3.5 flex items-center gap-1 sm:gap-1.5 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-md sm:rounded-lg shadow-xs active:scale-95"
//                         title="Upload PDF"
//                     >
//                         <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                         <span className="hidden sm:inline">Upload</span>
//                     </button>

//                     <button
//                         type="button"
//                         onClick={handleSavePdf}
//                         className="h-8 sm:h-10 px-2.5 sm:px-4 flex items-center gap-1 sm:gap-1.5 text-xs font-bold bg-sky-500 hover:bg-sky-600 text-white rounded-md sm:rounded-lg shadow-sm active:scale-95"
//                         title="Save PDF"
//                     >
//                         <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                         <span className="hidden sm:inline">Save</span>
//                     </button>
//                 </div>
//             </header>

//             {/* PDF Render Container */}
//             <main className="flex-1 w-full overflow-y-auto overflow-x-auto p-4 flex flex-col items-center gap-6">
//                 {pages.map((pNum) => (
//                     <div
//                         key={pNum}
//                         className="relative shadow-lg border border-slate-300 bg-white select-none shrink-0"
//                     >
//                         <canvas
//                             ref={(el) => (pdfCanvasRefs.current[pNum] = el)}
//                             className="block pointer-events-none"
//                         />

//                         <canvas
//                             ref={(el) => (drawCanvasRefs.current[pNum] = el)}
//                             onMouseDown={(e) => startDrawing(e, pNum)}
//                             onMouseMove={(e) => draw(e, pNum)}
//                             onMouseUp={stopDrawing}
//                             onMouseLeave={stopDrawing}
//                             onTouchStart={(e) => startDrawing(e, pNum)}
//                             onTouchMove={(e) => draw(e, pNum)}
//                             onTouchEnd={stopDrawing}
//                             className={`absolute top-0 left-0 ${!tool ? 'pointer-events-none' : 'pointer-events-auto touch-none'
//                                 }`}
//                         />
//                     </div>
//                 ))}
//             </main>
//         </div>
//     );
// }

import React, { useState, useRef, useEffect } from 'react';
import pdfjsLib from '../pdfWorker';
import { PDFDocument } from 'pdf-lib';
import {
    Pencil,
    Eraser,
    Undo,
    ZoomIn,
    ZoomOut,
    Download,
    Upload,
    RotateCcw,
    Trash2,
    Palette,
    X,
    Maximize2
} from 'lucide-react';

// IndexedDB Helper Functions for Persistence
const DB_NAME = 'PdfEditorDB';
const STORE_NAME = 'pdfStore';

function initDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, 1);
        req.onupgradeneeded = () => {
            req.result.createObjectStore(STORE_NAME);
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

async function persistData(key, value) {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(value, key);
    return tx.complete;
}

async function retrieveData(key) {
    const db = await initDB();
    return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const req = tx.objectStore(STORE_NAME).get(key);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(null);
    });
}

async function clearPersistedData() {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).clear();
}

export default function PdfEditor({ initialPdfUrl = null }) {


    const NOTICE_TEXT = "📢 এসএসসি ও এইচএসসি কোর্সে চলছে ফ্ল্যাট ৩০% ডিসকাউন্ট! • ইংলিশ ভোকাবুলারি কোর্সের ১টি মাইলস্টোন কিনলেই সহায়ক হিসেবে আরও ৩টি মাইলস্টোন পাচ্ছেন সম্পূর্ণ ফ্রি! • থাকছে বিদেশে উচ্চশিক্ষার (Study Abroad) গাইডলাইন ও ফুল সাপোর্ট! 🎓✈️";

    const [pdfDoc, setPdfDoc] = useState(null);
    const [pdfBytes, setPdfBytes] = useState(null);
    const [scale, setScale] = useState(1.0);
    const [pages, setPages] = useState([]);

    const [tool, setTool] = useState(null); // null | 'pen' | 'eraser'
    const [strokeColor, setStrokeColor] = useState('#ef4444');
    const [strokeWidth, setStrokeWidth] = useState(3);

    // Mobile color picker dropdown state
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const colorPickerRef = useRef(null);

    const pageAnnotationsRef = useRef({});
    const [history, setHistory] = useState([]);

    const pdfCanvasRefs = useRef({});
    const drawCanvasRefs = useRef({});
    const renderTasksRef = useRef({});
    const activeDrawingPage = useRef(null);
    const isDrawingRef = useRef(false);

    const fileInputRef = useRef(null);
    const containerRef = useRef(null);

    // Close color dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
                setIsColorPickerOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);

    // 1. Initial Load & Restore from IndexedDB
    useEffect(() => {
        async function init() {
            try {
                const savedBytes = await retrieveData('active_pdf_bytes');
                const savedAnnotations = await retrieveData('active_pdf_annotations');

                if (savedAnnotations) {
                    pageAnnotationsRef.current = savedAnnotations;
                }

                if (savedBytes && savedBytes.length > 0) {
                    setPdfBytes(savedBytes);
                    return;
                }

                if (initialPdfUrl) {
                    const res = await fetch(initialPdfUrl);
                    const arrayBuf = await res.arrayBuffer();
                    const uint8 = new Uint8Array(arrayBuf);
                    setPdfBytes(uint8);
                    persistData('active_pdf_bytes', uint8);
                } else {
                    const doc = await PDFDocument.create();
                    doc.addPage([600, 800]);
                    const bytes = await doc.save();
                    setPdfBytes(bytes);
                    persistData('active_pdf_bytes', bytes);
                }
            } catch (err) {
                console.error("IndexedDB restore error:", err);
            }
        }
        init();
    }, [initialPdfUrl]);

    // 2. Load PDF document cleanly
    useEffect(() => {
        if (!pdfBytes || pdfBytes.length === 0) return;

        let isMounted = true;
        const buffer = pdfBytes.buffer.slice(pdfBytes.byteOffset, pdfBytes.byteOffset + pdfBytes.byteLength);

        const loadingTask = pdfjsLib.getDocument({
            data: new Uint8Array(buffer),
            cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@latest/cmaps/',
            cMapPacked: true,
        });

        loadingTask.promise
            .then((loadedDoc) => {
                if (!isMounted) return;
                setPdfDoc(loadedDoc);
                const pageList = Array.from({ length: loadedDoc.numPages }, (_, i) => i + 1);
                setPages(pageList);
            })
            .catch((err) => {
                console.error("PDF.js load error:", err);
            });

        return () => {
            isMounted = false;
            try { loadingTask.destroy(); } catch { }
        };
    }, [pdfBytes]);

    // 3. Render PDF Pages with High DPI & Crisp Clear Text
    useEffect(() => {
        if (!pdfDoc || pages.length === 0) return;

        pages.forEach((pNum) => {
            if (renderTasksRef.current[pNum]) {
                try {
                    renderTasksRef.current[pNum].cancel();
                } catch { }
            }

            pdfDoc.getPage(pNum).then((page) => {
                const viewport = page.getViewport({ scale, rotation: page.rotate || 0 });
                const pdfCanvas = pdfCanvasRefs.current[pNum];
                const drawCanvas = drawCanvasRefs.current[pNum];

                if (!pdfCanvas || !drawCanvas) return;

                // High DPI Scaling jate zoom korle lekha na ghola hoy
                const dpr = Math.max(window.devicePixelRatio || 1, 2);

                pdfCanvas.width = Math.floor(viewport.width * dpr);
                pdfCanvas.height = Math.floor(viewport.height * dpr);
                pdfCanvas.style.width = `${viewport.width}px`;
                pdfCanvas.style.height = `${viewport.height}px`;

                drawCanvas.width = Math.floor(viewport.width * dpr);
                drawCanvas.height = Math.floor(viewport.height * dpr);
                drawCanvas.style.width = `${viewport.width}px`;
                drawCanvas.style.height = `${viewport.height}px`;

                const pdfCtx = pdfCanvas.getContext('2d', { alpha: false });
                pdfCtx.imageSmoothingEnabled = false; // Lekha crisp o sharp rakhar jonno
                pdfCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

                const renderContext = {
                    canvasContext: pdfCtx,
                    viewport: viewport,
                };

                const task = page.render(renderContext);
                renderTasksRef.current[pNum] = task;

                task.promise.catch(() => { });

                const drawCtx = drawCanvas.getContext('2d');
                drawCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
                drawCtx.clearRect(0, 0, viewport.width, viewport.height);

                const savedDrawing = pageAnnotationsRef.current[pNum];
                if (savedDrawing) {
                    const img = new Image();
                    img.onload = () => {
                        drawCtx.drawImage(img, 0, 0, viewport.width, viewport.height);
                    };
                    img.src = savedDrawing;
                }
            });
        });
    }, [pdfDoc, pages, scale]);

    // Fit to Screen Width Handler
    const handleFitWidth = () => {
        if (!containerRef.current || !pdfDoc) return;
        pdfDoc.getPage(1).then((page) => {
            const defaultViewport = page.getViewport({ scale: 1.0 });
            const containerWidth = containerRef.current.clientWidth - 32; // 32px padding
            const newScale = Number((containerWidth / defaultViewport.width).toFixed(2));
            setScale(Math.max(0.4, Math.min(newScale, 5.0)));
        });
    };

    // 4. File Upload Handler with Auto-Save
    const handleFileChange = async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        try {
            const arrayBuffer = await file.arrayBuffer();
            const uint8 = new Uint8Array(arrayBuffer);
            setPdfBytes(uint8);
            pageAnnotationsRef.current = {};
            setHistory([]);
            await persistData('active_pdf_bytes', uint8);
            await persistData('active_pdf_annotations', {});
        } catch (err) {
            console.error("File reading error:", err);
            alert("File reading error:");
        } finally {
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const savePageState = async (pNum) => {
        const canvas = drawCanvasRefs.current[pNum];
        if (!canvas) return;
        const dataUrl = canvas.toDataURL();
        pageAnnotationsRef.current[pNum] = dataUrl;
        setHistory((prev) => [...prev, { page: pNum, data: dataUrl }]);
        await persistData('active_pdf_annotations', pageAnnotationsRef.current);
    };

    const getCoordinates = (e, canvas) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const dpr = Math.max(window.devicePixelRatio || 1, 2);
        const scaleX = (canvas.width / dpr) / rect.width;
        const scaleY = (canvas.height / dpr) / rect.height;

        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY,
        };
    };

    const startDrawing = (e, pNum) => {
        if (!tool) return;
        if (e.touches && e.touches.length > 1) return;

        isDrawingRef.current = true;
        activeDrawingPage.current = pNum;
        const canvas = drawCanvasRefs.current[pNum];
        const ctx = canvas.getContext('2d');
        const { x, y } = getCoordinates(e, canvas);

        ctx.beginPath();
        ctx.moveTo(x, y);

        if (tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = strokeWidth * 6;
        } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = strokeWidth;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        }
    };

    const draw = (e, pNum) => {
        if (!isDrawingRef.current || activeDrawingPage.current !== pNum || !tool) return;
        if (e.cancelable) e.preventDefault();

        const canvas = drawCanvasRefs.current[pNum];
        const ctx = canvas.getContext('2d');
        const { x, y } = getCoordinates(e, canvas);
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        if (!isDrawingRef.current || !activeDrawingPage.current) return;
        const pNum = activeDrawingPage.current;
        isDrawingRef.current = false;
        activeDrawingPage.current = null;
        savePageState(pNum);
    };

    const handleUndo = async () => {
        if (history.length === 0) return;
        const lastAction = history[history.length - 1];
        const targetPage = lastAction.page;
        const updatedHistory = history.slice(0, -1);
        setHistory(updatedHistory);

        const prevItemsForPage = updatedHistory.filter((i) => i.page === targetPage);
        const canvas = drawCanvasRefs.current[targetPage];
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = Math.max(window.devicePixelRatio || 1, 2);

        ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

        if (prevItemsForPage.length > 0) {
            const prevData = prevItemsForPage[prevItemsForPage.length - 1].data;
            pageAnnotationsRef.current[targetPage] = prevData;
            const img = new Image();
            img.onload = () => ctx.drawImage(img, 0, 0, canvas.width / dpr, canvas.height / dpr);
            img.src = prevData;
        } else {
            delete pageAnnotationsRef.current[targetPage];
        }
        await persistData('active_pdf_annotations', pageAnnotationsRef.current);
    };

    const clearAllDrawings = async () => {
        const dpr = Math.max(window.devicePixelRatio || 1, 2);
        pages.forEach((pNum) => {
            const canvas = drawCanvasRefs.current[pNum];
            if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
            }
        });
        pageAnnotationsRef.current = {};
        setHistory([]);
        await persistData('active_pdf_annotations', {});
    };

    const handleResetAll = async () => {
        if (confirm("This file will be removed from here if you delete it")) {
            await clearPersistedData();
            window.location.reload();
        }
    };

    const handleSavePdf = async () => {
        if (!pdfBytes) return;
        try {
            const pdfDocObj = await PDFDocument.load(pdfBytes);
            const pdfDocPages = pdfDocObj.getPages();

            for (let i = 0; i < pdfDocPages.length; i++) {
                const pageIdx = i + 1;
                const annotationData = pageAnnotationsRef.current[pageIdx];
                if (annotationData) {
                    const pngImage = await pdfDocObj.embedPng(annotationData);
                    const page = pdfDocPages[i];
                    const { width, height } = page.getSize();
                    page.drawImage(pngImage, {
                        x: 0,
                        y: 0,
                        width: width,
                        height: height,
                    });
                }
            }

            const modifiedBytes = await pdfDocObj.save();
            const blob = new Blob([modifiedBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'annotated_document.pdf';
            link.click();
        } catch (err) {
            console.error('Save error:', err);
            alert('Unable to save the pdf');
        }
    };

    return (
        <div className="flex flex-col h-screen w-full bg-slate-100 text-slate-800 select-none">
            <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Top Toolbar */}
            <header className="w-full bg-white border-b border-slate-200 px-2 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between gap-2 shrink-0 shadow-xs z-30">

                {/* Left Section: Tools & Colors */}
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                    <div className="flex items-center gap-1 bg-slate-100 p-0.5 sm:p-1 rounded-lg sm:rounded-xl border border-slate-200">
                        <button
                            type="button"
                            onClick={() => setTool(tool === 'pen' ? null : 'pen')}
                            className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-md sm:rounded-lg transition-all ${tool === 'pen' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200 active:scale-95'}`}
                            title="Pen Tool"
                        >
                            <Pencil className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setTool(tool === 'eraser' ? null : 'eraser')}
                            className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-md sm:rounded-lg transition-all ${tool === 'eraser' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200 active:scale-95'}`}
                            title="Eraser"
                        >
                            <Eraser className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>

                    {/* Mobile Color Picker */}
                    <div className="relative flex md:hidden items-center shrink-0" ref={colorPickerRef}>
                        <button
                            type="button"
                            onClick={() => {
                                setIsColorPickerOpen(!isColorPickerOpen);
                                setTool('pen');
                            }}
                            className="w-7 h-7 rounded-full border-2 border-slate-800 shadow-xs flex items-center justify-center transition-transform active:scale-90"
                            style={{ backgroundColor: strokeColor }}
                            title="Choose Color & Size"
                        >
                            <Palette size={12} className="text-white drop-shadow mix-blend-difference" />
                        </button>

                        {isColorPickerOpen && (
                            <div className="absolute top-10 left-0 bg-white border border-slate-200 rounded-xl shadow-2xl p-3 z-50 flex flex-col gap-2.5 min-w-[170px] animate-in fade-in slide-in-from-top-2 duration-150">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Color & Size</span>
                                    <button
                                        type="button"
                                        onClick={() => setIsColorPickerOpen(false)}
                                        className="text-slate-400 hover:text-slate-600 p-0.5"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between gap-1.5">
                                    {['#ef4444', '#3b82f6', '#10b981', '#000000'].map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => {
                                                setStrokeColor(color);
                                                setTool('pen');
                                                setIsColorPickerOpen(false);
                                            }}
                                            className={`w-6 h-6 rounded-full border-2 transition-transform ${strokeColor === color ? 'border-slate-900 scale-110 shadow' : 'border-transparent'}`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                                <div className="flex flex-col gap-1 mt-1">
                                    <div className="flex items-center justify-between text-[11px] text-slate-600">
                                        <span>Thickness</span>
                                        <span className="font-mono font-bold">{strokeWidth}px</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="15"
                                        value={strokeWidth}
                                        onChange={(e) => setStrokeWidth(Number(e.target.value))}
                                        className="w-full accent-sky-500 cursor-pointer h-1.5"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Desktop Inline Colors */}
                    <div className="hidden md:flex items-center gap-2 shrink-0">
                        {['#ef4444', '#3b82f6', '#10b981', '#000000'].map((color) => (
                            <button
                                key={color}
                                type="button"
                                onClick={() => { setStrokeColor(color); setTool('pen'); }}
                                className={`w-7 h-7 rounded-full border-2 transition-all active:scale-90 ${strokeColor === color && tool === 'pen' ? 'border-slate-800 scale-110 shadow-sm' : 'border-white'}`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                        <input
                            type="range"
                            min="1"
                            max="15"
                            value={strokeWidth}
                            onChange={(e) => setStrokeWidth(Number(e.target.value))}
                            className="w-16 sm:w-24 accent-sky-500 cursor-pointer"
                            title="Line Thickness"
                        />
                    </div>

                    {/* Undo & Clear */}
                    <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
                        <button
                            type="button"
                            onClick={handleUndo}
                            disabled={history.length === 0}
                            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-slate-700 hover:bg-slate-200 disabled:opacity-30 rounded-md sm:rounded-lg active:scale-95"
                            title="Undo"
                        >
                            <Undo className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                        </button>
                        <button
                            type="button"
                            onClick={clearAllDrawings}
                            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-slate-700 hover:text-rose-600 hover:bg-rose-50 rounded-md sm:rounded-lg active:scale-95"
                            title="Clear Page"
                        >
                            <RotateCcw className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                        </button>
                    </div>

                    {/* Zoom Controls */}
                    <div className="flex items-center gap-0.5 sm:gap-1 bg-slate-100 px-1 sm:px-1.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl border border-slate-200 shrink-0">
                        <button
                            type="button"
                            onClick={() => setScale((s) => Math.max(0.4, Number((s - 0.15).toFixed(2))))}
                            className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-slate-700 hover:bg-slate-200 rounded active:scale-95"
                            title="Zoom Out"
                        >
                            <ZoomOut className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" />
                        </button>
                        <span className="text-[10px] sm:text-xs font-mono font-semibold w-8 sm:w-10 text-center">
                            {Math.round(scale * 100)}%
                        </span>
                        <button
                            type="button"
                            onClick={() => setScale((s) => Math.min(5.0, Number((s + 0.15).toFixed(2))))}
                            className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-slate-700 hover:bg-slate-200 rounded active:scale-95"
                            title="Zoom In"
                        >
                            <ZoomIn className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" />
                        </button>
                        <button
                            type="button"
                            onClick={handleFitWidth}
                            className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-slate-700 hover:bg-slate-200 rounded active:scale-95"
                            title="Fit to Width"
                        >
                            <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                    </div>
                </div>

                {/* Middle Marquee Text (Right to Left Scrolling) */}
                {/* <div className="flex-1 overflow-hidden mx-2 sm:mx-4 hidden sm:flex items-center">
                    <marquee
                        behavior="scroll"
                        direction="left"
                        scrollamount="5"
                        className="text-xs sm:text-sm font-medium text-slate-600 tracking-wide"
                    >
                        এসএসসি ও এইচএসসি কোর্সে চলছে ফ্ল্যাট ৩০% ডিসকাউন্ট! • ইংলিশ ভোকাবুলারি কোর্সের ১টি মাইলস্টোন কিনলেই সহায়ক হিসেবে আরও ৩টি মাইলস্টোন পাচ্ছেন সম্পূর্ণ ফ্রি! • থাকছে বিদেশে উচ্চশিক্ষার (Study Abroad) গাইডলাইন ও ফুল সাপোর্ট!
                    </marquee>
                </div> */}
                {/* Middle Marquee Text (Seamless Continuous Loop) */}
                <div className="flex-1 overflow-hidden mx-2 sm:mx-4 hidden sm:flex items-center relative select-none">
                    <style>{`
        @keyframes scrollText {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
        }
        .marquee-track {
            display: flex;
            width: max-content;
            flex-shrink: 0;
            animation: scrollText 30s linear infinite;
        }
        .marquee-container:hover .marquee-track {
            animation-play-state: paused;
        }
    `}</style>

                    <div className="marquee-container flex w-full overflow-hidden text-xs sm:text-sm font-medium text-slate-600 tracking-wide">
                        {[1, 2].map((key) => (
                            <div key={key} className="marquee-track flex items-center shrink-0">
                                <span className="pr-120 inline-block whitespace-nowrap">
                                    {NOTICE_TEXT}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Right Actions: Delete, Upload, Save */}
                <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 ml-auto">
                    <button
                        type="button"
                        onClick={handleResetAll}
                        className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-rose-500 hover:bg-rose-50 rounded-md sm:rounded-lg active:scale-95"
                        title="Reset Cache"
                    >
                        <Trash2 className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                    </button>

                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="h-8 sm:h-10 px-2 sm:px-3.5 flex items-center gap-1 sm:gap-1.5 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-md sm:rounded-lg shadow-xs active:scale-95"
                        title="Upload PDF"
                    >
                        <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Upload</span>
                    </button>

                    <button
                        type="button"
                        onClick={handleSavePdf}
                        className="h-8 sm:h-10 px-2.5 sm:px-4 flex items-center gap-1 sm:gap-1.5 text-xs font-bold bg-sky-500 hover:bg-sky-600 text-white rounded-md sm:rounded-lg shadow-sm active:scale-95"
                        title="Save PDF"
                    >
                        <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Save</span>
                    </button>
                </div>
            </header>

            {/* PDF Render Container */}
            <main ref={containerRef} className="flex-1 w-full overflow-y-auto overflow-x-auto p-4 flex flex-col items-center gap-6">
                {pages.map((pNum) => (
                    <div
                        key={pNum}
                        className="relative shadow-lg border border-slate-300 bg-white select-none shrink-0"
                    >
                        <canvas
                            ref={(el) => (pdfCanvasRefs.current[pNum] = el)}
                            className="block pointer-events-none"
                        />

                        <canvas
                            ref={(el) => (drawCanvasRefs.current[pNum] = el)}
                            onMouseDown={(e) => startDrawing(e, pNum)}
                            onMouseMove={(e) => draw(e, pNum)}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={(e) => startDrawing(e, pNum)}
                            onTouchMove={(e) => draw(e, pNum)}
                            onTouchEnd={stopDrawing}
                            className={`absolute top-0 left-0 ${!tool ? 'pointer-events-none' : 'pointer-events-auto touch-none'}`}
                        />
                    </div>
                ))}
            </main>
        </div>
    );
}