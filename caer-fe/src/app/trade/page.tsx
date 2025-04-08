'use client';

import React from 'react';
import SwapPanel from './components/SwapPanel';

export default function TradePage() {
    return (
        <div className="container mt-20 mx-auto p-4 max-w-xl">
            <div className="bg-gray-800 rounded-2xl p-4 shadow-lg">
                <SwapPanel />
            </div>
        </div>
    );
}
