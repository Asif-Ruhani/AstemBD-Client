// import React, { useState, useEffect, useCallback } from 'react';
// import { Link } from 'react-router';
// import Swal from 'sweetalert2';
// import useAxiosSecure from '../Hooks/useAxiosSecure';

// const safeJsonParse = (str) => {
//     return JSON.parse(str, (key, value) => {
//         if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
//             return undefined;
//         }
//         return value;
//     });
// };

// const sanitizeId = (id) => String(id || '').replace(/[^a-zA-Z0-9_-]/g, '').trim();

// export default function DocumentManager({ selectedEndpoint, editApi, activeCategory }) {
//     const axiosSecure = useAxiosSecure();
//     const [sections, setSections] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     const [isAdding, setIsAdding] = useState(false);
//     const [newSectionText, setNewSectionText] = useState('');
//     const [submitLoading, setSubmitLoading] = useState(false);
//     const [submitStatus, setSubmitStatus] = useState({ message: '', error: false });

//     const categoryTitle = activeCategory?.title || 'Sections';
//     const routePrefix = editApi || '';
//     const isCourseCategory = Boolean(
//         activeCategory?.isCourseCollection ||
//         selectedEndpoint?.includes('courses') ||
//         activeCategory?.id === '1'
//     );

//     const currentStatus = activeCategory?.filterQuery?.status
//         ? String(activeCategory.filterQuery.status).trim().toLowerCase()
//         : null;

//     const placeholderText = isCourseCategory
//         ? JSON.stringify(
//             {
//                 courseId: 'CRS_NEW_01',
//                 title: `New ${categoryTitle} Course`,
//                 slug: 'new-course',
//                 category: activeCategory?.filterQuery?.category || 'overall-courses',
//                 track: activeCategory?.filterQuery?.track || 'GLOBAL PATHWAY',
//                 price: 0,
//                 currency: 'BDT',
//                 isPaid: false,
//                 isActive: true,
//             },
//             null,
//             2
//         )
//         : JSON.stringify(
//             {
//                 courseId: activeCategory?.courseId || 'CRS_BEV_CONV_01',
//                 sectionNumber: currentStatus === 'extra' ? 31 : 1,
//                 title: `New ${categoryTitle} Title`,
//                 status: currentStatus || 'regular',
//                 isFreePreview: false
//             },
//             null,
//             2
//         );

//     const fetchSections = useCallback(async () => {
//         if (!selectedEndpoint) return;
//         setLoading(true);
//         setError('');
//         try {
//             const params = {};
//             if (activeCategory?.courseId) {
//                 params.courseId = activeCategory.courseId;
//             }
//             if (activeCategory?.filterQuery) {
//                 Object.assign(params, activeCategory.filterQuery);
//             }

//             const response = await axiosSecure.get(selectedEndpoint, { params });
//             const data = Array.isArray(response.data)
//                 ? response.data
//                 : response.data?.sections || response.data?.data || [];

//             // Strict Status Segregation: ensuring regular never mixes with extra
//             const filteredData = data.filter((item) => {
//                 if (isCourseCategory || !currentStatus) return true;
//                 const itemStatus = String(item.status || 'regular').trim().toLowerCase();
//                 return itemStatus === currentStatus;
//             });

//             const sortedData = filteredData.slice().sort((a, b) => {
//                 if (isCourseCategory) return 0;
//                 const numA = Number(a.sectionNumber ?? 0);
//                 const numB = Number(b.sectionNumber ?? 0);
//                 return numA - numB;
//             });

//             setSections(sortedData);
//         } catch (err) {
//             setError(String(err.response?.data?.message || err.message || 'Failed to load sections.'));
//             setSections([]);
//         } finally {
//             setLoading(false);
//         }
//     }, [selectedEndpoint, activeCategory, axiosSecure, isCourseCategory, currentStatus]);

//     useEffect(() => {
//         fetchSections();
//     }, [fetchSections]);

//     const handleEditTitle = async (e, sec) => {
//         e.preventDefault();
//         e.stopPropagation();

