import React from 'react';
import { AStarSearch } from './algorithms/astar'
import './App.css';

const rows = 10
const columns = 10
const nodeDimensions = 10

function App() {
  var array:number[] = []
  for(let i = 0; i < rows*columns; i++){
    array[i] = 0
  }

  const GetDistance = () => {
    let start = Math.floor(Math.random()*rows*columns-1)
    let end = Math.floor(Math.random()*rows*columns-1)
    AStarSearch(array,rows,start,end)
  }
  return (
    <div className="App">
      <button onClick={GetDistance}>button</button>
      <div className='grid' style={{
        gridTemplateColumns: `repeat(${columns},${nodeDimensions}px)`
      }}>
        {array.map( (_,idx) =>{
          return(
            <div className='node' key={idx} style={{
              width: `${nodeDimensions}px`,
              height: `${nodeDimensions}px`
            }}>
            </div> 
          )
        })}
      </div>
    </div>
  );
}

export default App;
