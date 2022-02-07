import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children }) {
    return (
        <div className="min-h-full flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
            <div className="sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg mt-20">
                {children}
            </div>
        </div>
    );
}
