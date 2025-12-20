import * as actionTypes from '../../constants/action-types';

export const loadJobsData = () => {
    return {
        type: actionTypes.REQUEST_JOBS_DATA,
    };
};
