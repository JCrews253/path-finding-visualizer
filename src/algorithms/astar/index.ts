export interface Node{
    isStart: boolean,
    isFinish: boolean,
    isWall: boolean,
    visited: boolean,
    gWeight: number,
    hWeight: number,
    fWeight: number,
    parent: number,
    index: number
}

var width: number 
var start: number
var finish: number
var SearchableNodes: Node[]
var NodeGrid: Node[]

export const AStarSearch = (grid: number[], widthIn: number, startIn:number, finishIn: number) => {
    width = widthIn
    start = startIn
    finish = finishIn
    NodeGrid = BuildNodeGrid(grid)
    
    const ne = document.getElementsByClassName('node') as HTMLCollectionOf<HTMLElement>
    for(let i = 0; i < ne.length; i++){
        ne[i].style.backgroundColor = 'white'
    }

    CalcNodeCosts(NodeGrid,start)
    NodeGrid[start].visited = true
    ne[start].style.backgroundColor ='green'
    ne[finish].style.backgroundColor ='red'
    SearchableNodes = NodeGrid.slice()
    var currentIndex = FindSmallestCost(SearchableNodes)
    ne[currentIndex].style.backgroundColor='blue'

    while( SearchableNodes.length > 0 && NodeGrid[finish].parent === -1){
        CalcNodeCosts(NodeGrid,currentIndex)
        NodeGrid[currentIndex].visited = true
        SearchableNodes = NodeGrid.filter(node => !node.visited)
        if(SearchableNodes.length > 0){
            currentIndex = FindSmallestCost(SearchableNodes)
        }
        else{
            console.log('no path found')
            break
        }
        ne[currentIndex].style.backgroundColor='blue'
        
    }

}

const FindSmallestCost = (Nodes:Node[]):number => {
    let currentSmallest = start
    Nodes.map( (_,idx) => {
        if(Nodes[idx].fWeight <  Nodes[currentSmallest].fWeight){
            currentSmallest = idx
        }
        else if (Nodes[idx].fWeight === Nodes[currentSmallest].fWeight && Nodes[idx].hWeight < Nodes[currentSmallest].hWeight){
            currentSmallest = idx
        }
        //console.log({currentSmallest},Nodes[currentSmallest])
    })
    return Nodes[currentSmallest].index
}

const CalcNodeCosts = (NodeGrid: Node[], idx:number) => {

    const UpdateWeightCost = (index:number,parentIdx:number) => {
        if(!NodeGrid[index].visited){
        NodeGrid[index] = {
            ...NodeGrid[index],
            gWeight: CalcDistance(start,index),
            hWeight: CalcDistance(finish,index),
            get fWeight(){
                return this.gWeight + this.hWeight
            },
            parent: parentIdx,
        } 
    }
    }
    //Top
    if(idx >= width){
        UpdateWeightCost(idx-width,idx)
    }
    //Top-Right
    if(idx >= width && idx % width !== width-1){
       UpdateWeightCost(idx-width+1,idx)
    }
    //Right
    if(idx % width !== width-1){
       UpdateWeightCost(idx+1,idx)
    }
    //Bottom-Right
    if(idx % width !== width-1 && idx < NodeGrid.length - width){
       UpdateWeightCost(idx+width+1,idx)
    }
    //Bottom
    if(idx < NodeGrid.length - width){
       UpdateWeightCost(idx+width,idx)
    }
    //Bottom-Left
    if(idx < NodeGrid.length - width && idx % width !== 0){
       UpdateWeightCost(idx+width-1,idx)
    }
    //Left
    if(idx % width !== 0){
       UpdateWeightCost(idx-1,idx)
    }
    //Top-Left
    if(idx % width !== 0 && idx >= width){
       UpdateWeightCost(idx-width-1,idx)
    }
}

const BuildNodeGrid = (grid: number[]):Node[] => {
    const NodeGrid:Node[] = []
    grid.map( (_,idx) => {
        NodeGrid[idx] = {
            isStart: (idx === start) ? true : false,
            isFinish: (idx === finish) ? true : false,
            isWall: (grid[idx] === 1) ? true : false,
            visited: false,
            gWeight: Infinity,
            hWeight: Infinity,
            fWeight: Infinity,
            parent: -1,
            index: idx
        }
    })
   return NodeGrid
}

const CalcDistance = (p:number, q:number):number => {
    const pRow = Math.floor(p/width)
    const pCol = p % width
    const qRow = Math.floor(q/width)
    const qCol = q % width
    return Math.floor(Math.sqrt(Math.pow(qRow - pRow,2) + Math.pow(qCol - pCol,2))*10)  
}