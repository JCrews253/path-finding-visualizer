import React, { ChangeEvent } from "react";
import "./header.css";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../../store";
import { boardCommand } from "../../Reducers/boardChange/boardChangeAction";
import { changeAlgo } from "../../Reducers/algoSelect/algoSelectActions";
import { startSearch } from "../../Reducers/startSearch/startSearchActions";
import { gridTilt } from "../../Reducers/gridTilt/gridTiltActions";
import { searchSpeed } from "../../Reducers/searchSpeed/searchSpeedActions";

const Header = () => {
  const dispatch = useDispatch();

  const tilt = useSelector((state: RootStore) => state.tiltState);

  const onAlgoChange = (event: ChangeEvent<HTMLSelectElement>) =>
    dispatch(changeAlgo(event.target.value));

  const onStartSearch = () => dispatch(startSearch(true));

  const onGridTilt = () => dispatch(gridTilt(tilt ? false : true));

  const onSearchSpeed = (event: ChangeEvent<HTMLSelectElement>) => {
    const speed = event.target.value;
    var speedValue;
    if (speed === "SLOW") speedValue = 100;
    else if (speed === "MEDIUM") speedValue = 50;
    else speedValue = 10;
    dispatch(searchSpeed(speedValue));
  };

  const HandleGitHubClick = () =>
    window.open("https://github.com/JCrews253/path-finding-visualizer");

  const HandleHomeClick = () =>
    window.open("https://jamesrcrews.com", "_self");

  return (
    <div className="header">
      <h1 className="title">Retro 80's Path Finding Visualization</h1>
      <div className="label-element-container">
        <label className="algo-select-label" htmlFor="algo-select">
          Choose an Algorithm:
        </label>
        <select onChange={onAlgoChange} id="algo-select">
          <option value="astar">A* Search</option>
          <option value="dijkstra">Dijkstra's Algorithm</option>
          <option value="best-first">Best First Search</option>
          <option value="depth-first">Depth First Search</option>
          <option value="breadth-first">Breadth First Search</option>
        </select>
      </div>
      <div className="buttons-container">
        <button className="animated-button" onClick={HandleHomeClick}>
          Home
        </button>
        <button className="animated-button" onClick={HandleGitHubClick}>
          Github
        </button>
        <hr />
        <button className="animated-button" onClick={onStartSearch}>
          Start
        </button>
        <button
          className="animated-button"
          onClick={() => dispatch(boardCommand(true, "CLEAR_PATH"))}
        >
          Clear Path
        </button>
        <button
          className="animated-button"
          onClick={() => dispatch(boardCommand(true, "CLEAR_BOARD"))}
        >
          Clear Board
        </button>
        <button
          className="animated-button"
          onClick={() => dispatch(boardCommand(true, "RANDOM_WALLS"))}
        >
          Random Walls
        </button>
        <button className="animated-button" onClick={onGridTilt}>
          Toggle Tilt
        </button>
      </div>
      <div className="label-element-container">
        <label className="speed-select-label" htmlFor="speed-select">
          Choose Search Speed
        </label>
        <select onChange={onSearchSpeed} id="speed-select">
          <option value="FAST">Fast</option>
          <option value="MEDIUM">Medium</option>
          <option value="SLOW">Slow</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
