import { boardCommandDispatchTypes, clearBoardAction, clearPathAction, randomWallsAction } from './boardChangeAction'

interface IDefaultState{
    clearBoard: boolean,
    clearPath: boolean,
    randomWalls: boolean
}

const initState:IDefaultState = {
    clearBoard: false,
    clearPath: false,
    randomWalls: false
}

export const boardChangeReducer = (state:IDefaultState = initState, action: boardCommandDispatchTypes ): IDefaultState => {
    switch(action.type){
        case 'CLEAR_BOARD':
            return {
                clearBoard: true,
                clearPath: false,
                randomWalls: false
            }
        case 'CLEAR_PATH':
            return {
                clearBoard: false,
                clearPath: true,
                randomWalls: false
            }
        case 'RANDOM_WALLS':
            return {
                clearBoard: false,
                clearPath: false,
                randomWalls: true
            }
        default:
            return state
    }
}