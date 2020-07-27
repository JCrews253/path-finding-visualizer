import React from 'react'
import './header.css'
import { useSelector } from 'react-redux'
import { RootStore } from '../../store';

interface IHeaderInputProps{
    changeAlgo(algo:string): void,
    startSearch(start:boolean): void,
    gridTilt(tilt:boolean): void,
    searchSpeed(speed:number): void
}

const Header: React.FC<IHeaderInputProps> = ({changeAlgo, startSearch, gridTilt,searchSpeed}) => {
    const onAlgoChange = () => {
        const e = document.getElementById('algo-select') as HTMLSelectElement
        const algoritm = e.options[e.selectedIndex].value
        changeAlgo(algoritm)
    }

    const onStartSearch = () => {
        startSearch(true)
    }

    const onGridTilt = () => {
        const checkbox = document.getElementById('disable-tilt') as HTMLInputElement
        gridTilt(checkbox.checked ? false : true)
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

    const solving = useSelector((state: RootStore) => state.startSearch)

    return(
        <div className='header'>
            <title className='title'>Retro 80's Path Finding Visualization</title>
            <div className='start-search-container'>
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
                <button className='start-search' onClick={() => onStartSearch()}>Start Search</button>
            </div>
            <div className='label-element-container'>
                <label className='disable-tilt-label' htmlFor='disable-tilt'>Disable Grid Tilt</label>
                <input type='checkbox' id='disable-tilt' onChange={() =>onGridTilt()}></input>
            </div>
            <div className='label-element-container'>
                <label className='speed-select-label' htmlFor='speed-select'>Choose Search Speed</label>
                <select onChange={() => onSearchSpeed()} id='speed-select'>
                    <option value='FAST'>Fast</option>
                    <option value='MEDIUM'>Medium</option>
                    <option value='SLOW'>Slow</option>
                </select>
            </div>
            <button className='clear-walls-button'>Clear Walls</button>
            <button className='clear-board-button'>Clear Board</button>
            <button className='gen-walls-button'>Generate Random Walls</button>
            <div className='label-element-container'>
                <label className='wall-percent-label' htmlFor='wall-percentage'>Wall Percentage</label>
                <input id='wall-percentage' type='range' min='0' max='100' defaultValue='30'></input>
            </div>
            <div className='nav-buttons-container'>
                <button className='nav-button'>Github</button>
                <button className='nav-button'>Home</button>
            </div>
        </div>
    )
}

export default Header