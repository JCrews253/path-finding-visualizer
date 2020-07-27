import { algoSelectAction } from './algoSelectActions'

const initialState = 'astar'

export const algoSelectReducer = (state:string = initialState, action:algoSelectAction) => {
    switch(action.type){
        case "CHANGE_ALGORITHM":{
            return action.payload
        }
        default: 
            return state
    }
}