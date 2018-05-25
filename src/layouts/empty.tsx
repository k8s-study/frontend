import { Footer } from '@shared/now-ui-components';
import Head from 'next/head';
import * as React from 'react';

/* tslint:disable: ordered-imports */
import 'bootstrap/scss/bootstrap.scss';
import '@static/scss/now-ui-dashboard-custom.scss';

interface ILayoutsDefaultProps {
    title?: string;
}

export default class LayoutDefault extends React.Component<ILayoutsDefaultProps, {}> {
    public render() {
        return (
            <div className="empty-layout wrapper">
                <Head>
                    <title>{this.props.title || ''}</title>
                </Head>
                <div className="main-panel">
                    <div>{this.props.children}</div>
                    <Footer fluid />
                </div>
            </div>
        );
    }
}
