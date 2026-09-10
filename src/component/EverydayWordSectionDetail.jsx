// import React, { useState } from "react";
// import { useLoaderData } from "react-router";

// const EverydayWordSectionDetail = () => {
//   const sectionData = useLoaderData();
//   const [activeTab, setActiveTab] = useState("verbs");
//   const [expandedCard, setExpandedCard] = useState(null);

//   const tabs = [
//     { id: "verbs", label: "Verbs", count: sectionData?.verbs?.length },
//     { id: "nouns", label: "Nouns", count: sectionData?.nouns?.length },
//     { id: "adjectives", label: "Adjectives", count: sectionData?.adjectives?.length },
//     { id: "adverbs", label: "Adverbs", count: sectionData?.adverbs?.length },
//     { id: "practice", label: "Practice", count: null },
//   ];

//   const toggleDetail = (index) => {
//     setExpandedCard((prev) => (prev === index ? null : index));
//   };

//   const totalWords =
//     (sectionData?.verbs?.length || 0) +
//     (sectionData?.nouns?.length || 0) +
//     (sectionData?.adjectives?.length || 0) +
//     (sectionData?.adverbs?.length || 0);

//   return (
//     <div className="min-h-screen bg-slate-50/70 dark:bg-zinc-950 py-5 sm:py-8 px-3 sm:px-6 lg:px-8 text-slate-900 dark:text-zinc-100 antialiased">
//       <div className="max-w-6xl mx-auto space-y-5 sm:space-y-7">
        
//         {/* Header Banner */}
//         <header className="rounded-2xl border border-slate-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 p-4 sm:p-6 md:p-7 shadow-xs backdrop-blur-sm">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
//             <div className="space-y-1">
//               <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
//                 <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
//                 Section {sectionData?.sectionNumber ?? "--"}
//               </div>
//               <h1 className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-snug">
//                 {sectionData?.title || "Daily Vocabulary Collection"}
//               </h1>
//               {sectionData?.engTitle && (
//                 <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
//                   {sectionData.engTitle}
//                 </p>
//               )}
//             </div>

//             <div className="flex items-center self-start sm:self-auto bg-slate-100 dark:bg-zinc-800/80 p-1 rounded-xl text-xs font-semibold text-slate-600 dark:text-zinc-300">
//               <span className="px-3 py-1 rounded-lg bg-white dark:bg-zinc-700/80 shadow-2xs">
//                 {totalWords} Words Total
//               </span>
//             </div>
//           </div>
//         </header>

//         {/* Enhanced Professional Tabs (Mobile friendly & Desktop optimized) */}
//         <nav 
//           aria-label="Vocabulary Category Tabs" 
//           className="bg-slate-200/60 dark:bg-zinc-900/90 p-1.5 sm:p-2 rounded-2xl border border-slate-300/60 dark:border-zinc-800 backdrop-blur-md shadow-xs -mx-1 sm:mx-0"
//         >
//           <div className="flex sm:grid sm:grid-cols-5 gap-1.5 sm:gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
//             {tabs.map((tab) => {
//               const isActive = activeTab === tab.id;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => {
//                     setActiveTab(tab.id);
//                     setExpandedCard(null);
//                   }}
//                   className={`group relative flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-xl font-bold transition-all duration-200 shrink-0 select-none ${
//                     isActive
//                       ? "bg-white text-slate-950 shadow-sm dark:bg-zinc-800 dark:text-white ring-1 ring-black/5 dark:ring-white/10"
//                       : "text-slate-600 hover:text-slate-900 hover:bg-white/60 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/40"
//                   }`}
//                 >
//                   <span className="text-xs sm:text-sm tracking-tight">{tab.label}</span>
                  
//                   {tab.count !== undefined && tab.count !== null && (
//                     <span
//                       className={`text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-full transition-colors leading-normal ${
//                         isActive
//                           ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/80 dark:text-indigo-300 ring-1 ring-indigo-500/20"
//                           : "bg-slate-300/60 text-slate-700 dark:bg-zinc-700/60 dark:text-zinc-300 group-hover:bg-slate-300 dark:group-hover:bg-zinc-700"
//                       }`}
//                     >
//                       {tab.count}
//                     </span>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </nav>

//         {/* Verbs Tab */}
//         {activeTab === "verbs" && (
//           <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3 items-start">
//             {sectionData?.verbs?.map((verbItem, index) => {
//               const isExpanded = expandedCard === index;
//               const forms = verbItem.forms?.[0] || {};

//               return (
//                 <div
//                   key={verbItem.word || index}
//                   className={`group flex flex-col justify-between rounded-xl border bg-white dark:bg-zinc-900 transition-all ${
//                     isExpanded
//                       ? "border-indigo-400 ring-2 ring-indigo-500/15 shadow-sm col-span-1 min-[480px]:col-span-2"
//                       : "border-slate-200/80 dark:border-zinc-800 shadow-2xs hover:border-slate-300 dark:hover:border-zinc-700"
//                   }`}
//                 >
//                   {/* Compact Header */}
//                   <div className="p-3 sm:p-3.5">
//                     <div className="flex items-start justify-between gap-2">
//                       <h2 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white capitalize break-words">
//                         {verbItem.word}
//                       </h2>
//                       <button
//                         onClick={() => toggleDetail(index)}
//                         aria-label={isExpanded ? "Collapse verb forms" : "View verb forms"}
//                         className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md transition-colors shrink-0 ${
//                           isExpanded
//                             ? "bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/50 dark:text-rose-300"
//                             : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
//                         }`}
//                       >
//                         {isExpanded ? "Close" : "Detail"}
//                       </button>
//                     </div>
//                     <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 leading-snug break-words">
//                       {verbItem.meaning}
//                     </p>
//                   </div>

//                   {/* Expanded Form Information Grid */}
//                   {isExpanded && (
//                     <div className="border-t border-slate-100 dark:border-zinc-800/80 bg-slate-50/70 dark:bg-zinc-800/30 p-2.5 sm:p-3 rounded-b-xl">
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-[11px]">
//                         <div className="bg-white dark:bg-zinc-900/60 p-2 rounded-lg border border-slate-200/60 dark:border-zinc-800">
//                           <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 block">
//                             Past (V2)
//                           </span>
//                           <span className="font-semibold text-slate-800 dark:text-zinc-200 break-words">
//                             {forms.pastForm || "—"}
//                           </span>
//                         </div>

//                         <div className="bg-white dark:bg-zinc-900/60 p-2 rounded-lg border border-slate-200/60 dark:border-zinc-800">
//                           <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 block">
//                             Participle (V3)
//                           </span>
//                           <span className="font-semibold text-slate-800 dark:text-zinc-200 break-words">
//                             {forms.v3Form || "—"}
//                           </span>
//                         </div>

//                         <div className="bg-white dark:bg-zinc-900/60 p-2 rounded-lg border border-slate-200/60 dark:border-zinc-800">
//                           <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 block">
//                             Gerund
//                           </span>
//                           <span className="font-semibold text-slate-800 dark:text-zinc-200 break-words">
//                             {forms.gerund || "—"}
//                           </span>
//                         </div>

//                         <div className="bg-white dark:bg-zinc-900/60 p-2 rounded-lg border border-slate-200/60 dark:border-zinc-800">
//                           <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 block">
//                             Pres. Participle
//                           </span>
//                           <span className="font-semibold text-slate-800 dark:text-zinc-200 break-words">
//                             {forms.participle || "—"}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Simple Word Cards (Nouns, Adjectives, Adverbs) */}
//         {["nouns", "adjectives", "adverbs"].includes(activeTab) && (
//           <div className="grid grid-cols-2 min-[480px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-2.5">
//             {sectionData?.[activeTab]?.map((item, index) => (
//               <div
//                 key={item.word || index}
//                 className="group p-2.5 sm:p-3 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-indigo-300 dark:hover:border-zinc-700 transition-all shadow-2xs"
//               >
//                 <h2 className="text-xs sm:text-sm font-bold capitalize text-slate-800 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors break-words">
//                   {item.word}
//                 </h2>
//                 <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5 truncate group-hover:whitespace-normal break-words">
//                   {item.meaning}
//                 </p>
//               </div>
//             ))}

