import { useQuery } from '@tanstack/react-query';
import { jobApi } from '../services/jobApi';

export const useJobs = () => {
    return useQuery({
        queryKey: ['jobs'],
        queryFn: jobApi.getJobs,
    });
};

export const useJobViews = () => {
    return useQuery({
        queryKey: ['jobViews'],
        queryFn: jobApi.getJobViews,
    });
};

export const useJobData = () => {
    const jobsQuery = useJobs();
    const jobViewsQuery = useJobViews();

    return {
        jobs: jobsQuery.data ?? [],
        jobViews: jobViewsQuery.data ?? [],
        isLoading: jobsQuery.isLoading || jobViewsQuery.isLoading,
        isError: jobsQuery.isError || jobViewsQuery.isError,
        error: jobsQuery.error || jobViewsQuery.error,
    };
};
