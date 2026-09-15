import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';

export default function SectionEditor() {
    const { sectionNumber, code } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const activeId = sectionNumber || code;
    const isCreatingNew = activeId === 'new';

    const isExtra = location.pathname.includes('extra-section-edit');

    const apiBase = isExtra
        ? '/everydayWordExtraSectionDetail'
        : '/everydayWordSectionDetail';

    const textareaRef = useRef(null);
    const [rawJsonText, setRawJsonText] = useState('');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [status, setStatus] = useState({ message: '', error: false });

    // Search States
    const [searchTerm, setSearchTerm] = useState('');
    const [matches, setMatches] = useState([]);
    const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);

    // Initial boilerplate for brand new documents
    const newDocumentTemplate = isExtra
        ? JSON.stringify(
            {
                theme: {
                    code: 1,
                    title: "New Extra Theme",
                    logo: "🌟"
                },
                subsections: []
            },
            null,
            2
        )
        : JSON.stringify(
            {
                sectionNumber: 1,
                title: "নতুন সেকশন",
                words: []
            },
            null,
            2
        );

    // 1. Fetch section data if not creating new
    useEffect(() => {
        if (!activeId) return;

        if (isCreatingNew) {
            setRawJsonText(newDocumentTemplate);
            return;
        }

        const fetchSectionData = async () => {
            setLoading(true);
            setStatus({ message: '', error: false });

            try {
                const response = await axiosSecure.get(`${apiBase}/${activeId}`);
                setRawJsonText(JSON.stringify(response.data, null, 2));
            } catch (err) {
                setStatus({
                    message: err.response?.data?.message || err.message || 'Failed to fetch section data.',
                    error: true,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchSectionData();
    }, [activeId, apiBase, axiosSecure, isCreatingNew]);

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

    // 2. Save or Add Document
    const handleSaveToDatabase = async () => {
        setSaving(true);
        setStatus({ message: '', error: false });

        try {
            if (!rawJsonText.trim()) {
                throw new Error('Content cannot be empty.');
            }

            let parsedPayload;
            try {
                parsedPayload = JSON.parse(rawJsonText);
            } catch (parseErr) {
                throw new Error(`Invalid JSON syntax: ${parseErr.message}`);
            }

            // Determine numeric ID from parsed payload if in 'new' mode
            let targetId = activeId;
            if (isCreatingNew) {
                targetId = isExtra
                    ? parsedPayload.code ?? parsedPayload.theme?.code
                    : parsedPayload.sectionNumber;

                if (!targetId) {
                    throw new Error(
                        isExtra
                            ? 'Please specify a numeric "theme.code" or "code" inside your JSON.'
                            : 'Please specify a numeric "sectionNumber" inside your JSON.'
                    );
                }
            }

            const response = await axiosSecure.post(`${apiBase}/${targetId}`, parsedPayload);

            setStatus({
                message: response.data?.message || `Document saved successfully!`,
                error: false,
            });

            // If created as new, redirect to its dedicated edit path
            if (isCreatingNew) {
                const redirectBase = isExtra
                    ? '/english-vocab/everyday-Word/extra-section-edit'
                    : '/english-vocab/everyday-Word/section-edit';
                setTimeout(() => navigate(`${redirectBase}/${targetId}`, { replace: true }), 1000);
            }
        } catch (err) {
            setStatus({
                message: err.response?.data?.message || err.message || 'Error saving to database.',
                error: true,
            });
        } finally {
            setSaving(false);
        }
    };

    // 3. Delete Document Details
    const handleDeleteDocument = async () => {
        const confirmed = window.confirm(
            `Are you sure you want to delete this document from the database? This cannot be undone.`
        );
        if (!confirmed) return;

        setDeleting(true);
        setStatus({ message: '', error: false });

        try {
            const response = await axiosSecure.delete(`${apiBase}/${activeId}`);
            alert(response.data?.message || 'Document deleted successfully.');
            navigate(-1);
        } catch (err) {
            setStatus({
                message: err.response?.data?.message || err.message || 'Error deleting document.',
                error: true,
            });
            setDeleting(false);
        }
    };

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
                            const activeCategory = isExtra
                                ? { api: '/extra-vocab/sections', editRoute: '/english-vocab/everyday-Word/extra-section-edit' }
                                : { api: '/sections', editRoute: '/english-vocab/everyday-Word/section-edit' };

                            localStorage.setItem('admin_active_category', JSON.stringify(activeCategory));
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
                        {isExtra ? 'Extra Vocabulary' : 'Regular Vocabulary'} —{' '}
                        {isCreatingNew
                            ? 'New Document Creation'
                            : isExtra
                                ? `Code: ${activeId}`
                                : `Section: ${activeId}`}
                    </h2>
                </div>

                {/* Save and Delete Actions */}
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

            {/* Textarea View */}
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

