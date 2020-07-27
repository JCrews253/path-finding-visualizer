export type gridTiltAction = {
    type: "CHANGE_TILT_STATE",
    payload: boolean
}

export const gridTilt = (tilt:boolean):gridTiltAction => ({
    type: 'CHANGE_TILT_STATE',
    payload: tilt
})