import React from 'react';

import DefaultLayout from '@/layouts/DefaultLayout';

import '@/styles/index.scss';

function MyApp({ Component, pageProps }) {
    const Layout = Component.Layout ? Component.Layout : DefaultLayout;
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;