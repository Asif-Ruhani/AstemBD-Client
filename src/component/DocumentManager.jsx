// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router';
// import Swal from 'sweetalert2';
// import useAxiosSecure from '../Hooks/useAxiosSecure';

// export default function DocumentManager({ selectedEndpoint, editApi }) {
//     const axiosSecure = useAxiosSecure();
//     const [sections, setSections] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     // Add Section UI & Action States
//     const [isAdding, setIsAdding] = useState(false);
//     const [newSectionText, setNewSectionText] = useState('');
//     const [submitLoading, setSubmitLoading] = useState(false);
//     const [submitStatus, setSubmitStatus] = useState({ message: '', error: false });

//     const isExtraVocab = selectedEndpoint === '/extra-vocab/sections';

//     // Fallback route prefix if not directly provided
//     const routePrefix = editApi || (
//         isExtraVocab
//             ? '/english-vocab/everyday-Word/extra-section-edit'
//             : '/english-vocab/everyday-Word/section-edit'
//     );

//     // Dynamic placeholders based on endpoint type
//     const placeholderText = isExtraVocab
//         ? `{\n  "code": 1,\n  "logo": "🏠",\n  "title": "Home, Household & Daily Routine"\n}`
//         : `{\n  "sectionNumber": 1,\n  "title": "ঘুম থেকে জাগরণ ও সকালের সূচনা"\n}`;

//     // Fetch sections list
//     const fetchSections = async () => {
//         if (!selectedEndpoint) return;
//         setLoading(true);
//         setError('');
//         try {
//             const response = await axiosSecure.get(selectedEndpoint);
//             const data = Array.isArray(response.data)
//                 ? response.data
//                 : response.data.sections || response.data.data || [];
//             setSections(data);
//         } catch (err) {
//             setError(err.response?.data?.message || err.message || 'Failed to load sections.');
//             setSections([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchSections();
//     }, [selectedEndpoint, axiosSecure]);

//     // Handle saving the new section
//     const handleCreateSection = async () => {
//         if (!newSectionText.trim()) {
//             setSubmitStatus({ message: 'Input cannot be empty.', error: true });
//             return;
//         }

//         let parsedPayload;
//         try {
//             parsedPayload = JSON.parse(newSectionText);
//         } catch (parseErr) {
//             setSubmitStatus({
//                 message: `Invalid JSON syntax: ${parseErr.message}`,
//                 error: true,
//             });
//             return;
//         }

//         setSubmitLoading(true);
//         setSubmitStatus({ message: '', error: false });

//         try {
//             const targetApi = isExtraVocab ? '/extra-vocab/sections' : '/sections';
//             const response = await axiosSecure.post(targetApi, parsedPayload);

//             Swal.fire({
//                 icon: 'success',
//                 title: 'Created!',
//                 text: response.data?.message || 'Section created successfully!',
//                 timer: 1500,
//                 showConfirmButton: false,
//             });

//             setNewSectionText('');
//             setIsAdding(false);
//             await fetchSections();
//         } catch (err) {
//             setSubmitStatus({
//                 message: err.response?.data?.message || err.message || 'Failed to save section.',
//                 error: true,
//             });
//         } finally {
//             setSubmitLoading(false);
//         }
//     };

//     // Handle deleting section with SweetAlert2 modal
//     const handleDeleteSection = async (e, sectionIdentifier) => {
//         e.preventDefault();
//         e.stopPropagation();

//         const result = await Swal.fire({
//             title: `Delete Section ${sectionIdentifier}?`,
//             text: "You won't be able to revert this!",
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
//             const deleteEndpoint = isExtraVocab
//                 ? `/extra-vocab/sections/${sectionIdentifier}`
//                 : `/sections/${sectionIdentifier}`;

//             await axiosSecure.delete(deleteEndpoint);

