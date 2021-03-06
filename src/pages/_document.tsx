import Document, { Head, Main, NextScript } from 'next/document';
import * as React from 'react';

export default class extends Document {
    public render() {
        return (
            <html>
                <Head>
                    <link rel="stylesheet" href="/_next/static/style.css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
