

// import React, { useState, useEffect, useRef, useMemo } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router';
// import useAxiosSecure from '../Hooks/useAxiosSecure';
// import { dropdownData, findCategoryById } from './DropDownItems';
// import Swal from 'sweetalert2';

// // Security Helper: Strip dangerous prototype pollution keys
// const safeJsonParse = (str) => {
//     return JSON.parse(str, (key, value) => {
//         if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
//             return undefined;
//         }
//         return value;
//     });
// };

// // Security Helper: Sanitize identifiers to prevent path traversal
// const sanitizeId = (id) => String(id).replace(/[^a-zA-Z0-9_-]/g, '');

// function findCategoryByEditApi(tree, pathname) {
//     for (const item of tree) {
//         if (item.editApi && pathname.includes(item.editApi)) {
//             return item;
//         }
//         if (item.children) {
//             const found = findCategoryByEditApi(item.children, pathname);
//             if (found) return found;
//         }
//     }
//     return null;
// }

// export default function SectionEditor() {
//     const params = useParams();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const axiosSecure = useAxiosSecure();

//     const rawActiveId = Object.values(params)[0];
//     const isCreatingNew = rawActiveId === 'new';
//     const cleanActiveId = isCreatingNew ? 'new' : sanitizeId(rawActiveId);

//     // 1. Secure Category Lookup (Never trusting arbitrary URLs from storage)
//     const activeCategory = useMemo(() => {
//         if (location.state?.activeCategory) {
//             return location.state.activeCategory;
//         }
//         const matchedByPath = findCategoryByEditApi(dropdownData, location.pathname);
//         if (matchedByPath) return matchedByPath;

//         const savedId = localStorage.getItem('admin_active_category_id');
//         if (savedId) {
//             const verified = findCategoryById(dropdownData, savedId);
//             if (verified) return verified;
//         }
//         return null;
//     }, [location]);

//     // 2. Safe API base
//     // Resolve the backend API endpoint
//     // Purely dynamic - matches the exact backend route from editApi
//     const apiBase = useMemo(() => {
//         if (activeCategory?.editApi) {
//             return activeCategory.editApi;
//         }
//         // Fallback: strips trailing '/:id' or '/new' from the URL bar
//         return location.pathname.replace(/\/(new|[^/]+)$/, '');
//     }, [activeCategory, location.pathname]);

//     const textareaRef = useRef(null);
//     const [rawJsonText, setRawJsonText] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [saving, setSaving] = useState(false);
//     const [deleting, setDeleting] = useState(false);
//     const [status, setStatus] = useState({ message: '', error: false });

//     const [searchTerm, setSearchTerm] = useState('');
//     const [matches, setMatches] = useState([]);
//     const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);

//     const newDocumentTemplate = useMemo(() => {
//         return JSON.stringify(
//             {
//                 id: 1,
//                 title: `New ${activeCategory?.title || 'Item'} Title`,
//                 content: []
//             },
//             null,
//             2
//         );
//     }, [activeCategory]);

//     useEffect(() => {
//         if (!cleanActiveId) return;

//         if (isCreatingNew) {
//             setRawJsonText(newDocumentTemplate);
//             return;
//         }

//         const fetchDocumentData = async () => {
//             setLoading(true);
//             setStatus({ message: '', error: false });

//             try {
//                 const response = await axiosSecure.get(`${apiBase}/${cleanActiveId}`);
//                 setRawJsonText(JSON.stringify(response.data, null, 2));
//             } catch (err) {
//                 setStatus({
//                     message: String(err.response?.data?.message || err.message || 'Failed to fetch document data.'),
//                     error: true,
//                 });
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchDocumentData();
//     }, [cleanActiveId, apiBase, axiosSecure, isCreatingNew, newDocumentTemplate]);

//     // Search helper
//     const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

//     const scanMatches = (term, text) => {
//         if (!term.trim()) {
//             setMatches([]);
//             setCurrentMatchIndex(-1);
//             return [];
//         }

//         try {
//             const regex = new RegExp(escapeRegExp(term), 'gi');
//             const found = [];
//             let match;

//             while ((match = regex.exec(text)) !== null) {
//                 found.push({ start: match.index, end: match.index + term.length });
//             }

