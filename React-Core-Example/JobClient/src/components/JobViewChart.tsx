import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';
import { parse, parseISO, isValid, format } from 'date-fns';
import { Job } from "../models/job.model";
import { JobView } from "../models/jobview.model";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface IProps {
  appLoading: boolean;
  jobs: Job[];
  jobViews: JobView[];
}


  // Try common date formats (single-digit patterns first, then zero-padded)
  const formats = [
    'M/d/yyyy',      // 5/9/2024 (MM/DD US format with single digits)
    'MM/dd/yyyy',    // 12/31/2024
    'd/M/yyyy',      // 5/9/2024 (DD/MM format with single digits)
    'dd/MM/yyyy',    // 31/12/2024
    'M-d-yyyy',      // 5-9-2024
    'MM-dd-yyyy',    // 12-31-2024
    'd-M-yyyy',      // 5-9-2024
    'dd-MM-yyyy',    // 31-12-2024
    'M.d.yyyy',      // 5.9.2024
    'MM.dd.yyyy',    // 12.31.2024
    'd.M.yyyy',      // 5.9.2024
    'dd.MM.yyyy',    // 31.12.2024
  ];

export const parseDateFromString = (dateStr: string): Date | null => {
  if (!dateStr) {
    return null;
  }

  // Try ISO format first
  const isoDate = parseISO(dateStr);
  if (isValid(isoDate)) {
    return isoDate;
  }

  for (const formatStr of formats) {
    const parsed = parse(dateStr, formatStr, new Date());
    if (isValid(parsed)) {
      return parsed;
    }
  }

  return null;
};

const convertDate = (dateStr: string): string => {
  const parsedDate = parseDateFromString(dateStr);
  if (!parsedDate) {
    return dateStr || "";
  }

  return format(parsedDate, 'MMMM d');
};

const coerceNumber = (...values: Array<number | string | null | undefined>): number => {
  for (const value of values) {
    if (typeof value === "number" && !Number.isNaN(value)) {
      return value;
    }

    if (typeof value === "string" && value.trim().length) {
      const parsed = Number(value);
      if (!Number.isNaN(parsed)) {
        return parsed;
      }
    }
  }

  return 0;
};

export class JobViewChart extends React.Component<IProps, ChartData<"bar" | "line">> {
  options: any;

  constructor(props: IProps) {
    super(props);

    // Chart.js v4 options structure
    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Cumulative job views vs. prediction",
          font: {
            size: 20,
          },
        },
        legend: {
          display: true,
          position: "bottom" as const,
          labels: {
            color: "#323130",
            font: {
              size: 14,
            },
          },
        },
        tooltip: {
          backgroundColor: "white",
          titleColor: "black",
          bodyColor: "black",
          borderColor: "gray",
          borderWidth: 1,
          displayColors: false,
          callbacks: {
            title: function (tooltipItems: any) {
              return tooltipItems[0].label;
            },
            beforeBody: function (tooltipItems: any) {
              const index = tooltipItems[0].dataIndex;
              const datasets = tooltipItems[0].chart.data.datasets;
              const viewsVal = datasets[0]?.data[index] ?? 0;
              const predictedVal = datasets[1]?.data[index] ?? 0;
              const activeJobsVal = datasets[2]?.data[index] ?? 0;
              
              return [
                `Job views: ${viewsVal}`,
                `Predicted job views: ${predictedVal}`,
                `Active jobs: ${activeJobsVal}`
              ];
            },
            label: function () {
              return "";
            },
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "",
          },
        },
        'y-axis-jobViews': {
          type: "linear" as const,
          display: true,
          position: "left" as const,
          title: {
            display: true,
            text: "Job views",
          },
          ticks: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 1500,
            stepSize: 500,
          },
        },
        'y-axis-jobs': {
          type: "linear" as const,
          display: true,
          position: "right" as const,
          grid: {
            display: false,
          },
          title: {
            display: true,
            text: "Jobs",
          },
          ticks: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 100,
            stepSize: 50,
          },
        },
      },
    } as ChartOptions<"bar" | "line">;

    this.state = this.buildChartState(props.jobViews);
  }

  private buildChartState(jobViews: JobView[] = []): ChartData<"bar" | "line"> {
    const labels = jobViews.map((x) => convertDate(x.viewDate));
    const views = jobViews.map((x: any) =>
      coerceNumber(x.views, x.viewCount, x.viewNum)
    );
    const viewsPredicted = jobViews.map((x: any) =>
      coerceNumber(x.viewsPredicted, x.viewCountPredicted, x.viewNumPredicted)
    );
    const activeJobs = jobViews.map((x: any) =>
      coerceNumber(x.activeJobs, x.jobs, x.jobCount, x.activeJobCount)
    );

    return {
      labels,
      datasets: [
        {
          type: "line",
          label: "views",
          borderColor: "rgb(98, 138, 71)",
          borderWidth: 2,
          fill: false,
          data: views,
          yAxisID: 'y-axis-jobViews',
          pointBorderColor: "rgba(94, 217, 170, 1)",
          pointBackgroundColor: "rgba(94, 217, 170, 1)",
          pointBorderWidth: 1,
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 3,
        },
        {
          type: "line",
          label: "Predicted views",
          borderColor: "rgb(94, 203, 217)",
          borderWidth: 1,
          fill: false,
          data: viewsPredicted,
          yAxisID: 'y-axis-jobViews',
          borderDash: [5, 5],
        },
        {
          type: "bar",
          label: "active jobs",
          backgroundColor: "rgb(207, 207, 207)",
          data: activeJobs,
          yAxisID: 'y-axis-jobs',
          borderColor: "white",
          borderWidth: 2,
        },
      ],
    };
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.jobViews !== this.props.jobViews) {
      this.setState(this.buildChartState(this.props.jobViews));
    }
  }

  render() {
    return (
      <div className="job-view-chart-container">
        <Bar data={this.state as any} options={this.options} />
      </div>
    );
  }
}
