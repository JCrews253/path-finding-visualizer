import React, { useState, useRef, useEffect } from "react";
import { AStarSearch, Animation } from "../../algorithms/astar";
import "./grid.css";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../../store";
import { Dijkstra } from "../../algorithms/dijkstras";
import { BestFirstSearch } from "../../algorithms/bestFirst";
import { DepthFirstSearch } from "../../algorithms/depthFirst";
import { BreadthFirstSearch } from "../../algorithms/breadthFirst";
import { startSearch } from "../../Reducers/startSearch/startSearchActions";

const rows = 18;
const columns = 63;

const Grid = () => {
  window.onmousedown = (e: MouseEvent) => {
    if (e.type === "mousedown") mouseStatus.current = true;
  };

  window.onmouseup = (e: MouseEvent) => {
    if (e.type === "mouseup") {
      mouseStatus.current = false;
      startMoveStatus.current = false;
      finishMoveStatus.current = false;
    }
  };
  window.onresize = () => {
    if (tiltState) {
      HideHiddenWalls(20);
    } else {
      const nodeWidth = (window.innerWidth - 200) / columns;
      setNodeDimensions(nodeWidth);
    }
  };
  const HideHiddenWalls = (wallPercent: number) => {
    const ne = document.getElementsByClassName(
      "node"
    ) as HTMLCollectionOf<HTMLElement>;
    const newGrid = [...grid];
    for (let i = 0; i < ne.length; i++) {
      const location = ne[i].getBoundingClientRect();
      if (
        location.x + location.width / 2 < 0 ||
        location.x > window.innerWidth - 50 ||
        location.y > window.innerHeight
      ) {
        newGrid[i] = true;
      } else {
        newGrid[i] = Math.random() >= 1 - wallPercent / 100;
      }
    }
    setGrid(newGrid);
  };

  const HandleMouseDown = (index: number) => {
    if (!solving) {
      if (index === startNode) startMoveStatus.current = true;
      else if (index === finishNode) finishMoveStatus.current = true;
      else {
        mouseIndex.current = index;
        const newGrid = [...grid];
        newGrid[index] = grid[index] ? false : true;
        setGrid(newGrid);
      }
    }
  };

  const HandleMouseEnter = (index: number) => {
    if (!solving) {
      if (startMoveStatus.current) setStartNode(index);
      else if (finishMoveStatus.current) {
        const newGrid = [...grid];
        newGrid[prevFinish.current.index] = prevFinish.current.wasWall;
        newGrid[index] = false;
        setGrid(newGrid);
        prevFinish.current = {
          index: index,
          wasWall: grid[index],
        };
        setFinishNode(index);
      } else if (mouseStatus.current && index !== mouseIndex.current) {
        mouseIndex.current = index;
        const newGrid = [...grid];
        newGrid[index] = grid[index] ? false : true;
        setGrid(newGrid);
      }
    }
  };

  const GetBlankGrid = (wallPercent: number): boolean[] => {
    let array: boolean[] = [];
    for (let i = 0; i < rows * columns; i++) {
      array[i] = Math.random() >= 1 - wallPercent / 100;
    }
    return array;
  };
  const CleanGrid = () => {
    const ne = document.getElementsByClassName(
      "node"
    ) as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < ne.length; i++) {
      const tempClassNames = [];
      for (let j = 0; j < ne[i].classList.length; j++) {
        if (ne[i].classList[j] === "node") tempClassNames.push("node");
        if (ne[i].classList[j] === "start") tempClassNames.push("start");
        if (ne[i].classList[j] === "finish") tempClassNames.push("finish");
        if (ne[i].classList[j] === "wall") tempClassNames.push("wall");
      }
      ne[i].className = tempClassNames.join(" ");
    }
  };
  const StartSearch = async () => {
    dispatch(startSearch(true));
    CleanGrid();
    grid[finishNode] = false;
    let animations: Animation[] = [];
    if (algorithm === "astar")
      animations = AStarSearch(grid, columns, startNode, finishNode);
    if (algorithm === "dijkstra")
      animations = Dijkstra(grid, columns, startNode, finishNode);
    if (algorithm === "best-first")
      animations = BestFirstSearch(grid, columns, startNode, finishNode);
    if (algorithm === "depth-first")
      animations = DepthFirstSearch(grid, columns, startNode, finishNode);
    if (algorithm === "breadth-first")
      animations = BreadthFirstSearch(grid, columns, startNode, finishNode);

    const ne = document.getElementsByClassName(
      "node"
    ) as HTMLCollectionOf<HTMLElement>;
    if (animations.length === 0) dispatch(startSearch(false));
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        ne[animations[i].index].className += animations[i].className;
        if (i === animations.length - 1) dispatch(startSearch(false));
      }, i * speed);
    }
    hasSolution.current = true;
  };
  const StartSearchInstant = () => {
    var animations: Animation[] = [];
    if (algorithm === "astar")
      animations = AStarSearch(grid, columns, startNode, finishNode);
    if (algorithm === "dijkstra")
      animations = Dijkstra(grid, columns, startNode, finishNode);
    if (algorithm === "best-first")
      animations = BestFirstSearch(grid, columns, startNode, finishNode);
    if (algorithm === "depth-first")
      animations = DepthFirstSearch(grid, columns, startNode, finishNode);
    if (algorithm === "breadth-first")
      animations = BreadthFirstSearch(grid, columns, startNode, finishNode);
    const ne = document.getElementsByClassName(
      "node"
    ) as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < animations.length; i++) {
      ne[animations[i].index].className += animations[i].className + "Instant";
    }
  };

  const [grid, setGrid] = useState(() => GetBlankGrid(0));
  const [startNode, setStartNode] = useState(
    Math.floor(rows / 2) * columns - 1 - Math.floor(columns / 2)
  );
  const [finishNode, setFinishNode] = useState(Math.floor(columns / 2));
  const [nodeDimensions, setNodeDimensions] = useState(35);
  const prevFinish = useRef({ index: finishNode, wasWall: false });
  const dispatch = useDispatch();

  const mouseStatus = useRef(false);
  const startMoveStatus = useRef(false);
  const finishMoveStatus = useRef(false);
  const mouseIndex = useRef(-1);
  const hasSolution = useRef(false);
  const algorithm = useSelector((state: RootStore) => state.algoSelect);
  const solving = useSelector((state: RootStore) => state.startSearch);
  const tiltState = useSelector((state: RootStore) => state.tiltState);
  const speed = useSelector((state: RootStore) => state.searchSpeed);
  const boardChange = useSelector((state: RootStore) => state.boardChange);

  useEffect(() => {
    if (tiltState) {
      setNodeDimensions(50);
      setStartNode(Math.floor(rows / 2) * columns - 1 - Math.floor(columns / 2));
      setFinishNode(Math.floor(columns / 2));
    } else {
      const nodeWidth = (window.innerWidth - 200) / columns;
      setNodeDimensions(nodeWidth);
    }
  }, [tiltState]);

  useEffect(() => {
    if (solving) StartSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solving]);

  useEffect(() => {
    if (hasSolution.current) {
      CleanGrid();
      StartSearchInstant();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startNode, finishNode]);

  useEffect(() => {
    if (boardChange.clearBoard) {
      CleanGrid();
      HideHiddenWalls(0);
    } else if (boardChange.clearPath) {
      CleanGrid();
      hasSolution.current = false;
    } else if (boardChange.randomWalls) {
      CleanGrid();
      HideHiddenWalls(30);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardChange]);

  return (
    <div className="grid-container">
      <div
        className="grid"
        style={{
          marginTop: `${tiltState ? "-314px" : "0px"}`,
          transform: `${tiltState ? "perspective(800px) rotateX(60deg)" : ""}`,
          gridTemplateColumns: `repeat(${columns},auto)`,
        }}
      >
        {grid.map((_, idx) => {
          return (
            <div
              className={[
                "node",
                `${idx === startNode ? "start" : ""}`,
                `${idx === finishNode ? "finish" : ""}`,
                `${grid[idx] ? "wall" : ""}`,
              ].join(" ")}
              key={idx}
              onMouseDown={() => HandleMouseDown(idx)}
              onMouseEnter={() => HandleMouseEnter(idx)}
              style={{
                width: `${nodeDimensions}px`,
                height: `${nodeDimensions}px`,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};
export default Grid;
