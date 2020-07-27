export type startSearchAction = {
    type: "START_SEARCH",
    payload: boolean
}

export const startSearch = (start:boolean):startSearchAction => ({
    type: "START_SEARCH",
    payload: start
})