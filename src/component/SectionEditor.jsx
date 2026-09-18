// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router';
// import useAxiosSecure from '../Hooks/useAxiosSecure';

// export default function SectionEditor() {
//     const { sectionNumber, code } = useParams();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const axiosSecure = useAxiosSecure();

//     const activeId = sectionNumber || code;
//     const isCreatingNew = activeId === 'new';

//     const isExtra = location.pathname.includes('extra-section-edit');

//     const apiBase = isExtra
//         ? '/everydayWordExtraSectionDetail'
//         : '/everydayWordSectionDetail';

//     const textareaRef = useRef(null);
//     const [rawJsonText, setRawJsonText] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [saving, setSaving] = useState(false);
//     const [deleting, setDeleting] = useState(false);
//     const [status, setStatus] = useState({ message: '', error: false });

//     // Search States
//     const [searchTerm, setSearchTerm] = useState('');
//     const [matches, setMatches] = useState([]);
//     const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);

//     // Initial boilerplate for brand new documents
//     const newDocumentTemplate = isExtra
//         ? JSON.stringify(
//             {
//                 theme: {
//                     code: 1,
//                     title: "New Extra Theme",
//                     logo: "🌟"
//                 },
//                 subsections: []
//             },
//             null,
//             2
//         )
//         : JSON.stringify(
//             {
//                 sectionNumber: 1,
//                 title: "নতুন সেকশন",
//                 words: []
//             },
//             null,
//             2
//         );

//     // 1. Fetch section data if not creating new
//     useEffect(() => {
//         if (!activeId) return;

//         if (isCreatingNew) {
//             setRawJsonText(newDocumentTemplate);
//             return;
//         }

//         const fetchSectionData = async () => {
//             setLoading(true);
//             setStatus({ message: '', error: false });

//             try {
//                 const response = await axiosSecure.get(`${apiBase}/${activeId}`);
//                 setRawJsonText(JSON.stringify(response.data, null, 2));
//             } catch (err) {
//                 setStatus({
//                     message: err.response?.data?.message || err.message || 'Failed to fetch section data.',
//                     error: true,
//                 });
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSectionData();
//     }, [activeId, apiBase, axiosSecure, isCreatingNew]);

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

//     // 2. Save or Add Document
//     const handleSaveToDatabase = async () => {
//         setSaving(true);
//         setStatus({ message: '', error: false });

//         try {
//             if (!rawJsonText.trim()) {
//                 throw new Error('Content cannot be empty.');
//             }

//             let parsedPayload;
//             try {
//                 parsedPayload = JSON.parse(rawJsonText);
//             } catch (parseErr) {
//                 throw new Error(`Invalid JSON syntax: ${parseErr.message}`);
//             }

//             // Determine numeric ID from parsed payload if in 'new' mode
//             let targetId = activeId;
//             if (isCreatingNew) {
//                 targetId = isExtra
//                     ? parsedPayload.code ?? parsedPayload.theme?.code
//                     : parsedPayload.sectionNumber;

//                 if (!targetId) {
//                     throw new Error(
//                         isExtra
//                             ? 'Please specify a numeric "theme.code" or "code" inside your JSON.'
//                             : 'Please specify a numeric "sectionNumber" inside your JSON.'
//                     );
//                 }
//             }

//             const response = await axiosSecure.post(`${apiBase}/${targetId}`, parsedPayload);

//             setStatus({
//                 message: response.data?.message || `Document saved successfully!`,
//                 error: false,
//             });

//             // If created as new, redirect to its dedicated edit path
//             if (isCreatingNew) {
//                 const redirectBase = isExtra
//                     ? '/english-vocab/everyday-Word/extra-section-edit'
//                     : '/english-vocab/everyday-Word/section-edit';
//                 setTimeout(() => navigate(`${redirectBase}/${targetId}`, { replace: true }), 1000);
//             }
//         } catch (err) {
//             setStatus({
//                 message: err.response?.data?.message || err.message || 'Error saving to database.',
//                 error: true,
//             });
//         } finally {
//             setSaving(false);
//         }
//     };

//     // 3. Delete Document Details
//     const handleDeleteDocument = async () => {
//         const confirmed = window.confirm(
//             `Are you sure you want to delete this document from the database? This cannot be undone.`
//         );
//         if (!confirmed) return;