//             {(!sectionData?.[activeTab] || sectionData[activeTab].length === 0) && (
//               <div className="col-span-full py-16 text-center text-slate-400 dark:text-zinc-500">
//                 <p className="text-xs font-medium">No {activeTab} recorded in this section yet.</p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Practice Tab */}
//         {activeTab === "practice" && (
//           <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 p-8 sm:p-12 text-center">
//             <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
//               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//             </div>
//             <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-zinc-200">
//               Interactive Practice & Exercises
//             </h2>
//             <p className="text-xs text-slate-400 dark:text-zinc-500 max-w-sm mx-auto mt-1">
//               Section {sectionData?.sectionNumber} printable exercise worksheet and tests will render here.
//             </p>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default EverydayWordSectionDetail;


// import React, { useState } from "react";
// import { useLoaderData } from "react-router";

// const EverydayWordSectionDetail = () => {
//   const sectionData = useLoaderData();
//   console.log("section data: ", sectionData);
//   const [activeTab, setActiveTab] = useState("verbs");
//   const [expandedCard, setExpandedCard] = useState(null);

//   const tabs = [
//     { id: "verbs", label: "Verbs", count: sectionData?.verbs?.length },
//     { id: "nouns", label: "Nouns", count: sectionData?.nouns?.length },
//     { id: "adjectives", label: "Adjectives", count: sectionData?.adjectives?.length },
//     { id: "adverbs", label: "Adverbs", count: sectionData?.adverbs?.length },
//     { id: "practice", label: "Practice", count: sectionData?.morePractices?.length || null },
//   ];

//   const toggleDetail = (index) => {
//     setExpandedCard((prev) => (prev === index ? null : index));
//   };

//   const totalWords =
//     (sectionData?.verbs?.length || 0) +
//     (sectionData?.nouns?.length || 0) +
//     (sectionData?.adjectives?.length || 0) +
//     (sectionData?.adverbs?.length || 0);

//   return (
//     <div className="min-h-screen bg-slate-50/70 dark:bg-zinc-950 py-5 sm:py-8 px-3 sm:px-6 lg:px-8 text-slate-900 dark:text-zinc-100 antialiased">
//       <div className="max-w-6xl mx-auto space-y-5 sm:space-y-7">
        
//         {/* Header Banner */}
//         <header className="rounded-2xl border border-slate-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 p-4 sm:p-6 md:p-7 shadow-xs backdrop-blur-sm">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
//             <div className="space-y-1">
//               <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
//                 <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
//                 Section {sectionData?.sectionNumber ?? "--"}
//               </div>
//               <h1 className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-snug">
//                 {sectionData?.title || "Daily Vocabulary Collection"}
//               </h1>
//               {sectionData?.engTitle && (
//                 <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
//                   {sectionData.engTitle}
//                 </p>
//               )}
//             </div>

//             <div className="flex items-center self-start sm:self-auto bg-slate-100 dark:bg-zinc-800/80 p-1 rounded-xl text-xs font-semibold text-slate-600 dark:text-zinc-300">
//               <span className="px-3 py-1 rounded-lg bg-white dark:bg-zinc-700/80 shadow-2xs">
//                 {totalWords} Words Total
//               </span>
//             </div>
//           </div>
//         </header>

//         {/* Vocabulary Category Tabs */}
//         <nav 
//           aria-label="Vocabulary Category Tabs" 
//           className="bg-slate-200/60 dark:bg-zinc-900/90 p-1.5 sm:p-2 rounded-2xl border border-slate-300/60 dark:border-zinc-800 backdrop-blur-md shadow-xs -mx-1 sm:mx-0"
//         >
//           <div className="flex sm:grid sm:grid-cols-5 gap-1.5 sm:gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
//             {tabs.map((tab) => {
//               const isActive = activeTab === tab.id;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => {
//                     setActiveTab(tab.id);
//                     setExpandedCard(null);
//                   }}
//                   className={`group relative flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-xl font-bold transition-all duration-200 shrink-0 select-none ${
//                     isActive
//                       ? "bg-white text-slate-950 shadow-sm dark:bg-zinc-800 dark:text-white ring-1 ring-black/5 dark:ring-white/10"
//                       : "text-slate-600 hover:text-slate-900 hover:bg-white/60 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/40"
//                   }`}
//                 >
//                   <span className="text-xs sm:text-sm tracking-tight">{tab.label}</span>
                  
//                   {tab.count !== undefined && tab.count !== null && (
//                     <span
//                       className={`text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-full transition-colors leading-normal ${
//                         isActive
//                           ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/80 dark:text-indigo-300 ring-1 ring-indigo-500/20"
//                           : "bg-slate-300/60 text-slate-700 dark:bg-zinc-700/60 dark:text-zinc-300 group-hover:bg-slate-300 dark:group-hover:bg-zinc-700"
//                       }`}
//                     >
//                       {tab.count}
//                     </span>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </nav>

//         {/* Verbs Tab */}
//         {activeTab === "verbs" && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-start">
//             {sectionData?.verbs?.map((verbItem, index) => {
//               const isExpanded = expandedCard === index;
//               const forms = verbItem.verbForms || verbItem.forms?.[0] || {};
//               const term = verbItem.term || verbItem.word;

//               return (
//                 <div
//                   key={term || index}
//                   className={`group flex flex-col justify-between rounded-xl border bg-white dark:bg-zinc-900 transition-all ${
//                     isExpanded
//                       ? "border-indigo-400 ring-2 ring-indigo-500/15 shadow-sm col-span-1 md:col-span-2"
//                       : "border-slate-200/80 dark:border-zinc-800 shadow-2xs hover:border-slate-300 dark:hover:border-zinc-700"
//                   }`}
//                 >
//                   <div className="p-3.5 sm:p-4">
//                     <div className="flex items-start justify-between gap-2">
//                       <div>
//                         <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
//                           {term}
//                         </h2>
//                         <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-zinc-300 mt-0.5 leading-snug">
//                           {verbItem.meaning}
//                         </p>
//                       </div>
//                       <button
//                         onClick={() => toggleDetail(index)}
//                         aria-label={isExpanded ? "Collapse verb details" : "View verb details"}
//                         className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors shrink-0 ${
//                           isExpanded
//                             ? "bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/50 dark:text-rose-300"
//                             : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
//                         }`}
//                       >
//                         {isExpanded ? "Close" : "Detail"}
//                       </button>
//                     </div>

//                     {/* Quick Verb Forms Row */}
//                     <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-zinc-800/80 text-[11px] text-slate-500 dark:text-zinc-400">
//                       <span className="bg-slate-100 dark:bg-zinc-800/60 px-2 py-0.5 rounded">
//                         <strong className="text-slate-700 dark:text-zinc-300">V1:</strong> {forms.present || "—"}
//                       </span>
//                       <span className="bg-slate-100 dark:bg-zinc-800/60 px-2 py-0.5 rounded">
//                         <strong className="text-slate-700 dark:text-zinc-300">V2:</strong> {forms.past || forms.pastForm || "—"}
//                       </span>
//                       <span className="bg-slate-100 dark:bg-zinc-800/60 px-2 py-0.5 rounded">
//                         <strong className="text-slate-700 dark:text-zinc-300">V3:</strong> {forms.pastParticiple || forms.v3Form || "—"}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Expanded Information */}
//                   {isExpanded && (
//                     <div className="border-t border-slate-100 dark:border-zinc-800/80 bg-slate-50/70 dark:bg-zinc-800/30 p-3.5 sm:p-5 rounded-b-xl space-y-4">
                      
//                       {/* Verb Forms Full Details */}
//                       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">
//                         <div className="bg-white dark:bg-zinc-900/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-zinc-800">
//                           <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 block mb-0.5">Infinitive</span>
//                           <span className="font-semibold text-slate-800 dark:text-zinc-200">{forms.infinitive || "—"}</span>
//                         </div>
//                         <div className="bg-white dark:bg-zinc-900/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-zinc-800">
//                           <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 block mb-0.5">Gerund</span>
//                           <span className="font-semibold text-slate-800 dark:text-zinc-200">{forms.gerund || "—"}</span>
//                         </div>
//                         <div className="bg-white dark:bg-zinc-900/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-zinc-800">
//                           <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 block mb-0.5">Present</span>
//                           <span className="font-semibold text-slate-800 dark:text-zinc-200">{forms.present || "—"}</span>
//                         </div>
//                         <div className="bg-white dark:bg-zinc-900/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-zinc-800">
//                           <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 block mb-0.5">Past (V2)</span>
//                           <span className="font-semibold text-slate-800 dark:text-zinc-200">{forms.past || forms.pastForm || "—"}</span>
//                         </div>
//                         <div className="bg-white dark:bg-zinc-900/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-zinc-800 col-span-2 sm:col-span-1">
//                           <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 block mb-0.5">Participle (V3)</span>
//                           <span className="font-semibold text-slate-800 dark:text-zinc-200">{forms.pastParticiple || forms.v3Form || "—"}</span>
//                         </div>
//                       </div>

