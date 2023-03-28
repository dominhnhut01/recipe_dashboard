import { useEffect, useState } from "react";
import axios from "axios";
import Controls from "./Controls";
import SummaryBoard from "./SummaryBoard";

import "./Dashboard.css";

const API_KEY = import.meta.env.VITE_RECIPE_API;
function Dashboard(props) {
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [filteredRecipeInfo, setFilteredRecipeInfo] = useState([
    {
      title: "Please wait...",
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0,
    }
  ]);
  const [filterConfig, setFilterConfig] = useState({});
  const [stats, setStats] = useState({
    number: 0,
    mean: 0,
    range: [0, 0],
  });

  useEffect(() => {
    setFilteredRecipeInfo(
      recipeInfo.filter((recipe) => {
        return (
          (filterConfig.searchInput === "" ||
            recipe.title
              .toLowerCase()
              .includes(filterConfig.searchInput.trim().toLowerCase())) &&
          recipe.calories <= filterConfig.maxCalories &&
          recipe.carbs <= filterConfig.maxCarbs &&
          recipe.protein <= filterConfig.maxProtein &&
          recipe.fat <= filterConfig.maxFat
        );
      })
    );
  }, [filterConfig]);

  useEffect(() => {
    const number = filteredRecipeInfo.length;
    const mean =
      filteredRecipeInfo.reduce((acc, recipe) => acc + recipe.calories, 0) /
      number;
    const range = [
      Math.min(...filteredRecipeInfo.map((recipe, idx) => recipe.calories)),
      Math.max(...filteredRecipeInfo.map((recipe, idx) => recipe.calories)),
    ];

    setStats({
      number: number,
      mean: mean,
      range: range,
    });
    console.log(stats);
  }, [filteredRecipeInfo]);

  useEffect(() => {
    const getDietFromAPI = async () => {
      let response = await axios({
        method: "get",
        url: "https://api.spoonacular.com/recipes/findByNutrients",
        params: {
          apiKey: API_KEY,
          maxCalories: 2000,
          random: "true",
          number: props.number,
        },
      });
      //Parse Int
      let data = response.data.map((elem, idx) => {
        return {
          ...elem,
          ["carbs"]: parseInt(elem.carbs.split(/(\d+)/).filter(Boolean)[0]),
          ["fat"]: parseInt(elem.fat.split(/(\d+)/).filter(Boolean)[0]),
          ["protein"]: parseInt(elem.protein.split(/(\d+)/).filter(Boolean)[0]),
        };
      });
      setRecipeInfo(data);
      setFilteredRecipeInfo(data);
    };
    getDietFromAPI();
  }, []);

  useEffect(() => {
    console.log("filteredRecipeInfo: ");
    console.log(filteredRecipeInfo);
  }, [filterConfig]);

  function getSliderData(data) {
    setFilterConfig(data);
    console.log("config: ");
    console.log(data);
  }

  return (
    <div className="dashboard">
      <div className="mt-5 mb=5">
        <Controls passSliderData={getSliderData} />
      </div>
      <div className="mt-5 mb-5">
        <SummaryBoard stats={stats} />
      </div>

      <div className="container mt-5">
        <h4>Result</h4>
        <div className="row bg-secondary text-white py-2">
          <div className="col-4 text-center">Dish Name</div>
          <div className="col-2 text-center">Calories</div>
          <div className="col-2 text-center">Carbs (g)</div>
          <div className="col-2 text-center">Protein (g)</div>
          <div className="col-2 text-center">Fat (g)</div>
        </div>
        {filteredRecipeInfo &&
          filteredRecipeInfo.map((recipe, idx) => {
            return (
              <div className="row bg-success bg-gradient py-4" key={idx}>
                <div className="col-4 text-white">{recipe.title}</div>
                <div className="col-2 text-white text-center">
                  {recipe.calories}
                </div>
                <div className="col-2 text-white text-center">
                  {recipe.carbs}
                </div>
                <div className="col-2 text-white text-center">
                  {recipe.protein}
                </div>
                <div className="col-2 text-white text-center">{recipe.fat}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
export default Dashboard;
