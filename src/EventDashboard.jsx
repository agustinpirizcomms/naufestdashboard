import React, { useState, useEffect, useMemo, useCallback } from 'react';

// --- CONSTANTES API (Configuración Estricta) ---
const API_KEY = 'bPMCXYtl6CjBRURW_f9GdmZY1a-22ODV7mkXfYj5qDpnSElgzhg1nvER4Ok';
const SPREADSHEET_ID = '1Zg_GWkEzKW4uBYCS4Aa33Y-YR3jB_2OEE52PrUMDbn8';
const SHEET_NAME = 'MASTER';
const BASE_URL = 'https://api.sheetson.com';

const EventDashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [view, setView] = useState('public'); // 'public' | 'staff'

    // 1. CONEXIÓN Y SINCRONIZACIÓN
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}/v2/sheets/${SHEET_NAME}`, {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'X-Spreadsheet-Id': SPREADSHEET_ID
                }
            });

            if (!response.ok) throw new Error(`Error ${response.status}: Problema de conexión con la base de datos.`);

            const json = await response.json();
            const results = json.results || [];

            // Orden cronológico ascendente
            const sorted = [...results].sort((a, b) =>
                (a.hora_inicio || '').localeCompare(b.hora_inicio || '')
            );

            setData(sorted);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // 2. FILTRADO DINÁMICO POR ROL
    const filteredData = useMemo(() => {
        return data.filter(item => {
            const rol = (item.rol_vista || '').toLowerCase();
            return view === 'public' ? rol.includes('publico') : rol.includes('staff');
        });
    }, [data, view]);

    // 3. SISTEMA DE ESTILOS REACTIVOS (Design Tokens)
    const getStatusStyles = (estado) => {
        const e = estado?.toLowerCase() || '';

        if (e === 'en curso') return {
            container: 'border-l-4 border-green-500 bg-green-50/50 ring-1 ring-green-200',
            badge: 'bg-green-500 text-white animate-pulse shadow-sm',
            text: 'text-green-700',
            icon: '🟢'
        };
        if (e === 'demorado') return {
            container: 'border-l-4 border-[#be574b] bg-red-50/30 ring-1 ring-red-100',
            badge: 'bg-[#be574b] text-white',
            text: 'text-[#be574b]',
            icon: '⚠️'
        };
        if (e === 'completado') return {
            container: 'border-l-4 border-slate-300 bg-slate-50 opacity-60 grayscale-[0.4]',
            badge: 'bg-slate-400 text-white',
            text: 'text-slate-500',
            icon: '✅'
        };

        // Pendiente (Default)
        return {
            container: 'border-l-4 border-slate-300 bg-white ring-1 ring-slate-200',
            badge: 'bg-slate-500 text-white',
            text: 'text-slate-600',
            icon: '🕒'
        };
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#f4f5f7]">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-[#2f5aae] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Sincronizando NAufest 2026...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#f4f5f7]">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl border border-red-100 text-center">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <h2 className="text-2xl font-black text-slate-800 mb-2">Error de Conexión</h2>
                <p className="text-slate-600 mb-6 font-medium">{error}</p>
                <button onClick={fetchData} className="w-full py-4 px-6 bg-[#2f5aae] text-white font-black rounded-2xl shadow-lg hover:bg-blue-800 transition-all uppercase tracking-widest text-xs">
                    Reintentar Conexión
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f4f5f7] font-montserrat text-[#272626]">
            {/* HEADER PREMIUM */}
            <header className="bg-[#86dbe0] py-6 px-4 md:px-12 shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <img
                            src="https://naufest.com/wp-content/uploads/2026/06/Junior-Achievement-Americas_Comb.png"
                            alt="Junior Achievement"
                            className="h-14 w-auto object-contain"
                        />
                        <div className="hidden md:block h-10 w-px bg-slate-900/20"></div>
                        <h1 className="text-xl font-black uppercase tracking-tighter text-slate-900 italic">
                            Command Center <span className="text-white not-italic font-light">2026</span>
                        </h1>
                    </div>

                    {/* Selector de Vista Estilo Segmentado */}
                    <div className="flex p-1 bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 w-fit shadow-sm">
                        <button
                            onClick={() => setView('public')}
                            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                                view === 'public'
                                ? 'bg-[#2f5aae] text-white shadow-md scale-105'
                                : 'text-slate-700 hover:bg-white/60'
                            }`}
                        >
                            👤 Asistente
                        </button>
                        <button
                            onClick={() => setView('staff')}
                            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                                view === 'staff'
                                ? 'bg-[#2f5aae] text-white shadow-md scale-105'
                                : 'text-slate-700 hover:bg-white/60'
                            }`}
                        >
                            🛠️ Staff Técnico
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-10 md:py-16">
                {filteredData.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200 shadow-sm">
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No hay actividades programadas para esta vista.</p>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {view === 'public' ? (
                            /* --- VISTA ASISTENTE (Visual Cards) --- */
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredData.map(item => {
                                    const styles = getStatusStyles(item.estado);
                                    return (
                                        <div key={item.id} className={`p-8 rounded-3xl transition-all hover:shadow-2xl hover:-translate-y-1 ${styles.container}`}>
                                            <div className="flex justify-between items-start mb-6">
                                                <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-sm">
                                                    {item.hora_inicio} — {item.hora_fin}
                                                </span>
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${styles.badge}`}>
                                                    {item.estado}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-extrabold text-slate-800 mb-4 leading-tight">
                                                {item.actividad}
                                            </h3>
                                            <div className="flex items-center text-slate-600 text-sm font-bold">
                                                <span className="mr-2 text-[#2f5aae]">📍</span> {item.lugar}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            /* --- VISTA STAFF (Production Cue Sheet) --- */
                            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
                                <div className="overflow-x-auto custom-scrollbar">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-slate-50 border-b border-slate-200">
                                            <tr className="text-slate-500">
                                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest">🕒 Tiempo / Bloque</th>
                                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest">Actividad</th>
                                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest">Lugar / Responsable</th>
                                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest">Estado</th>
                                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest">Notas Técnicas</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {filteredData.map(item => {
                                                const styles = getStatusStyles(item.estado);
                                                return (
                                                    <tr key={item.id} className={`transition-all group hover:bg-slate-50/50 ${styles.container}`}>
                                                        <td className="px-6 py-5">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold text-slate-800 text-sm">{item.hora_inicio} → {item.hora_fin}</span>
                                                            </div>
                                                            <div className="text-[9px] font-black text-slate-400 uppercase mt-1 tracking-tighter">{item.bloque}</div>
                                                        </td>
                                                        <td className="px-6 py-5 font-bold text-slate-700 text-sm">{item.actividad}</td>
                                                        <td className="px-6 py-5">
                                                            <div className="text-xs font-bold text-slate-700">{item.lugar}</div>
                                                            <div className="text-[10px] text-[#2f5aae] font-black uppercase tracking-tighter">{item.responsable}</div>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit ${styles.badge}`}>
                                                                {item.estado}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <div className="p-3 rounded-xl bg-[#121212] text-slate-300 text-[11px] font-mono leading-relaxed max-w-xs shadow-inner border border-slate-800">
                                                                {item.notas_tecnicas || 'Sin notas técnicas'}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default EventDashboard;