//         setDeleting(true);
//         setStatus({ message: '', error: false });

//         try {
//             const response = await axiosSecure.delete(`${apiBase}/${activeId}`);
//             alert(response.data?.message || 'Document deleted successfully.');
//             navigate(-1);
//         } catch (err) {
//             setStatus({
//                 message: err.response?.data?.message || err.message || 'Error deleting document.',
//                 error: true,
//             });
//             setDeleting(false);
//         }
//     };

//     return (
//         <div style={{ padding: '24px', fontFamily: 'sans-serif', width: '100%', boxSizing: 'border-box'  }}>
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
//                             const activeCategory = isExtra
//                                 ? { getApi: '/extra-vocab/sections', editApi: '/english-vocab/everyday-Word/extra-section-edit' }
//                                 : { getApi: '/sections', editApi: '/english-vocab/everyday-Word/section-edit' };

//                             localStorage.setItem('admin_active_category', JSON.stringify(activeCategory));
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
//                         {isExtra ? 'Extra Vocabulary' : 'Regular Vocabulary'} —{' '}
//                         {isCreatingNew
//                             ? 'New Document Creation'
//                             : isExtra
//                                 ? `Code: ${activeId}`
//                                 : `Section: ${activeId}`}
//                     </h2>
//                 </div>

//                 {/* Save and Delete Actions */}
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

//             {/* Textarea View */}
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


// import React, { useState, useEffect, useRef, useMemo } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router';
// import useAxiosSecure from '../Hooks/useAxiosSecure';
// import { dropdownData } from './DropDownItems';

// // Flattens the nested tree to find item configurations by editApi
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
//     const { sectionNumber, code, id } = useParams();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const axiosSecure = useAxiosSecure();

//     const activeId = sectionNumber || code || id;
//     const isCreatingNew = activeId === 'new';

//     // Retrieve category from router state, matching pathname, or localStorage
//     const activeCategory = useMemo(() => {
//         if (location.state?.activeCategory) {
//             return location.state.activeCategory;
//         }
//         const matched = findCategoryByEditApi(dropdownData, location.pathname);
//         if (matched) return matched;

//         const saved = localStorage.getItem('admin_active_category');
//         if (saved) {
//             try {
//                 return JSON.parse(saved);
//             } catch (e) {
//                 console.error(e);
//             }
//         }
//         return {
//             title: 'Vocabulary Section',
//             getApi: '/sections',
//             editApi: '/english-vocab/everyday-Word/section-edit',
//         };
//     }, [location]);

//     const isExtra = location.pathname.includes('extra-section-edit');

//     // Dynamically resolve target detail API
//     const apiBase = useMemo(() => {
//         if (isExtra) return '/everydayWordExtraSectionDetail';
//         if (location.pathname.includes('section-edit')) return '/everydayWordSectionDetail';
//         // Fallback: for newer categories, use their getApi
//         return activeCategory?.getApi || '/everydayWordSectionDetail';
//     }, [isExtra, location.pathname, activeCategory]);

//     const textareaRef = useRef(null);
//     const [rawJsonText, setRawJsonText] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [saving, setSaving] = useState(false);
//     const [deleting, setDeleting] = useState(false);
//     const [status, setStatus] = useState({ message: '', error: false });

//     const [searchTerm, setSearchTerm] = useState('');
//     const [matches, setMatches] = useState([]);
//     const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);

//     // Template generation based on dynamic category
//     const newDocumentTemplate = useMemo(() => {
//         if (isExtra) {
//             return JSON.stringify(
//                 {
//                     theme: {
//                         code: 1,
//                         title: 'New Extra Theme',
//                         logo: '🌟',
//                     },
//                     subsections: [],
//                 },
//                 null,
//                 2
//             );
//         }
//         return JSON.stringify(
//             {
//                 sectionNumber: 1,
//                 title: `New ${activeCategory?.title || 'Section'}`,
//                 words: [],
//             },
//             null,
//             2
//         );
//     }, [isExtra, activeCategory]);

//     useEffect(() => {
//         if (!activeId) return;

//         if (isCreatingNew) {
//             setRawJsonText(newDocumentTemplate);
//             return;
//         }

