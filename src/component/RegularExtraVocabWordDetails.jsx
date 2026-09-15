// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../Hooks/useAuth";
// import useAxiosSecure from "../Hooks/useAxiosSecure";

// const RegularExtraVocabWordDetails = () => {
//     const { code } = useParams();

//     const [activeTab, setActiveTab] = useState("verbs");
//     const [expandedCard, setExpandedCard] = useState(null);
//     const [isPageHidden, setIsPageHidden] = useState(false);

//     const { user, loading: authLoading } = useAuth();
//     const axiosSecure = useAxiosSecure();

//     const {
//         data: documentData = {},
//         isLoading,
//         isError,
//     } = useQuery({
//         queryKey: ["thematicVocabularyDetail", code, user?.uid],
//         queryFn: async ({ signal }) => {
//             const response = await axiosSecure.get(
//                 `/everydayWordExtraSectionDetail/${code}`,
//                 { signal }
//             );
//             return response.data;
//         },
//         enabled: !authLoading && !!user && !!code,
//     });

//     const theme = documentData?.theme || {};
//     const vocabulary = documentData?.vocabulary || {};

//     // Tab definitions corresponding to the vocabulary categories
//     const TAB_DEFINITIONS = [
//         { id: "verbs", label: "Verbs", key: "verbs" },
//         { id: "nouns", label: "Nouns", key: "nouns" },
//         { id: "adjectives", label: "Adjectives", key: "adjectives" },
//         { id: "adverbs", label: "Adverbs", key: "adverbs" },
//         { id: "collocations", label: "Collocations", key: "collocations" },
//     ];

//     const tabs = TAB_DEFINITIONS.filter((tab) => {
//         const list = vocabulary?.[tab.key];
//         return Array.isArray(list) && list.length > 0;
//     }).map((tab) => ({
//         id: tab.id,
//         label: tab.label,
//         count: vocabulary[tab.key].length,
//     }));

//     // Auto-switch to the first non-empty tab if activeTab has no items
//     useEffect(() => {
//         if (tabs.length > 0 && !tabs.some((t) => t.id === activeTab)) {
//             setActiveTab(tabs[0].id);
//         }
//     }, [tabs, activeTab]);

//     // ==========================================
//     // CONTENT PROTECTION
//     // ==========================================
//     useEffect(() => {
//         const handleVisibilityChange = () => setIsPageHidden(document.hidden);
//         const handleWindowBlur = () => setIsPageHidden(true);
//         const handleWindowFocus = () => setIsPageHidden(false);

//         const handleKeyDown = (event) => {
//             if (event.key === "PrintScreen") {
//                 setIsPageHidden(true);
//                 setTimeout(() => setIsPageHidden(false), 1500);
//             }
//             if (event.key === "F12") {
//                 event.preventDefault();
//                 return false;
//             }
//             if ((event.ctrlKey || event.metaKey) && ["p", "P", "u", "U"].includes(event.key)) {
//                 event.preventDefault();
//                 return false;
//             }
//             if (
//                 (event.ctrlKey || event.metaKey) &&
//                 event.shiftKey &&
//                 ["I", "i", "J", "j", "C", "c"].includes(event.key)
//             ) {
//                 event.preventDefault();
//                 return false;
//             }
//         };

//         const handleCopy = (event) => {
//             event.preventDefault();
//             if (event.clipboardData) {
//                 event.clipboardData.setData("text/plain", "Protected Content - Copying is disabled.");
//             }
//         };

//         document.addEventListener("visibilitychange", handleVisibilityChange);
//         window.addEventListener("blur", handleWindowBlur);
//         window.addEventListener("focus", handleWindowFocus);
//         window.addEventListener("keydown", handleKeyDown);
//         document.addEventListener("copy", handleCopy);

//         return () => {
//             document.removeEventListener("visibilitychange", handleVisibilityChange);
//             window.removeEventListener("blur", handleWindowBlur);
//             window.removeEventListener("focus", handleWindowFocus);
//             window.removeEventListener("keydown", handleKeyDown);
//             document.removeEventListener("copy", handleCopy);
//         };
//     }, []);

