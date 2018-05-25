import { ICurrentUser } from '@common/types';
import { removeCurrentUser, setLoggedIn } from '@redux/store';
import sidebarRoutes from '@routes/sidebar';
import * as Cookies from 'js-cookie';
import Link from 'next/link';
import Router, { SingletonRouter, withRouter } from 'next/router';
import * as React from 'react';
import { connect } from 'react-redux';
import {
    Collapse, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
    Input, InputGroup,
    Nav, Navbar, NavbarBrand, NavbarToggler, NavItem,
} from 'reactstrap';
import { bindActionCreators, Dispatch } from 'redux';

interface IHeaderProps {
    currentUser?: ICurrentUser;
    setLoggedIn: (loggedIn: boolean) => void;
    removeCurrentUser: () => void;
}

interface IHeaderState {
    isOpen: boolean;
    dropdownOpen: boolean;
    color: string;
}

class Header extends React.Component<IHeaderProps & { router: SingletonRouter }, IHeaderState> {
    private sidebarToggleNode: HTMLButtonElement | null;

    constructor(props: IHeaderProps & { router: SingletonRouter }) {
        super(props);
        this.state = {
            isOpen: false,
            dropdownOpen: false,
            color: 'transparent',
        };
        this.toggle = this.toggle.bind(this);
        this.dropdownToggle = this.dropdownToggle.bind(this);
        this.openSidebar = this.openSidebar.bind(this);
        this.logout = this.logout.bind(this);
    }
    public componentDidMount() {
        window.addEventListener('resize', this.updateColor.bind(this));
    }
    public componentDidUpdate(prevProps: IHeaderProps & { router: SingletonRouter }) {
        if (window.innerWidth < 993 && prevProps.router.pathname !== this.props.router.pathname && document.documentElement.className.indexOf('nav-open') !== -1) {
            document.documentElement.classList.toggle('nav-open');
            if (this.sidebarToggleNode) {
                this.sidebarToggleNode.classList.toggle('toggled');
            }
        }
    }
    public render() {
        return (
            // add or remove classes depending if we are on full-screen-maps page or not
            <Navbar
                color={this.state.color}
                expand="lg"
                className={'navbar-absolute fixed-top ' + (this.state.color === 'transparent' ? 'navbar-transparent ' : '')}
            >
                <Container fluid>
                    <div className="navbar-wrapper">
                        <div className="navbar-toggle">
                            <button type="button" ref={node => this.sidebarToggleNode = node} className="navbar-toggler" onClick={this.openSidebar}>
                                <span className="navbar-toggler-bar bar1" />
                                <span className="navbar-toggler-bar bar2" />
                                <span className="navbar-toggler-bar bar3" />
                            </button>
                        </div>
                        <NavbarBrand href="/">{this.getBrand()}</NavbarBrand>
                    </div>
                    <NavbarToggler onClick={this.toggle}>
                        <span className="navbar-toggler-bar navbar-kebab" />
                        <span className="navbar-toggler-bar navbar-kebab" />
                        <span className="navbar-toggler-bar navbar-kebab" />
                    </NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar className="justify-content-end">
                        <form>
                            <InputGroup className="no-border">
                                <Input placeholder="Search..." />
                                <div className="input-group-append input-group-addon">
                                    <i className="now-ui-icons ui-1_zoom-bold" />
                                </div>
                            </InputGroup>
                        </form>
                        <Nav navbar>
                            <NavItem>
                                <Link href="#pablo">
                                    <a className="nav-link">
                                        <i className="now-ui-icons media-2_sound-wave" />
                                        <p>
                                            <span className="d-lg-none d-md-block">Stats</span>
                                        </p>
                                    </a>
                                </Link>
                            </NavItem>
                            <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.dropdownToggle}>
                                <DropdownToggle caret nav>
                                    <i className="now-ui-icons users_single-02" />
                                    <p>
                                        <span className="d-lg-none d-md-block">{this.props.currentUser ? this.props.currentUser.email : '-'}</span>
                                    </p>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <Link href="/profile"><DropdownItem tag="a">Profile</DropdownItem></Link>
                                    <DropdownItem tag="a" onClick={this.logout}>Logout</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
    private toggle() {
        if (this.state.isOpen) {
            this.setState({
                color: 'transparent',
            });
        } else {
            this.setState({
                color: 'white',
            });
        }
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    private dropdownToggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }
    private openSidebar() {
        document.documentElement.classList.toggle('nav-open');
        if (this.sidebarToggleNode) {
            this.sidebarToggleNode.classList.toggle('toggled');
        }
    }
    private getBrand() {
        const route = sidebarRoutes.find(r => r.path == this.props.router.pathname);
        if (!route) {
            return null;
        }
        return route.name;
    }
    // function that adds color white/transparent to the navbar on resize (this is for the collapse)
    private updateColor() {
        if (window.innerWidth < 993 && this.state.isOpen) {
            this.setState({
                color: 'white',
            });
        } else {
            this.setState({
                color: 'transparent',
            });
        }
    }
    private logout() {
        Cookies.remove('apiKey');
        this.props.setLoggedIn(false);
        this.props.removeCurrentUser();
        Router.push('/login');
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
    bindActionCreators(
        {
            removeCurrentUser,
            setLoggedIn,
        },
        dispatch,
    );

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
