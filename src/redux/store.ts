import { ICurrentUser } from '@common/types';
import { applyMiddleware, combineReducers, createStore, Dispatch } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { FormReducer, reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';

export interface IStoreState {
    form: FormReducer;
    loggedIn: boolean;
    currentUser: ICurrentUser;
}

const defaultInitialState = {
    loggedIn: false,
    currentUser: null,
};

// ACTION TYPE
export const actionTypes = {
    SET_LOGGED_IN: 'loggedIn/SET',
    SET_CURRENT_USER: 'currentUser/SET',
    REMOVE_CURRENT_USER: 'currentUser/REMOVE',
};

// REDUCERS
const loggedInReducer = (state: boolean = false, action?: any) => {
    switch (action.type) {
    case actionTypes.SET_LOGGED_IN: {
        const { data } = action.payload;
        return data;
    }
    default:
        return state;
    }
};

const currentUserReducer = (state: object | null = null, action?: any) => {
    switch (action.type) {
    case actionTypes.SET_CURRENT_USER: {
        const { data } = action.payload;
        return data;
    }
    case actionTypes.REMOVE_CURRENT_USER: {
        return null;
    }
    default:
        return state;
    }
};

// ACTIONS
export const setLoggedIn = (loggedIn: boolean) => (dispatch: Dispatch<IStoreState>) => {
    return dispatch({
        type: actionTypes.SET_LOGGED_IN,
        payload: {
            data: loggedIn,
        },
    });
};

export const setCurrentUser = (currentUser: ICurrentUser) => (dispatch: Dispatch<IStoreState>) => {
    return dispatch({
        type: actionTypes.SET_CURRENT_USER,
        payload: {
            data: currentUser,
        },
    });
};

export const removeCurrentUser = () => (dispatch: Dispatch<IStoreState>) => {
    return dispatch({
        type: actionTypes.REMOVE_CURRENT_USER,
    });
};

// INIT
export const initStore = (initialState = defaultInitialState) => {
    const reducers = combineReducers({
        form: formReducer,
        loggedIn: loggedInReducer,
        currentUser: currentUserReducer,
    });

    return createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware)),
    );
};
