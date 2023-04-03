import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiLink } from "react-icons/fi";

import Controls from "./Controls";
import SummaryBoard from "./SummaryBoard";

import "./Dashboard.css";
import TasteChart from "./TasteChart";

const API_KEY = import.meta.env.VITE_RECIPE_API;
function Dashboard(props) {
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [curDishID, setCurDishID] = useState(-1);
  const [filteredRecipeInfo, setFilteredRecipeInfo] = useState([
    {
      title: "Please wait...",
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0,
    },
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

  function redirectDetails(dish_id) {}

  return (
    <div className="dashboard">
      <div className="row">
        <div className="col-7">
          <Controls passSliderData={getSliderData} />
          <SummaryBoard stats={stats} />

          <div className="section-container">
            <h4>Result</h4>
            <h9>Hover your mouse over each dish name to see its taste measurement chart</h9>
            <div className="row card-title-color text-white py-2">
              <div className="col-3 text-center">Dish Name</div>
              <div className="col-2 text-center">Calories</div>
              <div className="col-2 text-center">Carbs (g)</div>
              <div className="col-2 text-center">Protein (g)</div>
              <div className="col-2 text-center">Fat (g)</div>
              <div className="col-1 text-center">Details (g)</div>
            </div>
            {filteredRecipeInfo &&
              filteredRecipeInfo.map((recipe, idx) => {
                return (
                  <div className="row card-content-color py-4" key={idx}>
                    <div
                      className="content-item col-3 text-white"
                      onMouseEnter={() => setCurDishID(recipe.id)}
                    >
                      {recipe.title}
                    </div>
                    <div className="content-item col-2 text-white text-center">
                      {recipe.calories}
                    </div>
                    <div className="content-item col-2 text-white text-center">
                      {recipe.carbs}
                    </div>
                    <div className="content-item col-2 text-white text-center">
                      {recipe.protein}
                    </div>
                    <div className="content-item col-2 text-white text-center">
                      {recipe.fat}
                    </div>
                    <div className="content-item col-1 text-white text-center">
                      <Link to={`/details/${recipe.id}`}>
                        <FiLink />
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="col-5">
            {curDishID != -1 && <TasteChart dish_id={curDishID} />}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
