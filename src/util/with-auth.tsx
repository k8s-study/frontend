import * as Cookies from 'js-cookie';
import { Context, DocumentProps } from 'next/document';
import Router from 'next/router';
import * as React from 'react';

export interface INextComponentType {
    getInitialProps?(ctx: Context): DocumentProps;
}

export interface IAuthProps {
    currentUser?: any;
    loggedIn: boolean;
}

export const withAuth = (WrappedComponent: React.ComponentType & INextComponentType) => {
    return class extends React.Component<any & IAuthProps, {}> {
        public static async getInitialProps(ctx: Context & IAuthProps): Promise<any> {
            let pageProps = {};

            if (WrappedComponent.getInitialProps) {
                pageProps = await WrappedComponent.getInitialProps(ctx);
            }

            console.log(ctx.loggedIn);
            if (!ctx.loggedIn) {
                if (ctx.req) { // server
                    ctx.res.writeHead(302, { Location: '/login' });
                    ctx.res.end();
                } else {
                    Cookies.remove('apiKey');
                    Router.push('/login');
                }
            }

            return { pageProps };
        }

        public render() {
            return <WrappedComponent {...this.props.pageProps} />;
        }
    };
};
