export type algoSelectAction = {
    type: "CHANGE_ALGORITHM",
    payload: string
}

export const changeAlgo = (algo:string):algoSelectAction => ({
    type: "CHANGE_ALGORITHM",
    payload: algo
})