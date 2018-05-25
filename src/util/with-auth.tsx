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
        public static async getInitialProps(ctx: Context): Promise<any> {
            let pageProps = {};

            if (WrappedComponent.getInitialProps) {
                pageProps = await WrappedComponent.getInitialProps(ctx);
            }

            return { pageProps };
        }

        public componentDidMount() {
            if (!this.props.loggedIn) {
                Cookies.remove('apiKey');
                Router.push('/login');
            }
        }

        public render() {
            return <WrappedComponent {...this.props.pageProps} />;
        }
    };
};
