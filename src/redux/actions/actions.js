import {EDIT_CELL} from "./actionTypes";
import {CHICKEN, COW, EMPTY, WHEAT} from "../../Components/Cell/cellTypes";

export function clickOnCell(id) {
    return (dispatch, getState) => {
        const state = getState()
        const cell = state.cells[id]
        cell.isGrown = false

        switch(cell.type) {
            case EMPTY:
                cell.type = COW
                break
            case COW:
                cell.type = CHICKEN
                break
            case CHICKEN:
                cell.type = WHEAT
                dispatch(wheatGrow(id))
                break
            default:
                cell.type = EMPTY
                break
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
        },1000)
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
