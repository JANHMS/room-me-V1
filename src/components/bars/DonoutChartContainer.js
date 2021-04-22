import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { chartColors } from "./colors";

// Doughnut.defaults.global.legend.display = false;

const options = {
  legend: {
    display: false,
  },
  labels: {
    display: false
  }
};

const DonoutChartContainer = ({
  score
}) => {
  const data = {
    maintainAspectRatio: false,
    responsive: false,
    labels: {
      display: false
    },
    datasets: [
      {
        label: "none",
        data: [score, 17],
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors
      }
    ]
  };

  return (
    <Doughnut options={options} data={data} score={score}/>
  );
}

export default DonoutChartContainer;
