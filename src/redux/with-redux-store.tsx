import { initStore } from '@redux/store';
import App from 'next/app';
import * as React from 'react';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState?: any) {
    // Always make a new store if server, otherwise state is shared between requests
    if (isServer) {
        return initStore(initialState);
    }

    // Store in global variable if client
    if (!window[__NEXT_REDUX_STORE__]) {
        window[__NEXT_REDUX_STORE__] = initStore(initialState);
    }

    return window[__NEXT_REDUX_STORE__];
}

export default (CustomApp: App) => {
    return class extends React.Component {
        public static async getInitialProps(appContext: any) {
            const reduxStore = getOrCreateStore();

            // Provide the store to getInitialProps of pages
            appContext.ctx.reduxStore = reduxStore;

            let appProps = {};
            if (CustomApp.getInitialProps) {
                appProps = await CustomApp.getInitialProps(appContext);
            }

            return {
                ...appProps,
                initialReduxState: reduxStore.getState(),
            };
        }

        private reduxStore: any;

        constructor(props: any) {
            super(props);
            this.reduxStore = getOrCreateStore(props.initialReduxState);
        }

        public render() {
            return <CustomApp {...this.props} reduxStore={this.reduxStore} />;
        }
    };
};