//             // Remove from active state immediately
//             setSections((prev) =>
//                 prev.filter((item) => {
//                     const itemIdentifier = item.sectionNumber ?? item.code ?? item.theme?.code ?? item.section;
//                     return String(itemIdentifier) !== String(sectionIdentifier);
//                 })
//             );

//             Swal.fire({
//                 icon: 'success',
//                 title: 'Deleted!',
//                 text: `Section ${sectionIdentifier} has been deleted.`,
//                 timer: 1500,
//                 showConfirmButton: false,
//             });
//         } catch (err) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Delete Failed',
//                 text: err.response?.data?.message || err.message || 'Failed to delete section.',
//             });
//         }
//     };

//     return (
//         <div style={{ width: '100%', fontFamily: 'sans-serif' }}>
//             {/* Header with Action Buttons */}
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
//                     <h2 style={{ margin: 0, color: '#0f172a' }}>All Sections</h2>
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
//                         Endpoint: {selectedEndpoint || 'None'}
//                     </span>
//                 </div>

//                 {/* Top-Right Action Controls */}
//                 <div style={{ display: 'flex', gap: '10px' }}>
//                     <Link
//                         to={
//                             isExtraVocab
//                                 ? '/english-vocab/everyday-Word/extra-section-edit/new'
//                                 : '/english-vocab/everyday-Word/section-edit/new'
//                         }
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
//                             transition: 'background-color 0.15s ease',
//                         }}
//                     >
//                         {isAdding ? 'Close Panel' : '+ Add Section'}
//                     </button>
//                 </div>
//             </div>

//             {/* Add Section Input Panel */}
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
//                             Enter New Section JSON ({isExtraVocab ? 'Extra Vocabulary' : 'Regular Vocabulary'})
//                         </span>
//                         <span style={{ fontSize: '12px', color: '#64748b' }}>
//                             Target API: <code>{isExtraVocab ? '/extra-vocab/sections' : '/sections'}</code>
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
//                             boxSizing: 'border-box',
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
//                             {submitLoading ? 'Saving...' : 'Save Section'}
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* Loading State */}
//             {loading && (
//                 <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
//                     Loading sections...
//                 </div>
//             )}

//             {/* Error State */}
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

//             {/* Sections Grid View */}
//             {!loading && !error && (
//                 <div
//                     style={{
//                         display: 'grid',
//                         gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
//                         gap: '16px',
//                         // border:'3px solid black'
//                     }}
//                 >
//                     {sections.map((sec, index) => {
//                         const sectionNumber = sec.sectionNumber ?? sec.section ?? sec.code ?? index + 1;
//                         const title = sec.title || `Section ${sectionNumber}`;

//                         return (
//                             // <div
//                             //     key={sec._id || sec.id || index}
//                             //     style={{
//                             //         position: 'relative',
//                             //         backgroundColor: '#ffffff',
//                             //         borderRadius: '8px',
//                             //         border: '1px solid #e2e8f0',
//                             //         boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
//                             //         transition: 'transform 0.15s ease, border-color 0.15s ease',
//                             //         overflow: 'hidden',
//                             //         // border:'3px solid black'
//                             //     }}
//                             // >
//                             //     <Link
//                             //         to={`${routePrefix}/${sectionNumber}`}
//                             //         style={{
//                             //             textDecoration: 'none',
//                             //             padding: '18px',
//                             //             display: 'flex',
//                             //             flexDirection: 'column',
//                             //             gap: '6px',
//                             //             cursor: 'pointer',
//                             //         }}
//                             //     >
//                             //         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                             //             <span
//                             //                 style={{
//                             //                     fontSize: '12px',
//                             //                     fontWeight: 'bold',
//                             //                     color: '#0284c7',
//                             //                     textTransform: 'uppercase',
//                             //                 }}
//                             //             >
//                             //                 {isExtraVocab ? `Code ${sectionNumber}` : `Section ${sectionNumber}`}
//                             //             </span>

