'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    MessageSquare,
    Car,
    Package,
    Truck,
    Users,
    BarChart3,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminSubmissionItem from '@/components/admin/AdminSubmissionItem';

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

type TabType = 'overview' | 'contact' | 'booking' | 'delivery' | 'moving' | 'driver' | 'analytics';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([]);
    const [statusFilter, setStatusFilter] = useState<'all' | 'PENDING' | 'IN_PROGRESS' | 'CONTACTED' | 'RESOLVED' | 'CANCELLED' | 'ARCHIVED'>('all');
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, resolved: 0, today: 0, byType: {} });
    const [sidebarOpen, setSidebarOpen] = useState(true);
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

        // Filter by tab/type
        if (activeTab === 'overview') {
            filtered = submissions;
        } else if (activeTab !== 'analytics') {
            const typeMap: Record<string, string> = {
                contact: 'Contact',
                booking: 'Booking',
                delivery: 'Delivery',
                moving: 'Moving',
                driver: 'Driver'
            };
            filtered = submissions.filter(s => s.type === typeMap[activeTab]);
        }

        // Filter by status
        if (statusFilter !== 'all') {
            filtered = filtered.filter(s => s.status === statusFilter);
        }

        setFilteredSubmissions(filtered);
    }, [activeTab, submissions, statusFilter]);

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

    const menuItems = [
        { id: 'overview' as TabType, label: 'Overview', icon: LayoutDashboard, count: stats.total },
        { id: 'contact' as TabType, label: 'Contact Forms', icon: MessageSquare, count: stats.byType['Contact'] || 0 },
        { id: 'booking' as TabType, label: 'Bookings', icon: Car, count: stats.byType['Booking'] || 0 },
        { id: 'delivery' as TabType, label: 'Delivery Requests', icon: Package, count: stats.byType['Delivery'] || 0 },
        { id: 'moving' as TabType, label: 'Moving Quotes', icon: Truck, count: stats.byType['Moving'] || 0 },
        { id: 'driver' as TabType, label: 'Driver Applications', icon: Users, count: stats.byType['Driver'] || 0 },
        { id: 'analytics' as TabType, label: 'Analytics', icon: BarChart3, count: 0 },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-black/50 backdrop-blur-lg border-r border-white/10 transition-all duration-300 flex flex-col fixed h-screen z-50`}>
                {/* Logo */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                        {sidebarOpen && (
                            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-yellow-300 bg-clip-text text-transparent">
                                Forare Admin
                            </h1>
                        )}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.id
                                ? 'bg-primary text-gray-900 shadow-lg'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            {sidebarOpen && (
                                <>
                                    <span className="flex-1 text-left font-medium">{item.label}</span>
                                    {item.count > 0 && (
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${activeTab === item.id ? 'bg-gray-900 text-primary' : 'bg-white/10 text-white'
                                            }`}>
                                            {item.count}
                                        </span>
                                    )}
                                </>
                            )}
                        </button>
                    ))}

                    {/* Logout Button in Menu */}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-red-400 hover:text-red-300 hover:bg-red-500/10 border-t border-white/10 mt-4 pt-4"
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        {sidebarOpen && <span className="flex-1 text-left font-medium">Logout</span>}
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 overflow-auto ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
                <div className="p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            {menuItems.find(m => m.id === activeTab)?.label}
                        </h2>
                        <p className="text-gray-400">
                            {activeTab === 'overview' && 'Dashboard overview and recent submissions'}
                            {activeTab === 'contact' && 'Customer inquiries and contact form submissions'}
                            {activeTab === 'booking' && 'Passenger ride bookings'}
                            {activeTab === 'delivery' && 'Business delivery partnership requests'}
                            {activeTab === 'moving' && 'Moving and logistics quote requests'}
                            {activeTab === 'driver' && 'Driver applications and onboarding'}
                            {activeTab === 'analytics' && 'Performance metrics and insights'}
                        </p>
                    </div>

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <LayoutDashboard className="w-8 h-8 text-blue-400" />
                                        <span className="text-3xl font-bold text-blue-400">{stats.total}</span>
                                    </div>
                                    <h3 className="text-gray-400 text-sm font-medium">Total Submissions</h3>
                                </div>

                                <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <MessageSquare className="w-8 h-8 text-yellow-400" />
                                        <span className="text-3xl font-bold text-yellow-400">{stats.pending}</span>
                                    </div>
                                    <h3 className="text-gray-400 text-sm font-medium">Pending Review</h3>
                                </div>

                                <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <Car className="w-8 h-8 text-green-400" />
                                        <span className="text-3xl font-bold text-green-400">{stats.resolved}</span>
                                    </div>
                                    <h3 className="text-gray-400 text-sm font-medium">Resolved</h3>
                                </div>

                                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <Package className="w-8 h-8 text-purple-400" />
                                        <span className="text-3xl font-bold text-purple-400">{stats.today}</span>
                                    </div>
                                    <h3 className="text-gray-400 text-sm font-medium">Today</h3>
                                </div>
                            </div>

                            {/* Recent Submissions */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-white mb-4">Recent Submissions</h3>
                                {loading ? (
                                    <div className="text-center py-8 text-gray-500">Loading...</div>
                                ) : submissions.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">No submissions yet</div>
                                ) : (
                                    <div className="space-y-4">
                                        {submissions.slice(0, 10).map((submission) => (
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

                    {/* Individual Form Tabs */}
                    {['contact', 'booking', 'delivery', 'moving', 'driver'].includes(activeTab) && (
                        <div className="space-y-6">
                            {/* Status Filter */}
                            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                                <label className="text-gray-300 font-medium">Filter by Status:</label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                                    className="bg-gray-800 border border-white/20 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="all">All Status</option>
                                    <option value="PENDING">📋 Pending</option>
                                    <option value="IN_PROGRESS">⏳ In Progress</option>
                                    <option value="CONTACTED">📞 Contacted</option>
                                    <option value="RESOLVED">✅ Resolved</option>
                                    <option value="CANCELLED">❌ Cancelled</option>
                                    <option value="ARCHIVED">📦 Archived</option>
                                </select>
                                <div className="flex-1" />
                                <span className="text-gray-400 text-sm">
                                    Showing {filteredSubmissions.length} of {submissions.filter(s => {
                                        const typeMap: Record<string, string> = {
                                            contact: 'Contact',
                                            booking: 'Booking',
                                            delivery: 'Delivery',
                                            moving: 'Moving',
                                            driver: 'Driver'
                                        };
                                        return s.type === typeMap[activeTab];
                                    }).length} submissions
                                </span>
                            </div>

                            {loading ? (
                                <div className="text-center py-12 text-gray-500">Loading submissions...</div>
                            ) : filteredSubmissions.length === 0 ? (
                                <div className="text-center py-12 text-gray-500 bg-white/5 rounded-xl border border-white/10">
                                    No {activeTab} submissions found{statusFilter !== 'all' ? ` with status: ${statusFilter}` : ''}.
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
                                <h3 className="text-xl font-bold text-white mb-6">Submissions by Type</h3>
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
                                    <h3 className="text-lg font-semibold text-white mb-4">Status Distribution</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-yellow-400">Pending</span>
                                            <span className="text-2xl font-bold text-white">{stats.pending}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-green-400">Resolved</span>
                                            <span className="text-2xl font-bold text-white">{stats.resolved}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Response Rate</span>
                                            <span className="text-2xl font-bold text-primary">
                                                {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}%
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Today&apos;s Activity</span>
                                            <span className="text-2xl font-bold text-purple-400">{stats.today}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
