'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ContentField {
    key: string;
    label: string;
    section: string;
    type: 'text' | 'textarea';
}

const DEFINED_FIELDS: ContentField[] = [
    { key: 'home_hero_title', label: 'Hero Title', section: 'home', type: 'text' },
    { key: 'home_hero_subtitle', label: 'Hero Subtitle', section: 'home', type: 'textarea' },
    { key: 'home_services_title', label: 'Services Title', section: 'home', type: 'text' },
    { key: 'home_services_desc', label: 'Services Description', section: 'home', type: 'textarea' },
];

export default function ContentManager() {
    const [content, setContent] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const res = await fetch('/api/admin/content');
            if (res.ok) {
                const data = await res.json();
                setContent(data);
            }
        } catch (error) {
            console.error('Error fetching content:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (field: ContentField, value: string) => {
        setSaving(field.key);
        try {
            const res = await fetch('/api/admin/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    key: field.key,
                    value,
                    section: field.section,
                }),
            });

            if (res.ok) {
                setContent(prev => ({ ...prev, [field.key]: value }));
            }
        } catch (error) {
            console.error('Error saving content:', error);
        } finally {
            setSaving(null);
        }
    };

    if (loading) return <div>Loading content...</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Site Content</h2>

            <div className="grid gap-6">
                {DEFINED_FIELDS.map((field) => (
                    <motion.div
                        key={field.key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 border border-white/10 rounded-xl p-6"
                    >
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            {field.label}
                        </label>
                        <div className="flex gap-4">
                            {field.type === 'textarea' ? (
                                <textarea
                                    defaultValue={content[field.key] || ''}
                                    className="flex-1 bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 min-h-[100px]"
                                    onBlur={(e) => handleSave(field, e.target.value)}
                                />
                            ) : (
                                <input
                                    type="text"
                                    defaultValue={content[field.key] || ''}
                                    className="flex-1 bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50"
                                    onBlur={(e) => handleSave(field, e.target.value)}
                                />
                            )}
                        </div>
                        {saving === field.key && (
                            <span className="text-xs text-primary mt-2 inline-block">Saving...</span>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
