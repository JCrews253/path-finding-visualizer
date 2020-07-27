import { createStore, combineReducers } from 'redux'
import { algoSelectReducer } from './Reducers/algoSelect/algoSelectReducer'
import { startSearchReducer } from './Reducers/startSearch/startSearchReducer'
import { tiltStateReducer } from './Reducers/gridTilt/gridTiltReducer'
import { searchSpeedReducer } from './Reducers/searchSpeed/searchSpeedReducer'
import { boardChangeReducer } from './Reducers/boardChange/boardChangeReducer'
 
const rootReducer = combineReducers({
    algoSelect: algoSelectReducer,
    startSearch: startSearchReducer,
    tiltState: tiltStateReducer,
    searchSpeed: searchSpeedReducer,
    boardChange: boardChangeReducer
    })

export type RootStore = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)