//     if (isLoading) {
//         return (
//             <div className="flex justify-center items-center min-h-screen">
//                 <span className="loading loading-bars loading-lg text-slate-800 dark:text-white"></span>
//             </div>
//         );
//     }

//     if (isError) {
//         return (
//             <div className="py-20 text-center text-rose-500 font-medium">
//                 Failed to load content...
//             </div>
//         );
//     }

//     const toggleDetail = (index) => {
//         setExpandedCard((prev) => (prev === index ? null : index));
//     };

//     const currentItems = vocabulary?.[activeTab] || [];
//     const totalWords = Object.values(vocabulary).reduce(
//         (acc, cur) => acc + (Array.isArray(cur) ? cur.length : 0),
//         0
//     );

//     return (
//         <>
//             <style>{`
//         @media print {
//           body {
//             display: none !important;
//           }
//         }
//       `}</style>

//             <div
//         className={`min-h-screen bg-slate-50/70 dark:bg-zinc-950 py-5 sm:py-8 px-3 sm:px-6 lg:px-8 text-slate-900 dark:text-zinc-100 antialiased select-none ${
//           isPageHidden ? "blur-xl" : ""
//         }`}
//         onContextMenu={(e) => e.preventDefault()}
//         onDragStart={(e) => e.preventDefault()}
//       >
//         <div className="max-w-6xl mx-auto space-y-5 sm:space-y-7">
//           {/* Header Banner */}
//           <header className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-7 shadow-xs">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
//               <div className="space-y-1.5">
//                 <div className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-zinc-300">
//                   <span className="text-base">{theme.icon || "📚"}</span>
//                   <span>Theme {theme.code ?? code ?? "--"}</span>
//                 </div>
//                 <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
//                   {theme.title || "Thematic Vocabulary"}
//                 </h1>
//               </div>
//               <div className="flex items-center self-start sm:self-auto border border-slate-200 dark:border-zinc-800 px-3.5 py-1.5 rounded-xl text-sm font-bold text-slate-700 dark:text-zinc-300">
//                 <span>{totalWords} Words Total</span>
//               </div>
//             </div>
//           </header>

//           {/* Category Tabs */}
//           <nav
//             aria-label="Vocabulary Category Tabs"
//             className="bg-slate-200/60 dark:bg-zinc-900 p-1.5 sm:p-2 rounded-2xl border border-slate-300/60 dark:border-zinc-800 shadow-xs"
//           >
//             <div className="flex sm:grid sm:grid-flow-col sm:auto-cols-fr gap-1.5 sm:gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
//               {tabs.map((tab) => {
//                 const isActive = activeTab === tab.id;
//                 return (
//                   <button
//                     key={tab.id}
//                     onClick={() => {
//                       setActiveTab(tab.id);
//                       setExpandedCard(null);
//                     }}
//                     className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl font-bold transition-all shrink-0 select-none text-sm sm:text-base ${
//                       isActive
//                         ? "bg-white text-slate-950 shadow-xs dark:bg-zinc-800 dark:text-white border border-slate-300 dark:border-zinc-700"
//                         : "text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100"
//                     }`}
//                   >
//                     <span>{tab.label}</span>
//                     {tab.count !== undefined && tab.count !== null && (
//                       <span className="text-xs sm:text-sm font-bold opacity-75">
//                         ({tab.count})
//                       </span>
//                     )}
//                   </button>
//                 );
//               })}
//             </div>
//           </nav>

//           {/* Cards Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-start">
//             {currentItems.map((item, index) => {
//               const isExpanded = expandedCard === index;
//               const forms = item.forms || {};
//               const hasForms = Object.keys(forms).length > 0;

