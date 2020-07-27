import {EuclideanDistance, FindSmallestCost, Node, ListContains, ListRemove, CalcNodeCosts, ManhattanDistance} from './index'

const getBlankNodeGrid = (size:number):Node[] => {
    const array: Node[] = []
    for(let i=0; i < size; i++){
        array[i] = {
            isWall: false,
            gWeight: Infinity,
            hWeight: Infinity,
            fWeight: Infinity,
            parent: -1,
            index: i,
        }
    }
    return array
}

const updateWeights = (array:Node[],index:number, start:number, finish:number, width:number, parent: number, allowDiagonals:boolean) => {
    array[index] = {
        ...array[index],
        gWeight: array[parent].gWeight + (allowDiagonals ? EuclideanDistance(index,parent,width) : ManhattanDistance(index,parent,width)),
        hWeight: allowDiagonals ? EuclideanDistance(index,finish,width) : ManhattanDistance(index,finish,width),
        get fWeight(){
            return this.gWeight + this.hWeight
        },
        parent: parent
    }
}

test('calcDistance-checkStraight', () => {
    const output = EuclideanDistance(0,4,5)
    expect(output).toBe(40)
})

test('calcDistance-checkDiagonal' , () => {
    const output = EuclideanDistance(0,24,5)
    expect(output).toBe(56)
})

test('findSmallest-checkBeginning', () => {
    const input:Node[] = getBlankNodeGrid(5)
    const output = FindSmallestCost(input)
    expect(output).toBe(0)
})

test('findSmallest-checkEnd', () => {
    const input:Node[] = []
    for(let i=10; i > -1; i--){
        input[i] = {
            isWall: false,
            gWeight: Infinity,
            hWeight: Infinity,
            fWeight: 1/i,
            parent: -1,
            index: i,
        }
    }
    const output = FindSmallestCost(input)
    expect(output).toBe(10)
})

test('findSmallest-checkMiddle', () => {
    const input:Node[] = []
    for(let i=0; i < 20; i++){
        input[i] = {
            isWall: false,
            gWeight: Infinity,
            hWeight: (i === 0) ? 20 : 0,
            fWeight: ((i === 13) ? 0 : i),
            parent: -1,
            index: i,
        }
    }
    const output = FindSmallestCost(input)
    expect(output).toBe(13)
})

test('listContains-checkTrue', () => {
    const input:Node[] = getBlankNodeGrid(20)
    const output = ListContains(input, 4)
    expect(output).toBeTruthy()
})

test('listContains-checkFalse', () => {
    const input:Node[] = getBlankNodeGrid(20)
    const output = ListContains(input, 21)
    expect(output).toBeFalsy()
})

test('listRemove-checkBeginning', () => { 
    const input:Node[] = getBlankNodeGrid(20)
    ListRemove(input,0)
    expect(ListContains(input,0)).toBeFalsy()
})

test('listRemove-checkMiddle', () => { 
    const input:Node[] = getBlankNodeGrid(13)
    ListRemove(input,7)
    expect(ListContains(input,7)).toBeFalsy()
})

test('listRemove-checkEnd', () => { 
    const input:Node[] = getBlankNodeGrid(50)
    ListRemove(input,50)
    expect(ListContains(input,50)).toBeFalsy()
})

test('listRemove-checkTruth', () => { 
    const input:Node[] = getBlankNodeGrid(50)
    ListRemove(input,50)
    expect(ListContains(input,49)).toBeTruthy()
})

test('listRemove-checkLength', () => { 
    const input:Node[] = getBlankNodeGrid(10)
    ListRemove(input,5)
    expect(input.length).toBe(9)
})

test('calcNodeCosts-checkNonDiagonals-emptyClosed', () => {
    const input:Node[] = getBlankNodeGrid(Math.pow(5,2))
    const output = [...input]
    const closedNodes: Node[] = []
    const openNodes: Node[] = getBlankNodeGrid(Math.pow(5,2))
    CalcNodeCosts(input, 12, closedNodes, openNodes, 0, 24, 5, false)
    updateWeights(output,7,0,24,5,12,false)
    updateWeights(output,13,0,24,5,12,false)
    updateWeights(output,17,0,24,5,12,false)
    updateWeights(output,11,0,24,5,12,false)
    expect(input).toStrictEqual(output)
})