//                             //             {/* Delete Section Button */}
//                             //             <button
//                             //                 type="button"
//                             //                 title="Delete Section"
//                             //                 onClick={(e) => handleDeleteSection(e, sectionNumber)}
//                             //                 style={{
//                             //                     padding: '3px 8px',
//                             //                     fontSize: '11px',
//                             //                     color: '#ef4444',
//                             //                     backgroundColor: '#fee2e2',
//                             //                     border: 'none',
//                             //                     borderRadius: '4px',
//                             //                     cursor: 'pointer',
//                             //                     fontWeight: 600,
//                             //                 }}
//                             //             >
//                             //                 Delete
//                             //             </button>
//                             //         </div>

//                             //         <h4 style={{ margin: '4px 0 0', fontSize: '15px', color: '#1e293b' }}>
//                             //             {title}
//                             //         </h4>
//                             //         {sec.totalWords && (
//                             //             <span style={{ fontSize: '12px', color: '#64748b' }}>
//                             //                 Words: {sec.totalWords}
//                             //             </span>
//                             //         )}
//                             //     </Link>
//                             // </div>
//                             <div
//                                 key={sec._id || sec.id || index}
//                                 style={{
//                                     display: 'flex',
//                                     flexDirection: 'column',
//                                     justifyContent: 'space-between',
//                                     backgroundColor: '#ffffff',
//                                     borderRadius: '8px',
//                                     border: '1px solid #e2e8f0',
//                                     boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
//                                     transition: 'transform 0.15s ease, border-color 0.15s ease',
//                                     overflow: 'hidden',
//                                 }}
//                             >
//                                 {/* Entire clickable card content */}
//                                 <Link
//                                     to={`${routePrefix}/${sectionNumber}`}
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
//                                         {isExtraVocab ? `Code ${sectionNumber}` : `Section ${sectionNumber}`}
//                                     </span>

//                                     <h4 style={{ margin: '4px 0 0', fontSize: '15px', color: '#1e293b' }}>
//                                         {title}
//                                     </h4>

//                                     {sec.totalWords && (
//                                         <span style={{ fontSize: '12px', color: '#64748b' }}>
//                                             Words: {sec.totalWords}
//                                         </span>
//                                     )}
//                                 </Link>

//                                 {/* Dedicated action footer outside the main link */}
//                                 <div
//                                     style={{
//                                         display: 'flex',
//                                         justifyContent: 'flex-end',
//                                         padding: '8px 14px',
//                                         backgroundColor: '#f8fafc',
//                                         borderTop: '1px solid #f1f5f9',
//                                     }}
//                                 >
//                                     <button
//                                         type="button"
//                                         title="Delete Section"
//                                         onClick={(e) => {
//                                             e.preventDefault();
//                                             e.stopPropagation();
//                                             handleDeleteSection(e, sectionNumber);
//                                         }}
//                                         style={{
//                                             padding: '3px 8px',
//                                             fontSize: '11px',
//                                             color: '#ef4444',
//                                             backgroundColor: '#fee2e2',
//                                             border: 'none',
//                                             borderRadius: '4px',
//                                             cursor: 'pointer',
//                                             fontWeight: 600,
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

//             {/* Empty State */}
//             {!loading && !error && sections.length === 0 && (
//                 <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
//                     No sections found. Select a category from the sidebar.
//                 </div>
//             )}
//         </div>
//     );
// }
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router';
// import Swal from 'sweetalert2';
// import useAxiosSecure from '../Hooks/useAxiosSecure';

// export default function DocumentManager({ selectedEndpoint, editApi, activeCategory }) {
//     const axiosSecure = useAxiosSecure();
//     const [sections, setSections] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     const [isAdding, setIsAdding] = useState(false);
//     const [newSectionText, setNewSectionText] = useState('');
//     const [submitLoading, setSubmitLoading] = useState(false);
//     const [submitStatus, setSubmitStatus] = useState({ message: '', error: false });

