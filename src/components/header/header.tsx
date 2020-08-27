import React from 'react'
import './header.css'
import { useSelector } from 'react-redux'
import { RootStore } from '../../store';
import {boardCommands} from '../../Reducers/boardChange/boardChangeAction'

interface IHeaderInputProps{
    changeAlgo(algo:string): void,
    startSearch(start:boolean): void,
    gridTilt(tilt:boolean): void,
    searchSpeed(speed:number): void,
    boardCommand(state:boolean, action:boardCommands): void
}

const Header: React.FC<IHeaderInputProps> = ({changeAlgo, startSearch, gridTilt,searchSpeed, boardCommand}) => {
    const tilt = useSelector( (state:RootStore) => state.tiltState)

    const onAlgoChange = () => {
        const e = document.getElementById('algo-select') as HTMLSelectElement
        const algoritm = e.options[e.selectedIndex].value
        changeAlgo(algoritm)
    }

    const onStartSearch = () => {
        startSearch(true)
    }

    const onGridTilt = () => {
        gridTilt(tilt ? false : true)
    }

    const onSearchSpeed = () => {
        const e = document.getElementById('speed-select') as HTMLSelectElement
        const speed = e.options[e.selectedIndex].value
        var speedValue = 10
        if(speed === "FAST") speedValue = 10
        if(speed === "MEDIUM") speedValue = 50
        if(speed === "SLOW") speedValue = 100
        searchSpeed(speedValue)
    }
    
    const HandleGitHubClick = () => {
        window.open("https://github.com/JCrews253/path-finding-visualizer")
    }

    const HandleHomeClick = () => {
        window.open("https://jcrews253.github.io/portfolio/#/projects",'_self')
    }

    const solving = useSelector((state: RootStore) => state.startSearch)

    return(
        <div className='header'>
            <h1 className='title'>Retro 80's Path Finding Visualization</h1>
            <div className='label-element-container'>
                <label className='algo-select-label' htmlFor='algo-select'>Choose an Algorithm:</label>
                <select onChange={() => onAlgoChange()} id='algo-select'>
                    <option value='astar'>A* Search</option>
                    <option value='dijkstra'>Dijkstra's Algorithm</option>
                    <option value='best-first'>Best First Search</option>
                    <option value='depth-first'>Depth First Search</option>
                    <option value='breadth-first'>Breadth First Search</option>
                </select>
            </div>
            <div className='buttons-container'>
                <button className='animated-button' onClick={()=> HandleHomeClick()}>Home</button>
                <button className='animated-button' onClick={()=> HandleGitHubClick()}>Github</button>
                <hr/>
                <button className='animated-button' onClick={() => onStartSearch()}>Start</button>
                <button className='animated-button'onClick={() => boardCommand(true,"CLEAR_PATH")}>Clear Path</button>
                <button className='animated-button'onClick={() => boardCommand(true,"CLEAR_BOARD")}>Clear Board</button>
                <button className='animated-button'onClick={() => boardCommand(true,"RANDOM_WALLS")}>Random Walls</button>
                <button className='animated-button' onClick={() => onGridTilt()}>Toggle Tilt</button>
            </div>
            <div className='label-element-container'>
                <label className='speed-select-label' htmlFor='speed-select'>Choose Search Speed</label>
                <select onChange={() => onSearchSpeed()} id='speed-select'>
                    <option value='FAST'>Fast</option>
                    <option value='MEDIUM'>Medium</option>
                    <option value='SLOW'>Slow</option>
                </select>
            </div>
        </div>
    )
}

export default Header