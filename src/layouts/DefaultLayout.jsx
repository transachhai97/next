import React, { useState, useEffect } from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import { PageTransition } from 'next-page-transitions';

import ScrollProgress from '@/components/ScrollProgress/ScrollProgress';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import Toastify from '@/components/Toastify/Toastify';
import ChangeLanguage from '@/components/ChangeLanguage/ChangeLanguage';
import DarkModeToggle from '@/components/DarkModeToggle/DarkModeToggle';
import useOnlineStatus from '@/hooks/useOnlineStatus';
import Offline from '@/components/Offline/Offline';

// eslint-disable-next-line no-unused-vars
Router.events.on('routeChangeStart', (url) => {
    NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function DefaultLayout({ children }) {
    const onlineStatus = useOnlineStatus();

    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        setTimeout(() => setSpinner(false), 500);
    }, []);

    if (!onlineStatus.online) {
        return <Offline />;
    }

    return (
        <>
            {spinner && <LoadingScreen />}
            <ScrollProgress />
            <Toastify />
            <ChangeLanguage />
            <DarkModeToggle />

            <PageTransition timeout={300} classNames="page-transition">
                {children}
            </PageTransition>
        </>
    );
}