//         const cleanSectionNumber = sanitizeId(sec.sectionNumber);
//         const cleanCourseId = sanitizeId(activeCategory?.courseId || sec.courseId);
//         const currentTitle = sec.title || '';

//         const { value: newTitle } = await Swal.fire({
//             title: `Edit Title for Section #${cleanSectionNumber}`,
//             input: 'text',
//             inputValue: currentTitle,
//             inputLabel: 'Section Title',
//             showCancelButton: true,
//             confirmButtonText: 'Update Title',
//             confirmButtonColor: '#16a34a',
//             cancelButtonColor: '#64748b',
//             inputValidator: (value) => {
//                 if (!value || !value.trim()) {
//                     return 'The title cannot be empty!';
//                 }
//             },
//         });

//         if (!newTitle || newTitle.trim() === currentTitle) return;

//         try {
//             // Path: /english-vocab-sections/:courseId/:sectionNumber
//             const updateUrl = `${selectedEndpoint}/${cleanCourseId}/${cleanSectionNumber}`;
//             const payload = {
//                 title: newTitle.trim(),
//             };

//             const response = await axiosSecure.put(updateUrl, payload);

//             setSections((prev) =>
//                 prev.map((item) => {
//                     if (
//                         String(item.sectionNumber) === String(cleanSectionNumber) &&
//                         String(item.courseId || activeCategory?.courseId) === String(cleanCourseId)
//                     ) {
//                         return { ...item, title: newTitle.trim() };
//                     }
//                     return item;
//                 })
//             );

//             Swal.fire({
//                 icon: 'success',
//                 title: 'Updated!',
//                 text: String(response.data?.message || 'Title updated successfully!'),
//                 timer: 1500,
//                 showConfirmButton: false,
//             });
//         } catch (err) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Update Failed',
//                 text: String(err.response?.data?.message || err.message || 'Failed to update section title.'),
//             });
//         }
//     };

//     const handleCreateSection = async () => {
//         if (!newSectionText.trim()) {
//             setSubmitStatus({ message: 'Input cannot be empty.', error: true });
//             return;
//         }

//         let parsedPayload;
//         try {
//             parsedPayload = safeJsonParse(newSectionText);
//         } catch (parseErr) {
//             setSubmitStatus({
//                 message: `Invalid JSON syntax: ${parseErr.message}`,
//                 error: true,
//             });
//             return;
//         }

//         if (!isCourseCategory) {
//             if (activeCategory?.courseId && !parsedPayload.courseId) {
//                 parsedPayload.courseId = activeCategory.courseId;
//             }
//             if (currentStatus && !parsedPayload.status) {
//                 parsedPayload.status = currentStatus;
//             }
//         }

//         setSubmitLoading(true);
//         setSubmitStatus({ message: '', error: false });

//         try {
//             const targetEndpoint = isCourseCategory ? '/all-courses-edit/new' : selectedEndpoint;
//             const response = await axiosSecure.post(targetEndpoint, parsedPayload);

//             Swal.fire({
//                 icon: 'success',
//                 title: 'Created!',
//                 text: String(response.data?.message || 'Document created successfully!'),
//                 timer: 1500,
//                 showConfirmButton: false,
//             });

//             setNewSectionText('');
//             setIsAdding(false);
//             await fetchSections();
//         } catch (err) {
//             setSubmitStatus({
//                 message: String(err.response?.data?.message || err.message || 'Failed to save section.'),
//                 error: true,
//             });
//         } finally {
//             setSubmitLoading(false);
//         }
//     };

//     const handleDeleteSection = async (e, sec) => {
//         e.preventDefault();
//         e.stopPropagation();

//         const cleanCourseId = sanitizeId(activeCategory?.courseId || sec.courseId);
//         const cleanSectionNumber = sanitizeId(sec.sectionNumber);

//         const targetIdentifier = isCourseCategory
//             ? sanitizeId(sec.courseId || sec.id)
//             : cleanSectionNumber;

