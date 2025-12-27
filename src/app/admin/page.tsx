'use client';

import { useEffect, useState } from 'react';
import AdminSubmissionItem from '@/components/admin/AdminSubmissionItem';
import ContentManager from '@/components/admin/ContentManager';

interface Submission {
    id: string;
    type: string;
    payload: string;
    status: string;
    createdAt: string;
}

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<'submissions' | 'content'>('submissions');
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSubmissions = async () => {
        try {
            const res = await fetch('/api/admin/submissions');
            if (res.ok) {
                const data = await res.json();
                setSubmissions(data);
            }
        } catch (error) {
            console.error('Error fetching submissions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'submissions') {
            fetchSubmissions();
        }
    }, [activeTab]);

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                    <p className="text-gray-400">Manage your website content and submissions.</p>
                </header>

                <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
                    <button
                        onClick={() => setActiveTab('submissions')}
                        className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'submissions'
                                ? 'bg-white text-black font-bold'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Submissions
                    </button>
                    <button
                        onClick={() => setActiveTab('content')}
                        className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'content'
                                ? 'bg-white text-black font-bold'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Site Content
                    </button>
                </div>

                {activeTab === 'submissions' ? (
                    loading ? (
                        <div className="text-center py-12 text-gray-500">Loading submissions...</div>
                    ) : submissions.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 bg-white/5 rounded-xl border border-white/10">
                            No submissions found.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {submissions.map((submission) => (
                                <AdminSubmissionItem
                                    key={submission.id}
                                    submission={submission}
                                    onUpdate={fetchSubmissions}
                                />
                            ))}
                        </div>
                    )
                ) : (
                    <ContentManager />
                )}
            </div>
        </div>
    );
}
