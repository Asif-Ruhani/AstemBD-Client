import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';

export default function DocumentManager({ selectedEndpoint, editRoute }) {
    const axiosSecure = useAxiosSecure();
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Add Section UI & Action States
    const [isAdding, setIsAdding] = useState(false);
    const [newSectionText, setNewSectionText] = useState('');
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ message: '', error: false });

    const isExtraVocab = selectedEndpoint === '/extra-vocab/sections';

    // Fallback route prefix if not directly provided
    const routePrefix = editRoute || (
        isExtraVocab
            ? '/english-vocab/everyday-Word/extra-section-edit'
            : '/english-vocab/everyday-Word/section-edit'
    );

    // Dynamic placeholders based on endpoint type
    const placeholderText = isExtraVocab
        ? `{\n  "code": 1,\n  "logo": "🏠",\n  "title": "Home, Household & Daily Routine"\n}`
        : `{\n  "sectionNumber": 1,\n  "title": "ঘুম থেকে জাগরণ ও সকালের সূচনা"\n}`;

    // Fetch sections list
    const fetchSections = async () => {
        if (!selectedEndpoint) return;
        setLoading(true);
        setError('');
        try {
            const response = await axiosSecure.get(selectedEndpoint);
            const data = Array.isArray(response.data)
                ? response.data
                : response.data.sections || response.data.data || [];
            setSections(data);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to load sections.');
            setSections([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSections();
    }, [selectedEndpoint, axiosSecure]);

    // Handle saving the new section
    const handleCreateSection = async () => {
        if (!newSectionText.trim()) {
            setSubmitStatus({ message: 'Input cannot be empty.', error: true });
            return;
        }

        let parsedPayload;
        try {
            parsedPayload = JSON.parse(newSectionText);
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
            const targetApi = isExtraVocab ? '/extra-vocab/sections' : '/sections';
            const response = await axiosSecure.post(targetApi, parsedPayload);

            Swal.fire({
                icon: 'success',
                title: 'Created!',
                text: response.data?.message || 'Section created successfully!',
                timer: 1500,
                showConfirmButton: false,
            });

            setNewSectionText('');
            setIsAdding(false);
            await fetchSections();
        } catch (err) {
            setSubmitStatus({
                message: err.response?.data?.message || err.message || 'Failed to save section.',
                error: true,
            });
        } finally {
            setSubmitLoading(false);
        }
    };

    // Handle deleting section with SweetAlert2 modal
    const handleDeleteSection = async (e, sectionIdentifier) => {
        e.preventDefault();
        e.stopPropagation();

        const result = await Swal.fire({
            title: `Delete Section ${sectionIdentifier}?`,
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
            const deleteEndpoint = isExtraVocab
                ? `/extra-vocab/sections/${sectionIdentifier}`
                : `/sections/${sectionIdentifier}`;

            await axiosSecure.delete(deleteEndpoint);

            // Remove from active state immediately
            setSections((prev) =>
                prev.filter((item) => {
                    const itemIdentifier = item.sectionNumber ?? item.code ?? item.theme?.code ?? item.section;
                    return String(itemIdentifier) !== String(sectionIdentifier);
                })
            );

            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: `Section ${sectionIdentifier} has been deleted.`,
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Delete Failed',
                text: err.response?.data?.message || err.message || 'Failed to delete section.',
            });
        }
    };

    return (
        <div style={{ width: '100%', fontFamily: 'sans-serif' }}>
            {/* Header with Action Buttons */}
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
                    <h2 style={{ margin: 0, color: '#0f172a' }}>All Sections</h2>
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

                {/* Top-Right Action Controls */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link
                        to={
                            isExtraVocab
                                ? '/english-vocab/everyday-Word/extra-section-edit/new'
                                : '/english-vocab/everyday-Word/section-edit/new'
                        }
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
                            transition: 'background-color 0.15s ease',
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
                            Enter New Section JSON ({isExtraVocab ? 'Extra Vocabulary' : 'Regular Vocabulary'})
                        </span>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>
                            Target API: <code>{isExtraVocab ? '/extra-vocab/sections' : '/sections'}</code>
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
                        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                        gap: '16px',
                    }}
                >
                    {sections.map((sec, index) => {
                        const sectionNumber = sec.sectionNumber ?? sec.section ?? sec.code ?? index + 1;
                        const title = sec.title || `Section ${sectionNumber}`;

                        return (
                            <div
                                key={sec._id || sec.id || index}
                                style={{
                                    position: 'relative',
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
                                    style={{
                                        textDecoration: 'none',
                                        padding: '18px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '6px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span
                                            style={{
                                                fontSize: '12px',
                                                fontWeight: 'bold',
                                                color: '#0284c7',
                                                textTransform: 'uppercase',
                                            }}
                                        >
                                            {isExtraVocab ? `Code ${sectionNumber}` : `Section ${sectionNumber}`}
                                        </span>

                                        {/* Delete Section Button */}
                                        <button
                                            type="button"
                                            title="Delete Section"
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
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>

                                    <h4 style={{ margin: '4px 0 0', fontSize: '15px', color: '#1e293b' }}>
                                        {title}
                                    </h4>
                                    {sec.totalWords && (
                                        <span style={{ fontSize: '12px', color: '#64748b' }}>
                                            Words: {sec.totalWords}
                                        </span>
                                    )}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && sections.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                    No sections found. Select a category from the sidebar.
                </div>
            )}
        </div>
    );
}