//         if (!targetIdentifier) {
//             Swal.fire({ icon: 'error', title: 'Error', text: 'Identifier not found for this item.' });
//             return;
//         }

//         const result = await Swal.fire({
//             title: `Delete Section #${cleanSectionNumber}?`,
//             text: `This will remove Section #${cleanSectionNumber} from course "${cleanCourseId}". You won't be able to revert this!`,
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#ef4444',
//             cancelButtonColor: '#64748b',
//             confirmButtonText: 'Yes, delete it!',
//             cancelButtonText: 'Cancel',
//             reverseButtons: true,
//         });

//         if (!result.isConfirmed) return;

//         try {
//             if (isCourseCategory) {
//                 await axiosSecure.delete(`/all-courses/${targetIdentifier}`);
//             } else {
//                 // Path: /english-vocab-sections/:courseId/:sectionNumber
//                 await axiosSecure.delete(`${selectedEndpoint}/${cleanCourseId}/${cleanSectionNumber}`);
//             }

//             setSections((prev) =>
//                 prev.filter((item) => {
//                     if (isCourseCategory) {
//                         return sanitizeId(item.courseId || item.id) !== targetIdentifier;
//                     }
//                     const itemSec = sanitizeId(item.sectionNumber);
//                     const itemCrs = sanitizeId(item.courseId || activeCategory?.courseId);
//                     return !(itemSec === cleanSectionNumber && itemCrs === cleanCourseId);
//                 })
//             );

//             Swal.fire({
//                 icon: 'success',
//                 title: 'Deleted!',
//                 text: `Section #${cleanSectionNumber} has been deleted.`,
//                 timer: 1500,
//                 showConfirmButton: false,
//             });
//         } catch (err) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Delete Failed',
//                 text: String(err.response?.data?.message || err.message || 'Failed to delete section.'),
//             });
//         }
//     };

//     if (!activeCategory || !selectedEndpoint) {
//         return (
//             <div
//                 style={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     height: '60vh',
//                     color: '#64748b',
//                     textAlign: 'center',
//                     fontFamily: 'sans-serif',
//                 }}
//             >
//                 <div style={{ fontSize: '48px', marginBottom: '16px' }}>📂</div>
//                 <h3 style={{ margin: '0 0 8px 0', color: '#1e293b', fontSize: '18px', fontWeight: 600 }}>
//                     Select an item to show specific data
//                 </h3>
//                 <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>
//                     Choose a category from the navigation sidebar on the left.
//                 </p>
//             </div>
//         );
//     }

//     return (
//         <div style={{ width: '100%', fontFamily: 'sans-serif' }}>
//             <div
//                 style={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     marginBottom: '20px',
//                     borderBottom: '1px solid #e2e8f0',
//                     paddingBottom: '14px',
//                 }}
//             >
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                     <h2 style={{ margin: 0, color: '#0f172a' }}>{categoryTitle}</h2>
//                     <span
//                         style={{
//                             fontSize: '13px',
//                             backgroundColor: '#e0f2fe',
//                             color: '#0369a1',
//                             padding: '4px 10px',
//                             borderRadius: '6px',
//                             fontWeight: 500,
//                         }}
//                     >
//                         API: {selectedEndpoint}
//                     </span>
//                     {activeCategory?.courseId && (
//                         <span
//                             style={{
//                                 fontSize: '12px',
//                                 backgroundColor: '#f1f5f9',
//                                 color: '#475569',
//                                 padding: '4px 8px',
//                                 borderRadius: '6px',
//                                 fontWeight: 600,
//                             }}
//                         >
//                             Course: {activeCategory.courseId}
//                         </span>
//                     )}
//                     {currentStatus && (
//                         <span
//                             style={{
//                                 fontSize: '12px',
//                                 backgroundColor: currentStatus === 'extra' ? '#fef3c7' : '#dcfce7',
//                                 color: currentStatus === 'extra' ? '#92400e' : '#166534',
//                                 padding: '4px 8px',
//                                 borderRadius: '6px',
//                                 fontWeight: 700,
//                                 textTransform: 'uppercase',
//                             }}
//                         >
//                             {currentStatus}
//                         </span>
//                     )}
//                 </div>

