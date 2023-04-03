import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./DishDetailsPage.css";

const API_KEY = import.meta.env.VITE_RECIPE_API;
function capitalize(str) {
  const arr = str.split(" ");

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr.join(" ");
}

function DishDetailsPage(props) {
  const { dish_id } = useParams();
  const [ingredientInfo, setIngredientInfo] = useState([]);

  useEffect(() => {
    async function getIngredientDetails() {
      const response = await axios({
        method: "get",
        url: `https://api.spoonacular.com/recipes/${dish_id}/ingredientWidget.json`,
        params: {
          apiKey: API_KEY,
        },
      });
      setIngredientInfo(response.data.ingredients);
    }
    getIngredientDetails();
  }, []);

  useEffect(() => {
    console.log(ingredientInfo);
  }, [ingredientInfo]);

  return (
    <div className="section-container">
      <h3>{}Ingredient List</h3>
      <hr />
      {ingredientInfo &&
        ingredientInfo.map((ingredient) => {
          return (
            <div className="ingredient" key={ingredient.name}>
              {capitalize(ingredient.name)}: {ingredient.amount.us.value}{" "}
              {ingredient.amount.us.unit}
            </div>
          );
        })}
    </div>
  );
}

export default DishDetailsPage;
