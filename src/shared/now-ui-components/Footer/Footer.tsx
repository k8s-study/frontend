import * as React from 'react';
import { Container } from 'reactstrap';
// used for making the prop types of this component

interface IFooterProps {
    default?: boolean;
    fluid?: boolean;
}

class Footer extends React.Component<IFooterProps, {}> {
    public render() {
        return (
            <footer className={'footer' + (this.props.default ? 'footer-default' : '')}>
                <Container fluid={this.props.fluid ? true : false}>
                    <nav>
                        <ul>
                            <li>
                                <a href="https://github.com/k8s-study">
                                   About Us
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="copyright">
                        &copy; {(new Date()).getFullYear()}, Coded by <a href="https://subicura.com" target="_blank" rel="noopener noreferrer">subicura</a>.
                    </div>
                </Container>
            </footer>
        );
    }
}

export default Footer;