//             setMatches(found);
//             return found;
//         } catch {
//             setMatches([]);
//             return [];
//         }
//     };

//     const handleSearchChange = (e) => {
//         const term = e.target.value;
//         setSearchTerm(term);
//         const found = scanMatches(term, rawJsonText);
//         setCurrentMatchIndex(found.length > 0 ? 0 : -1);
//     };

//     const jumpToMatch = (index, matchArray = matches) => {
//         if (matchArray.length === 0 || !textareaRef.current) return;

//         const target = matchArray[index];
//         const textarea = textareaRef.current;

//         textarea.focus();
//         textarea.setSelectionRange(target.start, target.end);

//         const lineHeight = 21;
//         const linesBefore = rawJsonText.substring(0, target.start).split('\n').length;
//         textarea.scrollTop = Math.max(0, (linesBefore - 5) * lineHeight);
//     };

//     const handleNextMatch = () => {
//         if (matches.length === 0) {
//             const found = scanMatches(searchTerm, rawJsonText);
//             if (found.length > 0) {
//                 setCurrentMatchIndex(0);
//                 jumpToMatch(0, found);
//             }
//             return;
//         }

//         const nextIndex = (currentMatchIndex + 1) % matches.length;
//         setCurrentMatchIndex(nextIndex);
//         jumpToMatch(nextIndex);
//     };

//     const handlePrevMatch = () => {
//         if (matches.length === 0) return;
//         const prevIndex = (currentMatchIndex - 1 + matches.length) % matches.length;
//         setCurrentMatchIndex(prevIndex);
//         jumpToMatch(prevIndex);
//     };

//     // Safe Save
//     const handleSaveToDatabase = async () => {
//         setSaving(true);
//         setStatus({ message: '', error: false });

//         try {
//             if (!rawJsonText.trim()) {
//                 throw new Error('Content cannot be empty.');
//             }

//             let parsedPayload;
//             try {
//                 parsedPayload = safeJsonParse(rawJsonText);
//             } catch (parseErr) {
//                 throw new Error(`Invalid JSON syntax: ${parseErr.message}`);
//             }

//             let targetId = cleanActiveId;
//             if (isCreatingNew) {
//                 const rawKey =
//                     parsedPayload.courseId ??
//                     parsedPayload.sectionNumber ??
//                     parsedPayload.code ??
//                     parsedPayload.theme?.code ??
//                     parsedPayload.id;

//                 targetId = sanitizeId(rawKey);

//                 if (!targetId || targetId === 'undefined') {
//                     throw new Error('Please specify a valid identifier (e.g. "courseId", "sectionNumber", or "code") in your JSON.');
//                 }
//             }

//             const saveEndpoint = `${apiBase}/${targetId}`;
//             const method = isCreatingNew ? 'post' : 'put';
//             const response = await axiosSecure[method](saveEndpoint, parsedPayload);

//             // Success Alert & direct return
//             await Swal.fire({
//                 icon: 'success',
//                 title: isCreatingNew ? 'Created Successfully!' : 'Saved Successfully!',
//                 text: response.data?.message || 'Document saved to database successfully.',
//                 timer: 1500,
//                 showConfirmButton: false,
//             });

//             // Navigate back directly to DocumentManager
//             navigate(-1);

//         } catch (err) {
//             const statusCode = err.response?.status;
//             const backendMsg = err.response?.data?.message || err.message || 'Failed to save document.';

//             if (statusCode === 409) {
//                 Swal.fire({
//                     icon: 'warning',
//                     title: 'Duplicate Identifier!',
//                     text: backendMsg,
//                     confirmButtonText: 'Change Identifier',
//                     confirmButtonColor: '#0284c7',
//                 });
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Save Failed',
//                     text: backendMsg,
//                     confirmButtonColor: '#ef4444',
//                 });
//             }

//             setStatus({ message: '', error: false });
//         } finally {
//             setSaving(false);
//         }
//     };

