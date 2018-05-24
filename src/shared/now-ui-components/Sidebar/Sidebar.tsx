import { ISidebarRouteItem } from '@routes/sidebar';
import Link from 'next/link';
import { SingletonRouter, withRouter } from 'next/router';
import PerfectScrollbar from 'perfect-scrollbar';
import * as React from 'react';
import { Nav } from 'reactstrap';

/* tslint:disable: ordered-imports */
import logo from '@static/logo/logo-white.svg';

interface ISidebarProps {
    routes: ISidebarRouteItem[];
}

let ps: PerfectScrollbar;

class Sidebar extends React.Component<ISidebarProps & { router: SingletonRouter }, {}> {
    private sidebarWrapperNode: HTMLDivElement | null;

    constructor(props: ISidebarProps & { router: SingletonRouter }) {
        super(props);
    }
    public componentDidMount() {
        if (navigator.platform.indexOf('Win') > -1) {
            if (this.sidebarWrapperNode) {
                ps = new PerfectScrollbar(this.sidebarWrapperNode, { suppressScrollX: true, suppressScrollY: false });
            }
        }
    }
    public componentWillUnmount() {
        if (navigator.platform.indexOf('Win') > -1) {
            ps.destroy();
        }
    }
    public render() {
        return (
            <div className="sidebar" data-color="red">
                <div className="logo">
                    <a href="/" className="simple-text logo-mini">
                        <div className="logo-img">
                            <img src={logo} alt="react-logo" />
                        </div>
                    </a>
                    <a href="/" className="simple-text logo-normal">
                        PONGPONG
                    </a>
                </div>
                <div className="sidebar-wrapper" ref={(node) => { this.sidebarWrapperNode = node; }}>
                    <Nav>{this.renderLink()}</Nav>
                </div>
            </div>
        );
    }

    private renderLink() {
        return this.props.routes.map((prop, key) => (
            <li className={this.isActiveRoute(prop.path)} key={key}>
                <Link href={prop.path}>
                    <a className="nav-link">
                        <i className={`now-ui-icons ${prop.icon}`} />
                        <p>{prop.name}</p>
                    </a>
                </Link>
            </li>
        ));
    }
    private isActiveRoute(routeName: string) {
        return this.props.router.pathname == routeName ? 'active' : '';
    }
}

export default withRouter(Sidebar);
