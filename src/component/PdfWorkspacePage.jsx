// src/components/PdfWorkspacePage.jsx
import React, { useState } from 'react';
import PdfEditor from './PdfEditor';
import LeftAdSlot from './LeftAdSlot';
import RightAdSlot from './RightAdSlot';
import { Megaphone, ChevronDown, ChevronUp } from 'lucide-react';

export default function PdfWorkspacePage() {
    const [showFloatingAds, setShowFloatingAds] = useState(true);

    return (
        <div className="relative w-full h-[calc(100dvh-56px)] lg:h-[calc(100dvh-80px)] overflow-hidden bg-slate-100 font-sans flex flex-col lg:flex-row">

            {/* =========================================
              DESKTOP ONLY: Left Sidebar Ad (15%)
              ========================================= */}
            <aside className="hidden lg:flex lg:w-[15%] xl:w-[16%] h-full p-3 border-r border-slate-200 flex-col justify-between bg-white shrink-0 overflow-y-auto">
                <div className="w-full flex-1 flex flex-col">
                    {/* <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-2 text-center">
                        Sponsor
                    </span> */}
                    <div className="w-full flex-1 flex items-center justify-center">
                        <LeftAdSlot />
                    </div>
                </div>
                <div className="text-[10px] text-slate-400 text-center mt-2">Ad Slot #1</div>
            </aside>

            {/* =========================================
              MIDDLE: PDF Viewer Area
              - Desktop: flex-1 (বাকি পুরো জায়গা নিবে)
              - Mobile / Tablet: w-full h-full
              - pb-36 যোগ করা হয়েছে যেন ফ্লোটিং অ্যাডের নিচে পিডিএফ ঢাকা না পড়ে
              ========================================= */}
            <main className={`w-full lg:flex-1 h-full p-1 sm:p-2 lg:p-3 overflow-hidden transition-all ${showFloatingAds ? 'pb-36 sm:pb-40 lg:pb-3' : 'pb-12 lg:pb-3'
                }`}>
                <PdfEditor />
            </main>

            {/* =========================================
              DESKTOP ONLY: Right Sidebar Ad (15%)
              ========================================= */}
            <aside className="hidden lg:flex lg:w-[15%] xl:w-[16%] h-full p-3 border-l border-slate-200 flex-col justify-between bg-white shrink-0 overflow-y-auto">
                <div className="w-full flex-1 flex flex-col">
                    {/* <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-2 text-center">
                        Partner
                    </span> */}
                    <div className="w-full flex-1 flex items-center justify-center">
                        <RightAdSlot />
                    </div>
                </div>
                <div className="text-[10px] text-slate-400 text-center mt-2">Ad Slot #2</div>
            </aside>

            {/* =========================================
              MOBILE & TABLET: Floating Ads Card Widget
              - Bottom centered overlay
              - Side-by-side Ad 1 & Ad 2
              ========================================= */}
            <div className="lg:hidden fixed bottom-2 left-2 right-2 sm:bottom-3 sm:left-4 sm:right-4 z-40 flex flex-col items-end pointer-events-none">

                {/* Floating Toggle Button */}
                {/* <button
                    type="button"
                    onClick={() => setShowFloatingAds(!showFloatingAds)}
                    className="pointer-events-auto mb-1 px-3 py-1.5 rounded-full bg-slate-900/90 text-white text-[11px] font-semibold backdrop-blur shadow-lg flex items-center gap-1.5 active:scale-95 transition"
                >
                    <Megaphone size={13} className="text-sky-400" />
                    <span>Offers</span>
                    {showFloatingAds ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                </button> */}

                {/* Floating Card Content */}
                {showFloatingAds && (
                    <div className="pointer-events-auto w-full bg-white/95 backdrop-blur-md rounded-2xl p-2 sm:p-3 shadow-2xl border border-slate-200/90 grid grid-cols-2 gap-2 max-h-[145px] sm:max-h-[160px] overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                        <div className="h-full flex items-center justify-center overflow-hidden">
                            <LeftAdSlot />
                        </div>
                        <div className="h-full flex items-center justify-center overflow-hidden">
                            <RightAdSlot />
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
}