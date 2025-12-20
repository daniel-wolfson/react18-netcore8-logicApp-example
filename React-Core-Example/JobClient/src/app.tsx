import React from "react";
import "./app.css";
import { JobViewChart } from "./components/JobViewChart";
import { Layout } from "./components/Layout";

import { connect } from "react-redux";
import { Job } from "./models/job.model";
import { JobView } from "./models/jobview.model";

interface AppProps {
  appLoading: boolean;
  jobs: Job[];
  jobViews: JobView[];
}

function App(props: AppProps) {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css"
      />
      <Layout>
        <JobViewChart 
          appLoading={props.appLoading} 
          jobs={props.jobs} 
          jobViews={props.jobViews} 
        />
      </Layout>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  const loading = state.loading?.appLoading ?? false;
  const jobs = state.jobs?.jobs ?? [];
  const jobViews = state.jobViews?.jobViews ?? [];
  
  return {
    appLoading: loading,
    jobs: jobs,
    jobViews: jobViews
  };
};

export default connect(mapStateToProps)(App);
