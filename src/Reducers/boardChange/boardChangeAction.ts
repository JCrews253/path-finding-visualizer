export type clearPathAction = {
    type: "CLEAR_PATH",
    payload: boolean
}

export type clearBoardAction = {
    type: "CLEAR_BOARD",
    payload: boolean
}

export type randomWallsAction = {
    type: "RANDOM_WALLS",
    payload: boolean
}

export const boardCommand = (state:boolean, command:boardCommands):boardCommandDispatchTypes => ({
    type: command,
    payload: state
})

export type boardCommands = "CLEAR_PATH" | "CLEAR_BOARD" | "RANDOM_WALLS"

export type boardCommandDispatchTypes = clearPathAction | clearBoardAction | randomWallsAction