//                       {/* Synonyms & Antonyms */}
//                       {(verbItem.synonyms || verbItem.antonyms) && (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
//                           {verbItem.synonyms && (
//                             <div className="p-2.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
//                               <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400 block mb-0.5">Synonyms</span>
//                               <span className="text-slate-700 dark:text-zinc-300 leading-snug">{verbItem.synonyms}</span>
//                             </div>
//                           )}
//                           {verbItem.antonyms && (
//                             <div className="p-2.5 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30">
//                               <span className="text-[10px] font-bold uppercase text-rose-700 dark:text-rose-400 block mb-0.5">Antonyms</span>
//                               <span className="text-slate-700 dark:text-zinc-300 leading-snug">{verbItem.antonyms}</span>
//                             </div>
//                           )}
//                         </div>
//                       )}

//                       {/* Examples with Breakdown */}
//                       {verbItem.examples && verbItem.examples.length > 0 && (
//                         <div className="space-y-2">
//                           <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
//                             Examples & Breakdown
//                           </h4>
//                           <div className="space-y-2">
//                             {verbItem.examples.map((ex, i) => (
//                               <div key={i} className="p-3 bg-white dark:bg-zinc-900/80 rounded-lg border border-slate-200/60 dark:border-zinc-800 text-xs space-y-1">
//                                 <p className="font-semibold text-slate-900 dark:text-zinc-100">{ex.english}</p>
//                                 <p className="text-slate-600 dark:text-zinc-400 font-medium">{ex.bengali}</p>
//                                 {ex.breakdown && (
//                                   <p className="text-[11px] text-indigo-600 dark:text-indigo-400 pt-1 font-mono">{ex.breakdown}</p>
//                                 )}
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       {/* Native Usage Tips */}
//                       {verbItem.nativeUsageTip && (
//                         <div className="space-y-1.5 pt-1">
//                           <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
//                             Native Usage Tips
//                           </h4>
//                           <ul className="space-y-1">
//                             {(Array.isArray(verbItem.nativeUsageTip) ? verbItem.nativeUsageTip : [verbItem.nativeUsageTip]).map((tip, idx) => (
//                               <li key={idx} className="text-xs text-slate-700 dark:text-zinc-300 flex items-start gap-1.5">
//                                 <span className="text-indigo-500 mt-0.5">•</span>
//                                 <span>{tip}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}

//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         )}

//        {/* Nouns, Adjectives, Adverbs Tab */}
//         {["nouns", "adjectives", "adverbs"].includes(activeTab) && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 items-stretch">
//             {sectionData?.[activeTab]?.map((item, index) => {
//               const isExpanded = expandedCard === index;
//               const term = item.term || item.word;

//               return (
//                 <div
//                   key={term || index}
//                   className={`group flex flex-col justify-between rounded-xl border bg-white dark:bg-zinc-900 transition-all ${
//                     isExpanded
//                       ? "border-indigo-400 ring-2 ring-indigo-500/15 shadow-sm col-span-1 sm:col-span-2 lg:col-span-3"
//                       : "h-full border-slate-200/80 dark:border-zinc-800 shadow-2xs hover:border-slate-300 dark:hover:border-zinc-700"
//                   }`}
//                 >
//                   {/* Card Main Header & Info */}
//                   <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1">
//                     <div>
//                       <div className="flex items-start justify-between gap-2">
//                         <h2 className="text-base font-bold capitalize text-slate-900 dark:text-white truncate">
//                           {term}
//                         </h2>

//                         {(item.example || item.explanation) && (
//                           <button
//                             onClick={() => toggleDetail(index)}
//                             aria-label={isExpanded ? "Collapse card details" : "View card details"}
//                             className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors shrink-0 ${
//                               isExpanded
//                                 ? "bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/50 dark:text-rose-300"
//                                 : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
//                             }`}
//                           >
//                             {isExpanded ? "Close" : "Detail"}
//                           </button>
//                         )}
//                       </div>

//                       {/* Fixed height container for meanings to prevent uneven card stretch */}
//                       <div className="mt-1 min-h-[2.75rem]">
//                         <p className={`text-xs font-medium text-slate-600 dark:text-zinc-300 leading-snug ${isExpanded ? "" : "line-clamp-2"}`}>
//                           {item.meaning}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Fixed teaser space for explanation note (if present) */}
//                     {item.explanation && !isExpanded && (
//                       <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-2 line-clamp-2 border-t border-slate-100 dark:border-zinc-800/60 pt-2">
//                         {item.explanation}
//                       </p>
//                     )}
//                   </div>

//                   {/* Expanded Detail (Examples & Explanations) */}
//                   {isExpanded && (
//                     <div className="border-t border-slate-100 dark:border-zinc-800/80 bg-slate-50/70 dark:bg-zinc-800/30 p-3.5 sm:p-4 rounded-b-xl space-y-3">
//                       {item.explanation && (
//                         <div className="p-3 bg-white dark:bg-zinc-900/80 rounded-lg border border-slate-200/60 dark:border-zinc-800 text-xs text-slate-700 dark:text-zinc-300 leading-relaxed">
//                           <span className="font-semibold text-slate-900 dark:text-zinc-100 block mb-1">Concept Note:</span>
//                           {item.explanation}
//                         </div>
//                       )}

//                       {item.example && (
//                         <div className="p-3 bg-white dark:bg-zinc-900/80 rounded-lg border border-slate-200/60 dark:border-zinc-800 text-xs space-y-1">
//                           <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block mb-1">Example</span>
//                           <p className="font-semibold text-slate-900 dark:text-zinc-100">{item.example.english}</p>
//                           <p className="text-slate-600 dark:text-zinc-400 font-medium">{item.example.bengali}</p>
//                           {item.example.breakdown && (
//                             <p className="text-[11px] text-indigo-600 dark:text-indigo-400 pt-1 font-mono">{item.example.breakdown}</p>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}

//             {(!sectionData?.[activeTab] || sectionData[activeTab].length === 0) && (
//               <div className="col-span-full py-16 text-center text-slate-400 dark:text-zinc-500">
//                 <p className="text-xs font-medium">No {activeTab} recorded in this section yet.</p>
//               </div>
//             )}
//           </div>
//         )}
        

//         {/* Practice Tab: Passage & Practice Sentences */}
//         {activeTab === "practice" && (
//           <div className="space-y-6 sm:space-y-8">

//             {/* Sentence Patterns & Grammar Drills */}
//             {sectionData?.morePractices && sectionData.morePractices.length > 0 && (
//               <div className="space-y-4">
//                 <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
//                   <span>Grammar & Sentence Patterns Practice</span>
//                   <span className="text-xs font-normal text-slate-400 dark:text-zinc-500">
//                     ({sectionData.morePractices.length} verbs)
//                   </span>
//                 </h3>

//                 <div className="grid grid-cols-1 gap-3.5 sm:gap-4">
//                   {sectionData.morePractices.map((practice, index) => (
//                     <div
//                       key={practice.topic || index}
//                       className="rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-5 shadow-2xs space-y-3"
//                     >
//                       <h4 className="text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-zinc-800 pb-2">
//                         {practice.topic}
//                       </h4>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
//                         {Object.entries(practice.sentences || {}).map(([key, sent]) => {
//                           const labels = {
//                             affirmative: { title: "Affirmative", bg: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300" },
//                             negative: { title: "Negative", bg: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300" },
//                             affirmativeInterrogative: { title: "Affirmative Interrogative", bg: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300" },
//                             negativeInterrogative: { title: "Negative Interrogative", bg: "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300" },
//                             whQuestion: { title: "WH Question", bg: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300" },
//                           };
//                           const label = labels[key] || { title: key, bg: "bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300" };

//                           return (
//                             <div key={key} className="p-2.5 rounded-lg bg-slate-50/60 dark:bg-zinc-800/30 border border-slate-200/50 dark:border-zinc-800 flex flex-col justify-between gap-1">
//                               <span className={`inline-block self-start px-2 py-0.5 rounded text-[10px] font-bold ${label.bg}`}>
//                                 {label.title}
//                               </span>
//                               <div>
//                                 <p className="font-semibold text-slate-900 dark:text-zinc-100 mt-1">{sent.english}</p>
//                                 <p className="text-slate-600 dark:text-zinc-400 mt-0.5">{sent.bengali}</p>
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}


