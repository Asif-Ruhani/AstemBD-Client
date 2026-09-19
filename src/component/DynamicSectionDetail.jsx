import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { LuLock, LuSparkles } from "react-icons/lu";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const DynamicSectionDetail = () => {
  const { sectionNumber, category: categoryKey, slug: courseSlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("verbs");
  const [expandedCard, setExpandedCard] = useState(null);
  const [isPageHidden, setIsPageHidden] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { user, loading: authLoading, authStatus, hasAccess } = useAuth();
  const axiosSecure = useAxiosSecure();

  // 1. Fetch parent course metadata and full section catalog dynamically using slug
  const {
    data: courseContext = {},
    isLoading: isSectionsLoading,
  } = useQuery({
    queryKey: ["course-context", categoryKey, courseSlug],
    queryFn: async ({ signal }) => {
      const res = await axiosSecure.get(`/sections?slug=${courseSlug}`, { signal });
      return res.data || {};
    },
    enabled: !!courseSlug,
    staleTime: 1000 * 60 * 10,
  });

  const rawSectionsList = useMemo(() => {
    return Array.isArray(courseContext?.sections) ? courseContext.sections : [];
  }, [courseContext?.sections]);

  // Context-aware Sidebar: URL onujayi track check
  const isCurrentExtraTrack = useMemo(() => {
    return location.pathname.includes("extra-section");
  }, [location.pathname]);

  // Regular track-e shudhu regular, extra track-e shudhu extra sections dekhabe
  const sectionsList = useMemo(() => {
    if (isCurrentExtraTrack) {
      return rawSectionsList.filter((sec) => sec.status === "extra");
    }
    return rawSectionsList.filter((sec) => sec.status !== "extra");
  }, [rawSectionsList, isCurrentExtraTrack]);

  const currentCourse = courseContext?.course || null;
  const activeCourseId = currentCourse?.courseId;

  // Authoritative Access Verification
  const isEnrolled = useMemo(() => {
    if (authStatus === "admin" || user?.role === "admin" || user?.isAdmin) {
      return true;
    }

    if (!activeCourseId) return false;

    if (typeof hasAccess === "function") {
      return hasAccess(activeCourseId, categoryKey);
    }

    return false;
  }, [authStatus, user, hasAccess, activeCourseId, categoryKey]);

  // Section 1 is inherently a Free Preview
  const isSample = String(sectionNumber) === "1";
  const canViewCurrentSection = isSample || isEnrolled;

  // 2. Fetch specific section details dynamically
  const {
    data: sectionData = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sectionDetail", activeCourseId, String(sectionNumber)],
    queryFn: async ({ signal }) => {
      const response = await axiosSecure.get(
        `/section-details?courseId=${encodeURIComponent(activeCourseId)}&sectionNumber=${sectionNumber}`,
        { signal }
      );
      return response.data?.data || response.data?.section || response.data || {};
    },
    enabled: canViewCurrentSection && !!activeCourseId && !!sectionNumber,
    staleTime: 1000 * 60 * 10,
  });

  // Dynamic Tabs Registry: Adapts to any document structure
  const TAB_REGISTRY = [
    { id: "verbs", label: "Verbs", keys: ["verbs"] },
    { id: "nouns", label: "Nouns", keys: ["nouns"] },
    { id: "adjectives", label: "Adjectives", keys: ["adjectives"] },
    { id: "adverbs", label: "Adverbs", keys: ["adverbs"] },
    { id: "collocations", label: "Collocations", keys: ["collocations", "collocation"] },
    { id: "phrases", label: "Phrases & Idioms", keys: ["phrases", "idioms", "idiomaticPhrases"] },
    { id: "practice", label: "Practice", keys: ["morePractices", "practice", "exercises"] },
    { id: "passage", label: "Reading Passage", keys: ["readingPassage", "passage"] }
  ];

  // Helper to extract items dynamically across different schema namings
  const getFieldData = (keys) => {
    for (const key of keys) {
      if (Array.isArray(sectionData?.[key]) && sectionData[key].length > 0) {
        return sectionData[key];
      }
      if (sectionData?.[key] && typeof sectionData[key] === "object" && !Array.isArray(sectionData[key])) {
        return [sectionData[key]];
      }
    }
    return null;
  };

  // Helper to safely render synonyms and antonyms
  const renderSynAnt = (items) => {
    if (!items) return null;
    if (typeof items === "string") return items;
    if (Array.isArray(items)) {
      return items
        .map((item) => (typeof item === "object" ? `${item.word || item.phrase || ""} (${item.meaning || ""})` : item))
        .join(", ");
    }
    return null;
  };

  // Dynamically include tabs ONLY if data exists for this specific section
  const tabs = useMemo(() => {
    return TAB_REGISTRY.map((tab) => {
      const data = getFieldData(tab.keys);
      if (!data) return null;
      return {
        id: tab.id,
        label: tab.label,
        count: Array.isArray(data) ? data.length : 1,
        isSingularObject: !Array.isArray(getFieldData(tab.keys))
      };
    }).filter(Boolean);
  }, [sectionData]);

  // Auto-switch to the first valid tab if activeTab is not present
  useEffect(() => {
    if (tabs.length > 0 && !tabs.some((t) => t.id === activeTab)) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs, activeTab]);

  // Section switcher navigation
  const handleSectionChange = (targetSection) => {
    const targetIsSample = String(targetSection) === "1";
    if (!targetIsSample && !isEnrolled) {
      navigate("/payment", {
        state: {
          courseId: activeCourseId,
          category: categoryKey,
          slug: courseSlug
        }
      });
      return;
    }

    if (String(sectionNumber) === String(targetSection)) return;

    const basePath = location.pathname.includes("extra-section")
      ? `/courses/${categoryKey}/${courseSlug}/extra-section/${targetSection}`
      : `/courses/${categoryKey}/${courseSlug}/section/${targetSection}`;

    navigate(basePath);
    setExpandedCard(null);
    setIsSidebarOpen(false);
  };

  // Dynamic Word Counter
  const totalWords = useMemo(() => {
    const wordKeys = ["verbs", "nouns", "adjectives", "adverbs", "collocations", "collocation", "phrases", "idioms"];
    let count = 0;
    wordKeys.forEach((k) => {
      if (Array.isArray(sectionData?.[k])) {
        count += sectionData[k].length;
      }
    });
    return count;
  }, [sectionData]);

  // ==========================================
  // PREMIUM CONTENT PROTECTION
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
        event.stopPropagation();
        return false;
      }
      if ((event.ctrlKey || event.metaKey) && ["p", "P", "u", "U"].includes(event.key)) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
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

    const handleCopy = (event) => {
      event.preventDefault();
      if (event.clipboardData) {
        event.clipboardData.setData("text/plain", "Protected Educational Material - ASTEEM");
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
  // ==========================================
  // END PREMIUM CONTENT PROTECTION
  // ==========================================

  const toggleDetail = (index) => {
    setExpandedCard((prev) => (prev === index ? null : index));
  };

  const previewFallbackRoute = `/courses/${categoryKey}/${courseSlug}/section/1`;

  // Resolved arrays for current tab
  const currentTabItems = useMemo(() => {
    if (activeTab === "collocations") {
      return sectionData?.collocations || sectionData?.collocation || [];
    }
    if (activeTab === "phrases") {
      return sectionData?.phrases || sectionData?.idioms || sectionData?.idiomaticPhrases || [];
    }
    if (activeTab === "practice") {
      return sectionData?.morePractices || sectionData?.practice || sectionData?.exercises || [];
    }
    return sectionData?.[activeTab] || [];
  }, [sectionData, activeTab]);

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
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white capitalize">
                  {currentCourse?.title || courseSlug?.replace(/-/g, " ")}
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                  Select module to load content
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

            {/* Scrollable List of Sections */}
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
                  const secId = sec.sectionNumber ?? sec.code ?? sec.no ?? idx + 1;
                  const secTitle = sec.title ?? sec.name ?? `Section ${secId}`;
                  const secIcon = sec.icon ?? sec.logo ?? "📖";
                  const isSelected = String(sectionNumber) === String(secId);
                  const isSecUnlocked = sec.isFreePreview === true || String(secId) === "1" || isEnrolled;

                  return (
                    <button
                      type="button"
                      key={secId}
                      onClick={() => handleSectionChange(secId)}
                      className={`w-full group relative flex items-center justify-between p-3 rounded-xl transition-all text-left border cursor-pointer touch-manipulation ${isSelected
                        ? "bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-slate-900 dark:border-zinc-100 shadow-sm"
                        : isSecUnlocked
                          ? "bg-slate-50/70 dark:bg-zinc-900/60 text-slate-800 dark:text-zinc-200 border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800/80 shadow-2xs"
                          : "bg-slate-100/60 dark:bg-zinc-900/40 text-slate-500 dark:text-zinc-500 border-slate-200/60 dark:border-zinc-800/60 opacity-80"
                        }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <span className="text-base shrink-0">{secIcon}</span>
                        <div className="min-w-0">
                          <p className="font-bold text-sm truncate leading-snug">
                            {secTitle}
                          </p>
                          <p
                            className={`text-xs truncate ${isSelected
                              ? "text-slate-300 dark:text-zinc-600"
                              : "text-slate-500 dark:text-zinc-400"
                              }`}
                          >
                            Section-{secId}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-xs px-2 py-1 rounded-md font-bold shrink-0 border flex items-center gap-1 ${isSelected
                          ? "bg-slate-800 text-white border-slate-700 dark:bg-zinc-200 dark:text-zinc-900 dark:border-zinc-300"
                          : isSecUnlocked
                            ? "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700 group-hover:border-slate-300"
                            : "bg-amber-50 text-black dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-900/40"
                          }`}
                      >
                        {isSecUnlocked ? (
                          "Open →"
                        ) : (
                          <>
                            <LuLock className="w-4 h-4" />
                            Lock
                          </>
                        )}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="p-5 text-center text-xs font-bold text-slate-400 dark:text-zinc-500 border border-dashed border-slate-200 dark:border-zinc-800 rounded-xl">
                  No modules found
                </div>
              )}
            </div>
          </aside>

          {/* Right Main Content Area */}
          <main className="flex-1 lg:pl-80 w-full min-w-0">
            {!canViewCurrentSection ? (
              <div className="max-w-2xl mx-auto py-24 px-4 text-center space-y-6">
                <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/50 text-black dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-200 dark:border-amber-800 shadow-sm">
                  <LuLock className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-black tracking-wider uppercase text-amber-600 dark:text-amber-400">
                    Premium Section Gated
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    Section {sectionNumber} is Locked
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-md mx-auto">
                    Section 1 is available as a free preview. To explore all curriculum sections and active recall resources, enroll in full course access.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(previewFallbackRoute)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 font-bold text-sm hover:bg-slate-50 transition cursor-pointer"
                  >
                    ← Back to Free Preview (Section 1)
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/payment", {
                        state: {
                          courseId: activeCourseId,
                          category: categoryKey,
                          slug: courseSlug
                        }
                      })
                    }
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-black text-sm uppercase tracking-wider hover:bg-slate-800 dark:hover:bg-zinc-100 shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <LuSparkles className="w-4 h-4 text-amber-400 dark:text-amber-600" />
                    Unlock Full Access
                  </button>
                </div>
              </div>
            ) : (
              <div className="max-w-6xl mx-auto py-5 sm:py-8 px-3 sm:px-6 lg:px-8 space-y-5 sm:space-y-7">
                {/* Header Banner */}
                <header className="rounded-2xl border border-slate-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 p-4 sm:p-6 md:p-7 shadow-xs backdrop-blur-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                          Section {sectionData?.sectionNumber ?? sectionNumber ?? "--"}
                        </div>
                        {isSample && !isEnrolled && (
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                            Free Preview
                          </span>
                        )}
                      </div>

                      <h1 className="text-xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-snug">
                        {sectionData?.title || sectionData?.name || "Curriculum Collection"}
                      </h1>
                      {sectionData?.engTitle && (
                        <p className="text-sm sm:text-base text-slate-500 dark:text-zinc-400">
                          {sectionData.engTitle}
                        </p>
                      )}
                    </div>

                    {totalWords > 0 && (
                      <div className="flex items-center self-start sm:self-auto bg-slate-100 dark:bg-zinc-800/80 p-1 rounded-xl text-sm font-semibold text-slate-600 dark:text-zinc-300">
                        <span className="px-3 py-1 rounded-lg bg-white dark:bg-zinc-700/80 shadow-2xs">
                          {totalWords} Items Cataloged
                        </span>
                      </div>
                    )}
                  </div>
                </header>

                {/* Polymorphic Tabs Bar */}
                {tabs.length > 0 && (
                  <nav
                    aria-label="Module Content Navigation Tabs"
                    className="bg-slate-200/60 dark:bg-zinc-900/90 p-1.5 sm:p-2 rounded-2xl border border-slate-300/60 dark:border-zinc-800 backdrop-blur-md shadow-xs -mx-1 sm:mx-0"
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
                            className={`group relative flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-xl font-bold transition-all duration-200 shrink-0 select-none cursor-pointer touch-manipulation ${isActive
                              ? "bg-white text-slate-950 shadow-sm dark:bg-zinc-800 dark:text-white ring-1 ring-black/5 dark:ring-white/10"
                              : "text-slate-600 hover:text-slate-900 hover:bg-white/60 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/40"
                              }`}
                          >
                            <span className="text-sm sm:text-base tracking-tight">{tab.label}</span>
                            {tab.count !== undefined && !tab.isSingularObject && (
                              <span
                                className={`text-xs sm:text-sm font-bold px-2 py-0.5 rounded-full transition-colors leading-normal ${isActive
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
                )}

                {/* State Loaders */}
                {isLoading && (
                  <div className="flex flex-col justify-center items-center py-28 space-y-3">
                    <span className="loading loading-bars loading-lg text-slate-800 dark:text-white"></span>
                    <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">
                      Loading Section #{sectionNumber}...
                    </p>
                  </div>
                )}

                {isError && (
                  <div className="py-20 text-center text-rose-500 font-medium text-base">
                    Failed to load content for Section #{sectionNumber}...
                  </div>
                )}

                {!isLoading && !isError && (
                  <>
                    {/* TAB 1: VERBS */}
                    {activeTab === "verbs" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-start">
                        {currentTabItems.map((verbItem, index) => {
                          const isExpanded = expandedCard === index;
                          const forms = verbItem.verbForms || verbItem.forms || {};
                          const term = verbItem.term || verbItem.word;
                          const meaning = verbItem.meaning || verbItem.definition || verbItem.bengali;

                          return (
                            <div
                              key={term || index}
                              className={`group flex flex-col justify-between rounded-xl border bg-white dark:bg-zinc-900 transition-all ${isExpanded
                                ? "border-indigo-400 ring-2 ring-indigo-500/15 shadow-sm col-span-1 md:col-span-2"
                                : "border-slate-200/80 dark:border-zinc-800 shadow-2xs hover:border-slate-300 dark:hover:border-zinc-700"
                                }`}
                            >
                              <div className="p-3.5 sm:p-4">
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                                      {term}
                                    </h2>
                                    <p className="text-sm sm:text-base font-medium text-slate-600 dark:text-zinc-300 mt-0.5 leading-snug">
                                      {meaning}
                                    </p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleDetail(index);
                                    }}
                                    className={`text-sm font-semibold px-2.5 py-1 rounded-lg transition-colors shrink-0 cursor-pointer touch-manipulation ${isExpanded
                                      ? "bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/50 dark:text-rose-300"
                                      : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                                      }`}
                                  >
                                    {isExpanded ? "Close" : "Detail"}
                                  </button>
                                </div>

                                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-zinc-800/80 text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
                                  <span className="bg-slate-100 dark:bg-zinc-800/60 px-2 py-0.5 rounded">
                                    <strong className="text-slate-700 dark:text-zinc-300">V1:</strong>{" "}
                                    {forms.present || forms.base || "—"}
                                  </span>
                                  <span className="bg-slate-100 dark:bg-zinc-800/60 px-2 py-0.5 rounded">
                                    <strong className="text-slate-700 dark:text-zinc-300">V2:</strong>{" "}
                                    {forms.past || "—"}
                                  </span>
                                  <span className="bg-slate-100 dark:bg-zinc-800/60 px-2 py-0.5 rounded">
                                    <strong className="text-slate-700 dark:text-zinc-300">V3:</strong>{" "}
                                    {forms.pastParticiple || "—"}
                                  </span>
                                </div>
                              </div>

                              {isExpanded && (
                                <div className="border-t border-slate-100 dark:border-zinc-800/80 bg-slate-50/70 dark:bg-zinc-800/30 p-3.5 sm:p-5 rounded-b-xl space-y-4">
                                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-sm">
                                    <div className="bg-white dark:bg-zinc-900/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-zinc-800">
                                      <span className="text-xs uppercase font-bold text-slate-400 dark:text-zinc-500 block mb-0.5">
                                        Infinitive
                                      </span>
                                      <span className="font-semibold text-slate-800 dark:text-zinc-200">
                                        {forms.infinitive || "—"}
                                      </span>
                                    </div>
                                    <div className="bg-white dark:bg-zinc-900/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-zinc-800">
                                      <span className="text-xs uppercase font-bold text-slate-400 dark:text-zinc-500 block mb-0.5">
                                        Gerund
                                      </span>
                                      <span className="font-semibold text-slate-800 dark:text-zinc-200">
                                        {forms.gerund || forms.ing || "—"}
                                      </span>
                                    </div>
                                    <div className="bg-white dark:bg-zinc-900/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-zinc-800">
                                      <span className="text-xs uppercase font-bold text-slate-400 dark:text-zinc-500 block mb-0.5">
                                        Present
                                      </span>
                                      <span className="font-semibold text-slate-800 dark:text-zinc-200">
                                        {forms.present || "—"}
                                      </span>
                                    </div>
                                    <div className="bg-white dark:bg-zinc-900/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-zinc-800">
                                      <span className="text-xs uppercase font-bold text-slate-400 dark:text-zinc-500 block mb-0.5">
                                        Past (V2)
                                      </span>
                                      <span className="font-semibold text-slate-800 dark:text-zinc-200">
                                        {forms.past || "—"}
                                      </span>
                                    </div>
                                    <div className="bg-white dark:bg-zinc-900/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-zinc-800 col-span-2 sm:col-span-1">
                                      <span className="text-xs uppercase font-bold text-slate-400 dark:text-zinc-500 block mb-0.5">
                                        Participle (V3)
                                      </span>
                                      <span className="font-semibold text-slate-800 dark:text-zinc-200">
                                        {forms.pastParticiple || "—"}
                                      </span>
                                    </div>
                                  </div>

                                  {(verbItem.synonyms || verbItem.antonyms) && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                      {verbItem.synonyms && (
                                        <div className="p-2.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
                                          <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400 block mb-0.5">
                                            Synonyms
                                          </span>
                                          <span className="text-slate-700 dark:text-zinc-300 leading-snug">
                                            {renderSynAnt(verbItem.synonyms)}
                                          </span>
                                        </div>
                                      )}
                                      {verbItem.antonyms && (
                                        <div className="p-2.5 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30">
                                          <span className="text-xs font-bold uppercase text-rose-700 dark:text-rose-400 block mb-0.5">
                                            Antonyms
                                          </span>
                                          <span className="text-slate-700 dark:text-zinc-300 leading-snug">
                                            {renderSynAnt(verbItem.antonyms)}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {((verbItem.examples && verbItem.examples.length > 0) || verbItem.exampleSentence) && (
                                    <div className="space-y-2">
                                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                                        Contextual Sentences & Syntax Breakdown
                                      </h4>
                                      <div className="space-y-2">
                                        {(verbItem.examples || [verbItem.exampleSentence]).map((ex, i) => (
                                          <div
                                            key={i}
                                            className="p-3 bg-white dark:bg-zinc-900/80 rounded-lg border border-slate-200/60 dark:border-zinc-800 text-sm space-y-1"
                                          >
                                            <p className="font-semibold text-slate-900 dark:text-zinc-100">
                                              {ex.english}
                                            </p>
                                            <p className="text-slate-600 dark:text-zinc-400 font-medium">
                                              {ex.bengali || ex.bangla}
                                            </p>
                                            {ex.breakdown && (
                                              <p className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 pt-1 font-mono">
                                                {ex.breakdown}
                                              </p>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {verbItem.nativeUsageTip && (
                                    <div className="space-y-1.5 pt-1">
                                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                                        Native Usage Tips
                                      </h4>
                                      <ul className="space-y-1">
                                        {(Array.isArray(verbItem.nativeUsageTip)
                                          ? verbItem.nativeUsageTip
                                          : [verbItem.nativeUsageTip]
                                        ).map((tip, idx) => (
                                          <li
                                            key={idx}
                                            className="text-sm text-slate-700 dark:text-zinc-300 flex items-start gap-1.5"
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

                    {/* TAB 2: NOUNS, ADJECTIVES, ADVERBS, COLLOCATIONS, PHRASES */}
                    {["nouns", "adjectives", "adverbs", "collocations", "phrases"].includes(activeTab) && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 items-stretch">
                        {currentTabItems.map((item, index) => {
                          const isExpanded = expandedCard === index;
                          const term = item.term || item.phrase || item.collocation || item.word;
                          const meaning = item.meaning || item.definition || item.bengali;
                          const hasDetail =
                            item.example ||
                            item.exampleSentence ||
                            item.explanation ||
                            item.examples ||
                            item.collocations ||
                            item.synonyms ||
                            item.antonyms;

                          return (
                            <div
                              key={term || index}
                              className={`group flex flex-col justify-between rounded-xl border bg-white dark:bg-zinc-900 transition-all ${isExpanded
                                ? "border-indigo-400 ring-2 ring-indigo-500/15 shadow-sm col-span-1 sm:col-span-2 lg:col-span-3"
                                : "h-full border-slate-200/80 dark:border-zinc-800 shadow-2xs hover:border-slate-300 dark:hover:border-zinc-700"
                                }`}
                            >
                              <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1">
                                <div>
                                  <div className="flex items-start justify-between gap-2">
                                    <h2 className="text-base sm:text-lg font-bold capitalize text-slate-900 dark:text-white truncate">
                                      {term}
                                    </h2>
                                    {hasDetail && (
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleDetail(index);
                                        }}
                                        className={`text-sm font-semibold px-2.5 py-1 rounded-lg transition-colors shrink-0 cursor-pointer touch-manipulation ${isExpanded
                                          ? "bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/50 dark:text-rose-300"
                                          : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                                          }`}
                                      >
                                        {isExpanded ? "Close" : "Detail"}
                                      </button>
                                    )}
                                  </div>

                                  <div className="mt-1 min-h-[2.75rem]">
                                    <p
                                      className={`text-sm font-medium text-slate-600 dark:text-zinc-300 leading-snug ${isExpanded ? "" : "line-clamp-2"
                                        }`}
                                    >
                                      {meaning}
                                    </p>
                                  </div>
                                </div>

                                {item.explanation && !isExpanded && (
                                  <p className="text-xs sm:text-sm text-slate-400 dark:text-zinc-500 mt-2 line-clamp-2 border-t border-slate-100 dark:border-zinc-800/60 pt-2">
                                    {item.explanation}
                                  </p>
                                )}
                              </div>

                              {isExpanded && (
                                <div className="border-t border-slate-100 dark:border-zinc-800/80 bg-slate-50/70 dark:bg-zinc-800/30 p-3.5 sm:p-4 rounded-b-xl space-y-3 text-sm">
                                  {item.explanation && (
                                    <div className="p-3 bg-white dark:bg-zinc-900/80 rounded-lg border border-slate-200/60 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 leading-relaxed">
                                      <span className="font-semibold text-slate-900 dark:text-zinc-100 block mb-1">
                                        Concept & Usage Note:
                                      </span>
                                      {item.explanation}
                                    </div>
                                  )}

                                  {(item.synonyms || item.antonyms) && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                      {item.synonyms && (
                                        <div className="p-2.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
                                          <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400 block mb-0.5">
                                            Synonyms
                                          </span>
                                          <span className="text-slate-700 dark:text-zinc-300 leading-snug">
                                            {renderSynAnt(item.synonyms)}
                                          </span>
                                        </div>
                                      )}
                                      {item.antonyms && (
                                        <div className="p-2.5 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30">
                                          <span className="text-xs font-bold uppercase text-rose-700 dark:text-rose-400 block mb-0.5">
                                            Antonyms
                                          </span>
                                          <span className="text-slate-700 dark:text-zinc-300 leading-snug">
                                            {renderSynAnt(item.antonyms)}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {(item.example || item.exampleSentence) && (
                                    <div className="p-3 bg-white dark:bg-zinc-900/80 rounded-lg border border-slate-200/60 dark:border-zinc-800 space-y-1">
                                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block mb-1">
                                        Example Sentence
                                      </span>
                                      <p className="font-semibold text-slate-900 dark:text-zinc-100">
                                        {item.example?.english ||
                                          item.exampleSentence?.english ||
                                          (typeof item.example === "string" ? item.example : "")}
                                      </p>
                                      {(item.example?.bengali ||
                                        item.exampleSentence?.bangla ||
                                        item.exampleSentence?.bengali) && (
                                          <p className="text-slate-600 dark:text-zinc-400 font-medium">
                                            {item.example?.bengali ||
                                              item.exampleSentence?.bangla ||
                                              item.exampleSentence?.bengali}
                                          </p>
                                        )}
                                      {item.example?.breakdown && (
                                        <p className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 pt-1 font-mono">
                                          {item.example.breakdown}
                                        </p>
                                      )}
                                    </div>
                                  )}

                                  {Array.isArray(item.examples) && item.examples.length > 0 && (
                                    <div className="space-y-2">
                                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">
                                        Target Examples
                                      </span>
                                      {item.examples.map((ex, i) => (
                                        <div
                                          key={i}
                                          className="p-2.5 bg-white dark:bg-zinc-900/80 rounded-lg border border-slate-200/60 dark:border-zinc-800 text-sm space-y-0.5"
                                        >
                                          <p className="font-semibold text-slate-900 dark:text-zinc-100">
                                            {ex.english || (typeof ex === "string" ? ex : "")}
                                          </p>
                                          {(ex.bengali || ex.bangla) && (
                                            <p className="text-slate-600 dark:text-zinc-400">
                                              {ex.bengali || ex.bangla}
                                            </p>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* TAB 3: PRACTICE */}
                    {activeTab === "practice" && (
                      <div className="space-y-6 sm:space-y-8">
                        {currentTabItems.length > 0 && (
                          <div className="space-y-4">
                            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                              <span>Sentence Pattern Formulations</span>
                              <span className="text-sm font-normal text-slate-400 dark:text-zinc-500">
                                ({currentTabItems.length} core patterns)
                              </span>
                            </h3>

                            <div className="grid grid-cols-1 gap-3.5 sm:gap-4">
                              {currentTabItems.map((practice, index) => (
                                <div
                                  key={practice.topic || index}
                                  className="rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-5 shadow-2xs space-y-3"
                                >
                                  <h4 className="text-base sm:text-lg font-bold text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-zinc-800 pb-2">
                                    {practice.topic || practice.title}
                                  </h4>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-sm">
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
                                            className={`inline-block self-start px-2 py-0.5 rounded text-xs font-bold ${label.bg}`}
                                          >
                                            {label.title}
                                          </span>
                                          <div>
                                            <p className="font-semibold text-slate-900 dark:text-zinc-100 mt-1">
                                              {sent.english || sent}
                                            </p>
                                            {sent.bengali && (
                                              <p className="text-slate-600 dark:text-zinc-400 mt-0.5">
                                                {sent.bengali}
                                              </p>
                                            )}
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
                      </div>
                    )}

                    {/* TAB 4: READING PASSAGE */}
                    {activeTab === "passage" && (
                      <div className="space-y-6">
                        {sectionData?.readingPassage && (
                          <div className="rounded-2xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-6 md:p-7 shadow-xs space-y-4">
                            <div className="border-b border-slate-100 dark:border-zinc-800 pb-3">
                              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                                Comprehension Passage
                              </span>
                              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                                {sectionData.readingPassage.title}
                              </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-base sm:text-lg leading-relaxed">
                              <div className="p-4 bg-slate-50/70 dark:bg-zinc-800/30 rounded-xl border border-slate-200/60 dark:border-zinc-800/80 space-y-3 whitespace-pre-line text-slate-800 dark:text-zinc-200">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">
                                  English Original
                                </span>
                                {sectionData.readingPassage.englishText || sectionData.readingPassage.english}
                              </div>

                              <div className="p-4 bg-slate-50/70 dark:bg-zinc-800/30 rounded-xl border border-slate-200/60 dark:border-zinc-800/80 space-y-3 whitespace-pre-line text-slate-700 dark:text-zinc-300">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">
                                  বাংলা অনুবাদ
                                </span>
                                {sectionData.readingPassage.bengaliTranslation || sectionData.readingPassage.bengali}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </main>
        </div>

        {/* Floating Action Button for Mobile Screens */}
        <div className="fixed bottom-5 left-5 z-30 lg:hidden">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2.5 px-4.5 py-3 rounded-full bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold text-sm shadow-2xl border border-slate-700 dark:border-zinc-300 active:scale-95 transition-all cursor-pointer touch-manipulation"
          >
            <span className="text-base">☰</span>
            <span>All Modules</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default DynamicSectionDetail;