//               return (
//                 <div
//                   key={item.word || index}
//                   className={`flex flex-col justify-between rounded-xl bg-white dark:bg-zinc-900 transition-all text-sm sm:text-base ${
//                     isExpanded
//                       ? "border-2 border-slate-900 dark:border-zinc-100 ring-2 ring-slate-900/10 dark:ring-zinc-100/10 shadow-sm col-span-1 md:col-span-2"
//                       : "border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 h-full shadow-2xs"
//                   }`}
//                 >
//                   {/* Card Main Body */}
//                   <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
//                     <div>
//                       <div className="flex items-start justify-between gap-3">
//                         <h2 className="text-lg sm:text-xl font-bold capitalize text-slate-900 dark:text-white">
//                           {item.word}
//                         </h2>
//                         <button
//                           onClick={() => toggleDetail(index)}
//                           aria-label={isExpanded ? "Collapse card details" : "View card details"}
//                           className={`text-sm font-bold px-3.5 py-1.5 rounded-lg border transition-colors shrink-0 ${
//                             isExpanded
//                               ? "border-slate-900 bg-slate-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
//                               : "border-slate-300 dark:border-zinc-700 text-slate-700 hover:text-slate-950 hover:bg-slate-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800"
//                           }`}
//                         >
//                           {isExpanded ? "Close" : "Detail"}
//                         </button>
//                       </div>

//                       <p className="mt-2 text-slate-700 dark:text-zinc-300 leading-relaxed font-normal">
//                         {item.definition}
//                       </p>
//                     </div>

//                     {/* Quick V1-V3 Strip */}
//                     {hasForms && (
//                       <div className="grid grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-slate-100 dark:border-zinc-800 text-center text-sm sm:text-base">
//                         <div>
//                           <span className="font-bold block text-slate-900 dark:text-white">V1</span>
//                           <span className="text-slate-600 dark:text-zinc-400">{forms.present || "—"}</span>
//                         </div>
//                         <div>
//                           <span className="font-bold block text-slate-900 dark:text-white">V2</span>
//                           <span className="text-slate-600 dark:text-zinc-400">{forms.past || "—"}</span>
//                         </div>
//                         <div>
//                           <span className="font-bold block text-slate-900 dark:text-white">V3</span>
//                           <span className="text-slate-600 dark:text-zinc-400">{forms.pastParticiple || "—"}</span>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* Expanded Detail Drawer */}
//                   {isExpanded && (
//                     <div className="border-t border-slate-200 dark:border-zinc-800 p-4 sm:p-6 space-y-4 bg-slate-50/50 dark:bg-zinc-800/20 rounded-b-xl text-sm sm:text-base">
//                       {/* Full Form Variations + Synonyms / Antonyms */}
//                       {hasForms ? (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                           <div className="space-y-1.5 text-slate-700 dark:text-zinc-300 leading-relaxed">
//                             <p><strong className="text-slate-900 dark:text-white">Infinitive:</strong> {forms.infinitive || "—"}</p>
//                             <p><strong className="text-slate-900 dark:text-white">Gerund:</strong> {forms.gerund || "—"}</p>
//                             <p><strong className="text-slate-900 dark:text-white">Present:</strong> {forms.present || "—"}</p>
//                             <p><strong className="text-slate-900 dark:text-white">Past (V2):</strong> {forms.past || "—"}</p>
//                             <p><strong className="text-slate-900 dark:text-white">Participle (V3):</strong> {forms.pastParticiple || "—"}</p>
//                           </div>

//                           <div className="space-y-3 text-slate-700 dark:text-zinc-300">
//                             {item.synonyms?.length > 0 && (
//                               <div>
//                                 <strong className="text-slate-900 dark:text-white block mb-1">Synonyms:</strong>
//                                 <p className="leading-relaxed">
//                                   {item.synonyms.map((s) => `${s.word} (${s.meaning})`).join(", ")}
//                                 </p>
//                               </div>
//                             )}

