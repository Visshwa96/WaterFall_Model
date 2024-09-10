import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WaterFall_Plot = ({ data }) => {
  const labels = data.map((item) => `${item.month} (${item.column})`);
  const values = data.map((item) => item.intermediateValue);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Intermediate Values",
        data: values,
        backgroundColor: values.map((val) => (val >= 0 ? "green" : "red")),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Waterfall Chart of Intermediate Values",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default WaterFall_Plot;
