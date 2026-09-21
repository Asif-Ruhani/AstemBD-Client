// src/components/PdfWorkspacePage.jsx
import React from 'react';
import PdfEditor from './PdfEditor';

export default function PdfWorkspacePage() {
    return (
        <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-slate-100 font-sans">

            {/* 1. DESKTOP ONLY: Left Ad (15%) */}
            <aside className="hidden lg:flex lg:w-[15%] h-full p-3 border-r border-slate-200 flex-col justify-between bg-white shrink-0 float-left">
                <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-2">
                        Sponsor / Ad 1
                    </span>
                    <div className="w-full aspect-[4/5] rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center p-2 text-center">
                        <p className="text-xs text-slate-600 font-medium">Ad Space #1</p>
                        <p className="text-[10px] text-slate-400 mt-1">15% Left Space</p>
                    </div>
                </div>
                <div className="text-[11px] text-slate-400 text-center">Ad Slot #1</div>
            </aside>

            {/* 2. MIDDLE: PDF Viewer (Desktop: 70%, Mobile/Tablet: 100%) */}
            {/* pb-20 dewa hoyeche mobile-e jate nicher fixed ad PDF-er content ke block na kore */}
            <main className="w-full lg:w-[70%] h-full p-2 lg:p-3 pb-20 lg:pb-3 float-left overflow-hidden">
                <PdfEditor />
            </main>

            {/* 3. DESKTOP ONLY: Right Ad (15%) */}
            <aside className="hidden lg:flex lg:w-[15%] h-full p-3 border-l border-slate-200 flex-col justify-between bg-white shrink-0 float-left">
                <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-2">
                        Featured Partner
                    </span>
                    <div className="w-full aspect-[4/5] rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center p-2 text-center">
                        <p className="text-xs text-slate-600 font-medium">Ad Space #2</p>
                        <p className="text-[10px] text-slate-400 mt-1">15% Right Space</p>
                    </div>
                </div>
                <div className="text-[11px] text-slate-400 text-center">Ad Slot #2</div>
            </aside>

            {/* 4. MOBILE & TABLET ONLY: Pinned / Fixed Always-Visible Bottom Ads (50% + 50%) */}
            {/* 'fixed bottom-0' deway eta screen-er tolay locked thakbe, scroll korleo kokhono norbe na */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur border-t border-slate-200 grid grid-cols-2 gap-2 px-3 py-1.5 z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">

                {/* Mobile Ad 1 */}
                <div className="h-full rounded-lg border border-dashed border-indigo-300 bg-indigo-50/50 flex flex-col items-center justify-center px-1 text-center overflow-hidden">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-indigo-500 leading-tight">Ad 1</span>
                    <p className="text-[10px] text-slate-700 font-semibold truncate w-full">Sponsor Banner 1</p>
                </div>

                {/* Mobile Ad 2 */}
                <div className="h-full rounded-lg border border-dashed border-indigo-300 bg-indigo-50/50 flex flex-col items-center justify-center px-1 text-center overflow-hidden">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-indigo-500 leading-tight">Ad 2</span>
                    <p className="text-[10px] text-slate-700 font-semibold truncate w-full">Featured Banner 2</p>
                </div>

            </div>

        </div>
    );
}