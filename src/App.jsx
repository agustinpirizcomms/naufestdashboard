import React, { useState } from 'react';
import EventDashboard from './EventDashboard'; // Renamed our previous EventDashboard for clarity
import LandingPage from './LandingPage';

const App = () => {
    const [viewMode, setViewMode] = useState('landing'); // 'landing' | 'dashboard'

    return (
        <div className="min-h-screen">
            {viewMode === 'landing' ? (
                <LandingPage onEnterDashboard={() => setViewMode('dashboard')} />
            ) : (
                <div className="relative">
                    {/* Floating button to go back to landing */}
                    <button
                        onClick={() => setViewMode('landing')}
                        className="fixed bottom-6 right-6 z-50 p-3 bg-brandBlue text-white rounded-full shadow-2xl hover:scale-110 transition-all active:scale-95"
                        title="Volver al Inicio"
                    >
                        🏠
                    </button>
                    <EventDashboard />
                </div>
            )}
        </div>
    );
};

export default App;
