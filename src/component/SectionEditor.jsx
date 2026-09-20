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

    // Supports both single param (:id) and compound params (:courseId/:sectionNumber)
    const paramValues = Object.values(params);
    const isCreatingNew = location.pathname.endsWith('/new') || paramValues.includes('new');

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
        location.pathname.includes('all-courses-edit') ||
        location.pathname.includes('/all-courses')
    );

    // Extract CourseId and SectionNumber accurately based on category type
    const { targetCourseId, targetSectionNumber } = useMemo(() => {
        if (isCourseCategory) {
            const id = sanitizeId(paramValues[0] || activeCategory?.courseId);
            return { targetCourseId: id, targetSectionNumber: null };
        }

        // Section details: if route has 2 params (/edit/:courseId/:sectionNumber)
        if (paramValues.length >= 2) {
            return {
                targetCourseId: sanitizeId(paramValues[0]),
                targetSectionNumber: sanitizeId(paramValues[1]),
            };
        }

        // Fallback for single param route (/edit/:sectionNumber) using activeCategory
        return {
            targetCourseId: sanitizeId(activeCategory?.courseId),
            targetSectionNumber: sanitizeId(paramValues[0]),
        };
    }, [paramValues, isCourseCategory, activeCategory]);

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

        const currentTrackStatus = activeCategory?.filterQuery?.status || 'regular';
        return JSON.stringify(
            {
                courseId: activeCategory?.courseId || 'CRS_BEV_CONV_01',
                sectionNumber: currentTrackStatus === 'extra' ? 31 : 1,
                title: 'New Section Title',
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
        if (isCreatingNew) {
            setRawJsonText(newDocumentTemplate);
            return;
        }

        if (isCourseCategory && !targetCourseId) return;
        if (!isCourseCategory && (!targetCourseId || !targetSectionNumber)) return;

        const fetchDocumentData = async () => {
            setLoading(true);
            setStatus({ message: '', error: false });

            try {
                // Course uses single courseId, Section details uses /:courseId/:sectionNumber
                const requestUrl = isCourseCategory
                    ? `${apiBase}/${targetCourseId}`
                    : `${apiBase}/${targetCourseId}/${targetSectionNumber}`;

                const response = await axiosSecure.get(requestUrl);
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
    }, [
        isCreatingNew,
        isCourseCategory,
        targetCourseId,
        targetSectionNumber,
        apiBase,
        axiosSecure,
        newDocumentTemplate,
    ]);

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

            let saveEndpoint = '';
            const method = isCreatingNew ? 'post' : 'put';

            if (isCourseCategory) {
                const finalCourseId = sanitizeId(parsedPayload.courseId || targetCourseId);
                if (!finalCourseId) {
                    throw new Error('Please specify a valid "courseId" in your Course JSON.');
                }
                parsedPayload.courseId = finalCourseId;
                saveEndpoint = isCreatingNew ? `${apiBase}/new` : `${apiBase}/${finalCourseId}`;
            } else {
                const finalCourseId = sanitizeId(parsedPayload.courseId || activeCategory?.courseId || targetCourseId);
                const finalSectionNumber = sanitizeId(parsedPayload.sectionNumber || targetSectionNumber);

                if (!finalCourseId) {
                    throw new Error('Valid "courseId" is required.');
                }
                if (!finalSectionNumber) {
                    throw new Error('Valid numeric "sectionNumber" is required.');
                }

                parsedPayload.courseId = finalCourseId;
                parsedPayload.sectionNumber = Number(finalSectionNumber);

                // Both POST and PUT target /english-vocab-details/:courseId/:sectionNumber
                saveEndpoint = `${apiBase}/${finalCourseId}/${finalSectionNumber}`;
            }

            const response = await axiosSecure[method](saveEndpoint, parsedPayload);

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
                    title: 'Duplicate Detected!',
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
        const itemLabel = isCourseCategory
            ? `Course "${targetCourseId}"`
            : `Section #${targetSectionNumber} for "${targetCourseId}"`;

        const result = await Swal.fire({
            title: `Delete ${itemLabel}?`,
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
                await axiosSecure.delete(`/all-courses/${targetCourseId}`);
            } else {
                // DELETE /english-vocab-details/:courseId/:sectionNumber
                await axiosSecure.delete(`${apiBase}/${targetCourseId}/${targetSectionNumber}`);
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

    const headerTitle = isCreatingNew
        ? 'New Document'
        : isCourseCategory
            ? targetCourseId
            : `Section #${targetSectionNumber} (${targetCourseId})`;

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
                        {activeCategory?.title || 'Editor'} — {headerTitle}
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