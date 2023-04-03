import "./SummaryBoard.css";

function SummaryBoard(props) {
  return (
    <div className="section-container">
      <h4>Nutrition Summary</h4>
      <div className="row">
        <div className="col-4">
          <div
            className="card text-white text-center mb-3"
            // style="max-width: 18rem;"
          >
            <div className="card-header card-title-color fw-bold">
              Number of displayed dishes
            </div>
            <div className="card-body card-content-color">
              <p className="card-text">{props.stats.number}</p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div
            className="card text-white text-center mb-3"
            // style="max-width: 18rem;"
          >
            <div className="card-header card-title-color fw-bold">
              Mean Of Calories (g)
            </div>
            <div className="card-body card-content-color">
              <p className="card-text">
                {isNaN(props.stats.mean)
                  ? "Not Valid"
                  : Math.round(props.stats.mean)}
              </p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div
            className="card text-white text-center mb-3"
            // style="max-width: 18rem;"
          >
            <div className="card-header card-title-color fw-bold">
              Range of Calories (g)
            </div>
            <div className="card-body card-content-color">
              <p className="card-text">
                {isNaN(props.stats.range[0]) || !isFinite(props.stats.range[0])
                  ? "Not Valid"
                  : props.stats.range[0]}{" "}
                -{" "}
                {isNaN(props.stats.range[1]) || !isFinite(props.stats.range[1])
                  ? "Not Valid"
                  : props.stats.range[1]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryBoard;
