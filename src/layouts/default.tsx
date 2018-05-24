import sidebarRoutes from '@routes/sidebar';
import { Footer, Header, Sidebar } from '@shared/now-ui-components';
import Head from 'next/head';
import { SingletonRouter } from 'next/router';
import PerfectScrollbar from 'perfect-scrollbar';
import * as React from 'react';

/* tslint:disable: ordered-imports */
import 'bootstrap/scss/bootstrap.scss';
import '@static/scss/now-ui-dashboard-custom.scss';

interface ILayoutsDefaultProps {
    title?: string;
}

let ps: PerfectScrollbar;

export default class LayoutDefault extends React.Component<ILayoutsDefaultProps, {}> {
    private mainPanelNode: HTMLDivElement | null;

    public componentDidMount() {
        if (navigator.platform.indexOf('Win') > -1) {
            ps = new PerfectScrollbar(this.mainPanelNode!);
            document.body.classList.toggle('perfect-scrollbar-on');
        }
    }
    public componentWillUnmount() {
        if (navigator.platform.indexOf('Win') > -1) {
            ps.destroy();
            document.body.classList.toggle('perfect-scrollbar-on');
        }
    }
    public componentDidUpdate(e: ILayoutsDefaultProps) {
        // if (e.history.action === 'PUSH') {
        //     this.refs.mainPanel.scrollTop = 0;
        //     document.scrollingElement.scrollTop = 0;
        // }
    }
    public render() {
        return (
            <div className="wrapper">
                <Head>
                    <title>{this.props.title || ''}</title>
                    <link rel="stylesheet" href="/_next/static/style.css" />
                </Head>
                <Sidebar routes={sidebarRoutes} />
                <div className="main-panel" ref={node => this.mainPanelNode = node}>
                    <Header />
                    <div>{this.props.children}</div>
                    <Footer fluid />
                </div>
            </div>
        );
    }
}
