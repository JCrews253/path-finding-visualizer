import '../../App.css'

export interface Node{
    isWall: boolean,
    gWeight: number,
    hWeight: number,
    fWeight: number,
    parent: number, 
    index: number
}

export interface Animation{
    index: number,
    className: string
}

var animationQueue: Animation[] = []

export const AStarSearch = (grid: boolean[], width: number, start:number, finish: number, allowDiagonals: boolean):Animation[] => {
    animationQueue = []
    const openNodes: Node[] = []
    const closedNodes:Node[] = []
    const nodeGrid = [...BuildNodeGrid(grid)]

    nodeGrid[start] = {
        ...nodeGrid[start],
        gWeight: 0,
        hWeight: 0,
        fWeight: 0,
        parent: start
    } 
    openNodes.push(nodeGrid[start])

    while(openNodes.length > 0){
        var currentNode = nodeGrid[FindSmallestCost(openNodes)]
        if(currentNode.index !== start && currentNode.index !== finish) animationQueue.push({index: currentNode.index, className: ' searched'})
        ListRemove(openNodes,currentNode.index)
        closedNodes.push(currentNode)
        if(currentNode.index === finish) break;
        CalcNodeCosts(nodeGrid, currentNode.index, closedNodes, openNodes, start, finish, width, allowDiagonals)
    }

    var parent = nodeGrid[finish].parent
    
    if(parent !== -1){
        var reverseQueue:Animation[] = [] 
        while(parent !== nodeGrid[parent].parent){
            reverseQueue.push({index: parent, className: ' shortestPath'})
            parent = nodeGrid[parent].parent
        }
        while(reverseQueue.length > 0) animationQueue.push(reverseQueue.pop() as Animation)
    }
    else 
    {
        console.log('No Path Found')
    }


    return animationQueue
}

export const BuildNodeGrid = (grid: boolean[]):Node[] => {
    const buildNodeGrid:Node[] = []
    grid.map( (_,idx) => {
        buildNodeGrid[idx] = {
            isWall: (grid[idx] === true) ? true : false,
            gWeight: Infinity,
            hWeight: Infinity,
            fWeight: Infinity,
            parent: -1,
            index: idx,
        }
    })
   return buildNodeGrid
}

export const EuclideanDistance = (p:number, q:number, width: number):number => {
    const pRow = Math.floor(p/width)
    var pCol
    if(p >= width) pCol = p % width
    else pCol = p
    const qRow = Math.floor(q/width)
    var qCol
    if(q >= width) qCol = q % width
    else qCol = q
    return Math.floor(Math.sqrt(Math.pow(qRow - pRow,2) + Math.pow(qCol - pCol,2))*10)  
}

export const ManhattanDistance = (p:number, q:number, width: number):number => {
    const pRow = Math.floor(p/width)
    var pCol
    if(p >= width) pCol = p % width
    else pCol = p
    const qRow = Math.floor(q/width)
    var qCol
    if(q >= width) qCol = q % width
    else qCol = q
    return Math.floor((Math.abs(qRow - pRow) + Math.abs(qCol - pCol))*10)  
}

export const FindSmallestCost = (array:Node[]):number => {
    let smallestIndex = 0
    array.map( (_,idx) => {
        if(array[idx].fWeight < array[smallestIndex].fWeight){
            smallestIndex = idx
        }
        else if (array[idx].fWeight === array[smallestIndex].fWeight && array[idx].hWeight < array[smallestIndex].hWeight){
            smallestIndex = idx
        }
    })
    return array[smallestIndex].index
}

export const ListContains = (nodeList: Node[], index:number):boolean => {
    if(nodeList.length === 0 ) return false
    for(let i = 0; i < nodeList.length; i++ ){
        if(nodeList[i].index === index) return true
    }
    return false
}

export const ListRemove = (nodeList: Node[], gridIndex:number) => {
    for(let i = 0; i < nodeList.length; i++){
        if(nodeList[i].index === gridIndex){
            nodeList.splice(i,1)
            break
        }
    }
}

export const CalcNodeCosts = (nodeGrid:Node[], nodeIndex:number, closedNodes:Node[],openNodes:Node[],start:number,finish:number, width:number, allowDiagonals:boolean) => {
    const UpdateWeightCost = (index:number,parentIndex:number) => {
        if(!nodeGrid[index].isWall && !ListContains(closedNodes,index)){
            if(index !== finish){
                animationQueue.push({
                    index:index,
                    className: ' openList'
                })
            }
            const tempNode:Node = { ...nodeGrid[index],
                gWeight: nodeGrid[parentIndex].gWeight + (allowDiagonals ? EuclideanDistance(index,parentIndex,width) : ManhattanDistance(index,parentIndex,width)),
                hWeight: allowDiagonals ? EuclideanDistance(index,finish,width) : ManhattanDistance(index, finish, width),
                get fWeight (){
                    return this.gWeight + this.hWeight
                },
                parent: parentIndex
            }
            if(tempNode.fWeight < nodeGrid[index].fWeight || !ListContains(openNodes,index)){
                nodeGrid[index] = tempNode
                openNodes.push(nodeGrid[index])
            }
            else if( tempNode.fWeight === nodeGrid[index].fWeight && tempNode.hWeight < nodeGrid[index].hWeight){
                nodeGrid[index] = tempNode
                openNodes.push(nodeGrid[index])
            }
        }
    }

    //Top
    if(nodeIndex >= width){
        UpdateWeightCost(nodeIndex-width,nodeIndex)
    }
    //Top-Right
    if(nodeIndex >= width && nodeIndex % width !== width-1 && allowDiagonals){
       UpdateWeightCost(nodeIndex-width+1,nodeIndex)
    }
    //Right
    if(nodeIndex % width !== width-1){
       UpdateWeightCost(nodeIndex+1,nodeIndex)
    }
    //Bottom-Right
    if(nodeIndex % width !== width-1 && nodeIndex < nodeGrid.length - width && allowDiagonals){
       UpdateWeightCost(nodeIndex+width+1,nodeIndex)
    }
    //Bottom
    if(nodeIndex < nodeGrid.length - width){
       UpdateWeightCost(nodeIndex+width,nodeIndex)
    }
    //Bottom-Left
    if(nodeIndex < nodeGrid.length - width && nodeIndex % width !== 0 && allowDiagonals){
       UpdateWeightCost(nodeIndex+width-1,nodeIndex)
    }
    //Left
    if(nodeIndex % width !== 0){
       UpdateWeightCost(nodeIndex-1,nodeIndex)
    }
    //Top-Left
    if(nodeIndex % width !== 0 && nodeIndex >= width && allowDiagonals){
       UpdateWeightCost(nodeIndex-width-1,nodeIndex)
    }
}