import axios from 'axios';
import { useState, useEffect } from 'react';

const AuditTrail = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await axios.get('/api/admin/audit-logs');
                if (res.data.success) {
                    setLogs(res.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch audit logs", error);
            }
        };
        fetchLogs();
    }, []);

    return (
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 font-mono text-[10px]">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="font-black text-slate-800 uppercase tracking-[0.2em] text-sm">Immutable Ledger</h3>
                    <p className="text-slate-400 font-bold uppercase">TN Stack / TNeGA Compliance Trail</p>
                </div>
                <div className="bg-emerald-500/20 text-emerald-600 px-3 py-1 rounded-full font-black animate-pulse border border-emerald-500/30">
                    ● LEDGER ACTIVE
                </div>
            </div>

            <div className="space-y-3">
                {logs.map(log => (
                    <div key={log.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex gap-4 items-center group">
                        <div className="w-2 h-10 bg-slate-100 rounded-full overflow-hidden">
                            <div className="w-full bg-emerald-500 h-[70%]"></div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between text-slate-400 mb-1">
                                <span className="font-black uppercase tracking-widest text-[9px]">{log.action}</span>
                                <span>{log.timestamp}</span>
                            </div>
                            <p className="text-slate-700 font-bold text-xs">{log.details}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-300 font-bold">SHA-256 HASH</p>
                            <p className="text-emerald-600 font-black tracking-tighter group-hover:tracking-normal transition-all">{log.hash}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 text-center opacity-50 italic">
                Logs are cryptographically signed and stored in the TN-Stack Gov-Cloud instance.
            </div>
        </div>
    );
};

export default AuditTrail;
