import { Reducer } from 'redux';
import { APP_LOADING } from '../../constants/action-types';

interface LoadingAction {
    type: string;
    payload?: boolean;
}

const initialState = false;

const appLoadingReducer: Reducer<boolean, LoadingAction> = (state = initialState, action) => {
    switch (action.type) {
        case APP_LOADING:
            return action.payload ?? initialState;
        default:
            return state;
    }
};

export default appLoadingReducer;
