import { Reducer } from 'redux';
import { SET_JOBVIEWS_DATA } from '../../constants/action-types';
import { JobView } from '../../models/jobview.model';

interface JobViewAction {
    type: string;
    payload?: JobView[];
}

const initialState: JobView[] = [];

const jobViewsReducer: Reducer<JobView[], JobViewAction> = (state = initialState, action) => {
    switch (action.type) {
        case SET_JOBVIEWS_DATA:
            return action.payload || initialState;
        default:
            return state;
    }
};

export default jobViewsReducer;