//     // Safe Delete
//     const handleDeleteDocument = async () => {
//         const result = await Swal.fire({
//             title: `Delete full document ${cleanActiveId}?`,
//             text: "This action cannot be undone!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#ef4444',
//             cancelButtonColor: '#64748b',
//             confirmButtonText: 'Yes, delete it!',
//             cancelButtonText: 'Cancel',
//             reverseButtons: true,
//         });

//         if (!result.isConfirmed) return;

//         setDeleting(true);
//         setStatus({ message: '', error: false });

//         try {
//             const response = await axiosSecure.delete(`${apiBase}/${cleanActiveId}`);

//             await Swal.fire({
//                 icon: 'success',
//                 title: 'Deleted!',
//                 text: String(response.data?.message || 'Document deleted successfully.'),
//                 timer: 1500,
//                 showConfirmButton: false,
//             });

//             navigate(-1);
//         } catch (err) {
//             const errorMsg = String(err.response?.data?.message || err.message || 'Error deleting document.');

//             setStatus({
//                 message: errorMsg,
//                 error: true,
//             });

//             Swal.fire({
//                 icon: 'error',
//                 title: 'Delete Failed',
//                 text: errorMsg,
//             });

//             setDeleting(false);
//         }
//     };

//     const itemHeaderTitle = activeCategory?.title || 'Editor';

//     return (
//         <div style={{ padding: '24px', fontFamily: 'sans-serif', width: '100%', boxSizing: 'border-box' }}>
//             {/* Header */}
//             <div
//                 style={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     marginBottom: '16px',
//                     borderBottom: '1px solid #e2e8f0',
//                     paddingBottom: '14px',
//                 }}
//             >
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                     <button
//                         type="button"
//                         onClick={() => {
//                             if (activeCategory?.id) {
//                                 localStorage.setItem('admin_active_category_id', String(activeCategory.id));
//                             }
//                             navigate(-1);
//                         }}
//                         style={{
//                             padding: '6px 12px',
//                             border: '1px solid #cbd5e1',
//                             borderRadius: '6px',
//                             backgroundColor: '#f8fafc',
//                             cursor: 'pointer',
//                             fontSize: '13px',
//                             color: '#334155',
//                         }}
//                     >
//                         ← Back
//                     </button>
//                     <h2 style={{ margin: 0, color: '#0f172a' }}>
//                         {itemHeaderTitle} — {isCreatingNew ? 'New Document' : `Item #${cleanActiveId}`}
//                     </h2>
//                 </div>

//                 {/* Action Buttons */}
//                 <div style={{ display: 'flex', gap: '10px' }}>
//                     {!isCreatingNew && (
//                         <button
//                             type="button"
//                             onClick={handleDeleteDocument}
//                             disabled={deleting || loading}
//                             style={{
//                                 padding: '9px 18px',
//                                 backgroundColor: deleting ? '#fca5a5' : '#ef4444',
//                                 color: '#ffffff',
//                                 fontWeight: 600,
//                                 border: 'none',
//                                 borderRadius: '6px',
//                                 cursor: deleting || loading ? 'not-allowed' : 'pointer',
//                             }}
//                         >
//                             {deleting ? 'Deleting...' : 'Delete Document'}
//                         </button>
//                     )}

//                     <button
//                         type="button"
//                         onClick={handleSaveToDatabase}
//                         disabled={saving || loading}
//                         style={{
//                             padding: '9px 18px',
//                             backgroundColor: saving ? '#86efac' : '#16a34a',
//                             color: '#ffffff',
//                             fontWeight: 600,
//                             border: 'none',
//                             borderRadius: '6px',
//                             cursor: saving || loading ? 'not-allowed' : 'pointer',
//                         }}
//                     >
//                         {saving ? 'Saving...' : isCreatingNew ? 'Create & Save' : 'Save to Database'}
//                     </button>
//                 </div>
//             </div>