//         const fetchSectionData = async () => {
//             setLoading(true);
//             setStatus({ message: '', error: false });

//             try {
//                 const response = await axiosSecure.get(`${apiBase}/${activeId}`);
//                 setRawJsonText(JSON.stringify(response.data, null, 2));
//             } catch (err) {
//                 setStatus({
//                     message: err.response?.data?.message || err.message || 'Failed to fetch section data.',
//                     error: true,
//                 });
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSectionData();
//     }, [activeId, apiBase, axiosSecure, isCreatingNew, newDocumentTemplate]);

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

//     // Dynamic Save/Update
//     const handleSaveToDatabase = async () => {
//         setSaving(true);
//         setStatus({ message: '', error: false });

//         try {
//             if (!rawJsonText.trim()) {
//                 throw new Error('Content cannot be empty.');
//             }

//             let parsedPayload;
//             try {
//                 parsedPayload = JSON.parse(rawJsonText);
//             } catch (parseErr) {
//                 throw new Error(`Invalid JSON syntax: ${parseErr.message}`);
//             }

//             let targetId = activeId;
//             if (isCreatingNew) {
//                 targetId =
//                     parsedPayload.sectionNumber ??
//                     parsedPayload.code ??
//                     parsedPayload.theme?.code ??
//                     parsedPayload.id;

//                 if (!targetId) {
//                     throw new Error('Please specify an identifier (such as "sectionNumber", "code", or "id") inside your JSON.');
//                 }
//             }

//             const response = await axiosSecure.post(`${apiBase}/${targetId}`, parsedPayload);

//             setStatus({
//                 message: response.data?.message || 'Document saved successfully!',
//                 error: false,
//             });

//             if (isCreatingNew) {
//                 const redirectBase = activeCategory?.editApi || (
//                     isExtra
//                         ? '/english-vocab/everyday-Word/extra-section-edit'
//                         : '/english-vocab/everyday-Word/section-edit'
//                 );
//                 setTimeout(() => {
//                     navigate(`${redirectBase}/${targetId}`, {
//                         replace: true,
//                         state: { activeCategory },
//                     });
//                 }, 1000);
//             }
//         } catch (err) {
//             setStatus({
//                 message: err.response?.data?.message || err.message || 'Error saving to database.',
//                 error: true,
//             });
//         } finally {
//             setSaving(false);
//         }
//     };

//     // Dynamic Delete
//     const handleDeleteDocument = async () => {
//         const confirmed = window.confirm(
//             'Are you sure you want to delete this document from the database? This cannot be undone.'
//         );
//         if (!confirmed) return;

//         setDeleting(true);
//         setStatus({ message: '', error: false });

//         try {
//             const response = await axiosSecure.delete(`${apiBase}/${activeId}`);
//             alert(response.data?.message || 'Document deleted successfully.');
//             navigate(-1);
//         } catch (err) {
//             setStatus({
//                 message: err.response?.data?.message || err.message || 'Error deleting document.',
//                 error: true,
//             });
//             setDeleting(false);
//         }
//     };

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
//                             if (activeCategory) {
//                                 localStorage.setItem('admin_active_category', JSON.stringify(activeCategory));
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
//                         {activeCategory?.title || 'Section Editor'} —{' '}
//                         {isCreatingNew
//                             ? 'New Document Creation'
//                             : isExtra
//                                 ? `Code: ${activeId}`
//                                 : `Section: ${activeId}`}
//                     </h2>
//                 </div>

//                 {/* Save and Delete Actions */}
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

// Security Helper: Strip dangerous prototype pollution keys
const safeJsonParse = (str) => {
    return JSON.parse(str, (key, value) => {
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
            return undefined;
        }
        return value;
    });
};

// Security Helper: Sanitize identifiers to prevent path traversal
const sanitizeId = (id) => String(id).replace(/[^a-zA-Z0-9_-]/g, '');

function findCategoryByEditApi(tree, pathname) {
    for (const item of tree) {
        if (item.editApi && pathname.includes(item.editApi)) {
            return item;
        }
        if (item.children) {
            const found = findCategoryByEditApi(item.children, pathname);
            if (found) return found;
        }
    }
    return null;
}

