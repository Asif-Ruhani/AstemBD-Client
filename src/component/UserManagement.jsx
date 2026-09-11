import React, { useEffect, useMemo, useState } from 'react';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';

const UserManagement = () => {
    const { user, loading: authLoading } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [updatingUid, setUpdatingUid] = useState(null);

    // Fetch all users with Bearer Token
    useEffect(() => {
        if (authLoading || !user) return;

        const fetchUsers = async () => {
            setLoading(true);
            try {
                const token = await user.getIdToken();
                const response = await fetch('https://astembd-server.onrender.com/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch users: ${response.status}`);
                }

                const data = await response.json();
                setUsers(data.users || []);
            } catch (error) {
                console.error('Fetch users error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to load users',
                    text: error.message
                });
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [user, authLoading]);

    // Handle Active / Block Status Toggle
    const handleToggleStatus = async (targetUser) => {
        const currentStatus = targetUser.status || 'active';
        const nextStatus = currentStatus === 'active' ? 'blocked' : 'active';

        setUpdatingUid(targetUser.uid);
        try {
            const token = await user.getIdToken();
            const response = await fetch(`https://astembd-server.onrender.com/users/${targetUser.uid}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: nextStatus })
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || 'Failed to update status');
            }

            // Optimistically update local state
            setUsers((prev) =>
                prev.map((u) => (u.uid === targetUser.uid ? { ...u, status: nextStatus } : u))
            );

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: `User ${nextStatus === 'active' ? 'Activated' : 'Blocked'}`,
                showConfirmButton: false,
                timer: 2000
            });
        } catch (error) {
            console.error('Status toggle error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Update failed',
                text: error.message
            });
        } finally {
            setUpdatingUid(null);
        }
    };

    // Live Multi-Parameter Search Filtering
    const filteredUsers = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        if (!q) return users;

        return users.filter((u) => {
            const name = (u.displayName || '').toLowerCase();
            const email = (u.email || '').toLowerCase();
            const phone = (u.phoneNumber || u.phone || '').toLowerCase();
            const status = (u.status || 'active').toLowerCase();
            const track = (u.targetExam || '').toLowerCase();

            return (
                name.includes(q) ||
                email.includes(q) ||
                phone.includes(q) ||
                status.includes(q) ||
                track.includes(q)
            );
        });
    }, [users, searchQuery]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-sm">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                            User Directory
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
                            Manage student accounts and account active/blocked status.
                        </p>
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full md:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name, email, phone, status..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition shadow-inner"
                        />
                    </div>
                </div>

                {/* Users Table Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/30 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                                    <th className="py-4 px-6">User Profile & Metadata</th>
                                    <th className="py-4 px-6 text-right">Access Control</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60 text-sm">
                                {loading ? (
                                    <tr>
                                        <td colSpan={2} className="py-12 text-center text-slate-400 dark:text-zinc-500">
                                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-300 border-t-slate-900 dark:border-zinc-700 dark:border-t-white mb-2" />
                                            <p className="text-xs">Loading directory...</p>
                                        </td>
                                    </tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={2} className="py-12 text-center text-slate-400 dark:text-zinc-500">
                                            No matching records found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((u) => {
                                        const isBlocked = u.status === 'blocked';
                                        const isProcessing = updatingUid === u.uid;

                                        return (
                                            <tr
                                                key={u.uid}
                                                className="hover:bg-slate-50/70 dark:hover:bg-zinc-800/40 transition-colors duration-150"
                                            >
                                                {/* Column 1: User Profile & Metadata */}
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-4">
                                                        {u.photoURL ? (
                                                            <img
                                                                src={u.photoURL}
                                                                alt={u.displayName || 'Avatar'}
                                                                className="w-11 h-11 rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-zinc-800 shadow-sm"
                                                            />
                                                        ) : (
                                                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-800 to-zinc-900 text-white flex items-center justify-center font-bold text-base shadow-sm ring-2 ring-slate-100 dark:ring-zinc-800">
                                                                {(u.displayName || u.email || 'U').charAt(0).toUpperCase()}
                                                            </div>
                                                        )}
                                                        <div className="flex flex-col min-w-0">
                                                            <span className="font-bold text-slate-900 dark:text-white truncate">
                                                                {u.displayName || 'Unnamed User'}
                                                            </span>
                                                            <span className="text-xs text-slate-500 dark:text-zinc-400 truncate">
                                                                {u.email}
                                                            </span>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                {u.phoneNumber && (
                                                                    <span className="text-[11px] text-slate-500 dark:text-zinc-400">
                                                                        📞 {u.phoneNumber}
                                                                    </span>
                                                                )}
                                                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300">
                                                                    {u.targetExam || 'General'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Column 2: Toggle Button (Active / Blocked) */}
                                                <td className="py-4 px-6 text-right">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <span
                                                            className={`text-xs font-semibold ${isBlocked ? 'text-rose-500' : 'text-emerald-500'}`}
                                                        >
                                                            {isBlocked ? 'Blocked' : 'Active'}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            disabled={isProcessing}
                                                            onClick={() => handleToggleStatus(u)}
                                                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-50 ${isBlocked ? 'bg-slate-300 dark:bg-zinc-700' : 'bg-emerald-500'
                                                                }`}
                                                        >
                                                            <span
                                                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isBlocked ? 'translate-x-0' : 'translate-x-5'
                                                                    }`}
                                                            />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserManagement;