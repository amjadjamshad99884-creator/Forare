'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSubmissionItem from '@/components/admin/AdminSubmissionItem';
import { LogOut, Users, FileText, CheckCircle, Clock, TrendingUp, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Submission {
    id: string;
    type: string;
    payload: string;
    status: string;
    createdAt: string;
}

interface Stats {
    total: number;
    pending: number;
    resolved: number;
    today: number;
    byType: Record<string, number>;
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'analytics'>('overview');
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, resolved: 0, today: 0, byType: {} });
    const [filterType, setFilterType] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const router = useRouter();

    useEffect(() => {
        const auth = sessionStorage.getItem('admin_authenticated');
        if (auth !== 'true') {
            router.push('/adminportal');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    const calculateStats = (data: Submission[]) => {
        const today = new Date().toDateString();
        const stats: Stats = {
            total: data.length,
            pending: data.filter(s => s.status === 'PENDING').length,
            resolved: data.filter(s => s.status !== 'PENDING').length,
            today: data.filter(s => new Date(s.createdAt).toDateString() === today).length,
            byType: {}
        };

        data.forEach(s => {
            stats.byType[s.type] = (stats.byType[s.type] || 0) + 1;
        });

        setStats(stats);
    };

    const fetchSubmissions = async () => {
        try {
            const res = await fetch('/api/admin/submissions');
            if (res.ok) {
                const data = await res.json();
                setSubmissions(data);
                setFilteredSubmissions(data);
                calculateStats(data);
            }
        } catch (error) {
            console.error('Error fetching submissions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchSubmissions();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        let filtered = submissions;
        if (filterType !== 'all') {
            filtered = filtered.filter(s => s.type === filterType);
        }
        if (filterStatus !== 'all') {
            filtered = filtered.filter(s => s.status === filterStatus);
        }
        setFilteredSubmissions(filtered);
    }, [filterType, filterStatus, submissions]);

    const handleLogout = () => {
        sessionStorage.removeItem('admin_authenticated');
        router.push('/adminportal');
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white">Checking authentication...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            {/* Header */}
            <header className="bg-black/50 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-yellow-300 bg-clip-text text-transparent">
                            Forare Admin
                        </h1>
                        <p className="text-sm text-gray-400">Dashboard & Management</p>
                    </div>
                    <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Navigation Tabs */}
                <div className="flex gap-2 mb-8 bg-white/5 p-2 rounded-xl border border-white/10 w-fit">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-6 py-3 rounded-lg transition-all font-medium ${activeTab === 'overview'
                                ? 'bg-primary text-gray-900 shadow-lg'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('submissions')}
                        className={`px-6 py-3 rounded-lg transition-all font-medium ${activeTab === 'submissions'
                                ? 'bg-primary text-gray-900 shadow-lg'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        Submissions
                    </button>
                    <button
                        onClick={() => setActiveTab('analytics')}
                        className={`px-6 py-3 rounded-lg transition-all font-medium ${activeTab === 'analytics'
                                ? 'bg-primary text-gray-900 shadow-lg'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        Analytics
                    </button>
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <FileText className="w-8 h-8 text-blue-400" />
                                    <span className="text-3xl font-bold text-blue-400">{stats.total}</span>
                                </div>
                                <h3 className="text-gray-400 text-sm font-medium">Total Submissions</h3>
                            </div>

                            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <Clock className="w-8 h-8 text-yellow-400" />
                                    <span className="text-3xl font-bold text-yellow-400">{stats.pending}</span>
                                </div>
                                <h3 className="text-gray-400 text-sm font-medium">Pending Review</h3>
                            </div>

                            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <CheckCircle className="w-8 h-8 text-green-400" />
                                    <span className="text-3xl font-bold text-green-400">{stats.resolved}</span>
                                </div>
                                <h3 className="text-gray-400 text-sm font-medium">Resolved</h3>
                            </div>

                            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <Calendar className="w-8 h-8 text-purple-400" />
                                    <span className="text-3xl font-bold text-purple-400">{stats.today}</span>
                                </div>
                                <h3 className="text-gray-400 text-sm font-medium">Today</h3>
                            </div>
                        </div>

                        {/* Recent Submissions */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                Recent Submissions
                            </h2>
                            {loading ? (
                                <div className="text-center py-8 text-gray-500">Loading...</div>
                            ) : submissions.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">No submissions yet</div>
                            ) : (
                                <div className="space-y-4">
                                    {submissions.slice(0, 5).map((submission) => (
                                        <AdminSubmissionItem
                                            key={submission.id}
                                            submission={submission}
                                            onUpdate={fetchSubmissions}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Submissions Tab */}
                {activeTab === 'submissions' && (
                    <div className="space-y-6">
                        {/* Filters */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h2 className="text-lg font-semibold mb-4">Filters</h2>
                            <div className="flex flex-wrap gap-4">
                                <div>
                                    <label className="text-sm text-gray-400 mb-2 block">Type</label>
                                    <select
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                        className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                                    >
                                        <option value="all">All Types</option>
                                        <option value="Contact">Contact</option>
                                        <option value="Booking">Booking</option>
                                        <option value="Delivery">Delivery</option>
                                        <option value="Moving">Moving</option>
                                        <option value="Driver">Driver Application</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400 mb-2 block">Status</label>
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="PENDING">Pending</option>
                                        <option value="RESOLVED">Resolved</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Submissions List */}
                        {loading ? (
                            <div className="text-center py-12 text-gray-500">Loading submissions...</div>
                        ) : filteredSubmissions.length === 0 ? (
                            <div className="text-center py-12 text-gray-500 bg-white/5 rounded-xl border border-white/10">
                                No submissions found.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredSubmissions.map((submission) => (
                                    <AdminSubmissionItem
                                        key={submission.id}
                                        submission={submission}
                                        onUpdate={fetchSubmissions}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Analytics Tab */}
                {activeTab === 'analytics' && (
                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h2 className="text-xl font-bold mb-6">Submissions by Type</h2>
                            <div className="space-y-4">
                                {Object.entries(stats.byType).map(([type, count]) => (
                                    <div key={type} className="flex items-center justify-between">
                                        <span className="text-gray-300 font-medium">{type}</span>
                                        <div className="flex items-center gap-4">
                                            <div className="w-64 bg-white/10 rounded-full h-3 overflow-hidden">
                                                <div
                                                    className="bg-primary h-full rounded-full transition-all"
                                                    style={{ width: `${(count / stats.total) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-white font-bold w-12 text-right">{count}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <h3 className="text-lg font-semibold mb-4">Status Distribution</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-yellow-400">Pending</span>
                                        <span className="text-2xl font-bold">{stats.pending}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-green-400">Resolved</span>
                                        <span className="text-2xl font-bold">{stats.resolved}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Response Rate</span>
                                        <span className="text-2xl font-bold text-primary">
                                            {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}%
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Today's Activity</span>
                                        <span className="text-2xl font-bold text-purple-400">{stats.today}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
