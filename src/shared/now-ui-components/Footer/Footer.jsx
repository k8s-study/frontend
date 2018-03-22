import React from 'react';
import { Container } from 'reactstrap';
// used for making the prop types of this component
import PropTypes from 'prop-types';

class Footer extends React.Component{
    render(){
        return (
            <footer className={"footer"
                + (this.props.default ? " footer-default":"")
            }>
                <Container fluid={this.props.fluid ? true:false}>
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
                        &copy; {1900 + (new Date()).getYear()}, Coded by <a href="https://subicura.com" target="_blank" rel="noopener noreferrer">subicura</a>.
                    </div>
                </Container>
            </footer>
        );
    }
}

Footer.propTypes = {
    default: PropTypes.bool,
    fluid: PropTypes.bool
}

export default Footer;
