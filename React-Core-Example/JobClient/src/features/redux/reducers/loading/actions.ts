import * as actionTypes from '../../constants/action-types';

export const appLoading = (payload: boolean) => {
    return {
        type: actionTypes.APP_LOADING,
        payload: payload
      };
};

