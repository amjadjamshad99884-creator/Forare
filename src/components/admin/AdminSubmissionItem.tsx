import { Trash2, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Submission {
    id: string;
    type: string;
    payload: string;
    status: string;
    createdAt: string;
}

interface AdminSubmissionItemProps {
    submission: Submission;
    onUpdate: () => void;
}

export default function AdminSubmissionItem({ submission, onUpdate }: AdminSubmissionItemProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleStatusUpdate = async (newStatus: string) => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/admin/submissions/${submission.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                onUpdate();
            }
        } catch (error) {
            console.error("Failed to update status", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this submission?")) return;
        setIsLoading(true);
        try {
            const res = await fetch(`/api/admin/submissions/${submission.id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                onUpdate();
            }
        } catch (error) {
            console.error("Failed to delete submission", error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString("sv-SE");
    };

    const parsePayload = (payload: string) => {
        try {
            const data = JSON.parse(payload);
            return (
                <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(data).map(([key, value]) => (
                        <div key={key}>
                            <span className="font-semibold text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>{" "}
                            <span className="text-gray-200">{String(value)}</span>
                        </div>
                    ))}
                </div>
            );
        } catch (e) {
            return <p className="text-gray-300">{payload}</p>;
        }
    };

    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all hover:bg-white/[0.07]">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide 
                            ${submission.type === 'contact' ? 'bg-blue-500/20 text-blue-300' :
                                submission.type === 'booking' ? 'bg-purple-500/20 text-purple-300' :
                                    'bg-gray-500/20 text-gray-300'}`}>
                            {submission.type}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide 
                            ${submission.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                                submission.status === 'resolved' ? 'bg-green-500/20 text-green-300' :
                                    'bg-red-500/20 text-red-300'}`}>
                            {submission.status}
                        </span>
                    </div>
                    <div className="text-xs text-gray-500 font-mono">ID: {submission.id}</div>
                </div>
                <div className="text-sm text-gray-400">
                    {formatDate(submission.createdAt)}
                </div>
            </div>

            <div className="bg-black/30 rounded-lg p-4 mb-4 font-mono text-sm overflow-x-auto">
                {parsePayload(submission.payload)}
            </div>

            <div className="flex justify-end gap-3">
                {submission.status === 'pending' && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate('resolved')}
                        disabled={isLoading}
                        className="border-green-500/50 text-green-400 hover:bg-green-950 hover:text-green-300"
                    >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Resolve
                    </Button>
                )}
                {submission.status === 'resolved' && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate('pending')}
                        disabled={isLoading}
                        className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-950 hover:text-yellow-300"
                    >
                        <XCircle className="w-4 h-4 mr-2" />
                        Mark Pending
                    </Button>
                )}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDelete}
                    disabled={isLoading}
                    className="text-red-400 hover:bg-red-950/30 hover:text-red-300"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