//     // Purely dynamic values
//     const categoryTitle = activeCategory?.title || 'Sections';
//     const routePrefix = editApi || '';

//     const placeholderText = JSON.stringify(
//         {
//             sectionNumber: 1,
//             title: `New ${categoryTitle} Title`,
//         },
//         null,
//         2
//     );

//     const fetchSections = async () => {
//         if (!selectedEndpoint) return;
//         setLoading(true);
//         setError('');
//         try {
//             const response = await axiosSecure.get(selectedEndpoint);
//             const data = Array.isArray(response.data)
//                 ? response.data
//                 : response.data?.sections || response.data?.data || [];
//             setSections(data);
//         } catch (err) {
//             setError(err.response?.data?.message || err.message || 'Failed to load sections.');
//             setSections([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchSections();
//     }, [selectedEndpoint, axiosSecure]);

//     const handleCreateSection = async () => {
//         if (!newSectionText.trim()) {
//             setSubmitStatus({ message: 'Input cannot be empty.', error: true });
//             return;
//         }

//         let parsedPayload;
//         try {
//             parsedPayload = JSON.parse(newSectionText);
//         } catch (parseErr) {
//             setSubmitStatus({
//                 message: `Invalid JSON syntax: ${parseErr.message}`,
//                 error: true,
//             });
//             return;
//         }

//         setSubmitLoading(true);
//         setSubmitStatus({ message: '', error: false });

//         try {
//             const response = await axiosSecure.post(selectedEndpoint, parsedPayload);

//             Swal.fire({
//                 icon: 'success',
//                 title: 'Created!',
//                 text: response.data?.message || 'Section created successfully!',
//                 timer: 1500,
//                 showConfirmButton: false,
//             });

//             setNewSectionText('');
//             setIsAdding(false);
//             await fetchSections();
//         } catch (err) {
//             setSubmitStatus({
//                 message: err.response?.data?.message || err.message || 'Failed to save section.',
//                 error: true,
//             });
//         } finally {
//             setSubmitLoading(false);
//         }
//     };

//     const handleDeleteSection = async (e, sectionIdentifier) => {
//         e.preventDefault();
//         e.stopPropagation();

//         const result = await Swal.fire({
//             title: `Delete Section ${sectionIdentifier}?`,
//             text: "You won't be able to revert this!",
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
//             await axiosSecure.delete(`${selectedEndpoint}/${sectionIdentifier}`);

//             setSections((prev) =>
//                 prev.filter((item) => {
//                     const itemIdentifier =
//                         item.sectionNumber ?? item.code ?? item.theme?.code ?? item.section ?? item.id;
//                     return String(itemIdentifier) !== String(sectionIdentifier);
//                 })
//             );

//             Swal.fire({
//                 icon: 'success',
//                 title: 'Deleted!',
//                 text: `Section ${sectionIdentifier} has been deleted.`,
//                 timer: 1500,
//                 showConfirmButton: false,
//             });
//         } catch (err) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Delete Failed',
//                 text: err.response?.data?.message || err.message || 'Failed to delete section.',
//             });
//         }
//     };

//     return (
//         <div style={{ width: '100%', fontFamily: 'sans-serif' }}>
//             {/* Header */}
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
//                         Endpoint: {selectedEndpoint || 'None'}
//                     </span>
//                 </div>

//                 {/* Dynamic Buttons */}
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
//                             transition: 'background-color 0.15s ease',
//                         }}
//                     >
//                         {isAdding ? 'Close Panel' : '+ Add Section'}
//                     </button>
//                 </div>
//             </div>

//             {/* Add Section Input Panel */}
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
//                             Enter New Section JSON ({categoryTitle})
//                         </span>
//                         <span style={{ fontSize: '12px', color: '#64748b' }}>
//                             Target API: <code>{selectedEndpoint}</code>
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
//                             boxSizing: 'border-box',
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
//                             {submitLoading ? 'Saving...' : 'Save Section'}
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* Loading State */}
//             {loading && (
//                 <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
//                     Loading sections...
//                 </div>
//             )}