//             {/* Reading Passage Component */}
//             {sectionData?.readingPassage && (
//               <div className="rounded-2xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-6 md:p-7 shadow-xs space-y-4">
//                 <div className="border-b border-slate-100 dark:border-zinc-800 pb-3">
//                   <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
//                     Reading Passage
//                   </span>
//                   <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1">
//                     {sectionData.readingPassage.title}
//                   </h2>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-sm leading-relaxed">
//                   <div className="p-4 bg-slate-50/70 dark:bg-zinc-800/30 rounded-xl border border-slate-200/60 dark:border-zinc-800/80 space-y-3 whitespace-pre-line text-slate-800 dark:text-zinc-200">
//                     <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">English</span>
//                     {sectionData.readingPassage.englishText}
//                   </div>
//                   <div className="p-4 bg-slate-50/70 dark:bg-zinc-800/30 rounded-xl border border-slate-200/60 dark:border-zinc-800/80 space-y-3 whitespace-pre-line text-slate-700 dark:text-zinc-300">
//                     <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">বাংলা অনুবাদ</span>
//                     {sectionData.readingPassage.bengaliTranslation}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {!sectionData?.readingPassage && (!sectionData?.morePractices || sectionData.morePractices.length === 0) && (
//               <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 p-8 sm:p-12 text-center">
//                 <p className="text-xs text-slate-400 dark:text-zinc-500">
//                   No practice sentences or reading passage recorded for Section {sectionData?.sectionNumber}.
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default EverydayWordSectionDetail;


// import React, { useEffect, useState } from "react";

// import { useLoaderData } from "react-router";

// const EverydayWordSectionDetail = () => {

//   const sectionData = useLoaderData();

//   console.log("section data: ", sectionData);

//   const [activeTab, setActiveTab] = useState("verbs");

//   const [expandedCard, setExpandedCard] = useState(null);

//   // ==========================================
//   // PREMIUM CONTENT PROTECTION
//   // ==========================================

//   const [isPageHidden, setIsPageHidden] = useState(false);

//   useEffect(() => {

//     // Detect when the user leaves the tab/window
//     const handleVisibilityChange = () => {
//       setIsPageHidden(document.hidden);
//     };

//     // Screenshot deterrence
//     const handleKeyDown = (event) => {
//       if (event.key === "PrintScreen") {

//         setIsPageHidden(true);

//         // Remove blur after 1.5 seconds
//         setTimeout(() => {
//           setIsPageHidden(false);
//         }, 1500);
//       }
//     };

//     document.addEventListener(
//       "visibilitychange",
//       handleVisibilityChange
//     );

//     window.addEventListener(
//       "keydown",
//       handleKeyDown
//     );

//     // Cleanup event listeners
//     return () => {

//       document.removeEventListener(
//         "visibilitychange",
//         handleVisibilityChange
//       );

//       window.removeEventListener(
//         "keydown",
//         handleKeyDown
//       );

//     };

//   }, []);

//   // ==========================================
//   // END PREMIUM CONTENT PROTECTION
//   // ==========================================


//   const tabs = [

//     { id: "verbs", label: "Verbs", count: sectionData?.verbs?.length },

//     { id: "nouns", label: "Nouns", count: sectionData?.nouns?.length },

//     { id: "adjectives", label: "Adjectives", count: sectionData?.adjectives?.length },

//     { id: "adverbs", label: "Adverbs", count: sectionData?.adverbs?.length },

//     { id: "practice", label: "Practice", count: sectionData?.morePractices?.length || null },

//   ];


//   const toggleDetail = (index) => {

//     setExpandedCard((prev) => (prev === index ? null : index));

//   };


//   const totalWords =

//     (sectionData?.verbs?.length || 0) +

//     (sectionData?.nouns?.length || 0) +

//     (sectionData?.adjectives?.length || 0) +

//     (sectionData?.adverbs?.length || 0);


//   return (

//     <div
//       className={`min-h-screen bg-slate-50/70 dark:bg-zinc-950 py-5 sm:py-8 px-3 sm:px-6 lg:px-8 text-slate-900 dark:text-zinc-100 antialiased select-none ${
//         isPageHidden ? "blur-xl" : ""
//       }`}
//       onContextMenu={(e) => e.preventDefault()}
//     >

//       <div className="max-w-6xl mx-auto space-y-5 sm:space-y-7">

//         {/* Header Banner */}

//         <header className="rounded-2xl border border-slate-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 p-4 sm:p-6 md:p-7 shadow-xs backdrop-blur-sm">

//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">

//             <div className="space-y-1">

//               <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">

//                 <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />

//                 Section {sectionData?.sectionNumber ?? "--"}

//               </div>

//               <h1 className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-snug">

//                 {sectionData?.title || "Daily Vocabulary Collection"}

//               </h1>

//               {sectionData?.engTitle && (

//                 <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">

//                   {sectionData.engTitle}

//                 </p>

//               )}

//             </div>

//             <div className="flex items-center self-start sm:self-auto bg-slate-100 dark:bg-zinc-800/80 p-1 rounded-xl text-xs font-semibold text-slate-600 dark:text-zinc-300">

//               <span className="px-3 py-1 rounded-lg bg-white dark:bg-zinc-700/80 shadow-2xs">

//                 {totalWords} Words Total

//               </span>

//             </div>

//           </div>

//         </header>


//         {/* Vocabulary Category Tabs */}

//         <nav
//           aria-label="Vocabulary Category Tabs"
//           className="bg-slate-200/60 dark:bg-zinc-900/90 p-1.5 sm:p-2 rounded-2xl border border-slate-300/60 dark:border-zinc-800 backdrop-blur-md shadow-xs -mx-1 sm:mx-0"
//         >

//           <div className="flex sm:grid sm:grid-cols-5 gap-1.5 sm:gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

//             {tabs.map((tab) => {

//               const isActive = activeTab === tab.id;

//               return (

//                 <button
//                   key={tab.id}
//                   onClick={() => {
//                     setActiveTab(tab.id);
//                     setExpandedCard(null);
//                   }}
//                   className={`group relative flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-xl font-bold transition-all duration-200 shrink-0 select-none ${
//                     isActive
//                       ? "bg-white text-slate-950 shadow-sm dark:bg-zinc-800 dark:text-white ring-1 ring-black/5 dark:ring-white/10"
//                       : "text-slate-600 hover:text-slate-900 hover:bg-white/60 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/40"
//                   }`}
//                 >

//                   <span className="text-xs sm:text-sm tracking-tight">
//                     {tab.label}
//                   </span>

//                   {tab.count !== undefined && tab.count !== null && (

//                     <span
//                       className={`text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-full transition-colors leading-normal ${
//                         isActive
//                           ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/80 dark:text-indigo-300 ring-1 ring-indigo-500/20"
//                           : "bg-slate-300/60 text-slate-700 dark:bg-zinc-700/60 dark:text-zinc-300 group-hover:bg-slate-300 dark:group-hover:bg-zinc-700"
//                       }`}
//                     >

//                       {tab.count}

//                     </span>

//                   )}

//                 </button>

//               );

//             })}

//           </div>

//         </nav>


//         {/* Verbs Tab */}

//         {activeTab === "verbs" && (

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-start">

//             {sectionData?.verbs?.map((verbItem, index) => {

//               const isExpanded = expandedCard === index;

//               const forms = verbItem.verbForms || verbItem.forms?.[0] || {};

//               const term = verbItem.term || verbItem.word;

//               return (

//                 <div
//                   key={term || index}
//                   className={`group flex flex-col justify-between rounded-xl border bg-white dark:bg-zinc-900 transition-all ${
//                     isExpanded
//                       ? "border-indigo-400 ring-2 ring-indigo-500/15 shadow-sm col-span-1 md:col-span-2"
//                       : "border-slate-200/80 dark:border-zinc-800 shadow-2xs hover:border-slate-300 dark:hover:border-zinc-700"
//                   }`}
//                 >

//                   <div className="p-3.5 sm:p-4">

//                     <div className="flex items-start justify-between gap-2">

//                       <div>

//                         <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">

//                           {term}

//                         </h2>

//                         <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-zinc-300 mt-0.5 leading-snug">

//                           {verbItem.meaning}

//                         </p>

//                       </div>

