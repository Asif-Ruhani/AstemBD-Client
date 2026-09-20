import React from 'react';
import DynamicWatermark from './DynamicWatermark';
import { useScreenShield } from '../Hooks/useScreenShield';
import useHardenedShield from '../Hooks/useHardenedShield';

const ContentShield = ({ children }) => {
    const { isProtected, resetShield } = useScreenShield({ autoRecover: true });
    useHardenedShield();

    return (
        <div className="relative min-h-screen">
            {/* ১. ডায়নামিক জলছাপ */}
            <DynamicWatermark />

            {/* ২. স্ক্রিনশট / ফোকাস ডিটেকশন ডিফোকাস শিল্ড */}
            {isProtected && (
                <div
                    onClick={resetShield}
                    className="fixed inset-0 z-[10000] backdrop-blur-2xl bg-slate-950/90 flex flex-col items-center justify-center text-center p-6 select-none cursor-pointer"
                >
                    <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center mb-4">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-black text-white tracking-tight mb-1">
                        Screen Capture Protection Active
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
                        Content is hidden because an external tool or another window is focused. Click anywhere on this screen to resume.
                    </p>
                </div>
            )}

            {/* ৩. চিলড্রেন কনটেন্ট */}
            {children}
        </div>
    );
};

export default ContentShield;