//             {/* Error State */}
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

//             {/* Sections Grid View */}
//             {!loading && !error && (
//                 <div
//                     style={{
//                         display: 'grid',
//                         gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
//                         gap: '16px',
//                     }}
//                 >
//                     {sections.map((sec, index) => {
//                         const sectionNumber =
//                             sec.sectionNumber ?? sec.code ?? sec.theme?.code ?? sec.section ?? sec.id ?? index + 1;
//                         const title = sec.title || sec.theme?.title || `Section ${sectionNumber}`;

//                         return (
//                             <div
//                                 key={sec._id || sec.id || index}
//                                 style={{
//                                     display: 'flex',
//                                     flexDirection: 'column',
//                                     justifyContent: 'space-between',
//                                     backgroundColor: '#ffffff',
//                                     borderRadius: '8px',
//                                     border: '1px solid #e2e8f0',
//                                     boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
//                                     transition: 'transform 0.15s ease, border-color 0.15s ease',
//                                     overflow: 'hidden',
//                                 }}
//                             >
//                                 <Link
//                                     to={`${routePrefix}/${sectionNumber}`}
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
//                                         Entry {sectionNumber}
//                                     </span>

//                                     <h4 style={{ margin: '4px 0 0', fontSize: '15px', color: '#1e293b' }}>
//                                         {title}
//                                     </h4>

//                                     {sec.totalWords && (
//                                         <span style={{ fontSize: '12px', color: '#64748b' }}>
//                                             Words: {sec.totalWords}
//                                         </span>
//                                     )}
//                                 </Link>

//                                 <div
//                                     style={{
//                                         display: 'flex',
//                                         justifyContent: 'flex-end',
//                                         padding: '8px 14px',
//                                         backgroundColor: '#f8fafc',
//                                         borderTop: '1px solid #f1f5f9',
//                                     }}
//                                 >
//                                     <button
//                                         type="button"
//                                         title="Delete Section"
//                                         onClick={(e) => handleDeleteSection(e, sectionNumber)}
//                                         style={{
//                                             padding: '3px 8px',
//                                             fontSize: '11px',
//                                             color: '#ef4444',
//                                             backgroundColor: '#fee2e2',
//                                             border: 'none',
//                                             borderRadius: '4px',
//                                             cursor: 'pointer',
//                                             fontWeight: 600,
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

//             {/* Empty State */}
//             {!loading && !error && sections.length === 0 && (
//                 <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
//                     No sections found. Select a category from the sidebar.
//                 </div>
//             )}
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';

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