//             {/* Search Bar */}
//             <div
//                 style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '8px',
//                     padding: '10px 14px',
//                     backgroundColor: '#f8fafc',
//                     border: '1px solid #e2e8f0',
//                     borderRadius: '8px',
//                     marginBottom: '14px',
//                 }}
//             >
//                 <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Find:</span>
//                 <input
//                     type="text"
//                     value={searchTerm}
//                     placeholder="Type full word and press Enter..."
//                     onChange={handleSearchChange}
//                     onKeyDown={(e) => {
//                         if (e.key === 'Enter') {
//                             e.preventDefault();
//                             handleNextMatch();
//                         }
//                     }}
//                     style={{
//                         padding: '6px 10px',
//                         fontSize: '13px',
//                         border: '1px solid #cbd5e1',
//                         borderRadius: '4px',
//                         width: '240px',
//                         outline: 'none',
//                         backgroundColor: '#ffffff',
//                     }}
//                 />

//                 <button
//                     type="button"
//                     onClick={handleNextMatch}
//                     disabled={!searchTerm.trim()}
//                     style={{
//                         padding: '6px 12px',
//                         fontSize: '12px',
//                         border: '1px solid #cbd5e1',
//                         borderRadius: '4px',
//                         backgroundColor: '#ffffff',
//                         cursor: searchTerm.trim() ? 'pointer' : 'default',
//                         color: searchTerm.trim() ? '#0284c7' : '#94a3b8',
//                         fontWeight: 600,
//                     }}
//                 >
//                     Find / Next (Enter)
//                 </button>

//                 <button
//                     type="button"
//                     onClick={handlePrevMatch}
//                     disabled={matches.length === 0}
//                     style={{
//                         padding: '6px 10px',
//                         fontSize: '12px',
//                         border: '1px solid #cbd5e1',
//                         borderRadius: '4px',
//                         backgroundColor: '#ffffff',
//                         cursor: matches.length > 0 ? 'pointer' : 'default',
//                         color: matches.length > 0 ? '#1e293b' : '#94a3b8',
//                     }}
//                 >
//                     ▲ Prev
//                 </button>

//                 <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '6px' }}>
//                     {matches.length > 0
//                         ? `${currentMatchIndex + 1} of ${matches.length} found`
//                         : searchTerm.trim()
//                             ? 'No matches'
//                             : ''}
//                 </span>
//             </div>

//             {/* Alerts */}
//             {status.message && (
//                 <div
//                     style={{
//                         padding: '10px 14px',
//                         marginBottom: '14px',
//                         borderRadius: '6px',
//                         backgroundColor: status.error ? '#fee2e2' : '#dcfce7',
//                         color: status.error ? '#991b1b' : '#166534',
//                         fontSize: '14px',
//                     }}
//                 >
//                     {status.message}
//                 </div>
//             )}

//             {/* Textarea */}
//             {loading ? (
//                 <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
//                     Loading document data...
//                 </div>
//             ) : (
//                 <textarea
//                     ref={textareaRef}
//                     value={rawJsonText}
//                     onChange={(e) => {
//                         const nextText = e.target.value;
//                         setRawJsonText(nextText);
//                         if (searchTerm.trim()) {
//                             scanMatches(searchTerm, nextText);
//                         }
//                     }}
//                     spellCheck={false}
//                     style={{
//                         width: '100%',
//                         height: '70vh',
//                         padding: '16px',
//                         fontFamily: 'monospace',
//                         fontSize: '14px',
//                         lineHeight: '1.5',
//                         backgroundColor: '#ffffff',
//                         color: '#1e293b',
//                         borderRadius: '8px',
//                         border: '1px solid #cbd5e1',
//                         outline: 'none',
//                         boxSizing: 'border-box',
//                         resize: 'vertical',
//                         whiteSpace: 'pre',
//                         boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.04)',
//                     }}
//                 />
//             )}
//         </div>
//     );
// }


import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { dropdownData, findCategoryById } from './DropDownItems';
import Swal from 'sweetalert2';

const safeJsonParse = (str) => {
    return JSON.parse(str, (key, value) => {
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
            return undefined;
        }
        return value;
    });
};

const sanitizeId = (id) => String(id || '').replace(/[^a-zA-Z0-9_-]/g, '').trim();