//                 <div style={{ display: 'flex', gap: '10px' }}>
//                     <Link
//                         to={`${routePrefix}/new`}
//                         state={{ activeCategory }}
//                         style={{
//                             textDecoration: 'none',
//                             padding: '8px 16px',
//                             backgroundColor: '#0284c7',
//                             color: '#ffffff',
//                             fontWeight: 600,
//                             fontSize: '13px',
//                             borderRadius: '6px',
//                             display: 'flex',
//                             alignItems: 'center',
//                         }}
//                     >
//                         + New JSON Document
//                     </Link>

//                     <button
//                         type="button"
//                         onClick={() => {
//                             setIsAdding((prev) => !prev);
//                             setSubmitStatus({ message: '', error: false });
//                         }}
//                         style={{
//                             padding: '8px 16px',
//                             backgroundColor: isAdding ? '#64748b' : '#0f172a',
//                             color: '#ffffff',
//                             fontWeight: 600,
//                             fontSize: '13px',
//                             border: 'none',
//                             borderRadius: '6px',
//                             cursor: 'pointer',
//                         }}
//                     >
//                         {isAdding ? 'Close Panel' : isCourseCategory ? '+ Add Course' : '+ Add Section'}
//                     </button>
//                 </div>
//             </div>

//             {isAdding && (
//                 <div
//                     style={{
//                         marginBottom: '24px',
//                         padding: '18px',
//                         backgroundColor: '#ffffff',
//                         border: '1px solid #cbd5e1',
//                         borderRadius: '8px',
//                         boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
//                     }}
//                 >
//                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
//                         <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
//                             Enter New Document JSON ({categoryTitle})
//                         </span>
//                         <span style={{ fontSize: '12px', color: '#64748b' }}>
//                             Target Endpoint: <code>{isCourseCategory ? '/all-courses-edit/new' : selectedEndpoint}</code>
//                         </span>
//                     </div>

//                     <textarea
//                         value={newSectionText}
//                         onChange={(e) => setNewSectionText(e.target.value)}
//                         placeholder={placeholderText}
//                         spellCheck={false}
//                         style={{
//                             width: '100%',
//                             height: '140px',
//                             padding: '12px',
//                             fontFamily: 'monospace',
//                             fontSize: '13.5px',
//                             lineHeight: '1.5',
//                             backgroundColor: '#ffffff',
//                             color: '#1e293b',
//                             borderRadius: '6px',
//                             border: '1px solid #cbd5e1',
//                             outline: 'none',
//                             boxSpacing: 'border-box',
//                             resize: 'vertical',
//                             whiteSpace: 'pre',
//                         }}
//                     />

//                     {submitStatus.message && (
//                         <div
//                             style={{
//                                 marginTop: '10px',
//                                 padding: '8px 12px',
//                                 borderRadius: '4px',
//                                 fontSize: '13px',
//                                 backgroundColor: submitStatus.error ? '#fee2e2' : '#dcfce7',
//                                 color: submitStatus.error ? '#991b1b' : '#166534',
//                             }}
//                         >
//                             {submitStatus.message}
//                         </div>
//                     )}