export default function DocumentManager({ selectedEndpoint, editApi, activeCategory }) {
    const axiosSecure = useAxiosSecure();
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [isAdding, setIsAdding] = useState(false);
    const [newSectionText, setNewSectionText] = useState('');
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ message: '', error: false });

    const categoryTitle = activeCategory?.title || 'Sections';
    const routePrefix = editApi || '';
    const isCourseCategory = selectedEndpoint?.includes('courses');

    const placeholderText = JSON.stringify(
        {
            sectionNumber: 1,
            title: `New ${categoryTitle} Title`,
        },
        null,
        2
    );

    const fetchSections = async () => {
        if (!selectedEndpoint) return;
        setLoading(true);
        setError('');
        try {
            const response = await axiosSecure.get(selectedEndpoint);
            const data = Array.isArray(response.data)
                ? response.data
                : response.data?.sections || response.data?.data || [];
            setSections(data);
        } catch (err) {
            setError(String(err.response?.data?.message || err.message || 'Failed to load sections.'));
            setSections([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSections();
    }, [selectedEndpoint, axiosSecure]);

    // Handle editing section title directly (for Regular and Extra Vocabulary)
    const handleEditTitle = async (e, sec) => {
        e.preventDefault();
        e.stopPropagation();

        const rawIdentifier = sec.courseId ?? sec.sectionNumber ?? sec.code ?? sec.theme?.code ?? sec.id;
        const cleanIdentifier = sanitizeId(rawIdentifier);
        const currentTitle = sec.title || sec.courseTitle || sec.theme?.title || '';

        const { value: newTitle } = await Swal.fire({
            title: `Edit Title for #${cleanIdentifier}`,
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
            const response = await axiosSecure.put(`${selectedEndpoint}/${cleanIdentifier}`, {
                title: newTitle.trim(),
            });

            // Optimistically update title in state
            setSections((prev) =>
                prev.map((item) => {
                    const itemId = sanitizeId(item.courseId ?? item.sectionNumber ?? item.code ?? item.theme?.code ?? item.id);
                    if (itemId === cleanIdentifier) {
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

    // Handle saving new section safely
    const handleCreateSection = async () => {
        if (!newSectionText.trim()) {
            setSubmitStatus({ message: 'Input cannot be empty.', error: true });
            return;
        }

        let parsedPayload;
        try {
            parsedPayload = safeJsonParse(newSectionText);
        } catch (parseErr) {
            setSubmitStatus({
                message: `Invalid JSON syntax: ${parseErr.message}`,
                error: true,
            });
            return;
        }

        setSubmitLoading(true);
        setSubmitStatus({ message: '', error: false });

        try {
            const response = await axiosSecure.post(selectedEndpoint, parsedPayload);

            Swal.fire({
                icon: 'success',
                title: 'Created!',
                text: String(response.data?.message || 'Section created successfully!'),
                timer: 1500,
                showConfirmButton: false,
            });

            setNewSectionText('');
            setIsAdding(false);
            await fetchSections();
        } catch (err) {
            setSubmitStatus({
                message: String(err.response?.data?.message || err.message || 'Failed to save section.'),
                error: true,
            });
        } finally {
            setSubmitLoading(false);
        }
    };

    // Handle deleting section/course safely
    const handleDeleteSection = async (e, rawIdentifier) => {
        e.preventDefault();
        e.stopPropagation();

        const cleanIdentifier = sanitizeId(rawIdentifier);
        if (!cleanIdentifier) return;

        const result = await Swal.fire({
            title: `Delete Item ${cleanIdentifier}?`,
            text: "You won't be able to revert this!",
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
            await axiosSecure.delete(`${selectedEndpoint}/${cleanIdentifier}`);

            // Optimistically remove item from UI
            setSections((prev) =>
                prev.filter((item) => {
                    const itemIdentifier =
                        item.courseId ?? item.sectionNumber ?? item.code ?? item.theme?.code ?? item.section ?? item.id;
                    return sanitizeId(itemIdentifier) !== cleanIdentifier;
                })
            );

            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: `Item ${cleanIdentifier} has been deleted.`,
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

    // Empty state when no category is selected
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
            {/* Header */}
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
                        Endpoint: {selectedEndpoint || 'None'}
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link
                        to={`${routePrefix}/new`}
                        state={{ activeCategory }}
                        style={{
                            textDecoration: 'none',
                            padding: '8px 16px',
                            backgroundColor: '#0284c7',
                            color: '#ffffff',
                            fontWeight: 600,
                            fontSize: '13px',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        + New JSON Document
                    </Link>

                    <button
                        type="button"
                        onClick={() => {
                            setIsAdding((prev) => !prev);
                            setSubmitStatus({ message: '', error: false });
                        }}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: isAdding ? '#64748b' : '#0f172a',
                            color: '#ffffff',
                            fontWeight: 600,
                            fontSize: '13px',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                        }}
                    >
                        {isAdding ? 'Close Panel' : '+ Add Section'}
                    </button>
                </div>
            </div>

            {/* Add Section Input Panel */}
            {isAdding && (
                <div
                    style={{
                        marginBottom: '24px',
                        padding: '18px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                            Enter New Section JSON ({categoryTitle})
                        </span>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>
                            Target API: <code>{selectedEndpoint}</code>
                        </span>
                    </div>

                    <textarea
                        value={newSectionText}
                        onChange={(e) => setNewSectionText(e.target.value)}
                        placeholder={placeholderText}
                        spellCheck={false}
                        style={{
                            width: '100%',
                            height: '140px',
                            padding: '12px',
                            fontFamily: 'monospace',
                            fontSize: '13.5px',
                            lineHeight: '1.5',
                            backgroundColor: '#ffffff',
                            color: '#1e293b',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            outline: 'none',
                            boxSizing: 'border-box',
                            resize: 'vertical',
                            whiteSpace: 'pre',
                        }}
                    />

                    {submitStatus.message && (
                        <div
                            style={{
                                marginTop: '10px',
                                padding: '8px 12px',
                                borderRadius: '4px',
                                fontSize: '13px',
                                backgroundColor: submitStatus.error ? '#fee2e2' : '#dcfce7',
                                color: submitStatus.error ? '#991b1b' : '#166534',
                            }}
                        >
                            {submitStatus.message}
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                        <button
                            type="button"
                            onClick={() => {
                                setIsAdding(false);
                                setNewSectionText('');
                                setSubmitStatus({ message: '', error: false });
                            }}
                            style={{
                                padding: '7px 14px',
                                backgroundColor: '#f1f5f9',
                                color: '#475569',
                                border: '1px solid #cbd5e1',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '13px',
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleCreateSection}
                            disabled={submitLoading}
                            style={{
                                padding: '7px 18px',
                                backgroundColor: submitLoading ? '#86efac' : '#16a34a',
                                color: '#ffffff',
                                fontWeight: 600,
                                border: 'none',
                                borderRadius: '6px',
                                cursor: submitLoading ? 'not-allowed' : 'pointer',
                                fontSize: '13px',
                            }}
                        >
                            {submitLoading ? 'Saving...' : 'Save Section'}
                        </button>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    Loading sections...
                </div>
            )}

            {/* Error State */}
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

            {/* Sections Grid View */}
            {!loading && !error && (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                        gap: '16px',
                    }}
                >
                    {sections.map((sec, index) => {
                        // Priority 1: courseId, Priority 2: sectionNumber, Priority 3: code, Priority 4: theme.code, Priority 5: id
                        const rawIdentifier =
                            sec.courseId ??
                            sec.sectionNumber ??
                            sec.code ??
                            sec.theme?.code ??
                            sec.id ??
                            index + 1;

                        const sectionNumber = sanitizeId(rawIdentifier);
                        const title = sec.title || sec.courseTitle || sec.theme?.title || `Item #${sectionNumber}`;

                        return (
                            <div
                                key={sec._id || sec.courseId || sec.id || index}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '8px',
                                    border: '1px solid #e2e8f0',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                                    transition: 'transform 0.15s ease, border-color 0.15s ease',
                                    overflow: 'hidden',
                                }}
                            >
                                <Link
                                    to={`${routePrefix}/${sectionNumber}`}
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
                                        Entry {index + 1}
                                    </span>

                                    <h4 style={{ margin: '4px 0 0', fontSize: '15px', color: '#1e293b' }}>
                                        {title}
                                    </h4>

                                    {sec.totalWords && (
                                        <span style={{ fontSize: '12px', color: '#64748b' }}>
                                            Words: {sec.totalWords}
                                        </span>
                                    )}
                                </Link>

                                {/* Action Buttons Footer */}
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
                                    {/* ONLY show Edit Title button for Vocab sections, NEVER for Courses */}
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

                                    {/* Delete button: always rendered, pushed right if Edit Title is absent */}
                                    <button
                                        type="button"
                                        title="Delete Item"
                                        onClick={(e) => handleDeleteSection(e, sectionNumber)}
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
                    No sections found for {categoryTitle}.
                </div>
            )}
        </div>
    );
}