export default function SectionEditor() {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const rawActiveId = Object.values(params)[0];
    const isCreatingNew = rawActiveId === 'new';
    const cleanActiveId = isCreatingNew ? 'new' : sanitizeId(rawActiveId);

    const activeCategory = useMemo(() => {
        if (location.state?.activeCategory) {
            return location.state.activeCategory;
        }
        const savedId = localStorage.getItem('admin_active_category_id');
        if (savedId) {
            const verified = findCategoryById(dropdownData, savedId);
            if (verified) return verified;
        }
        return dropdownData[0];
    }, [location]);

    const isCourseCategory = Boolean(
        activeCategory?.isCourseCollection ||
        activeCategory?.editApi === '/all-courses-edit' ||
        location.pathname.includes('all-courses-edit')
    );

    const apiBase = useMemo(() => {
        if (activeCategory?.editApi) return activeCategory.editApi;
        return isCourseCategory ? '/all-courses-edit' : '/english-vocab-details';
    }, [activeCategory, isCourseCategory]);

    const textareaRef = useRef(null);
    const [rawJsonText, setRawJsonText] = useState('');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [status, setStatus] = useState({ message: '', error: false });

    const [searchTerm, setSearchTerm] = useState('');
    const [matches, setMatches] = useState([]);
    const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);

    const newDocumentTemplate = useMemo(() => {
        if (isCourseCategory) {
            return JSON.stringify(
                {
                    courseId: 'CRS_NEW_SAMPLE',
                    title: 'Course Title',
                    slug: 'course-title-slug',
                    category: activeCategory?.filterQuery?.category || 'overall-courses',
                    track: activeCategory?.filterQuery?.track || 'GLOBAL PATHWAY',
                    badge: 'MENTORSHIP',
                    icon: '📚',
                    description: 'Course summary description...',
                    features: ['Feature 1', 'Feature 2'],
                    price: 0,
                    currency: 'BDT',
                    isPaid: false,
                    isActive: true,
                    routePath: '/courses/sample-course',
                },
                null,
                2
            );
        }

        return JSON.stringify(
            {
                courseId: activeCategory?.courseId || 'everyday-conversational-english',
                sectionNumber: 1,
                title: `New Section Title`,
                verbs: [],
                nouns: [],
                adjectives: [],
                adverbs: [],
            },
            null,
            2
        );
    }, [activeCategory, isCourseCategory]);

    useEffect(() => {
        if (!cleanActiveId) return;

        if (isCreatingNew) {
            setRawJsonText(newDocumentTemplate);
            return;
        }

        const fetchDocumentData = async () => {
            setLoading(true);
            setStatus({ message: '', error: false });

            try {
                const config = !isCourseCategory && activeCategory?.courseId
                    ? { params: { courseId: activeCategory.courseId } }
                    : {};

                const response = await axiosSecure.get(`${apiBase}/${cleanActiveId}`, config);
                setRawJsonText(JSON.stringify(response.data, null, 2));
            } catch (err) {
                setStatus({
                    message: String(err.response?.data?.message || err.message || 'Failed to fetch document data.'),
                    error: true,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchDocumentData();
    }, [cleanActiveId, apiBase, axiosSecure, isCreatingNew, newDocumentTemplate, activeCategory, isCourseCategory]);

    const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const scanMatches = (term, text) => {
        if (!term.trim()) {
            setMatches([]);
            setCurrentMatchIndex(-1);
            return [];
        }

        try {
            const regex = new RegExp(escapeRegExp(term), 'gi');
            const found = [];
            let match;
            while ((match = regex.exec(text)) !== null) {
                found.push({ start: match.index, end: match.index + term.length });
            }
            setMatches(found);
            return found;
        } catch {
            setMatches([]);
            return [];
        }
    };

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const found = scanMatches(term, rawJsonText);
        setCurrentMatchIndex(found.length > 0 ? 0 : -1);
    };

    const jumpToMatch = (index, matchArray = matches) => {
        if (matchArray.length === 0 || !textareaRef.current) return;
        const target = matchArray[index];
        const textarea = textareaRef.current;
        textarea.focus();
        textarea.setSelectionRange(target.start, target.end);
        const lineHeight = 21;
        const linesBefore = rawJsonText.substring(0, target.start).split('\n').length;
        textarea.scrollTop = Math.max(0, (linesBefore - 5) * lineHeight);
    };

    const handleNextMatch = () => {
        if (matches.length === 0) {
            const found = scanMatches(searchTerm, rawJsonText);
            if (found.length > 0) {
                setCurrentMatchIndex(0);
                jumpToMatch(0, found);
            }
            return;
        }
        const nextIndex = (currentMatchIndex + 1) % matches.length;
        setCurrentMatchIndex(nextIndex);
        jumpToMatch(nextIndex);
    };

    const handlePrevMatch = () => {
        if (matches.length === 0) return;
        const prevIndex = (currentMatchIndex - 1 + matches.length) % matches.length;
        setCurrentMatchIndex(prevIndex);
        jumpToMatch(prevIndex);
    };

    const handleSaveToDatabase = async () => {
        setSaving(true);
        setStatus({ message: '', error: false });

        try {
            if (!rawJsonText.trim()) {
                throw new Error('Content cannot be empty.');
            }

            let parsedPayload;
            try {
                parsedPayload = safeJsonParse(rawJsonText);
            } catch (parseErr) {
                throw new Error(`Invalid JSON syntax: ${parseErr.message}`);
            }

            let targetId = cleanActiveId;

            if (isCourseCategory) {
                const rawKey = parsedPayload.courseId ?? parsedPayload.id;
                if (isCreatingNew) {
                    targetId = sanitizeId(rawKey);
                    if (!targetId) {
                        throw new Error('Please specify a valid "courseId" in your Course JSON.');
                    }
                }
            } else {
                if (activeCategory?.courseId && !parsedPayload.courseId) {
                    parsedPayload.courseId = activeCategory.courseId;
                }
                if (isCreatingNew) {
                    const rawKey = parsedPayload.sectionNumber ?? parsedPayload.id;
                    targetId = sanitizeId(rawKey);
                    if (!targetId) {
                        throw new Error('Please specify a valid numeric "sectionNumber" in your Section JSON.');
                    }
                }
            }

            const config = !isCourseCategory && activeCategory?.courseId
                ? { params: { courseId: activeCategory.courseId } }
                : {};

            const saveEndpoint = `${apiBase}/${targetId}`;
            const method = isCreatingNew ? 'post' : 'put';
            const response = await axiosSecure[method](saveEndpoint, parsedPayload, config);

            await Swal.fire({
                icon: 'success',
                title: isCreatingNew ? 'Created Successfully!' : 'Saved Successfully!',
                text: response.data?.message || 'Document saved to database.',
                timer: 1500,
                showConfirmButton: false,
            });

            navigate(-1);
        } catch (err) {
            const statusCode = err.response?.status;
            const backendMsg = err.response?.data?.message || err.message || 'Failed to save document.';

            if (statusCode === 409) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Duplicate Identifier!',
                    text: backendMsg,
                    confirmButtonText: 'Change Identifier',
                    confirmButtonColor: '#0284c7',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Save Failed',
                    text: backendMsg,
                    confirmButtonColor: '#ef4444',
                });
            }
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteDocument = async () => {
        const result = await Swal.fire({
            title: `Delete ${isCourseCategory ? 'Course' : 'Section'} "${cleanActiveId}"?`,
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        });

        if (!result.isConfirmed) return;

        setDeleting(true);
        setStatus({ message: '', error: false });

        try {
            if (isCourseCategory) {
                await axiosSecure.delete(`/all-courses/${cleanActiveId}`);
            } else {
                const deleteConfig = activeCategory?.courseId
                    ? { params: { courseId: activeCategory.courseId } }
                    : {};
                await axiosSecure.delete(`${apiBase}/${cleanActiveId}`, deleteConfig);
            }

            await Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Document deleted successfully.',
                timer: 1500,
                showConfirmButton: false,
            });

            navigate(-1);
        } catch (err) {
            const errorMsg = String(err.response?.data?.message || err.message || 'Error deleting document.');
            setStatus({ message: errorMsg, error: true });
            Swal.fire({ icon: 'error', title: 'Delete Failed', text: errorMsg });
            setDeleting(false);
        }
    };

    return (
        <div style={{ padding: '24px', fontFamily: 'sans-serif', width: '100%', boxSizing: 'border-box' }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                    borderBottom: '1px solid #e2e8f0',
                    paddingBottom: '14px',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        style={{
                            padding: '6px 12px',
                            border: '1px solid #cbd5e1',
                            borderRadius: '6px',
                            backgroundColor: '#f8fafc',
                            cursor: 'pointer',
                            fontSize: '13px',
                            color: '#334155',
                        }}
                    >
                        ← Back
                    </button>
                    <h2 style={{ margin: 0, color: '#0f172a' }}>
                        {activeCategory?.title || 'Editor'} — {isCreatingNew ? 'New Document' : `#${cleanActiveId}`}
                    </h2>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    {!isCreatingNew && (
                        <button
                            type="button"
                            onClick={handleDeleteDocument}
                            disabled={deleting || loading}
                            style={{
                                padding: '9px 18px',
                                backgroundColor: deleting ? '#fca5a5' : '#ef4444',
                                color: '#ffffff',
                                fontWeight: 600,
                                border: 'none',
                                borderRadius: '6px',
                                cursor: deleting || loading ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {deleting ? 'Deleting...' : 'Delete Document'}
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={handleSaveToDatabase}
                        disabled={saving || loading}
                        style={{
                            padding: '9px 18px',
                            backgroundColor: saving ? '#86efac' : '#16a34a',
                            color: '#ffffff',
                            fontWeight: 600,
                            border: 'none',
                            borderRadius: '6px',
                            cursor: saving || loading ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {saving ? 'Saving...' : isCreatingNew ? 'Create & Save' : 'Save to Database'}
                    </button>
                </div>
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 14px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    marginBottom: '14px',
                }}
            >
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Find:</span>
                <input
                    type="text"
                    value={searchTerm}
                    placeholder="Type full word and press Enter..."
                    onChange={handleSearchChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleNextMatch();
                        }
                    }}
                    style={{
                        padding: '6px 10px',
                        fontSize: '13px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '4px',
                        width: '240px',
                        outline: 'none',
                        backgroundColor: '#ffffff',
                    }}
                />

                <button
                    type="button"
                    onClick={handleNextMatch}
                    disabled={!searchTerm.trim()}
                    style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '4px',
                        backgroundColor: '#ffffff',
                        cursor: searchTerm.trim() ? 'pointer' : 'default',
                        color: searchTerm.trim() ? '#0284c7' : '#94a3b8',
                        fontWeight: 600,
                    }}
                >
                    Find / Next (Enter)
                </button>

                <button
                    type="button"
                    onClick={handlePrevMatch}
                    disabled={matches.length === 0}
                    style={{
                        padding: '6px 10px',
                        fontSize: '12px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '4px',
                        backgroundColor: '#ffffff',
                        cursor: matches.length > 0 ? 'pointer' : 'default',
                        color: matches.length > 0 ? '#1e293b' : '#94a3b8',
                    }}
                >
                    ▲ Prev
                </button>

                <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '6px' }}>
                    {matches.length > 0
                        ? `${currentMatchIndex + 1} of ${matches.length} found`
                        : searchTerm.trim()
                            ? 'No matches'
                            : ''}
                </span>
            </div>

            {status.message && (
                <div
                    style={{
                        padding: '10px 14px',
                        marginBottom: '14px',
                        borderRadius: '6px',
                        backgroundColor: status.error ? '#fee2e2' : '#dcfce7',
                        color: status.error ? '#991b1b' : '#166534',
                        fontSize: '14px',
                    }}
                >
                    {status.message}
                </div>
            )}

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    Loading document data...
                </div>
            ) : (
                <textarea
                    ref={textareaRef}
                    value={rawJsonText}
                    onChange={(e) => {
                        const nextText = e.target.value;
                        setRawJsonText(nextText);
                        if (searchTerm.trim()) {
                            scanMatches(searchTerm, nextText);
                        }
                    }}
                    spellCheck={false}
                    style={{
                        width: '100%',
                        height: '70vh',
                        padding: '16px',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        backgroundColor: '#ffffff',
                        color: '#1e293b',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        outline: 'none',
                        boxSizing: 'border-box',
                        resize: 'vertical',
                        whiteSpace: 'pre',
                        boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.04)',
                    }}
                />
            )}
        </div>
    );
}