export default function SectionEditor() {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const rawActiveId = Object.values(params)[0];
    const isCreatingNew = rawActiveId === 'new';
    const cleanActiveId = isCreatingNew ? 'new' : sanitizeId(rawActiveId);

    // 1. Secure Category Lookup (Never trusting arbitrary URLs from storage)
    const activeCategory = useMemo(() => {
        if (location.state?.activeCategory) {
            return location.state.activeCategory;
        }
        const matchedByPath = findCategoryByEditApi(dropdownData, location.pathname);
        if (matchedByPath) return matchedByPath;

        const savedId = localStorage.getItem('admin_active_category_id');
        if (savedId) {
            const verified = findCategoryById(dropdownData, savedId);
            if (verified) return verified;
        }
        return null;
    }, [location]);

    // 2. Safe API base
    // Resolve the backend API endpoint
    // Purely dynamic - matches the exact backend route from editApi
    const apiBase = useMemo(() => {
        if (activeCategory?.editApi) {
            return activeCategory.editApi;
        }
        // Fallback: strips trailing '/:id' or '/new' from the URL bar
        return location.pathname.replace(/\/(new|[^/]+)$/, '');
    }, [activeCategory, location.pathname]);

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
        return JSON.stringify(
            {
                id: 1,
                title: `New ${activeCategory?.title || 'Item'} Title`,
                content: []
            },
            null,
            2
        );
    }, [activeCategory]);

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
                const response = await axiosSecure.get(`${apiBase}/${cleanActiveId}`);
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
    }, [cleanActiveId, apiBase, axiosSecure, isCreatingNew, newDocumentTemplate]);

    // Search helper
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

    // Safe Save
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
            if (isCreatingNew) {
                const rawKey =
                    parsedPayload.courseId ??
                    parsedPayload.sectionNumber ??
                    parsedPayload.code ??
                    parsedPayload.theme?.code ??
                    parsedPayload.id;

                targetId = sanitizeId(rawKey);

                if (!targetId || targetId === 'undefined') {
                    throw new Error('Please specify a valid identifier (e.g. "courseId", "sectionNumber", or "code") in your JSON.');
                }
            }

            const saveEndpoint = `${apiBase}/${targetId}`;
            const method = isCreatingNew ? 'post' : 'put';
            const response = await axiosSecure[method](saveEndpoint, parsedPayload);

            // Success Alert & direct return
            await Swal.fire({
                icon: 'success',
                title: isCreatingNew ? 'Created Successfully!' : 'Saved Successfully!',
                text: response.data?.message || 'Document saved to database successfully.',
                timer: 1500,
                showConfirmButton: false,
            });

            // Navigate back directly to DocumentManager
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

            setStatus({ message: '', error: false });
        } finally {
            setSaving(false);
        }
    };

    // Safe Delete
    const handleDeleteDocument = async () => {
        const result = await Swal.fire({
            title: `Delete full document ${cleanActiveId}?`,
            text: "This action cannot be undone!",
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
            const response = await axiosSecure.delete(`${apiBase}/${cleanActiveId}`);

            await Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: String(response.data?.message || 'Document deleted successfully.'),
                timer: 1500,
                showConfirmButton: false,
            });

            navigate(-1);
        } catch (err) {
            const errorMsg = String(err.response?.data?.message || err.message || 'Error deleting document.');

            setStatus({
                message: errorMsg,
                error: true,
            });

            Swal.fire({
                icon: 'error',
                title: 'Delete Failed',
                text: errorMsg,
            });

            setDeleting(false);
        }
    };

    const itemHeaderTitle = activeCategory?.title || 'Editor';

    return (
        <div style={{ padding: '24px', fontFamily: 'sans-serif', width: '100%', boxSizing: 'border-box' }}>
            {/* Header */}
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
                        onClick={() => {
                            if (activeCategory?.id) {
                                localStorage.setItem('admin_active_category_id', String(activeCategory.id));
                            }
                            navigate(-1);
                        }}
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
                        {itemHeaderTitle} — {isCreatingNew ? 'New Document' : `Item #${cleanActiveId}`}
                    </h2>
                </div>

                {/* Action Buttons */}
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

            {/* Search Bar */}
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

            {/* Alerts */}
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

            {/* Textarea */}
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


