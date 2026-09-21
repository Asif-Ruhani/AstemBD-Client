// src/components/PdfEditor.jsx
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
    ChevronLeft,
    ChevronRight,
    RotateCcw
} from 'lucide-react';

export default function PdfEditor({ initialPdfUrl = null }) {
    const [pdfDoc, setPdfDoc] = useState(null);
    const [pdfBytes, setPdfBytes] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [scale, setScale] = useState(1.0);

    const [tool, setTool] = useState('pen');
    const [strokeColor, setStrokeColor] = useState('#ef4444');
    const [strokeWidth, setStrokeWidth] = useState(3);

    const [history, setHistory] = useState([]);
    const pageAnnotationsRef = useRef({});

    const pdfCanvasRef = useRef(null);
    const drawCanvasRef = useRef(null);
    const isDrawingRef = useRef(false);

    useEffect(() => {
        async function loadDefault() {
            if (initialPdfUrl) {
                const res = await fetch(initialPdfUrl);
                const arrayBuf = await res.arrayBuffer();
                setPdfBytes(new Uint8Array(arrayBuf));
            } else {
                const doc = await PDFDocument.create();
                doc.addPage([600, 800]);
                const bytes = await doc.save();
                setPdfBytes(bytes);
            }
        }
        loadDefault();
    }, [initialPdfUrl]);

    useEffect(() => {
        if (!pdfBytes) return;
        const loadingTask = pdfjsLib.getDocument({ data: pdfBytes.slice() });
        loadingTask.promise.then((loadedDoc) => {
            setPdfDoc(loadedDoc);
            setTotalPages(loadedDoc.numPages);
            setPageNum(1);
            pageAnnotationsRef.current = {};
        });
    }, [pdfBytes]);

    useEffect(() => {
        if (!pdfDoc) return;
        let isCancelled = false;

        pdfDoc.getPage(pageNum).then((page) => {
            if (isCancelled) return;
            const viewport = page.getViewport({ scale });
            const pdfCanvas = pdfCanvasRef.current;
            const drawCanvas = drawCanvasRef.current;

            if (!pdfCanvas || !drawCanvas) return;

            pdfCanvas.width = viewport.width;
            pdfCanvas.height = viewport.height;
            drawCanvas.width = viewport.width;
            drawCanvas.height = viewport.height;

            const pdfCtx = pdfCanvas.getContext('2d');
            page.render({ canvasContext: pdfCtx, viewport });

            const drawCtx = drawCanvas.getContext('2d');
            drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
            const savedDrawing = pageAnnotationsRef.current[pageNum];
            if (savedDrawing) {
                const img = new Image();
                img.onload = () => drawCtx.drawImage(img, 0, 0);
                img.src = savedDrawing;
            }
        });

        return () => { isCancelled = true; };
    }, [pdfDoc, pageNum, scale]);

    const saveState = () => {
        const canvas = drawCanvasRef.current;
        if (!canvas) return;
        const dataUrl = canvas.toDataURL();
        pageAnnotationsRef.current[pageNum] = dataUrl;
        setHistory((prev) => [...prev, { page: pageNum, data: dataUrl }]);
    };

    const getCoordinates = (e) => {
        const canvas = drawCanvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const startDrawing = (e) => {
        isDrawingRef.current = true;
        const canvas = drawCanvasRef.current;
        const ctx = canvas.getContext('2d');
        const { x, y } = getCoordinates(e);

        ctx.beginPath();
        ctx.moveTo(x, y);

        if (tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = strokeWidth * 4;
        } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = strokeWidth;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        }
    };

    const draw = (e) => {
        if (!isDrawingRef.current) return;
        const canvas = drawCanvasRef.current;
        const ctx = canvas.getContext('2d');
        const { x, y } = getCoordinates(e);
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        if (!isDrawingRef.current) return;
        isDrawingRef.current = false;
        saveState();
    };

    const handleUndo = () => {
        const pageHistory = history.filter((item) => item.page === pageNum);
        if (pageHistory.length === 0) {
            clearCurrentCanvas();
            return;
        }
        const updatedHistory = history.slice(0, -1);
        setHistory(updatedHistory);

        const remainingForPage = updatedHistory.filter((i) => i.page === pageNum);
        const canvas = drawCanvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (remainingForPage.length > 0) {
            const prevData = remainingForPage[remainingForPage.length - 1].data;
            pageAnnotationsRef.current[pageNum] = prevData;
            const img = new Image();
            img.onload = () => ctx.drawImage(img, 0, 0);
            img.src = prevData;
        } else {
            delete pageAnnotationsRef.current[pageNum];
        }
    };

    const clearCurrentCanvas = () => {
        const canvas = drawCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        delete pageAnnotationsRef.current[pageNum];
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file || file.type !== 'application/pdf') return;
        const reader = new FileReader();
        reader.onload = (event) => {
            setPdfBytes(new Uint8Array(event.target.result));
        };
        reader.readAsArrayBuffer(file);
    };

    const handleSavePdf = async () => {
        if (!pdfBytes) return;
        try {
            const pdfDocObj = await PDFDocument.load(pdfBytes);
            const pages = pdfDocObj.getPages();

            for (let i = 0; i < pages.length; i++) {
                const pageIdx = i + 1;
                const annotationData = pageAnnotationsRef.current[pageIdx];
                if (annotationData) {
                    const pngImage = await pdfDocObj.embedPng(annotationData);
                    const page = pages[i];
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
            alert('Failed to save annotated PDF');
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-white text-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-200">

            {/* Super Compact Toolbar: 1 single row, scrollable without scrollbar */}
            <div className="flex items-center justify-between gap-1.5 px-2 py-1.5 bg-slate-100/90 border-b border-slate-200 overflow-x-auto shrink-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

                {/* Tools: Pen & Eraser */}
                <div className="flex items-center gap-1 shrink-0 bg-white p-0.5 rounded-lg border border-slate-200">
                    <button
                        onClick={() => setTool('pen')}
                        className={`p-1.5 rounded transition ${tool === 'pen' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
                        title="Pen"
                    >
                        <Pencil size={15} />
                    </button>
                    <button
                        onClick={() => setTool('eraser')}
                        className={`p-1.5 rounded transition ${tool === 'eraser' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
                        title="Eraser"
                    >
                        <Eraser size={15} />
                    </button>
                </div>

                {/* Colors & Size */}
                <div className="flex items-center gap-1.5 shrink-0">
                    {['#ef4444', '#3b82f6', '#10b981', '#000000'].map((color) => (
                        <button
                            key={color}
                            onClick={() => { setStrokeColor(color); setTool('pen'); }}
                            className={`w-4 h-4 rounded-full border transition ${strokeColor === color && tool === 'pen' ? 'border-slate-900 scale-110' : 'border-transparent'}`}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                    <input
                        type="color"
                        value={strokeColor}
                        onChange={(e) => { setStrokeColor(e.target.value); setTool('pen'); }}
                        className="w-5 h-5 cursor-pointer border-0 bg-transparent rounded"
                        title="Color"
                    />
                    <input
                        type="range"
                        min="1"
                        max="15"
                        value={strokeWidth}
                        onChange={(e) => setStrokeWidth(Number(e.target.value))}
                        className="w-12 sm:w-16 accent-indigo-600 cursor-pointer"
                        title="Thickness"
                    />
                </div>

                {/* Undo / Clear */}
                <div className="flex items-center shrink-0">
                    <button onClick={handleUndo} className="p-1.5 text-slate-600 hover:bg-slate-200 rounded" title="Undo">
                        <Undo size={15} />
                    </button>
                    <button onClick={clearCurrentCanvas} className="p-1.5 text-slate-600 hover:text-rose-600 rounded" title="Clear">
                        <RotateCcw size={15} />
                    </button>
                </div>

                {/* Page Nav & Zoom */}
                <div className="flex items-center gap-0.5 shrink-0">
                    <button
                        disabled={pageNum <= 1}
                        onClick={() => setPageNum((p) => Math.max(1, p - 1))}
                        className="p-1 rounded bg-white border border-slate-200 text-slate-700 disabled:opacity-30"
                    >
                        <ChevronLeft size={14} />
                    </button>
                    <span className="text-[10px] font-mono px-0.5 text-slate-700 whitespace-nowrap">
                        {pageNum}/{totalPages || 1}
                    </span>
                    <button
                        disabled={pageNum >= totalPages}
                        onClick={() => setPageNum((p) => Math.min(totalPages, p + 1))}
                        className="p-1 rounded bg-white border border-slate-200 text-slate-700 disabled:opacity-30"
                    >
                        <ChevronRight size={14} />
                    </button>

                    <button onClick={() => setScale((s) => Math.max(0.5, s - 0.15))} className="p-1 text-slate-600">
                        <ZoomOut size={14} />
                    </button>
                    <button onClick={() => setScale((s) => Math.min(2.5, s + 0.15))} className="p-1 text-slate-600">
                        <ZoomIn size={14} />
                    </button>
                </div>

                {/* Open & Save */}
                <div className="flex items-center gap-1 shrink-0">
                    <label className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded cursor-pointer">
                        <Upload size={13} />
                        <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
                    </label>
                    <button
                        onClick={handleSavePdf}
                        className="flex items-center gap-1 px-2 py-1 text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded shadow-sm"
                    >
                        <Download size={13} />
                        <span>Save</span>
                    </button>
                </div>
            </div>

            {/* PDF Viewport Area: Fully scrollable inside */}
            <div className="flex-1 overflow-auto p-2 sm:p-4 flex justify-center items-start bg-slate-100">
                <div className="relative shadow-md rounded border border-slate-200 bg-white">
                    <canvas ref={pdfCanvasRef} className="block pointer-events-none" />
                    <canvas
                        ref={drawCanvasRef}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                        className={`absolute top-0 left-0 w-full h-full touch-none ${tool === 'eraser' ? 'cursor-cell' : 'cursor-crosshair'
                            }`}
                    />
                </div>
            </div>

        </div>
    );
}