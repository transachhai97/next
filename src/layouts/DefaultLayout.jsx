import React, { useState, useEffect } from 'react';

import ScrollProgress from '@/components/ScrollProgress/ScrollProgress';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';

export default function DefaultLayout({ children }) {
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        setTimeout(() => setSpinner(false), 500);
    }, []);
    return spinner ? (
        <LoadingScreen />
    ) : (
        <>
            <ScrollProgress />
            {children}
        </>
    );
}