//                             {item.antonyms?.length > 0 && (
//                               <div>
//                                 <strong className="text-slate-900 dark:text-white block mb-1">Antonyms:</strong>
//                                 <p className="leading-relaxed">
//                                   {item.antonyms.map((a) => `${a.word} (${a.meaning})`).join(", ")}
//                                 </p>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       ) : (
//                         (item.synonyms?.length > 0 || item.antonyms?.length > 0) && (
//                           <div className="space-y-2.5 text-slate-700 dark:text-zinc-300">
//                             {item.synonyms?.length > 0 && (
//                               <p className="leading-relaxed">
//                                 <strong className="text-slate-900 dark:text-white">Synonyms: </strong>
//                                 {item.synonyms.map((s) => `${s.word} (${s.meaning})`).join(", ")}
//                               </p>
//                             )}
//                             {item.antonyms?.length > 0 && (
//                               <p className="leading-relaxed">
//                                 <strong className="text-slate-900 dark:text-white">Antonyms: </strong>
//                                 {item.antonyms.map((a) => `${a.word} (${a.meaning})`).join(", ")}
//                               </p>
//                             )}
//                           </div>
//                         )
//                       )}

//                       {/* Example Sentence with Meaning */}
//                       {item.exampleSentence && (
//                         <div className="border-t border-slate-200 dark:border-zinc-800/80 pt-3.5 space-y-1.5">
//                           <strong className="text-slate-900 dark:text-white block">Example Sentence:</strong>
//                           <p className="text-slate-900 dark:text-zinc-100 font-medium leading-relaxed">
//                             {item.exampleSentence.english}
//                           </p>
//                           <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
//                             {item.exampleSentence.bangla}
//                           </p>
//                         </div>
//                       )}

//                       {/* Lexical Breakdown */}
//                       {item.wordAnalysis && item.wordAnalysis.length > 0 && (
//                         <div className="border-t border-slate-200 dark:border-zinc-800/80 pt-3.5 space-y-1.5">
//                           <strong className="text-slate-900 dark:text-white block">Lexical Breakdown:</strong>
//                           <p className="text-slate-700 dark:text-zinc-300 leading-relaxed">
//                             {item.wordAnalysis.map((token, i) => (
//                               <span key={i}>
//                                 <span className="font-bold text-slate-900 dark:text-white">{token.word}</span>: {token.meaning}
//                                 {i < item.wordAnalysis.length - 1 && " • "}
//                               </span>
//                             ))}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}

//             {currentItems.length === 0 && (
//               <div className="col-span-full py-16 text-center text-slate-400 dark:text-zinc-500">
//                 <p className="text-sm sm:text-base font-bold">
//                   No {activeTab} recorded in this theme yet.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//         </>
//     );
// };