test('calcNodeCosts-checkDiagonals-emptyClosed', () => {
    const input:Node[] = getBlankNodeGrid(Math.pow(5,2))
    const output = [...input]
    const closedNodes: Node[] = []
    const openNodes: Node[] = getBlankNodeGrid(Math.pow(5,2))
    CalcNodeCosts(input, 12, closedNodes, openNodes, 0, 24, 5, true)
    updateWeights(output,7,0,24,5,12,true)
    updateWeights(output,8,0,24,5,12,true)
    updateWeights(output,13,0,24,5,12,true)
    updateWeights(output,18,0,24,5,12,true)
    updateWeights(output,17,0,24,5,12,true)
    updateWeights(output,16,0,24,5,12,true)
    updateWeights(output,11,0,24,5,12,true)
    updateWeights(output,6,0,24,5,12,true)
    expect(input).toStrictEqual(output)
})

test('calcNodeCosts-checkNonDiagonals-TopClosed', () => {
    const input:Node[] = getBlankNodeGrid(Math.pow(5,2))
    const output = [...input]
    const closedNodes: Node[] = getBlankNodeGrid(1)
    closedNodes[0] = {
        ...closedNodes[0],
        index:7
    }
    const openNodes: Node[] = getBlankNodeGrid(Math.pow(5,2))
    CalcNodeCosts(input, 12, closedNodes, openNodes, 0, 24, 5, false)
    updateWeights(output,13,0,24,5,12,false)
    updateWeights(output,17,0,24,5,12,false)
    updateWeights(output,11,0,24,5,12,false)
    expect(input).toStrictEqual(output)
})

test('calcNodeCosts-checkNonDiagonals-RightClosed', () => {
    const input:Node[] = getBlankNodeGrid(Math.pow(5,2))
    const output = [...input]
    const closedNodes: Node[] = getBlankNodeGrid(1)
    closedNodes[0] = {
        ...closedNodes[0],
        index:13
    }
    const openNodes: Node[] = getBlankNodeGrid(Math.pow(5,2))
    CalcNodeCosts(input, 12, closedNodes, openNodes, 0, 24, 5, false)
    updateWeights(output,7,0,24,5,12,false)
    //updateWeights(output,13,0,24,5,12,false)
    updateWeights(output,17,0,24,5,12,false)
    updateWeights(output,11,0,24,5,12,false)
    expect(input).toStrictEqual(output)
})

test('calcNodeCosts-checkNonDiagonals-BottomClosed', () => {
    const input:Node[] = getBlankNodeGrid(Math.pow(5,2))
    const output = [...input]
    const closedNodes: Node[] = getBlankNodeGrid(1)
    closedNodes[0] = {
        ...closedNodes[0],
        index:17
    }
    const openNodes: Node[] = getBlankNodeGrid(Math.pow(5,2))
    CalcNodeCosts(input, 12, closedNodes, openNodes, 0, 24, 5, false)
    updateWeights(output,7,0,24,5,12,false)
    updateWeights(output,13,0,24,5,12,false)
    //updateWeights(output,17,0,24,5,12,false)
    updateWeights(output,11,0,24,5,12,false)
    expect(input).toStrictEqual(output)
})

test('calcNodeCosts-checkNonDiagonals-LeftClosed', () => {
    const input:Node[] = getBlankNodeGrid(Math.pow(5,2))
    const output = [...input]
    const closedNodes: Node[] = getBlankNodeGrid(1)
    closedNodes[0] = {
        ...closedNodes[0],
        index:11
    }
    const openNodes: Node[] = getBlankNodeGrid(Math.pow(5,2))
    CalcNodeCosts(input, 12, closedNodes, openNodes, 0, 24, 5, false)
    updateWeights(output,7,0,24,5,12,false)
    updateWeights(output,13,0,24,5,12,false)
    updateWeights(output,17,0,24,5,12,false)
    //updateWeights(output,11,0,24,5,12,false)
    expect(input).toStrictEqual(output)
})