//                       <button
//                         onClick={() => toggleDetail(index)}
//                         aria-label={isExpanded ? "Collapse verb details" : "View verb details"}
//                         className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors shrink-0 ${
//                           isExpanded
//                             ? "bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/50 dark:text-rose-300"
//                             : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
//                         }`}
//                       >

//                         {isExpanded ? "Close" : "Detail"}

//                       </button>

//                     </div>


//                     {/* Quick Verb Forms Row */}

//                     <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-zinc-800/80 text-[11px] text-slate-500 dark:text-zinc-400">

//                       <span className="bg-slate-100 dark:bg-zinc-800/60 px-2 py-0.5 rounded">

//                         <strong className="text-slate-700 dark:text-zinc-300">V1:</strong>{" "}

//                         {forms.present || "—"}

//                       </span>

//                       <span className="bg-slate-100 dark:bg-zinc-800/60 px-2 py-0.5 rounded">

//                         <strong className="text-slate-700 dark:text-zinc-300">V2:</strong>{" "}

//                         {forms.past || forms.pastForm || "—"}

//                       </span>

//                       <span className="bg-slate-100 dark:bg-zinc-800/60 px-2 py-0.5 rounded">

//                         <strong className="text-slate-700 dark:text-zinc-300">V3:</strong>{" "}

//                         {forms.pastParticiple || forms.v3Form || "—"}

//                       </span>

//                     </div>

//                   </div>


//                   {/* Expanded Information */}

//                   {isExpanded && (

//                     <div className="border-t border-slate-100 dark:border-zinc-800/80 bg-slate-50/70 dark:bg-zinc-800/30 p-3.5 sm:p-5 rounded-b-xl space-y-4">

//                       {/* Verb Forms Full Details */}

//                       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">

//                         <div className="bg-white dark:bg-zinc-900/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-zinc-800">

//                           <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 block mb-0.5">
//                             Infinitive
//                           </span>

//                           <span className="font-semibold text-slate-800 dark:text-zinc-200">
//                             {forms.infinitive || "—"}
//                           </span>

//                         </div>

//                         <div className="bg-white dark:bg-zinc-900/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-zinc-800">

//                           <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 block mb-0.5">
//                             Gerund
//                           </span>

//                           <span className="font-semibold text-slate-800 dark:text-zinc-200">
//                             {forms.gerund || "—"}
//                           </span>

//                         </div>

//                         <div className="bg-white dark:bg-zinc-900/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-zinc-800">

//                           <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 block mb-0.5">
//                             Present
//                           </span>

//                           <span className="font-semibold text-slate-800 dark:text-zinc-200">
//                             {forms.present || "—"}
//                           </span>

//                         </div>

//                         <div className="bg-white dark:bg-zinc-900/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-zinc-800">

//                           <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 block mb-0.5">
//                             Past (V2)
//                           </span>

//                           <span className="font-semibold text-slate-800 dark:text-zinc-200">
//                             {forms.past || forms.pastForm || "—"}
//                           </span>

//                         </div>

//                         <div className="bg-white dark:bg-zinc-900/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-zinc-800 col-span-2 sm:col-span-1">

//                           <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 block mb-0.5">
//                             Participle (V3)
//                           </span>

//                           <span className="font-semibold text-slate-800 dark:text-zinc-200">
//                             {forms.pastParticiple || forms.v3Form || "—"}
//                           </span>

//                         </div>

//                       </div>


//                       {/* Synonyms & Antonyms */}

//                       {(verbItem.synonyms || verbItem.antonyms) && (

//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">

//                           {verbItem.synonyms && (

//                             <div className="p-2.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">

//                               <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400 block mb-0.5">
//                                 Synonyms
//                               </span>

//                               <span className="text-slate-700 dark:text-zinc-300 leading-snug">
//                                 {verbItem.synonyms}
//                               </span>

//                             </div>

//                           )}

//                           {verbItem.antonyms && (

//                             <div className="p-2.5 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30">

//                               <span className="text-[10px] font-bold uppercase text-rose-700 dark:text-rose-400 block mb-0.5">
//                                 Antonyms
//                               </span>

//                               <span className="text-slate-700 dark:text-zinc-300 leading-snug">
//                                 {verbItem.antonyms}
//                               </span>

//                             </div>

//                           )}

//                         </div>

//                       )}


//                       {/* Examples with Breakdown */}

//                       {verbItem.examples && verbItem.examples.length > 0 && (

//                         <div className="space-y-2">

//                           <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">

//                             Examples & Breakdown

//                           </h4>

//                           <div className="space-y-2">

//                             {verbItem.examples.map((ex, i) => (

//                               <div
//                                 key={i}
//                                 className="p-3 bg-white dark:bg-zinc-900/80 rounded-lg border border-slate-200/60 dark:border-zinc-800 text-xs space-y-1"
//                               >

//                                 <p className="font-semibold text-slate-900 dark:text-zinc-100">
//                                   {ex.english}
//                                 </p>

//                                 <p className="text-slate-600 dark:text-zinc-400 font-medium">
//                                   {ex.bengali}
//                                 </p>

//                                 {ex.breakdown && (

//                                   <p className="text-[11px] text-indigo-600 dark:text-indigo-400 pt-1 font-mono">
//                                     {ex.breakdown}
//                                   </p>

//                                 )}

//                               </div>

//                             ))}

//                           </div>

//                         </div>

//                       )}


//                       {/* Native Usage Tips */}

//                       {verbItem.nativeUsageTip && (

//                         <div className="space-y-1.5 pt-1">

//                           <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">

//                             Native Usage Tips

//                           </h4>

//                           <ul className="space-y-1">

//                             {(Array.isArray(verbItem.nativeUsageTip)
//                               ? verbItem.nativeUsageTip
//                               : [verbItem.nativeUsageTip]
//                             ).map((tip, idx) => (

//                               <li
//                                 key={idx}
//                                 className="text-xs text-slate-700 dark:text-zinc-300 flex items-start gap-1.5"
//                               >

//                                 <span className="text-indigo-500 mt-0.5">•</span>

//                                 <span>{tip}</span>

//                               </li>

//                             ))}

//                           </ul>

//                         </div>

//                       )}

//                     </div>

//                   )}

//                 </div>

//               );

//             })}

//           </div>

//         )}


//         {/* Nouns, Adjectives, Adverbs Tab */}

//         {["nouns", "adjectives", "adverbs"].includes(activeTab) && (

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 items-stretch">

//             {sectionData?.[activeTab]?.map((item, index) => {

//               const isExpanded = expandedCard === index;

//               const term = item.term || item.word;

//               return (

//                 <div
//                   key={term || index}
//                   className={`group flex flex-col justify-between rounded-xl border bg-white dark:bg-zinc-900 transition-all ${
//                     isExpanded
//                       ? "border-indigo-400 ring-2 ring-indigo-500/15 shadow-sm col-span-1 sm:col-span-2 lg:col-span-3"
//                       : "h-full border-slate-200/80 dark:border-zinc-800 shadow-2xs hover:border-slate-300 dark:hover:border-zinc-700"
//                   }`}
//                 >

//                   {/* Card Main Header & Info */}

//                   <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1">

//                     <div>

//                       <div className="flex items-start justify-between gap-2">

//                         <h2 className="text-base font-bold capitalize text-slate-900 dark:text-white truncate">

//                           {term}

//                         </h2>

//                         {(item.example || item.explanation) && (

//                           <button
//                             onClick={() => toggleDetail(index)}
//                             aria-label={isExpanded ? "Collapse card details" : "View card details"}
//                             className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors shrink-0 ${
//                               isExpanded
//                                 ? "bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/50 dark:text-rose-300"
//                                 : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
//                             }`}
//                           >

//                             {isExpanded ? "Close" : "Detail"}

//                           </button>

//                         )}

//                       </div>


//                       {/* Fixed height container for meanings to prevent uneven card stretch */}

//                       <div className="mt-1 min-h-[2.75rem]">

//                         <p className={`text-xs font-medium text-slate-600 dark:text-zinc-300 leading-snug ${isExpanded ? "" : "line-clamp-2"}`}>

//                           {item.meaning}

//                         </p>

//                       </div>

//                     </div>


//                     {/* Fixed teaser space for explanation note (if present) */}

//                     {item.explanation && !isExpanded && (

//                       <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-2 line-clamp-2 border-t border-slate-100 dark:border-zinc-800/60 pt-2">

//                         {item.explanation}