// export default RegularExtraVocabWordDetails;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const RegularExtraVocabWordDetails = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [activeTab, setActiveTab] = useState("verbs");
    const [expandedCard, setExpandedCard] = useState(null);
    const [isPageHidden, setIsPageHidden] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    // 1. Fetch all sections list from backend
    const {
        data: sectionsList = [],
        isLoading: isSectionsLoading,
    } = useQuery({
        queryKey: ["extraVocabSections", user?.uid],
        queryFn: async ({ signal }) => {
            const response = await axiosSecure.get("/extra-vocab/sections", { signal });
            const raw = response.data;
            if (Array.isArray(raw)) return raw;
            if (Array.isArray(raw?.data)) return raw.data;
            if (Array.isArray(raw?.sections)) return raw.sections;
            if (Array.isArray(raw?.result)) return raw.result;
            return [];
        },
        enabled: !authLoading && !!user,
    });

    // 2. Fetch specific section details
    const {
        data: documentData = {},
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["thematicVocabularyDetail", String(code), user?.uid],
        queryFn: async ({ signal }) => {
            const response = await axiosSecure.get(
                `/everydayWordExtraSectionDetail/${code}`,
                { signal }
            );
            return response.data || {};
        },
        enabled: !authLoading && !!user && !!code,
    });

    const theme = documentData?.theme || {};
    const vocabulary = documentData?.vocabulary || {};

    const TAB_DEFINITIONS = [
        { id: "verbs", label: "Verbs", key: "verbs" },
        { id: "nouns", label: "Nouns", key: "nouns" },
        { id: "adjectives", label: "Adjectives", key: "adjectives" },
        { id: "adverbs", label: "Adverbs", key: "adverbs" },
        { id: "collocations", label: "Collocations", key: "collocations" },
    ];

    const tabs = TAB_DEFINITIONS.filter((tab) => {
        const list = vocabulary?.[tab.key];
        return Array.isArray(list) && list.length > 0;
    }).map((tab) => ({
        id: tab.id,
        label: tab.label,
        count: vocabulary[tab.key].length,
    }));

    useEffect(() => {
        if (tabs.length > 0 && !tabs.some((t) => t.id === activeTab)) {
            setActiveTab(tabs[0].id);
        }
    }, [tabs, activeTab]);

    const handleSectionChange = (targetCode) => {
        if (String(code) === String(targetCode)) return;

        const pathParts = location.pathname.split("/");
        pathParts[pathParts.length - 1] = targetCode;
        const newPath = pathParts.join("/");

        navigate(newPath);
        setExpandedCard(null);
        setIsSidebarOpen(false);
    };

    // ==========================================
    // CONTENT PROTECTION
    // ==========================================
    useEffect(() => {
        const handleVisibilityChange = () => setIsPageHidden(document.hidden);
        const handleWindowBlur = () => setIsPageHidden(true);
        const handleWindowFocus = () => setIsPageHidden(false);

        const handleKeyDown = (event) => {
            if (event.key === "PrintScreen") {
                setIsPageHidden(true);
                setTimeout(() => setIsPageHidden(false), 1500);
            }
            if (event.key === "F12") {
                event.preventDefault();
                return false;
            }
            if ((event.ctrlKey || event.metaKey) && ["p", "P", "u", "U"].includes(event.key)) {
                event.preventDefault();
                return false;
            }
            if (
                (event.ctrlKey || event.metaKey) &&
                event.shiftKey &&
                ["I", "i", "J", "j", "C", "c"].includes(event.key)
            ) {
                event.preventDefault();
                return false;
            }
        };

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

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("blur", handleWindowBlur);
            window.removeEventListener("focus", handleWindowFocus);
            window.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("copy", handleCopy);
        };
    }, []);

    const toggleDetail = (index) => {
        setExpandedCard((prev) => (prev === index ? null : index));
    };

    const currentItems = vocabulary?.[activeTab] || [];
    const totalWords = Object.values(vocabulary).reduce(
        (acc, cur) => acc + (Array.isArray(cur) ? cur.length : 0),
        0
    );

    return (
        <>
            <style>{`
        @media print {
          body {
            display: none !important;
          }
        }
      `}</style>

            <div
                className={`min-h-screen bg-slate-50/70 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 antialiased select-none ${isPageHidden ? "blur-xl" : ""
                    }`}
                onContextMenu={(e) => e.preventDefault()}
            >
                <div className="flex">
                    {/* Mobile Backdrop Overlay */}
                    {isSidebarOpen && (
                        <div
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs"
                        />
                    )}

                    {/* Left Navigation Sidebar */}
                    <aside
                        className={`fixed top-0 bottom-0 left-0 z-50 w-72 sm:w-80 bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                            }`}
                    >
                        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between">
                            <div>
                                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                    All Sections
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                                    Click any Section to view words
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsSidebarOpen(false)}
                                className="lg:hidden p-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs font-bold cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Scrollable list of sections */}
                        <div className="flex-1 overflow-y-auto p-3 space-y-2 [scrollbar-width:thin]">
                            {isSectionsLoading ? (
                                <div className="space-y-2.5 p-1">
                                    {Array.from({ length: 9 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="h-14 rounded-xl bg-slate-100 dark:bg-zinc-800/60 animate-pulse border border-slate-200/50 dark:border-zinc-800/50"
                                        />
                                    ))}
                                </div>
                            ) : Array.isArray(sectionsList) && sectionsList.length > 0 ? (
                                sectionsList.map((sec, idx) => {
                                    const sectionCode = sec.code ?? sec.theme?.code ?? sec.sectionNumber ?? idx + 1;
                                    const sectionTitle = sec.title ?? sec.theme?.title ?? `Section ${sectionCode}`;
                                    const sectionIcon = sec.icon ?? sec.theme?.icon ?? "📖";
                                    const isSelected = String(code) === String(sectionCode);

                                    return (
                                        <button
                                            type="button"
                                            key={sectionCode}
                                            onClick={() => handleSectionChange(sectionCode)}
                                            className={`w-full group relative flex items-center justify-between p-3 rounded-xl transition-all text-left border cursor-pointer touch-manipulation ${isSelected
                                                    ? "bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-slate-900 dark:border-zinc-100 shadow-sm"
                                                    : "bg-slate-50/70 dark:bg-zinc-900/60 text-slate-800 dark:text-zinc-200 border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800/80 shadow-2xs"
                                                }`}
                                        >
                                            <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                                <span className="text-base shrink-0">{sectionIcon}</span>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-sm truncate leading-snug">
                                                        {sectionTitle}
                                                    </p>
                                                    <p
                                                        className={`text-xs truncate ${isSelected
                                                                ? "text-slate-300 dark:text-zinc-600"
                                                                : "text-slate-500 dark:text-zinc-400"
                                                            }`}
                                                    >
                                                        Section-{sectionCode}
                                                    </p>
                                                </div>
                                            </div>

                                            <span
                                                className={`text-xs px-2 py-1 rounded-md font-bold shrink-0 border ${isSelected
                                                        ? "bg-slate-800 text-white border-slate-700 dark:bg-zinc-200 dark:text-zinc-900 dark:border-zinc-300"
                                                        : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700 group-hover:border-slate-300"
                                                    }`}
                                            >
                                                Open →
                                            </span>
                                        </button>
                                    );
                                })
                            ) : (
                                <div className="p-5 text-center text-xs font-bold text-slate-400 dark:text-zinc-500 border border-dashed border-slate-200 dark:border-zinc-800 rounded-xl">
                                    No sections found
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* Right Main Content Area */}
                    <main className="flex-1 lg:pl-80 w-full min-w-0">
                        <div className="max-w-6xl mx-auto py-5 sm:py-8 px-3 sm:px-6 lg:px-8 space-y-5 sm:space-y-7">
                            {/* Header Banner */}
                            <header className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-7 shadow-xs">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                                    <div className="space-y-1.5">
                                        <div className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-zinc-300">
                                            <span className="text-base">{theme.icon || "📚"}</span>
                                            <span>Section-{theme.code ?? code ?? "--"}</span>
                                        </div>
                                        <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
                                            {theme.title || "Thematic Vocabulary"}
                                        </h1>
                                    </div>
                                    <div className="flex items-center self-start sm:self-auto border border-slate-200 dark:border-zinc-800 px-3.5 py-1.5 rounded-xl text-sm font-bold text-slate-700 dark:text-zinc-300 bg-slate-50/50 dark:bg-zinc-800/40">
                                        <span>{totalWords} Words Total</span>
                                    </div>
                                </div>
                            </header>

                            {/* Category Tabs */}
                            <nav
                                aria-label="Vocabulary Category Tabs"
                                className="bg-slate-200/60 dark:bg-zinc-900 p-1.5 sm:p-2 rounded-2xl border border-slate-300/60 dark:border-zinc-800 shadow-xs"
                            >
                                <div className="flex sm:grid sm:grid-flow-col sm:auto-cols-fr gap-1.5 sm:gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                                    {tabs.map((tab) => {
                                        const isActive = activeTab === tab.id;
                                        return (
                                            <button
                                                type="button"
                                                key={tab.id}
                                                onClick={() => {
                                                    setActiveTab(tab.id);
                                                    setExpandedCard(null);
                                                }}
                                                className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl font-bold transition-all shrink-0 select-none text-sm sm:text-base cursor-pointer touch-manipulation ${isActive
                                                        ? "bg-white text-slate-950 shadow-xs dark:bg-zinc-800 dark:text-white border border-slate-300 dark:border-zinc-700"
                                                        : "text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                                                    }`}
                                            >
                                                <span>{tab.label}</span>
                                                {tab.count !== undefined && tab.count !== null && (
                                                    <span className="text-xs sm:text-sm font-bold opacity-75">
                                                        ({tab.count})
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </nav>

                            {/* Loading & Error States */}
                            {isLoading && (
                                <div className="flex flex-col justify-center items-center py-28 space-y-3">
                                    <span className="loading loading-bars loading-lg text-slate-800 dark:text-white"></span>
                                    <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">
                                        Loading Section #{code}...
                                    </p>
                                </div>
                            )}

                            {isError && (
                                <div className="py-20 text-center text-rose-500 font-medium text-base">
                                    Failed to load content for Section #{code}...
                                </div>
                            )}

                            {/* Word Cards Grid */}
                            {!isLoading && !isError && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-start">
                                    {currentItems.map((item, index) => {
                                        const isExpanded = expandedCard === index;
                                        const forms = item.forms || {};
                                        const hasForms = Object.keys(forms).length > 0;

                                        return (
                                            <div
                                                key={item.word || index}
                                                className={`flex flex-col justify-between rounded-xl bg-white dark:bg-zinc-900 transition-all text-sm sm:text-base ${isExpanded
                                                        ? "border-2 border-slate-900 dark:border-zinc-100 ring-2 ring-slate-900/10 dark:ring-zinc-100/10 shadow-sm col-span-1 md:col-span-2"
                                                        : "border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 h-full shadow-2xs"
                                                    }`}
                                            >
                                                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                                                    <div>
                                                        <div className="flex items-start justify-between gap-3">
                                                            <h2 className="text-lg sm:text-xl font-bold capitalize text-slate-900 dark:text-white">
                                                                {item.word || item.phrase}
                                                            </h2>
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleDetail(index);
                                                                }}
                                                                aria-label={isExpanded ? "Collapse card details" : "View card details"}
                                                                className={`text-sm font-bold px-3.5 py-1.5 rounded-lg border transition-colors shrink-0 cursor-pointer touch-manipulation ${isExpanded
                                                                        ? "border-slate-900 bg-slate-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                                                                        : "border-slate-300 dark:border-zinc-700 text-slate-700 hover:text-slate-950 hover:bg-slate-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800"
                                                                    }`}
                                                            >
                                                                {isExpanded ? "Close" : "Detail"}
                                                            </button>
                                                        </div>

                                                        <p className="mt-2 text-slate-700 dark:text-zinc-300 leading-relaxed font-normal">
                                                            {item.definition}
                                                        </p>
                                                    </div>

                                                    {/* Quick V1-V3 Strip */}
                                                    {hasForms && (
                                                        <div className="grid grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-slate-100 dark:border-zinc-800 text-center text-sm sm:text-base">
                                                            <div>
                                                                <span className="font-bold block text-slate-900 dark:text-white">V1</span>
                                                                <span className="text-slate-600 dark:text-zinc-400">{forms.present || "—"}</span>
                                                            </div>
                                                            <div>
                                                                <span className="font-bold block text-slate-900 dark:text-white">V2</span>
                                                                <span className="text-slate-600 dark:text-zinc-400">{forms.past || "—"}</span>
                                                            </div>
                                                            <div>
                                                                <span className="font-bold block text-slate-900 dark:text-white">V3</span>
                                                                <span className="text-slate-600 dark:text-zinc-400">{forms.pastParticiple || "—"}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Expanded Drawer */}
                                                {isExpanded && (
                                                    <div className="border-t border-slate-200 dark:border-zinc-800 p-4 sm:p-6 space-y-4 bg-slate-50/50 dark:bg-zinc-800/20 rounded-b-xl text-sm sm:text-base">
                                                        {hasForms ? (
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                                <div className="space-y-1.5 text-slate-700 dark:text-zinc-300 leading-relaxed">
                                                                    <p><strong className="text-slate-900 dark:text-white">Infinitive:</strong> {forms.infinitive || "—"}</p>
                                                                    <p><strong className="text-slate-900 dark:text-white">Gerund:</strong> {forms.gerund || "—"}</p>
                                                                    <p><strong className="text-slate-900 dark:text-white">Present:</strong> {forms.present || "—"}</p>
                                                                    <p><strong className="text-slate-900 dark:text-white">Past (V2):</strong> {forms.past || "—"}</p>
                                                                    <p><strong className="text-slate-900 dark:text-white">Participle (V3):</strong> {forms.pastParticiple || "—"}</p>
                                                                </div>

                                                                <div className="space-y-3 text-slate-700 dark:text-zinc-300">
                                                                    {item.synonyms?.length > 0 && (
                                                                        <div>
                                                                            <strong className="text-slate-900 dark:text-white block mb-1">Synonyms:</strong>
                                                                            <p className="leading-relaxed">
                                                                                {item.synonyms.map((s) => `${s.word} (${s.meaning})`).join(", ")}
                                                                            </p>
                                                                        </div>
                                                                    )}

                                                                    {item.antonyms?.length > 0 && (
                                                                        <div>
                                                                            <strong className="text-slate-900 dark:text-white block mb-1">Antonyms:</strong>
                                                                            <p className="leading-relaxed">
                                                                                {item.antonyms.map((a) => `${a.word} (${a.meaning})`).join(", ")}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            (item.synonyms?.length > 0 || item.antonyms?.length > 0) && (
                                                                <div className="space-y-2.5 text-slate-700 dark:text-zinc-300">
                                                                    {item.synonyms?.length > 0 && (
                                                                        <p className="leading-relaxed">
                                                                            <strong className="text-slate-900 dark:text-white">Synonyms: </strong>
                                                                            {item.synonyms.map((s) => `${s.word} (${s.meaning})`).join(", ")}
                                                                        </p>
                                                                    )}
                                                                    {item.antonyms?.length > 0 && (
                                                                        <p className="leading-relaxed">
                                                                            <strong className="text-slate-900 dark:text-white">Antonyms: </strong>
                                                                            {item.antonyms.map((a) => `${a.word} (${a.meaning})`).join(", ")}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            )
                                                        )}

                                                        {/* Example Sentence with Meaning */}
                                                        {item.exampleSentence && (
                                                            <div className="border-t border-slate-200 dark:border-zinc-800/80 pt-3.5 space-y-1.5">
                                                                <strong className="text-slate-900 dark:text-white block">Example Sentence:</strong>
                                                                <p className="text-slate-900 dark:text-zinc-100 font-medium leading-relaxed">
                                                                    {item.exampleSentence.english}
                                                                </p>
                                                                <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
                                                                    {item.exampleSentence.bangla}
                                                                </p>
                                                            </div>
                                                        )}

                                                        {/* Lexical Breakdown */}
                                                        {item.wordAnalysis && item.wordAnalysis.length > 0 && (
                                                            <div className="border-t border-slate-200 dark:border-zinc-800/80 pt-3.5 space-y-1.5">
                                                                <strong className="text-slate-900 dark:text-white block">Lexical Breakdown:</strong>
                                                                <p className="text-slate-700 dark:text-zinc-300 leading-relaxed">
                                                                    {item.wordAnalysis.map((token, i) => (
                                                                        <span key={i}>
                                                                            <span className="font-bold text-slate-900 dark:text-white">{token.word}</span>: {token.meaning}
                                                                            {i < item.wordAnalysis.length - 1 && " • "}
                                                                        </span>
                                                                    ))}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}

                                    {currentItems.length === 0 && (
                                        <div className="col-span-full py-16 text-center text-slate-400 dark:text-zinc-500">
                                            <p className="text-sm sm:text-base font-bold">
                                                No {activeTab} recorded in this Section yet.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </main>
                </div>

                {/* Floating Action Button on Bottom-Left for Mobile Screens */}
                <div className="fixed bottom-5 left-5 z-30 lg:hidden">
                    <button
                        type="button"
                        onClick={() => setIsSidebarOpen(true)}
                        className="flex items-center gap-2.5 px-4.5 py-3 rounded-full bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold text-sm shadow-2xl border border-slate-700 dark:border-zinc-300 active:scale-95 transition-all cursor-pointer touch-manipulation"
                    >
                        <span className="text-base">☰</span>
                        <span>See all sections</span>
                        
                    </button>
                </div>
            </div>
        </>
    );
};

export default RegularExtraVocabWordDetails;