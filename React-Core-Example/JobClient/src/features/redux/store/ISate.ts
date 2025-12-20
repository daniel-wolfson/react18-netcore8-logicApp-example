import { Job } from '../../../models/job.model';
import { JobView } from '../../../models/jobview.model';

export interface IState {
    appLoading: boolean;
    jobs: Job[];
    jobViews: JobView[];
}
