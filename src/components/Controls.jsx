import { useEffect, useState } from "react";
import './Control.css'

function Controls(props) {
  const [searchToggle, setSearchToggle] = useState(false);
  const [userInput, setUserInput] = useState({
    searchInput: "",
    maxCalories: "800",
    maxCarbs: "100",
    maxProtein: "100",
    maxFat: "100",
  });

  const handleChange = (evt) => {
    setUserInput((prevUserInput) => {
      const newUserInput = {
        ...prevUserInput,
        [evt.target.name]: evt.target.value,
      };

      return newUserInput;
    });
  };

  useEffect(() => {
    props.passSliderData(userInput);
  }, [searchToggle]);

  return (
    <div className="section-container">
      <h4>Filtering Result</h4>
      <div className="row">
        <div className="col-6">
          <label htmlFor="maxCalories" className="form-label fw-bold">
            Maximum Calories: {userInput.maxCalories}
          </label>
          <input
            type="range"
            className="form-range"
            value={userInput.maxCalories}
            min="0"
            max="2000"
            step="1"
            onChange={handleChange}
            id="maxCalories"
            name="maxCalories"
          />
        </div>
        <div className="col-6">
          <label htmlFor="maxCarbs" className="form-label fw-bold">
            Maximum Carbs: {userInput.maxCarbs}
          </label>
          <input
            type="range"
            className="form-range"
            value={userInput.maxCarbs}
            min="0"
            max="200"
            step="1"
            onChange={handleChange}
            id="maxCarbs"
            name="maxCarbs"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label htmlFor="maxProtein" className="form-label fw-bold">
            Maximum Protein: {userInput.maxProtein}
          </label>
          <input
            type="range"
            className="form-range"
            value={userInput.maxProtein}
            min="0"
            max="200"
            step="1"
            onChange={handleChange}
            id="maxProtein"
            name="maxProtein"
          />
        </div>
        <div className="col-6">
          <label htmlFor="maxFat" className="form-label fw-bold">
            Maximum Fat: {userInput.maxFat}
          </label>
          <input
            type="range"
            className="form-range"
            value={userInput.maxFat}
            min="0"
            max="200"
            step="1"
            onChange={handleChange}
            id="maxFat"
            name="maxFat"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label className="fw-bold" htmlFor="searchField">Search</label>
          <input
            type="text"
            class="form-control"
            id="searchField"
            placeholder="Search..."
            name="searchInput"
            onChange={handleChange}
          />
        </div>
        <div className="col-2 ml-4 mt-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setSearchToggle(!searchToggle);
            }}
          >
            Apply filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default Controls;
