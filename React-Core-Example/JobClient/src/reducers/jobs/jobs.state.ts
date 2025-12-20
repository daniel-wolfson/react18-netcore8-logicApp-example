import { Reducer } from 'redux';
import { SET_JOBS_DATA } from '../../constants/action-types';
import { Job } from '../../models/job.model';

interface JobAction {
    type: string;
    payload?: Job[];
}

const initialState: Job[] = [];

const jobsReducer: Reducer<Job[], JobAction> = (state = initialState, action) => {
    switch (action.type) {
        case SET_JOBS_DATA:
            return action.payload || initialState;
        default:
            return state;
    }
};

export default jobsReducer;
