import React from 'react';
import ScrollProgress from '@/components/ScrollProgress/ScrollProgress';

export default function DefaultLayout({ children }) {
    return (
        <>
            <ScrollProgress />
            {children}
        </>
    );
}
