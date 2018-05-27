import { client } from '@common/client';
import LayoutEmpty from '@layouts/empty';
import { LOGIN_REDUX_FORM } from '@redux/login';
import { removeCurrentUser, setCurrentUser, setLoggedIn } from '@redux/store';
import { PanelHeader } from '@shared/now-ui-components';
import * as Cookies from 'js-cookie';
import Link from 'next/link';
import Router from 'next/router';
import * as React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { bindActionCreators, Dispatch } from 'redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

interface IPageLoginProps <FormData> extends InjectedFormProps<FormData> {}

interface ILoginForm {
    email: string;
    password: string;
}

class PageLogin extends React.Component<IPageLoginProps<ILoginForm>, {}> {
    public componentDidMount() {
        Cookies.remove('apiKey');
    }

    public render() {
        const { handleSubmit } = this.props;

        return (
            <LayoutEmpty title="pongpong | Login">
                <PanelHeader
                    content={
                        <div className="header text-center">
                            <h2 className="title">Login</h2>
                            <p className="category">
                                SignIn or
                                {' '}
                                <Link href="/signup">
                                    <a>SignUp</a>
                                </Link>
                            </p>
                        </div>
                    }
                />
                <div className="content">
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            <Card>
                                <CardHeader>
                                    <h5 className="title">Login</h5>
                                </CardHeader>
                                <CardBody>
                                    <form onSubmit={handleSubmit} role="form">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className=" form-control-label">Email</label>
                                                    <Field
                                                        name="email"
                                                        component="input"
                                                        type="email"
                                                        placeholder="Input email"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className=" form-control-label">Password</label>
                                                    <Field
                                                        name="password"
                                                        component="input"
                                                        type="password"
                                                        placeholder="Input password"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <button className="btn btn-primary btn-block" type="submit">
                                            Login
                                        </button>
                                    </form>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </LayoutEmpty>
        );
    }
}

const validate = (val: ILoginForm) => {
    const errors: any = {};

    if (!val.email) {
        errors.email = 'Email is required.';
    }

    if (!val.password) {
        errors.password = 'Password is required.';
    }

    return errors;
};

const onSubmit = async (val: ILoginForm, dispatch: Dispatch<any>, props: any) => {
    try {
        const result = (await client().post(`/user-service/v1/login`, val));
        if (result.data.key) {
            Cookies.set('apiKey', result.data.key, { expires: 30 });
            props.setLoggedIn(true);
            props.setCurrentUser({ email: val.email });
            Router.push('/');
        } else {
            alert('Login error');
            props.setLoggedIn(false);
            props.removeCurrentUser();
        }
    } catch (e) {
        props.setLoggedIn(false);
        props.removeCurrentUser();
        alert(e.response.data.message);
    }
};

const PageLoginReduxForm = reduxForm({
    form: LOGIN_REDUX_FORM,
    validate,
    onSubmit,
})(PageLogin);

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
    bindActionCreators(
        {
            removeCurrentUser,
            setCurrentUser,
            setLoggedIn,
        },
        dispatch,
    );

export default connect(mapStateToProps, mapDispatchToProps)(PageLoginReduxForm);
