import Document, { Html, Head, Main, NextScript } from 'next/document';

import isDev from '@/app/env';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="vn">
                <Head />
                <body className={isDev ? 'debug-screens' : ''}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
