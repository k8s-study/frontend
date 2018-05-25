import { client } from '@common/client';
import { ICurrentUser } from '@common/types';
import { setCurrentUser, setLoggedIn } from '@redux/store';
import withReduxStore from '@redux/with-redux-store';
import { IncomingMessage } from 'http';
import * as Cookies from 'js-cookie';
import App, { Container } from 'next/app';
import * as React from 'react';
import { Provider } from 'react-redux';

const hasApiKey = (req?: IncomingMessage) => {
    if (req && req.headers && req.headers.cookie) { // server
        const rawCookies = (req.headers.cookie as string).split('; ');
        const apiKeyCookie = rawCookies.find((c: string) => c.split('=')[0] == 'apiKey');
        if (apiKeyCookie) {
            return true;
        }
    } else { // browser
        if (Cookies.get('apiKey')) {
            return true;
        }
    }

    return false;
};

interface ICustomAppProps {
    loggedIn: boolean;
    currentUser: ICurrentUser;
    [x: string]: any;
}

class CustomApp extends App {
    public static async getInitialProps(app: any): Promise<ICustomAppProps> {
        const { Component, ctx } = app;

        ctx.loggedIn = ctx.reduxStore.getState().loggedIn;

        if (!ctx.loggedIn && hasApiKey(ctx.req)) {
            try {
                const res = (await client(ctx.req).get(`/user-service/v1/user`));
                if (res) {
                    ctx.loggedIn = true;
                    ctx.currentUser = { email: res.data.email };
                    ctx.reduxStore.dispatch(setLoggedIn(true));
                    ctx.reduxStore.dispatch(setCurrentUser(ctx.currentUser));
                }
            } catch (e) {
                /* tslint:disable: no-console */
                console.log(e);
            }
        }

        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps, loggedIn: ctx.loggedIn, currentUser: ctx.currentUser };
    }

    public render() {
        const { Component, pageProps, reduxStore, loggedIn, currentUser } = this.props;

        return (
            <Container>
                <Provider store={reduxStore}>
                    <Component {...pageProps} loggedIn={loggedIn} currentUser={currentUser} />
                </Provider>
            </Container>
        );
    }
}

export default withReduxStore(CustomApp);
