export type searchSpeedAction = {
    type: "CHANGE_SPEED",
    payload: number
}

export const searchSpeed = (speed:number):searchSpeedAction => ({
    type: 'CHANGE_SPEED',
    payload: speed
})