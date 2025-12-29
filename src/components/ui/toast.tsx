'use client';

import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'success' | 'error' | 'warning';
    message: string;
    duration?: number;
}

export function Toast({ isOpen, onClose, type, message, duration = 3000 }: ToastProps) {
    useEffect(() => {
        if (isOpen && duration > 0) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [isOpen, duration, onClose]);

    if (!isOpen) return null;

    const icons = {
        success: <CheckCircle className="w-5 h-5" />,
        error: <XCircle className="w-5 h-5" />,
        warning: <AlertCircle className="w-5 h-5" />,
    };

    const colors = {
        success: 'bg-green-500/10 border-green-500/50 text-green-400',
        error: 'bg-red-500/10 border-red-500/50 text-red-400',
        warning: 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400',
    };

    return (
        <div className="fixed top-4 right-4 z-[200] animate-in slide-in-from-top-2 duration-300">
            <div className={`flex items-center gap-3 px-6 py-4 rounded-xl border backdrop-blur-lg shadow-2xl ${colors[type]}`}>
                {icons[type]}
                <span className="font-medium">{message}</span>
            </div>
        </div>
    );
}
