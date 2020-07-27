import { searchSpeedAction } from './searchSpeedActions'

const initState = 10

export const searchSpeedReducer = (state:number = initState, action:searchSpeedAction) => {
    switch(action.type){
        case "CHANGE_SPEED":
            return action.payload
        default:
            return state
    }
}