import { Link } from "react-router-dom";
import StickyBox from "react-sticky-box";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="side-bar">
      <StickyBox offsetTop={50} offsetBottom={50} >
      <div
        className="title"
        style={{
          marginTop: "5%",
          marginBottom: "5%",
          marginLeft: "5%",
          marginRight: "5%",
        }}
      >
        <h4>Recipe Dashboard</h4>
      </div>
      <div className="menu">
        <div className="dashboard li">
          <Link to={"/"}>
            <h5>Dashboard</h5>
          </Link>
        </div>
        <div className="search li">
          <Link to={"/"}>
            <h5>Search</h5>
          </Link>
        </div>
        <div className="about li">
          <Link to={"/"}>
            <h5>About</h5>
          </Link>
        </div>
      </div>
      </StickyBox>
    </div>
  );
}

export default SideBar;
