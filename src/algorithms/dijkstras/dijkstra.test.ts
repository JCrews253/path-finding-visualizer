import {FindMinNode, Node} from './index'

test('FindMinNode', () => {
    const input:Node[] = []
    for(let i=0; i < 20; i++){
        input[i] = {
            isWall: false,
            distance: (i===13 || i===14) ? 0 : Infinity,
            parent: -1,
            index: i,
        }
    }
    const sptSet = new Array(input.length).fill(false)
    sptSet[13] = true
    const output = FindMinNode(input,sptSet,19)
    expect(output).toBe(14)
})