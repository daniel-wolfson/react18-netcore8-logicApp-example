import axios from 'axios';
import { Job } from '../models/job.model';
import { JobView } from '../models/jobview.model';
import { mockJobs, mockJobViews } from '../tests/mockData';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true';

export const jobApi = {
    /**
     * Fetch all jobs
     */
    getJobs: async (): Promise<Job[]> => {
        if (USE_MOCK_DATA) {
            console.log('Using mock jobs data');
            return Promise.resolve(mockJobs);
        }

        try {
            const response = await axios.get<Job[]>(`${API_URL}/api/JobApi/Jobs/GetJobs`);
            return response.data;
        } catch (error) {
            console.warn('API request failed, using mock data:', error);
            return mockJobs;
        }
    },

    /**
     * Fetch job views
     */
    getJobViews: async (): Promise<JobView[]> => {
        if (USE_MOCK_DATA) {
            console.log('Using mock job views data');
            return Promise.resolve(mockJobViews);
        }

        try {
            const response = await axios.get<JobView[]>(`${API_URL}/api/JobApi/Jobs/GetJobViews`);
            return response.data;
        } catch (error) {
            console.warn('API request failed, using mock data:', error);
            return mockJobViews;
        }
    },
};
