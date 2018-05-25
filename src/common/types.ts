import { Context } from 'next/document';
import { Store } from 'redux';

export interface IReduxContext<T> extends Context {
    store: Store<T>;
    isServer: boolean;
}

export interface ICurrentUser {
    email: string;
}
