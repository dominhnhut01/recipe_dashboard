import axios from "axios";
import { useEffect, useState } from "react";
import StickyBox from "react-sticky-box";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const API_KEY = import.meta.env.VITE_RECIPE_API;

function TasteChart(props) {
  const [taste, setTaste] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Normalized Taste Value",
        barPercentage: 0.7,
        barThickness: 40,
        maxBarThickness: 40,
        minBarLength: 2,
        data: [],
        yAxisID: "y-axis-1", // add this line
      },
    ],
    options: {
      scales: {
        yAxes: [
          {
            id: "y-axis-1", // add this line
            type: "linear", // or 'category'
          },
        ],
      },
      responsive: true,
    },
  });
  useEffect(() => {
    async function fetchTasteFromAPI(dish_id) {
      const response = await axios({
        method: "get",
        url: `https://api.spoonacular.com/recipes/${dish_id}/tasteWidget.json`,
        params: {
          apiKey: API_KEY,
          normalize: true,
        },
      });

      setTaste(response.data);
      setChartData({
        ...chartData,
        ["labels"]: Object.keys(response.data),
        ["datasets"]: [
          {
            ...chartData.datasets[0],
            ["data"]: Object.values(response.data),
          },
        ],
      });
    }

    fetchTasteFromAPI(props.dish_id);
  }, [props.dish_id]);

  useEffect(() => {
    console.log(chartData);
  }, [props.dish_id]);

  return (
    <StickyBox offsetTop={100} offsetBottom={100}>
      <div className="section-container">
        {chartData.labels.length !== 0 && (
          <Bar data={chartData} options={chartData.options} />
        )}
      </div>
    </StickyBox>
  );
}

export default TasteChart;
