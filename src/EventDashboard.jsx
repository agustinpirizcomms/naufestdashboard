import React, { useState, useEffect, useMemo, useCallback } from 'react';

// --- CONSTANTES API ---
const API_KEY = 'bPMCXYtl6CjBRURW_f9GdmZY1a-22ODV7mkXfYj5qDpnSElgzhg1nvER4Ok';
const SPREADSHEET_ID = '1Zg_GWkEzKW4uBYCS4Aa33Y-YR3jB_2OEE52PrUMDbn8';
const SHEET_NAME = 'MASTER';
const BASE_URL = 'https://api.sheetson.com';

const EventDashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [view, setView] = useState('public'); // 'public' | 'staff'

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

            if (!response.ok) {
                throw new Error(`Error ${response.status}: No se pudo conectar con el servidor de datos.`);
            }

            const json = await response.json();
            const results = json.results || [];

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

    const filteredData = useMemo(() => {
        return data.filter(item => {
            const rol = (item.rol_vista || '').toLowerCase();
            return view === 'public' ? rol.includes('publico') : rol.includes('staff');
        });
    }, [data, view]);

    const getStatusStyles = (estado) => {
        const e = estado?.toLowerCase() || '';
        if (e === 'en curso') return {
            container: 'border-l-4 border-green-500 bg-green-50 ring-1 ring-green-200',
            badge: 'bg-green-500 text-white animate-pulse',
            text: 'text-green-700',
            icon: '🟢'
        };
        if (e === 'demorado') return {
            container: 'border-l-4 border-amber-500 bg-amber-50 ring-1 ring-amber-200',
            badge: 'bg-amber-500 text-white',
            text: 'text-amber-700',
            icon: '⚠️'
        };
        if (e === 'completado') return {
            container: 'border-l-4 border-slate-300 bg-slate-100 opacity-60 grayscale-[0.5]',
            badge: 'bg-slate-400 text-white',
            text: 'text-slate-500',
            icon: '✅'
        };
        return {
            container: 'border-l-4 border-slate-400 bg-white ring-1 ring-slate-200',
            badge: 'bg-slate-500 text-white',
            text: 'text-slate-700',
            icon: '🕒'
        };
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-500 font-medium font-montserrat">Cargando cronograma de NAufest 2026...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-red-100 text-center">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <h2 className="text-xl font-bold text-slate-800 mb-2 font-montserrat">Error de Conexión</h2>
                <p className="text-slate-600 mb-6 font-montserrat">{error}</p>
                <button onClick={fetchData} className="w-full py-3 px-6 bg-indigo-600 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all font-montserrat">
                    Reintentar Conexión
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 font-montserrat text-slate-900">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <img src="https://naufest.com/wp-content/uploads/2026/06/LOGO-NAUFEST.png" alt="NAufest" className="h-12 w-auto" />
                        <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Command Center</h1>
                    </div>

                    <div className="flex p-1 bg-slate-100 rounded-2xl w-fit border border-slate-200">
                        <button
                            onClick={() => setView('public')}
                            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${view === 'public' ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            👤 Vista Asistente
                        </button>
                        <button
                            onClick={() => setView('staff')}
                            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${view === 'staff' ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            🛠️ Vista Staff
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                {filteredData.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                        <p className="text-slate-400 font-medium">No hay actividades programadas para esta vista.</p>
                    </div>
                ) : (
                    <div className="animate-in fade-in duration-500">
                        {view === 'public' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredData.map(item => {
                                    const styles = getStatusStyles(item.estado);
                                    return (
                                        <div key={item.id} className={`p-6 rounded-3xl transition-all hover:shadow-lg ${styles.container}`}>
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-white/60 px-2 py-1 rounded-lg border border-slate-200">
                                                    {item.hora_inicio} - {item.hora_fin}
                                                </span>
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${styles.badge}`}>
                                                    {item.estado}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-extrabold text-slate-800 mb-3 leading-tight">
                                                {item.actividad}
                                            </h3>
                                            <div className="flex items-center text-slate-600 text-sm font-semibold">
                                                <span className="mr-2">📍</span> {item.lugar}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                                <div className="overflow-x-auto custom-scrollbar">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-slate-50 border-b border-slate-200">
                                            <tr className="text-slate-500">
                                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest">🕒 Tiempo / Bloque</th>
                                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest">Actividad</th>
                                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest">Lugar / Responsable</th>
                                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest">Estado</th>
                                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest">Notas Técnicas</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {filteredData.map(item => {
                                                const styles = getStatusStyles(item.estado);
                                                return (
                                                    <tr key={item.id} className={`transition-all hover:bg-slate-50 ${styles.container}`}>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold text-slate-800 text-sm">{item.hora_inicio} → {item.hora_fin}</span>
                                                            </div>
                                                            <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">{item.bloque}</div>
                                                        </td>
                                                        <td className="px-6 py-4 font-bold text-slate-700">{item.actividad}</td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm font-semibold text-slate-700">{item.lugar}</div>
                                                            <div className="text-xs text-indigo-600 font-bold uppercase">{item.responsable}</div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit ${styles.badge}`}>
                                                                {item.estado}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="p-3 rounded-xl bg-slate-900 text-slate-300 text-xs font-mono leading-relaxed max-w-xs shadow-inner border border-slate-800">
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
