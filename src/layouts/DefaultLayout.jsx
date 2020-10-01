import React, { useState, useEffect } from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';

import ScrollProgress from '@/components/ScrollProgress/ScrollProgress';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import Toastify from '@/components/Toastify/Toastify';

// eslint-disable-next-line no-unused-vars
Router.events.on('routeChangeStart', (url) => {
    NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
            <Toastify />
            {children}
        </>
    );
}
