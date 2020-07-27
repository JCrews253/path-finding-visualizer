import { startSearchAction } from './startSearchActions'

const initialState = false

export const startSearchReducer = (state:boolean = initialState, action:startSearchAction) => {
    switch(action.type){
        case "START_SEARCH" :{
            return action.payload
        }
        default: 
            return state
    }
}