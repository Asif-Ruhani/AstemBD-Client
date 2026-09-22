import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const offers = [
    {
        id: 1,
        category: "CSE স্পেশাল",
        title: "৫০% ছাড় সব CSE কোর্সে!",
        desc: "প্রোগ্রামিং, ওয়েব ডেভেলপমেন্ট ও প্রজেক্ট বেসড লার্নিং সহজ বাংলায়।",
        highlight: "৫০% ছাড়",
        link: "/courses/cse-courses",
        btnText: "কোর্স দেখুন"
    },
    {
        id: 2,
        category: "HSC প্রস্তুতি",
        title: "HSC পূর্ণাঙ্গ একাডেমি ব্যাচ",
        desc: "ফিজিক্স, কেমিস্ট্রি ও উচ্চতর গণিতের বোর্ড ও অ্যাডমিশন প্রস্তুতি।",
        highlight: "নতুন ব্যাচ",
        link: "/courses/hsc-batch",
        btnText: "এনরোল করুন"
    },
    // {
    //     id: 3,
    //     category: "SSC স্পেশাল",
    //     title: "SSC গোল্ডেন ব্যাচ অফার",
    //     desc: "প্রতিটি বিষয়ের কনসেপ্ট ক্লিয়ারিং ও অধ্যায়ভিত্তিক মডেল টেস্ট সিরিজ।",
    //     highlight: "সীমিত আসন",
    //     link: "/courses/ssc-batch",
    //     btnText: "বিস্তারিত জানুন"
    // }
];

export default function LeftAdSlot() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Array theke kono item remove korle index out-of-bound thakle safe reset hobe
    useEffect(() => {
        if (currentIndex >= offers.length) {
            setCurrentIndex(0);
        }
    }, [offers.length, currentIndex]);

    // Mobile slider timer (shudhu 1 tar beshi offer thakle cholbe)
    useEffect(() => {
        if (offers.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % offers.length);
        }, 3500);

        return () => clearInterval(timer);
    }, []);

    // Safe fallback lookup (undefined error theke bachabe)
    const activeOffer = offers[currentIndex] || offers[0];

    // Jodi array puro khali thake
    if (!activeOffer) return null;

    return (
        <div className="w-full h-full">

            {/* ========================================================
          ১. MOBILE & TABLET (lg er niche): ৩.৫ সেকেন্ড পর পর স্লাইডার
          ======================================================== */}
            <div className="flex lg:hidden w-full h-full">
                <aside
                    aria-label="Mobile Advertisement Slider"
                    className="relative w-full h-full min-h-[135px] sm:min-h-[155px] flex flex-col items-center justify-between p-3 sm:p-4 text-center bg-gradient-to-b from-sky-50/50 via-white to-slate-50/80 rounded-2xl border border-sky-100 shadow-xs transition-all overflow-hidden select-none"
                >
                    {/* Animated Card Content */}
                    <div
                        key={activeOffer.id || currentIndex}
                        className="w-full flex flex-col items-center justify-center animate-in fade-in duration-300"
                    >
                        {/* Category Tag */}
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-100/80 text-sky-700 text-[10px] font-bold tracking-tight">
                            <Sparkles size={10} className="text-sky-500" />
                            {activeOffer.category}
                        </span>

                        {/* Title */}
                        {/* <h4 className="text-[13px] sm:text-[15px] font-extrabold text-slate-800 tracking-tight leading-snug mt-1.5">
                            {activeOffer.title}
                        </h4> */}

                        {/* Description */}
                        <p className="text-[11px] sm:text-xs text-slate-500 mt-1 max-w-[210px] sm:max-w-xs leading-relaxed font-normal">
                            {activeOffer.desc}
                        </p>

                        {/* CTA Button (Sky Blue) */}
                        <a
                            href={activeOffer.link}
                            className="mt-2.5 px-3.5 sm:px-4 py-1.5 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white text-[11px] sm:text-xs font-bold rounded-lg shadow-sm shadow-sky-500/20 transition-all inline-flex items-center gap-1.5"
                        >
                            <span>{activeOffer.btnText}</span>
                            <ArrowRight size={12} />
                        </a>
                    </div>

                    {/* Dots Indicator: Shudhu 1 tar beshi offer thakle show korbe */}
                    {offers.length > 1 && (
                        <div className="flex items-center gap-1.5 mt-2">
                            {offers.map((offer, idx) => (
                                <button
                                    key={offer.id || idx}
                                    type="button"
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`h-1.5 rounded-full transition-all ${currentIndex === idx ? 'w-4 bg-sky-500' : 'w-1.5 bg-slate-200'
                                        }`}
                                    title={`Offer ${idx + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </aside>
            </div>

            {/* ========================================================
          ২. LAPTOP & PC (lg ebong tar upore): Gap-5 & Premium Stack
          ======================================================== */}
            <div className="hidden lg:flex flex-col gap-5 w-full pb-2">
                {offers.map((offer, idx) => (
                    <aside
                        key={offer.id || idx}
                        aria-label="Desktop Advertisement Card"
                        className="group relative w-full flex flex-col items-center justify-center p-4 xl:p-5 text-center bg-white hover:bg-gradient-to-b hover:from-sky-50/30 hover:to-white rounded-2xl border border-slate-200/90 hover:border-sky-300/80 shadow-xs hover:shadow-md transition-all duration-300 shrink-0"
                    >
                        {/* Category Badge */}
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-600 border border-sky-100 text-[10px] xl:text-[11px] font-bold">
                            <Sparkles size={11} className="text-sky-500" />
                            {offer.category}
                        </span>

                        {/* Title */}
                        <h4 className="text-sm xl:text-[15px] font-extrabold text-slate-800 tracking-tight leading-snug mt-2">
                            {offer.title}
                        </h4>

                        {/* Description */}
                        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-normal max-w-[200px] xl:max-w-[220px]">
                            {offer.desc}
                        </p>

                        {/* Sky-Blue Action Button */}
                        <a
                            href={offer.link}
                            className="mt-3.5 w-full py-2 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs hover:shadow-md shadow-sky-500/20 transition-all duration-200 inline-flex items-center justify-center gap-1.5 group-hover:gap-2"
                        >
                            <span>{offer.btnText}</span>
                            <ArrowRight size={13} className="transition-transform" />
                        </a>
                    </aside>
                ))}
            </div>

        </div>
    );
}