//                     <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
//                         <button
//                             type="button"
//                             onClick={() => {
//                                 setIsAdding(false);
//                                 setNewSectionText('');
//                                 setSubmitStatus({ message: '', error: false });
//                             }}
//                             style={{
//                                 padding: '7px 14px',
//                                 backgroundColor: '#f1f5f9',
//                                 color: '#475569',
//                                 border: '1px solid #cbd5e1',
//                                 borderRadius: '6px',
//                                 cursor: 'pointer',
//                                 fontSize: '13px',
//                             }}
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="button"
//                             onClick={handleCreateSection}
//                             disabled={submitLoading}
//                             style={{
//                                 padding: '7px 18px',
//                                 backgroundColor: submitLoading ? '#86efac' : '#16a34a',
//                                 color: '#ffffff',
//                                 fontWeight: 600,
//                                 border: 'none',
//                                 borderRadius: '6px',
//                                 cursor: submitLoading ? 'not-allowed' : 'pointer',
//                                 fontSize: '13px',
//                             }}
//                         >
//                             {submitLoading ? 'Saving...' : 'Save Document'}
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {loading && (
//                 <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
//                     Loading content...
//                 </div>
//             )}

//             {error && (
//                 <div
//                     style={{
//                         padding: '12px 16px',
//                         backgroundColor: '#fee2e2',
//                         color: '#991b1b',
//                         borderRadius: '6px',
//                         marginBottom: '16px',
//                         fontSize: '14px',
//                     }}
//                 >
//                     {error}
//                 </div>
//             )}

//             {!loading && !error && (
//                 <div
//                     style={{
//                         display: 'grid',
//                         gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
//                         gap: '16px',
//                     }}
//                 >
//                     {sections.map((sec, index) => {
//                         const cleanCourseId = sanitizeId(activeCategory?.courseId || sec.courseId);
//                         const cleanSectionNumber = sanitizeId(sec.sectionNumber);

//                         const cleanIdentifier = isCourseCategory
//                             ? sanitizeId(sec.courseId || sec.id || sec._id)
//                             : cleanSectionNumber;

//                         const displayBadge = isCourseCategory
//                             ? sec.courseId || `Course #${index + 1}`
//                             : `Section #${sec.sectionNumber}`;

//                         const title = sec.title || `Item #${cleanIdentifier}`;

//                         // Link targets details matching: /english-vocab-details/:courseId/:sectionNumber
//                         const itemDetailLink = isCourseCategory
//                             ? `${routePrefix}/${cleanIdentifier}`
//                             : `${routePrefix}/${cleanCourseId}/${cleanSectionNumber}`;

//                         return (
//                             <div
//                                 key={sec._id || `${cleanCourseId}-${cleanSectionNumber}` || cleanIdentifier}
//                                 style={{
//                                     display: 'flex',
//                                     flexDirection: 'column',
//                                     justifyContent: 'space-between',
//                                     backgroundColor: '#ffffff',
//                                     borderRadius: '8px',
//                                     border: '1px solid #e2e8f0',
//                                     boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
//                                     overflow: 'hidden',
//                                 }}
//                             >
//                                 <Link
//                                     to={itemDetailLink}
//                                     state={{ activeCategory }}
//                                     style={{
//                                         textDecoration: 'none',
//                                         padding: '16px 18px 12px 18px',
//                                         display: 'flex',
//                                         flexDirection: 'column',
//                                         gap: '6px',
//                                         cursor: 'pointer',
//                                         flexGrow: 1,
//                                     }}
//                                 >
//                                     <span
//                                         style={{
//                                             fontSize: '12px',
//                                             fontWeight: 'bold',
//                                             color: '#0284c7',
//                                             textTransform: 'uppercase',
//                                         }}
//                                     >
//                                         {displayBadge}
//                                     </span>

//                                     <h4 style={{ margin: '4px 0 0', fontSize: '15px', color: '#1e293b' }}>
//                                         {title}
//                                     </h4>

//                                     {sec.track && (
//                                         <span style={{ fontSize: '12px', color: '#64748b' }}>
//                                             Track: {sec.track}
//                                         </span>
//                                     )}
//                                     {sec.category && (
//                                         <span style={{ fontSize: '12px', color: '#94a3b8' }}>
//                                             Category: {sec.category}
//                                         </span>
//                                     )}
//                                 </Link>

//                                 <div
//                                     style={{
//                                         display: 'flex',
//                                         justifyContent: 'space-between',
//                                         alignItems: 'center',
//                                         padding: '8px 14px',
//                                         backgroundColor: '#f8fafc',
//                                         borderTop: '1px solid #f1f5f9',
//                                     }}
//                                 >
//                                     {!isCourseCategory && (
//                                         <button
//                                             type="button"
//                                             title="Edit Section Title"
//                                             onClick={(e) => handleEditTitle(e, sec)}
//                                             style={{
//                                                 padding: '3px 8px',
//                                                 fontSize: '11px',
//                                                 color: '#0284c7',
//                                                 backgroundColor: '#e0f2fe',
//                                                 border: 'none',
//                                                 borderRadius: '4px',
//                                                 cursor: 'pointer',
//                                                 fontWeight: 600,
//                                             }}
//                                         >
//                                             ✏️ Edit Title
//                                         </button>
//                                     )}

//                                     <button
//                                         type="button"
//                                         title="Delete Item"
//                                         onClick={(e) => handleDeleteSection(e, sec)}
//                                         style={{
//                                             padding: '3px 8px',
//                                             fontSize: '11px',
//                                             color: '#ef4444',
//                                             backgroundColor: '#fee2e2',
//                                             border: 'none',
//                                             borderRadius: '4px',
//                                             cursor: 'pointer',
//                                             fontWeight: 600,
//                                             marginLeft: isCourseCategory ? 'auto' : '0',
//                                         }}
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}

//             {!loading && !error && sections.length === 0 && (
//                 <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
//                     No documents found for {categoryTitle}.
//                 </div>
//             )}
//         </div>
//     );
// }


import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const sanitizeId = (id) => String(id || '').replace(/[^a-zA-Z0-9_-]/g, '').trim();

export default function DocumentManager({ selectedEndpoint, editApi, activeCategory }) {
    const axiosSecure = useAxiosSecure();
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const categoryTitle = activeCategory?.title || 'Sections';
    const routePrefix = editApi || '';
    const isCourseCategory = Boolean(
        activeCategory?.isCourseCollection ||
        selectedEndpoint?.includes('courses') ||
        activeCategory?.id === '1'
    );

    const currentStatus = activeCategory?.filterQuery?.status
        ? String(activeCategory.filterQuery.status).trim().toLowerCase()
        : null;

    const fetchSections = useCallback(async () => {
        if (!selectedEndpoint) return;
        setLoading(true);
        setError('');
        try {
            const params = {};
            if (activeCategory?.courseId) {
                params.courseId = activeCategory.courseId;
            }
            if (activeCategory?.filterQuery) {
                Object.assign(params, activeCategory.filterQuery);
            }

            const response = await axiosSecure.get(selectedEndpoint, { params });
            const data = Array.isArray(response.data)
                ? response.data
                : response.data?.sections || response.data?.data || [];

            // Strict Status Segregation: regular ebong extra prithok rakha
            const filteredData = data.filter((item) => {
                if (isCourseCategory || !currentStatus) return true;
                const itemStatus = String(item.status || 'regular').trim().toLowerCase();
                return itemStatus === currentStatus;
            });

            const sortedData = filteredData.slice().sort((a, b) => {
                if (isCourseCategory) return 0;
                const numA = Number(a.sectionNumber ?? 0);
                const numB = Number(b.sectionNumber ?? 0);
                return numA - numB;
            });

            setSections(sortedData);
        } catch (err) {
            setError(String(err.response?.data?.message || err.message || 'Failed to load sections.'));
            setSections([]);
        } finally {
            setLoading(false);
        }
    }, [selectedEndpoint, activeCategory, axiosSecure, isCourseCategory, currentStatus]);

    useEffect(() => {
        fetchSections();
    }, [fetchSections]);

    const handleEditTitle = async (e, sec) => {
        e.preventDefault();
        e.stopPropagation();

        const cleanSectionNumber = sanitizeId(sec.sectionNumber);
        const cleanCourseId = sanitizeId(activeCategory?.courseId || sec.courseId);
        const currentTitle = sec.title || '';

        const { value: newTitle } = await Swal.fire({
            title: `Edit Title for Section #${cleanSectionNumber}`,
            input: 'text',
            inputValue: currentTitle,
            inputLabel: 'Section Title',
            showCancelButton: true,
            confirmButtonText: 'Update Title',
            confirmButtonColor: '#16a34a',
            cancelButtonColor: '#64748b',
            inputValidator: (value) => {
                if (!value || !value.trim()) {
                    return 'The title cannot be empty!';
                }
            },
        });

        if (!newTitle || newTitle.trim() === currentTitle) return;

        try {
            // Path: /english-vocab-sections/:courseId/:sectionNumber
            const updateUrl = `${selectedEndpoint}/${cleanCourseId}/${cleanSectionNumber}`;
            const payload = {
                title: newTitle.trim(),
            };

            const response = await axiosSecure.put(updateUrl, payload);

            setSections((prev) =>
                prev.map((item) => {
                    if (
                        String(item.sectionNumber) === String(cleanSectionNumber) &&
                        String(item.courseId || activeCategory?.courseId) === String(cleanCourseId)
                    ) {
                        return { ...item, title: newTitle.trim() };
                    }
                    return item;
                })
            );

            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: String(response.data?.message || 'Title updated successfully!'),
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: String(err.response?.data?.message || err.message || 'Failed to update section title.'),
            });
        }
    };

    const handleDeleteSection = async (e, sec) => {
        e.preventDefault();
        e.stopPropagation();

        const cleanCourseId = sanitizeId(activeCategory?.courseId || sec.courseId);
        const cleanSectionNumber = sanitizeId(sec.sectionNumber);

        const targetIdentifier = isCourseCategory
            ? sanitizeId(sec.courseId || sec.id)
            : cleanSectionNumber;

        if (!targetIdentifier) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Identifier not found for this item.' });
            return;
        }

        const itemLabel = isCourseCategory
            ? `Course "${targetIdentifier}"`
            : `Section #${cleanSectionNumber}`;

        const result = await Swal.fire({
            title: `Delete ${itemLabel}?`,
            text: isCourseCategory
                ? `This will remove course "${targetIdentifier}". You won't be able to revert this!`
                : `This will remove Section #${cleanSectionNumber} from course "${cleanCourseId}". You won't be able to revert this!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        });

        if (!result.isConfirmed) return;

        try {
            if (isCourseCategory) {
                await axiosSecure.delete(`/all-courses/${targetIdentifier}`);
            } else {
                // Path: /english-vocab-sections/:courseId/:sectionNumber
                await axiosSecure.delete(`${selectedEndpoint}/${cleanCourseId}/${cleanSectionNumber}`);
            }

            setSections((prev) =>
                prev.filter((item) => {
                    if (isCourseCategory) {
                        return sanitizeId(item.courseId || item.id) !== targetIdentifier;
                    }
                    const itemSec = sanitizeId(item.sectionNumber);
                    const itemCrs = sanitizeId(item.courseId || activeCategory?.courseId);
                    return !(itemSec === cleanSectionNumber && itemCrs === cleanCourseId);
                })
            );

            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: `${itemLabel} has been deleted.`,
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Delete Failed',
                text: String(err.response?.data?.message || err.message || 'Failed to delete section.'),
            });
        }
    };

    if (!activeCategory || !selectedEndpoint) {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '60vh',
                    color: '#64748b',
                    textAlign: 'center',
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📂</div>
                <h3 style={{ margin: '0 0 8px 0', color: '#1e293b', fontSize: '18px', fontWeight: 600 }}>
                    Select an item to show specific data
                </h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>
                    Choose a category from the navigation sidebar on the left.
                </p>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', fontFamily: 'sans-serif' }}>
            {/* Header Toolbar */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    borderBottom: '1px solid #e2e8f0',
                    paddingBottom: '14px',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <h2 style={{ margin: 0, color: '#0f172a' }}>{categoryTitle}</h2>
                    <span
                        style={{
                            fontSize: '13px',
                            backgroundColor: '#e0f2fe',
                            color: '#0369a1',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontWeight: 500,
                        }}
                    >
                        API: {selectedEndpoint}
                    </span>
                    {activeCategory?.courseId && (
                        <span
                            style={{
                                fontSize: '12px',
                                backgroundColor: '#f1f5f9',
                                color: '#475569',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                fontWeight: 600,
                            }}
                        >
                            Course: {activeCategory.courseId}
                        </span>
                    )}
                    {currentStatus && (
                        <span
                            style={{
                                fontSize: '12px',
                                backgroundColor: currentStatus === 'extra' ? '#fef3c7' : '#dcfce7',
                                color: currentStatus === 'extra' ? '#92400e' : '#166534',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                            }}
                        >
                            {currentStatus}
                        </span>
                    )}
                </div>
            </div>

            {/* Loading Indicator */}
            {loading && (
                <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    Loading content...
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div
                    style={{
                        padding: '12px 16px',
                        backgroundColor: '#fee2e2',
                        color: '#991b1b',
                        borderRadius: '6px',
                        marginBottom: '16px',
                        fontSize: '14px',
                    }}
                >
                    {error}
                </div>
            )}

            {/* Section/Course Cards Grid */}
            {!loading && !error && (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                        gap: '16px',
                    }}
                >
                    {sections.map((sec, index) => {
                        const cleanCourseId = sanitizeId(activeCategory?.courseId || sec.courseId);
                        const cleanSectionNumber = sanitizeId(sec.sectionNumber);

                        const cleanIdentifier = isCourseCategory
                            ? sanitizeId(sec.courseId || sec.id || sec._id)
                            : cleanSectionNumber;

                        const displayBadge = isCourseCategory
                            ? sec.courseId || `Course #${index + 1}`
                            : `Section #${sec.sectionNumber}`;

                        const title = sec.title || `Item #${cleanIdentifier}`;

                        const itemDetailLink = isCourseCategory
                            ? `${routePrefix}/${cleanIdentifier}`
                            : `${routePrefix}/${cleanCourseId}/${cleanSectionNumber}`;

                        return (
                            <div
                                key={sec._id || `${cleanCourseId}-${cleanSectionNumber}` || cleanIdentifier}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '8px',
                                    border: '1px solid #e2e8f0',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                                    overflow: 'hidden',
                                }}
                            >
                                <Link
                                    to={itemDetailLink}
                                    state={{ activeCategory }}
                                    style={{
                                        textDecoration: 'none',
                                        padding: '16px 18px 12px 18px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '6px',
                                        cursor: 'pointer',
                                        flexGrow: 1,
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            color: '#0284c7',
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        {displayBadge}
                                    </span>

                                    <h4 style={{ margin: '4px 0 0', fontSize: '15px', color: '#1e293b' }}>
                                        {title}
                                    </h4>

                                    {sec.track && (
                                        <span style={{ fontSize: '12px', color: '#64748b' }}>
                                            Track: {sec.track}
                                        </span>
                                    )}
                                    {sec.category && (
                                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                                            Category: {sec.category}
                                        </span>
                                    )}
                                </Link>

                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '8px 14px',
                                        backgroundColor: '#f8fafc',
                                        borderTop: '1px solid #f1f5f9',
                                    }}
                                >
                                    {!isCourseCategory && (
                                        <button
                                            type="button"
                                            title="Edit Section Title"
                                            onClick={(e) => handleEditTitle(e, sec)}
                                            style={{
                                                padding: '3px 8px',
                                                fontSize: '11px',
                                                color: '#0284c7',
                                                backgroundColor: '#e0f2fe',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                            }}
                                        >
                                            ✏️ Edit Title
                                        </button>
                                    )}

                                    <button
                                        type="button"
                                        title="Delete Item"
                                        onClick={(e) => handleDeleteSection(e, sec)}
                                        style={{
                                            padding: '3px 8px',
                                            fontSize: '11px',
                                            color: '#ef4444',
                                            backgroundColor: '#fee2e2',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontWeight: 600,
                                            marginLeft: isCourseCategory ? 'auto' : '0',
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && sections.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                    No documents found for {categoryTitle}.
                </div>
            )}
        </div>
    );
}