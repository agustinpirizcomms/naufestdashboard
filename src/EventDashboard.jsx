import React, { useState, useEffect, useMemo, useCallback } from 'react';

// --- CONFIGURACIÓN API ---
const API_KEY = 'bPMCXYtl6CjBRURW_f9GdmZY1a-22ODV7mkXfYj5qDpnSElgzhg1nvER4Ok';
const SPREADSHEET_ID = '1Zg_GWkEzKW4uBYCS4Aa33Y-YR3jB_2OEE52PrUMDbn8';
const SHEET_NAME = 'MASTER';
const BASE_URL = 'https://api.sheetson.com';

const EventDashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [view, setView] = useState('public');

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
            if (!response.ok) throw new Error(`Error ${response.status}: Problema de conexión.`);
            const json = await response.json();
            const results = json.results || [];
            setData([...results].sort((a, b) => (a.hora_inicio || '').localeCompare(b.hora_inicio || '')));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => fetchData(), 60000);
        return () => clearInterval(interval);
    }, [fetchData]);

    const filteredData = useMemo(() => {
        return data.filter(item => {
            const rol = (item.rol_vista || '').toLowerCase();
            return view === 'public' ? rol.includes('publico') : rol.includes('staff');
        });
    }, [data, view]);

    const getStatusStyles = (estado) => {
        const e = estado?.toLowerCase() || '';
        if (e === 'en curso') return {
            container: 'border-l-8 border-green-500 bg-gradient-to-r from-green-50 to-white ring-1 ring-green-200',
            badge: 'bg-green-500 text-white animate-pulse',
            text: 'text-green-700',
            glow: 'shadow-[0_0_20px_rgba(34,197,94,0.2)]'
        };
        if (e === 'demorado') return {
            container: 'border-l-8 border-[#be574b] bg-gradient-to-r from-red-50 to-white ring-1 ring-red-100',
            badge: 'bg-[#be574b] text-white',
            text: 'text-[#be574b]',
            glow: 'shadow-sm'
        };
        if (e === 'completado') return {
            container: 'border-l-8 border-slate-300 bg-slate-50 opacity-70 grayscale-[0.5]',
            badge: 'bg-slate-400 text-white',
            text: 'text-slate-500',
            glow: 'shadow-none'
        };
        return {
            container: 'border-l-8 border-slate-300 bg-white ring-1 ring-slate-200',
            badge: 'bg-slate-500 text-white',
            text: 'text-slate-600',
            glow: 'shadow-sm'
        };
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#f4f5f7]">
            <div className="text-center relative">
                <div className="w-24 h-24 border-4 border-[#2f5aae] border-t-transparent rounded-full animate-spin mx-auto mb-8 shadow-xl"></div>
                <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-xs animate-pulse">Sincronizando Command Center...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#f4f5f7]">
            <div className="max-w-md w-full bg-white p-12 rounded-[40px] shadow-2xl border border-red-100 text-center">
                <div className="text-red-500 text-7xl mb-6">⚠️</div>
                <h2 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">Error de Conexión</h2>
                <p className="text-slate-600 mb-10 font-medium leading-relaxed">{error}</p>
                <button onClick={fetchData} className="w-full py-4 px-8 bg-[#2f5aae] text-white font-black rounded-2xl shadow-lg hover:bg-blue-800 transition-all uppercase tracking-widest text-xs active:scale-95">
                    Reintentar Conexión
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f4f5f7] font-montserrat text-[#272626]">
            {/* HEADER ULTRA-MODERN */}
            <header className="bg-[#86dbe0] py-6 px-4 md:px-12 shadow-lg sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-white rounded-full blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
                            <img
                                src="https://naufest.com/wp-content/uploads/2026/06/Junior-Achievement-Americas_Comb.png"
                                alt="Logo"
                                className="relative h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="hidden md:block h-12 w-px bg-slate-900/20"></div>
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-black uppercase tracking-tighter text-slate-900 italic leading-none">
                                Command Center
                            </h1>
                            <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] leading-none mt-1 opacity-80">
                                Production Control 2026
                            </span>
                        </div>
                    </div>

                    {/* Switcher de Vistas Estilo Glassmorphism */}
                    <div className="flex p-1 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 w-fit shadow-sm ring-1 ring-white/50">
                        <button
                            onClick={() => setView('public')}
                            className={`px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                                view === 'public'
                                ? 'bg-[#2f5aae] text-white shadow-md scale-105 translate-y-[-1px]'
                                : 'text-slate-700 hover:bg-white/80'
                            }`}
                        >
                            👤 Asistente
                        </button>
                        <button
                            onClick={() => setView('staff')}
                            className={`px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                                view === 'staff'
                                ? 'bg-[#2f5aae] text-white shadow-md scale-105 translate-y-[-1px]'
                                : 'text-slate-700 hover:bg-white/80'
                            }`}
                        >
                            🛠️ Staff Técnico
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-12 md:py-20 relative">
                {/* Decoración de fondo sutil */}
                <div className="absolute top-0 right-0 w-1/3 opacity-10 pointer-events-none z-0 blur-sm">
                    <img src="https://naufest.com/wp-content/uploads/2026/06/orbitas.png" alt="Graphic Element" className="w-full h-auto" />
                </div>

                {filteredData.length === 0 ? (
                    <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-slate-200 shadow-sm max-w-3xl mx-auto">
                        <div className="text-slate-300 text-7xl mb-6">🕒</div>
                        <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No hay actividades programadas para esta vista.</p>
                    </div>
                ) : (
                    <div className="relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        {view === 'public' ? (
                            /* --- VISTA ASISTENTE: High-End Cards --- */
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                                {filteredData.map(item => {
                                    const styles = getStatusStyles(item.estado);
                                    return (
                                        <div key={item.id} className={`p-8 rounded-[32px] transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 ${styles.container} ${styles.glow}`}>
                                            <div className="flex justify-between items-start mb-8">
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                                                    {item.hora_inicio} — {item.hora_fin}
                                                </span>
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${styles.badge}`}>
                                                    {item.estado}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-800 mb-4 leading-tight tracking-tight">
                                                {item.actividad}
                                            </h3>
                                            <div className="flex items-center text-slate-600 text-sm font-bold">
                                                <span className="mr-2 text-[#2f5aae] text-lg">📍</span> {item.lugar}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            /* --- VISTA STAFF: Production Cue-Sheet --- */
                            <div className="bg-white rounded-[40px] shadow-2xl border border-slate-200 overflow-hidden">
                                <div className="overflow-x-auto custom-scrollbar">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-slate-50 border-b border-slate-200">
                                            <tr className="text-slate-500">
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em]">🕒 Tiempo / Bloque</th>
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em]">Actividad</th>
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em]">Lugar / Responsable</th>
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em]">Estado</th>
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em]">Notas Técnicas</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {filteredData.map(item => {
                                                const styles = getStatusStyles(item.estado);
                                                return (
                                                    <tr key={item.id} className={`transition-all duration-200 group hover:bg-slate-50/80 ${styles.container}`}>
                                                        <td className="px-8 py-6">
                                                            <div className="font-black text-slate-800 text-sm">{item.hora_inicio} → {item.hora_fin}</div>
                                                            <div className="text-[9px] font-black text-slate-400 uppercase mt-1 tracking-tighter">{item.bloque}</div>
                                                        </td>
                                                        <td className="px-8 py-6 font-bold text-slate-700 text-sm">{item.actividad}</td>
                                                        <td className="px-8 py-6">
                                                            <div className="text-xs font-bold text-slate-700">{item.lugar}</div>
                                                            <div className="text-[10px] text-[#2f5aae] font-black uppercase tracking-tighter">{item.responsable}</div>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest w-fit ${styles.badge}`}>
                                                                {item.estado}
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <div className="p-3 rounded-xl bg-[#121212] text-slate-300 text-[11px] font-mono leading-relaxed max-w-xs shadow-inner border border-slate-800 group-hover:border-slate-600 transition-colors">
                                                                {item.notas_tecnicas || 'Sin notas técnicas especificadas'}
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