//                       </p>

//                     )}

//                   </div>


//                   {/* Expanded Detail (Examples & Explanations) */}

//                   {isExpanded && (

//                     <div className="border-t border-slate-100 dark:border-zinc-800/80 bg-slate-50/70 dark:bg-zinc-800/30 p-3.5 sm:p-4 rounded-b-xl space-y-3">

//                       {item.explanation && (

//                         <div className="p-3 bg-white dark:bg-zinc-900/80 rounded-lg border border-slate-200/60 dark:border-zinc-800 text-xs text-slate-700 dark:text-zinc-300 leading-relaxed">

//                           <span className="font-semibold text-slate-900 dark:text-zinc-100 block mb-1">
//                             Concept Note:
//                           </span>

//                           {item.explanation}

//                         </div>

//                       )}

//                       {item.example && (

//                         <div className="p-3 bg-white dark:bg-zinc-900/80 rounded-lg border border-slate-200/60 dark:border-zinc-800 text-xs space-y-1">

//                           <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block mb-1">
//                             Example
//                           </span>

//                           <p className="font-semibold text-slate-900 dark:text-zinc-100">
//                             {item.example.english}
//                           </p>

//                           <p className="text-slate-600 dark:text-zinc-400 font-medium">
//                             {item.example.bengali}
//                           </p>

//                           {item.example.breakdown && (

//                             <p className="text-[11px] text-indigo-600 dark:text-indigo-400 pt-1 font-mono">
//                               {item.example.breakdown}
//                             </p>

//                           )}

//                         </div>

//                       )}

//                     </div>

//                   )}

//                 </div>

//               );

//             })}

//             {(!sectionData?.[activeTab] || sectionData[activeTab].length === 0) && (

//               <div className="col-span-full py-16 text-center text-slate-400 dark:text-zinc-500">

//                 <p className="text-xs font-medium">
//                   No {activeTab} recorded in this section yet.
//                 </p>

//               </div>

//             )}

//           </div>

//         )}


//         {/* Practice Tab: Passage & Practice Sentences */}

//         {activeTab === "practice" && (

//           <div className="space-y-6 sm:space-y-8">

//             {/* Sentence Patterns & Grammar Drills */}

//             {sectionData?.morePractices && sectionData.morePractices.length > 0 && (

//               <div className="space-y-4">

//                 <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">

//                   <span>Grammar & Sentence Patterns Practice</span>

//                   <span className="text-xs font-normal text-slate-400 dark:text-zinc-500">

//                     ({sectionData.morePractices.length} verbs)

//                   </span>

//                 </h3>


//                 <div className="grid grid-cols-1 gap-3.5 sm:gap-4">

//                   {sectionData.morePractices.map((practice, index) => (

//                     <div
//                       key={practice.topic || index}
//                       className="rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-5 shadow-2xs space-y-3"
//                     >

//                       <h4 className="text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-zinc-800 pb-2">

//                         {practice.topic}

//                       </h4>


//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">

//                         {Object.entries(practice.sentences || {}).map(([key, sent]) => {

//                           const labels = {

//                             affirmative: {
//                               title: "Affirmative",
//                               bg: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
//                             },

//                             negative: {
//                               title: "Negative",
//                               bg: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
//                             },

//                             affirmativeInterrogative: {
//                               title: "Affirmative Interrogative",
//                               bg: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
//                             },

//                             negativeInterrogative: {
//                               title: "Negative Interrogative",
//                               bg: "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300"
//                             },

//                             whQuestion: {
//                               title: "WH Question",
//                               bg: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300"
//                             },

//                           };


//                           const label = labels[key] || {
//                             title: key,
//                             bg: "bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300"
//                           };


//                           return (

//                             <div
//                               key={key}
//                               className="p-2.5 rounded-lg bg-slate-50/60 dark:bg-zinc-800/30 border border-slate-200/50 dark:border-zinc-800 flex flex-col justify-between gap-1"
//                             >

//                               <span className={`inline-block self-start px-2 py-0.5 rounded text-[10px] font-bold ${label.bg}`}>

//                                 {label.title}

//                               </span>


//                               <div>

//                                 <p className="font-semibold text-slate-900 dark:text-zinc-100 mt-1">
//                                   {sent.english}
//                                 </p>

//                                 <p className="text-slate-600 dark:text-zinc-400 mt-0.5">
//                                   {sent.bengali}
//                                 </p>

//                               </div>

//                             </div>

//                           );

//                         })}

//                       </div>

//                     </div>

//                   ))}

//                 </div>

//               </div>

//             )}


//             {/* Reading Passage Component */}

//             {sectionData?.readingPassage && (

//               <div className="rounded-2xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-6 md:p-7 shadow-xs space-y-4">

//                 <div className="border-b border-slate-100 dark:border-zinc-800 pb-3">

//                   <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">

//                     Reading Passage

//                   </span>

//                   <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1">

//                     {sectionData.readingPassage.title}

//                   </h2>

//                 </div>


//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-sm leading-relaxed">

//                   <div className="p-4 bg-slate-50/70 dark:bg-zinc-800/30 rounded-xl border border-slate-200/60 dark:border-zinc-800/80 space-y-3 whitespace-pre-line text-slate-800 dark:text-zinc-200">

//                     <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">
//                       English
//                     </span>

//                     {sectionData.readingPassage.englishText}

//                   </div>


//                   <div className="p-4 bg-slate-50/70 dark:bg-zinc-800/30 rounded-xl border border-slate-200/60 dark:border-zinc-800/80 space-y-3 whitespace-pre-line text-slate-700 dark:text-zinc-300">

//                     <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">
//                       বাংলা অনুবাদ
//                     </span>

//                     {sectionData.readingPassage.bengaliTranslation}

//                   </div>

//                 </div>

//               </div>

//             )}


//             {!sectionData?.readingPassage &&
//               (!sectionData?.morePractices || sectionData.morePractices.length === 0) && (

//                 <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 p-8 sm:p-12 text-center">

//                   <p className="text-xs text-slate-400 dark:text-zinc-500">

//                     No practice sentences or reading passage recorded for Section {sectionData?.sectionNumber}.

//                   </p>

//                 </div>

//               )}

//           </div>

//         )}

//       </div>

//     </div>

//   );

// };

// export default EverydayWordSectionDetail;

import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";

