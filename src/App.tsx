import React from 'react';
import './App.css';
import Header from './components/header/header';
import Grid from './components/grid/grid';
import { useDispatch } from 'react-redux';
import { changeAlgo } from './Reducers/algoSelect/algoSelectActions';
import { startSearch } from './Reducers/startSearch/startSearchActions'
import { gridTilt } from './Reducers/gridTilt/gridTiltActions'
import { searchSpeed } from './Reducers/searchSpeed/searchSpeedActions';
import { boardCommands, boardCommand } from './Reducers/boardChange/boardChangeAction'

function App() {
  
  const dispatch = useDispatch()

  const onAlgoChange = (algo:string) => {
    dispatch(changeAlgo(algo))
  }

  const onStartSearch = (start:boolean) => {
    dispatch(startSearch(start))
  }

  const onTiltChange = (tilt:boolean) => {
    dispatch(gridTilt(tilt))
  }

  const onSearchSpeed = (speed:number) => {
    dispatch(searchSpeed(speed))
  }

  const onBoardCommand = (state:boolean, action:boardCommands) => {
    dispatch(boardCommand(state,action))
  }

  return (
    <div className="App">
      <Header 
        changeAlgo={onAlgoChange} 
        startSearch={onStartSearch} 
        gridTilt={onTiltChange}
        searchSpeed={onSearchSpeed}
        boardCommand={onBoardCommand}
        />
      <Grid startSearch={onStartSearch}/>
    </div>
  );
}

export default App;