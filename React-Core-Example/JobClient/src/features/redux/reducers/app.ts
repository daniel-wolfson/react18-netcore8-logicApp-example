import { combineReducers } from 'redux';

import loading from './loading/index';
import jobs from './jobs/index';
import jobViews from './jobViews/index';

export default combineReducers({
  loading, jobs, jobViews
});
