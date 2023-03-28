function SummaryBoard(props) {
  return (
    <div className="container">
      <h4>Nutrition Summary</h4>
      <div className="row">
        <div className="col-4">
          <div
            className="card text-white text-center bg-success bg-gradient mb-3"
            // style="max-width: 18rem;"
          >
            <div className="card-header bg-secondary fw-bold">Number of displayed dishes</div>
            <div className="card-body">
              <p className="card-text">{props.stats.number}</p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div
            className="card text-white text-center bg-success bg-gradient mb-3"
            // style="max-width: 18rem;"
          >
            <div className="card-header bg-secondary fw-bold">Mean Of Calories (g)</div>
            <div className="card-body">
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
            className="card text-white text-center bg-success bg-gradient mb-3"
            // style="max-width: 18rem;"
          >
            <div className="card-header bg-secondary fw-bold">Range of Calories (g)</div>
            <div className="card-body">
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
