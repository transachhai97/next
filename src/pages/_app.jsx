import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import whyDidYouRender from '@welldone-software/why-did-you-render';

import DefaultLayout from '@/layouts/DefaultLayout';

import '@/locales/i18n';

import '@/styles/index.scss';

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    whyDidYouRender(React);
}

function MyApp({ Component, pageProps }) {
    const Layout = Component.Layout ? Component.Layout : DefaultLayout;
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
