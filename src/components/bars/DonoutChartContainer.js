import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { chartColors } from "./colors";

// Doughnut.defaults.global.legend.display = false;
const TOTALSCORE = 1
const options = {
  legend: {
    display: false,
  },
  labels: {
    display: false
  },
  tooltip: false,
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
    tooltip: false,
    datasets: [
      {
        label: "none",
        tooltip: false,
        data: [score/10, score/10 - TOTALSCORE],
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors
      }
    ]
  };
    
  return (
    <div className='wrapper'>
      <div className='chart-number' style={{
        position: "absolute",
        marginLeft: "20px",
        marginTop: "23px",
        color: "limegreen"
      }}>{score}</div>
      <Doughnut options={options} data={data} score={score}/>
  </div>
  );
}

export default DonoutChartContainer;