const EverydayWordSectionDetail = () => {
  const sectionData = useLoaderData();

  console.log("section data: ", sectionData);

  const [activeTab, setActiveTab] = useState("verbs");
  const [expandedCard, setExpandedCard] = useState(null);

  // ==========================================
  // PREMIUM CONTENT PROTECTION
  // ==========================================

  const [isPageHidden, setIsPageHidden] = useState(false);

  useEffect(() => {
    // 1. Detect when the user leaves the tab/window
    const handleVisibilityChange = () => {
      setIsPageHidden(document.hidden);
    };

    // 2. Catch screen capture tools (Snipping tool, Win+Shift+S) unfocusing the window
    const handleWindowBlur = () => {
      setIsPageHidden(true);
    };

    const handleWindowFocus = () => {
      setIsPageHidden(false);
    };

    // 3. Block DevTools, Print, and Screenshot shortcut combinations
    const handleKeyDown = (event) => {
      // Screenshot deterrence (PrintScreen)
      if (event.key === "PrintScreen") {
        setIsPageHidden(true);
        setTimeout(() => {
          setIsPageHidden(false);
        }, 1500);
      }

      // Block F12 (DevTools)
      if (event.key === "F12") {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }

      // Block Ctrl+P / Cmd+P (Print to PDF)
      if ((event.ctrlKey || event.metaKey) && (event.key === "p" || event.key === "P")) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }

      // Block Ctrl+U / Cmd+U (View Source)
      if ((event.ctrlKey || event.metaKey) && (event.key === "u" || event.key === "U")) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }

      // Block Ctrl+Shift+I / Cmd+Option+I (Inspect Element)
      // Block Ctrl+Shift+J / Cmd+Option+J (Console)
      // Block Ctrl+Shift+C / Cmd+Option+C (Element Picker)
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        ["I", "i", "J", "j", "C", "c"].includes(event.key)
      ) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    };

    // 4. Overwrite copied text if user manages to trigger copy
    const handleCopy = (event) => {
      event.preventDefault();
      if (event.clipboardData) {
        event.clipboardData.setData("text/plain", "Protected Content - Copying is disabled.");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("copy", handleCopy);

    // Cleanup event listeners
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("copy", handleCopy);
    };
  }, []);

  // ==========================================
  // END PREMIUM CONTENT PROTECTION
  // ==========================================

  const tabs = [
    { id: "verbs", label: "Verbs", count: sectionData?.verbs?.length },
    { id: "nouns", label: "Nouns", count: sectionData?.nouns?.length },
    { id: "adjectives", label: "Adjectives", count: sectionData?.adjectives?.length },
    { id: "adverbs", label: "Adverbs", count: sectionData?.adverbs?.length },
    { id: "practice", label: "Practice", count: sectionData?.morePractices?.length || null },
  ];

  const toggleDetail = (index) => {
    setExpandedCard((prev) => (prev === index ? null : index));
  };

  const totalWords =
    (sectionData?.verbs?.length || 0) +
    (sectionData?.nouns?.length || 0) +
    (sectionData?.adjectives?.length || 0) +
    (sectionData?.adverbs?.length || 0);

  return (
    <>
      {/* CSS Print Blocker: blanks page during Print-to-PDF */}
      <style>{`
        @media print {
          body {
            display: none !important;
          }
        }
      `}</style>

      <div
        className={`min-h-screen bg-slate-50/70 dark:bg-zinc-950 py-5 sm:py-8 px-3 sm:px-6 lg:px-8 text-slate-900 dark:text-zinc-100 antialiased select-none ${
          isPageHidden ? "blur-xl" : ""
        }`}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      >
        <div className="max-w-6xl mx-auto space-y-5 sm:space-y-7">
          {/* Header Banner */}
          <header className="rounded-2xl border border-slate-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 p-4 sm:p-6 md:p-7 shadow-xs backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  Section {sectionData?.sectionNumber ?? "--"}
                </div>
                <h1 className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-snug">
                  {sectionData?.title || "Daily Vocabulary Collection"}
                </h1>
                {sectionData?.engTitle && (
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
                    {sectionData.engTitle}
                  </p>
                )}
              </div>
              <div className="flex items-center self-start sm:self-auto bg-slate-100 dark:bg-zinc-800/80 p-1 rounded-xl text-xs font-semibold text-slate-600 dark:text-zinc-300">
                <span className="px-3 py-1 rounded-lg bg-white dark:bg-zinc-700/80 shadow-2xs">
                  {totalWords} Words Total
                </span>
              </div>
            </div>
          </header>

          {/* Vocabulary Category Tabs */}
          <nav
            aria-label="Vocabulary Category Tabs"
            className="bg-slate-200/60 dark:bg-zinc-900/90 p-1.5 sm:p-2 rounded-2xl border border-slate-300/60 dark:border-zinc-800 backdrop-blur-md shadow-xs -mx-1 sm:mx-0"
          >
            <div className="flex sm:grid sm:grid-cols-5 gap-1.5 sm:gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setExpandedCard(null);
                    }}
                    className={`group relative flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-xl font-bold transition-all duration-200 shrink-0 select-none ${
                      isActive
                        ? "bg-white text-slate-950 shadow-sm dark:bg-zinc-800 dark:text-white ring-1 ring-black/5 dark:ring-white/10"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/40"
                    }`}
                  >
                    <span className="text-xs sm:text-sm tracking-tight">{tab.label}</span>
                    {tab.count !== undefined && tab.count !== null && (
                      <span
                        className={`text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-full transition-colors leading-normal ${
                          isActive
                            ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/80 dark:text-indigo-300 ring-1 ring-indigo-500/20"
                            : "bg-slate-300/60 text-slate-700 dark:bg-zinc-700/60 dark:text-zinc-300 group-hover:bg-slate-300 dark:group-hover:bg-zinc-700"
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Verbs Tab */}
          {activeTab === "verbs" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-start">
              {sectionData?.verbs?.map((verbItem, index) => {
                const isExpanded = expandedCard === index;
                const forms = verbItem.verbForms || verbItem.forms?.[0] || {};
                const term = verbItem.term || verbItem.word;

                return (
                  <div
                    key={term || index}
                    className={`group flex flex-col justify-between rounded-xl border bg-white dark:bg-zinc-900 transition-all ${
                      isExpanded
                        ? "border-indigo-400 ring-2 ring-indigo-500/15 shadow-sm col-span-1 md:col-span-2"
                        : "border-slate-200/80 dark:border-zinc-800 shadow-2xs hover:border-slate-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    <div className="p-3.5 sm:p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                            {term}
                          </h2>
                          <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-zinc-300 mt-0.5 leading-snug">
                            {verbItem.meaning}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleDetail(index)}
                          aria-label={isExpanded ? "Collapse verb details" : "View verb details"}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors shrink-0 ${
                            isExpanded
                              ? "bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/50 dark:text-rose-300"
                              : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                          }`}
                        >
                          {isExpanded ? "Close" : "Detail"}
                        </button>
                      </div>

                      {/* Quick Verb Forms Row */}
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-zinc-800/80 text-[11px] text-slate-500 dark:text-zinc-400">
                        <span className="bg-slate-100 dark:bg-zinc-800/60 px-2 py-0.5 rounded">
                          <strong className="text-slate-700 dark:text-zinc-300">V1:</strong>{" "}
                          {forms.present || "—"}
                        </span>
                        <span className="bg-slate-100 dark:bg-zinc-800/60 px-2 py-0.5 rounded">
                          <strong className="text-slate-700 dark:text-zinc-300">V2:</strong>{" "}
                          {forms.past || forms.pastForm || "—"}
                        </span>
                        <span className="bg-slate-100 dark:bg-zinc-800/60 px-2 py-0.5 rounded">
                          <strong className="text-slate-700 dark:text-zinc-300">V3:</strong>{" "}
                          {forms.pastParticiple || forms.v3Form || "—"}
                        </span>
                      </div>
                    </div>

                    {/* Expanded Information */}
                    {isExpanded && (
                      <div className="border-t border-slate-100 dark:border-zinc-800/80 bg-slate-50/70 dark:bg-zinc-800/30 p-3.5 sm:p-5 rounded-b-xl space-y-4">
                        {/* Verb Forms Full Details */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">
                          <div className="bg-white dark:bg-zinc-900/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-zinc-800">
                            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 block mb-0.5">
                              Infinitive
                            </span>
                            <span className="font-semibold text-slate-800 dark:text-zinc-200">
                              {forms.infinitive || "—"}
                            </span>
                          </div>
                          <div className="bg-white dark:bg-zinc-900/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-zinc-800">
                            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 block mb-0.5">
                              Gerund
                            </span>
                            <span className="font-semibold text-slate-800 dark:text-zinc-200">
                              {forms.gerund || "—"}
                            </span>
                          </div>
                          <div className="bg-white dark:bg-zinc-900/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-zinc-800">
                            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 block mb-0.5">
                              Present
                            </span>
                            <span className="font-semibold text-slate-800 dark:text-zinc-200">
                              {forms.present || "—"}
                            </span>
                          </div>
                          <div className="bg-white dark:bg-zinc-900/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-zinc-800">
                            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 block mb-0.5">
                              Past (V2)
                            </span>
                            <span className="font-semibold text-slate-800 dark:text-zinc-200">
                              {forms.past || forms.pastForm || "—"}
                            </span>
                          </div>
                          <div className="bg-white dark:bg-zinc-900/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-zinc-800 col-span-2 sm:col-span-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 block mb-0.5">
                              Participle (V3)
                            </span>
                            <span className="font-semibold text-slate-800 dark:text-zinc-200">
                              {forms.pastParticiple || forms.v3Form || "—"}
                            </span>
                          </div>
                        </div>

                        {/* Synonyms & Antonyms */}
                        {(verbItem.synonyms || verbItem.antonyms) && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {verbItem.synonyms && (
                              <div className="p-2.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
                                <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400 block mb-0.5">
                                  Synonyms
                                </span>
                                <span className="text-slate-700 dark:text-zinc-300 leading-snug">
                                  {verbItem.synonyms}
                                </span>
                              </div>
                            )}
                            {verbItem.antonyms && (
                              <div className="p-2.5 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30">
                                <span className="text-[10px] font-bold uppercase text-rose-700 dark:text-rose-400 block mb-0.5">
                                  Antonyms
                                </span>
                                <span className="text-slate-700 dark:text-zinc-300 leading-snug">
                                  {verbItem.antonyms}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Examples with Breakdown */}
                        {verbItem.examples && verbItem.examples.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                              Examples & Breakdown
                            </h4>
                            <div className="space-y-2">
                              {verbItem.examples.map((ex, i) => (
                                <div
                                  key={i}
                                  className="p-3 bg-white dark:bg-zinc-900/80 rounded-lg border border-slate-200/60 dark:border-zinc-800 text-xs space-y-1"
                                >
                                  <p className="font-semibold text-slate-900 dark:text-zinc-100">
                                    {ex.english}
                                  </p>
                                  <p className="text-slate-600 dark:text-zinc-400 font-medium">
                                    {ex.bengali}
                                  </p>
                                  {ex.breakdown && (
                                    <p className="text-[11px] text-indigo-600 dark:text-indigo-400 pt-1 font-mono">
                                      {ex.breakdown}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Native Usage Tips */}
                        {verbItem.nativeUsageTip && (
                          <div className="space-y-1.5 pt-1">
                            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                              Native Usage Tips
                            </h4>
                            <ul className="space-y-1">
                              {(Array.isArray(verbItem.nativeUsageTip)
                                ? verbItem.nativeUsageTip
                                : [verbItem.nativeUsageTip]
                              ).map((tip, idx) => (
                                <li
                                  key={idx}
                                  className="text-xs text-slate-700 dark:text-zinc-300 flex items-start gap-1.5"
                                >
                                  <span className="text-indigo-500 mt-0.5">•</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Nouns, Adjectives, Adverbs Tab */}
          {["nouns", "adjectives", "adverbs"].includes(activeTab) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 items-stretch">
              {sectionData?.[activeTab]?.map((item, index) => {
                const isExpanded = expandedCard === index;
                const term = item.term || item.word;

                return (
                  <div
                    key={term || index}
                    className={`group flex flex-col justify-between rounded-xl border bg-white dark:bg-zinc-900 transition-all ${
                      isExpanded
                        ? "border-indigo-400 ring-2 ring-indigo-500/15 shadow-sm col-span-1 sm:col-span-2 lg:col-span-3"
                        : "h-full border-slate-200/80 dark:border-zinc-800 shadow-2xs hover:border-slate-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    {/* Card Main Header & Info */}
                    <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h2 className="text-base font-bold capitalize text-slate-900 dark:text-white truncate">
                            {term}
                          </h2>
                          {(item.example || item.explanation) && (
                            <button
                              onClick={() => toggleDetail(index)}
                              aria-label={isExpanded ? "Collapse card details" : "View card details"}
                              className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors shrink-0 ${
                                isExpanded
                                  ? "bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/50 dark:text-rose-300"
                                  : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                              }`}
                            >
                              {isExpanded ? "Close" : "Detail"}
                            </button>
                          )}
                        </div>

                        {/* Fixed height container for meanings */}
                        <div className="mt-1 min-h-[2.75rem]">
                          <p
                            className={`text-xs font-medium text-slate-600 dark:text-zinc-300 leading-snug ${
                              isExpanded ? "" : "line-clamp-2"
                            }`}
                          >
                            {item.meaning}
                          </p>
                        </div>
                      </div>

                      {/* Fixed teaser space for explanation note */}
                      {item.explanation && !isExpanded && (
                        <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-2 line-clamp-2 border-t border-slate-100 dark:border-zinc-800/60 pt-2">
                          {item.explanation}
                        </p>
                      )}
                    </div>

                    {/* Expanded Detail (Examples & Explanations) */}
                    {isExpanded && (
                      <div className="border-t border-slate-100 dark:border-zinc-800/80 bg-slate-50/70 dark:bg-zinc-800/30 p-3.5 sm:p-4 rounded-b-xl space-y-3">
                        {item.explanation && (
                          <div className="p-3 bg-white dark:bg-zinc-900/80 rounded-lg border border-slate-200/60 dark:border-zinc-800 text-xs text-slate-700 dark:text-zinc-300 leading-relaxed">
                            <span className="font-semibold text-slate-900 dark:text-zinc-100 block mb-1">
                              Concept Note:
                            </span>
                            {item.explanation}
                          </div>
                        )}

                        {item.example && (
                          <div className="p-3 bg-white dark:bg-zinc-900/80 rounded-lg border border-slate-200/60 dark:border-zinc-800 text-xs space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block mb-1">
                              Example
                            </span>
                            <p className="font-semibold text-slate-900 dark:text-zinc-100">
                              {item.example.english}
                            </p>
                            <p className="text-slate-600 dark:text-zinc-400 font-medium">
                              {item.example.bengali}
                            </p>
                            {item.example.breakdown && (
                              <p className="text-[11px] text-indigo-600 dark:text-indigo-400 pt-1 font-mono">
                                {item.example.breakdown}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {(!sectionData?.[activeTab] || sectionData[activeTab].length === 0) && (
                <div className="col-span-full py-16 text-center text-slate-400 dark:text-zinc-500">
                  <p className="text-xs font-medium">
                    No {activeTab} recorded in this section yet.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Practice Tab: Passage & Practice Sentences */}
          {activeTab === "practice" && (
            <div className="space-y-6 sm:space-y-8">
              {/* Sentence Patterns & Grammar Drills */}
              {sectionData?.morePractices && sectionData.morePractices.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Grammar & Sentence Patterns Practice</span>
                    <span className="text-xs font-normal text-slate-400 dark:text-zinc-500">
                      ({sectionData.morePractices.length} verbs)
                    </span>
                  </h3>

                  <div className="grid grid-cols-1 gap-3.5 sm:gap-4">
                    {sectionData.morePractices.map((practice, index) => (
                      <div
                        key={practice.topic || index}
                        className="rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-5 shadow-2xs space-y-3"
                      >
                        <h4 className="text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-zinc-800 pb-2">
                          {practice.topic}
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
                          {Object.entries(practice.sentences || {}).map(([key, sent]) => {
                            const labels = {
                              affirmative: {
                                title: "Affirmative",
                                bg: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
                              },
                              negative: {
                                title: "Negative",
                                bg: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
                              },
                              affirmativeInterrogative: {
                                title: "Affirmative Interrogative",
                                bg: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
                              },
                              negativeInterrogative: {
                                title: "Negative Interrogative",
                                bg: "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300",
                              },
                              whQuestion: {
                                title: "WH Question",
                                bg: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300",
                              },
                            };

                            const label = labels[key] || {
                              title: key,
                              bg: "bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300",
                            };

                            return (
                              <div
                                key={key}
                                className="p-2.5 rounded-lg bg-slate-50/60 dark:bg-zinc-800/30 border border-slate-200/50 dark:border-zinc-800 flex flex-col justify-between gap-1"
                              >
                                <span
                                  className={`inline-block self-start px-2 py-0.5 rounded text-[10px] font-bold ${label.bg}`}
                                >
                                  {label.title}
                                </span>
                                <div>
                                  <p className="font-semibold text-slate-900 dark:text-zinc-100 mt-1">
                                    {sent.english}
                                  </p>
                                  <p className="text-slate-600 dark:text-zinc-400 mt-0.5">
                                    {sent.bengali}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reading Passage Component */}
              {sectionData?.readingPassage && (
                <div className="rounded-2xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-6 md:p-7 shadow-xs space-y-4">
                  <div className="border-b border-slate-100 dark:border-zinc-800 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Reading Passage
                    </span>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1">
                      {sectionData.readingPassage.title}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-sm leading-relaxed">
                    <div className="p-4 bg-slate-50/70 dark:bg-zinc-800/30 rounded-xl border border-slate-200/60 dark:border-zinc-800/80 space-y-3 whitespace-pre-line text-slate-800 dark:text-zinc-200">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">
                        English
                      </span>
                      {sectionData.readingPassage.englishText}
                    </div>

                    <div className="p-4 bg-slate-50/70 dark:bg-zinc-800/30 rounded-xl border border-slate-200/60 dark:border-zinc-800/80 space-y-3 whitespace-pre-line text-slate-700 dark:text-zinc-300">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">
                        বাংলা অনুবাদ
                      </span>
                      {sectionData.readingPassage.bengaliTranslation}
                    </div>
                  </div>
                </div>
              )}

              {!sectionData?.readingPassage &&
                (!sectionData?.morePractices || sectionData.morePractices.length === 0) && (
                  <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 p-8 sm:p-12 text-center">
                    <p className="text-xs text-slate-400 dark:text-zinc-500">
                      No practice sentences or reading passage recorded for Section{" "}
                      {sectionData?.sectionNumber}.
                    </p>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EverydayWordSectionDetail;