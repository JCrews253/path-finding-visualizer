import { maxHeaderSize } from "http"

export const GetRecursiveMaze = (array:boolean[], rows:number, columns:number):boolean[] => {
    RecursiveDivision(array,0,rows,columns,ChooseOrientation(rows,columns),rows,columns)
    return array
}

//returns true for horizontal and false for vertical
const ChooseOrientation = (rows: number, columns: number):boolean => {
    if(rows > columns) return true
    else if( columns > rows) return false
    else return (Math.random() > .5) ? true : false
}


const RecursiveDivision = (array:boolean[], startIndex: number, rows:number, columns:number, horizontal:boolean, totalRows:number, totalColumns:number) => {
    if(rows < 2 || columns < 2) return
    var start = startIndex + (horizontal ? ((Math.random()*(rows-2))*totalColumns) : (Math.random()*(columns-2)))
    const stepSize = horizontal ? 1 : totalColumns
    const length = horizontal ? columns : rows
    for(let i = 0; i < length; i ++){
        array[start] = true
        start += stepSize
    }

    var newStartIndex = ( horizontal ? startIndex : startIndex + start)
}