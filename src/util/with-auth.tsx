import { Context } from 'next/document';
import Router from 'next/router';
import * as React from 'react';

export interface IAuthProps {
    currentUser?: any;
    loggedIn: boolean;
}

export const withAuth = (WrappedComponent: React.ComponentType) => {
    return class extends React.Component<IAuthProps, {}> {
        public static async getInitialProps (ctx: Context): Promise<IAuthProps> {
            return { currentUser: {}, loggedIn: false };
        }

        public componentDidMount() {
            if (!this.props.loggedIn) {
                Router.push('/login');
            }
        }

        public render() {
            return <WrappedComponent {...this.props} />;
        }
    };
};
