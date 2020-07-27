import { gridTiltAction } from './gridTiltActions'

const initialState = true

export const tiltStateReducer = (state:boolean = initialState, action:gridTiltAction) => {
    switch(action.type){
        case 'CHANGE_TILT_STATE' :{
            return action.payload
        }
        default: 
            return state
    }
}