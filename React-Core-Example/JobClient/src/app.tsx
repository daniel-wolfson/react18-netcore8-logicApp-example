import React, { useEffect } from 'react';
import './app.css';
import { Layout } from './components/Layout';
import { JobViewChart } from './components/JobViewChart';
import { useJobData } from './hooks/useJobs';
import { useAppContext } from './context/AppContext';

function App() {
    const { jobs, jobViews, isLoading, isError, error } = useJobData();
    const { appLoading, setAppLoading } = useAppContext();

    useEffect(() => {
        // Update app loading state based on queries
        setAppLoading(isLoading);
    }, [isLoading, setAppLoading]);

    if (isError) {
        return (
            <Layout>
                <div className="error">Error loading data: {error?.message || 'Unknown error'}</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="App">
                <header className="App-header">
                    {appLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <JobViewChart appLoading={appLoading} jobs={jobs} jobViews={jobViews} />
                    )}
                </header>
            </div>
        </Layout>
    );
}

export default App;
