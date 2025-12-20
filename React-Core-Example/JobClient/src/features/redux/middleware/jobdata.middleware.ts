import request from 'axios';
import * as actionTypes from '../constants/action-types';
import { appLoading } from '../reducers/loading/actions';
import { mockJobs, mockJobViews } from '../../../tests/mockData';

const API_URL = 'http://localhost:5000'; //TODO: read from appsettings
const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true'; // Set to true to use mock data

export const jobDataMiddleWare = (store: any) => (next: Function) => async (action: any) => {
    switch (action.type) {
        case actionTypes.APP_LOADING:
            if (action.payload) store.dispatch({ type: actionTypes.REQUEST_INIT_DATA });
            break;

        case actionTypes.REQUEST_JOBS_DATA:
            var results = await getJobs(store.dispatch, next);
            store.dispatch({ type: actionTypes.SET_JOBS_DATA, payload: results.data });
            break;

        case actionTypes.REQUEST_JOBVIEWS_DATA:
            getJobs(store.dispatch, next).then((results) =>
                store.dispatch({ type: actionTypes.SET_JOBVIEWS_DATA, payload: results.data })
            );
            break;

        case actionTypes.REQUEST_INIT_DATA:
            const promises = [getJobs(store.dispatch, next), getJobVews(store.dispatch, next)];
            Promise.all(promises).then((result) => {
                //jobs
                var jobsData = result && result[0] && result[0].data && result[0].data.length ? result[0].data : [];
                store.dispatch({ type: actionTypes.SET_JOBS_DATA, payload: [...jobsData] });

                //jobsVews
                var jobsVewsData = result && result[1] && result[1].data && result[1].data.length ? result[1].data : [];
                store.dispatch({ type: actionTypes.SET_JOBVIEWS_DATA, payload: [...jobsVewsData] });

                //app loading false
                store.dispatch(appLoading(false));
            });
            break;

        case actionTypes.ERROR_DATA:
            console.error(action.payload);
            break;

        // Do nothing if the action does not interest us
        default:
            next(action); // Pass all actions through by default
            break;
    }
};

// get jobs from server
export const getJobs = (dispatch: any, next: any) => {
    if (USE_MOCK_DATA) {
        // Return mock data as a resolved promise
        return Promise.resolve({ data: mockJobs });
    }

    const promise = request.get(`${API_URL}/api/JobApi/Jobs/GetJobs`);
    promise.catch((error) => {
        console.warn('API request failed, using mock data:', error.message);
        return { data: mockJobs };
    });
    return promise;
};

// get job views from server
export const getJobVews = (dispatch: any, next: any) => {
    if (USE_MOCK_DATA) {
        // Return mock data as a resolved promise
        return Promise.resolve({ data: mockJobViews });
    }

    const promise = request.get(`${API_URL}/api/JobApi/Jobs/GetJobViews`);
    promise.catch((error) => {
        console.warn('API request failed, using mock data:', error.message);
        return { data: mockJobViews };
    });
    return promise;
};

export default jobDataMiddleWare;
