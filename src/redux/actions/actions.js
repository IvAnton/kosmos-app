import {EDIT_CELL, SELECT_CELL} from "./actionTypes";
import {CHICKEN, COW, EMPTY, WHEAT} from "../../Components/Cell/cellTypes";

export function clickOnCell(id) {
    return (dispatch, getState) => {
        const state = getState()
        const cell = state.cells[id]

        if(cell.isGrown && cell.type === WHEAT) {
            cell.type = EMPTY
            cell.isGrown = false
        } else if (state.currentCell !== cell.type){
            switch (state.currentCell) {
                case WHEAT:
                    cell.type = WHEAT
                    dispatch(wheatGrow(id))
                    break
                case COW:
                    cell.type = COW
                    break
                case CHICKEN:
                    cell.type = CHICKEN
                    break
                default:
                    break
            }
        }
        dispatch(editCell(cell))
    }
}

export function editCell(cell) {
    return {
        type: EDIT_CELL,
        cell
    }
}

function wheatGrow(id) {
    return (dispatch, getState) => {
        const timer = setTimeout(() => {
            dispatch(wheatHasGrown(id))
        },3000)
        const cell = getState().cells[id]
        cell.timer = timer
        dispatch(editCell(cell))
    }
}

function wheatHasGrown(id) {
    return (dispatch, getState) => {
        const cell = getState().cells[id]
        if(!cell.timer) {
            return
        }
        clearTimeout(cell.timer)
        cell.isGrown = true
        dispatch(editCell(cell))
    }
}


export function selectCell(name) {
    return {
        type: SELECT_CELL,
        name
    }
}

