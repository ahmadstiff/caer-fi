'use client';

import React from 'react';
import SwapPanel from './components/SwapPanel';

export default function TradePage() {
    return (
        <div className="container mt-20 mx-auto p-4 max-w-xl">
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-[#01ECBE]/20">
                <SwapPanel />
            </div>
        </div>
    );
}
