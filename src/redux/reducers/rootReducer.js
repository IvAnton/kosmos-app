import {EMPTY} from "../../Components/Cell/cellTypes";
import {EDIT_CELL, SELECT_CELL} from "../actions/actionTypes";

const initialState = {
    cells: getDefaultCells(),
    currentCell: null
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case EDIT_CELL:
            const cells = state.cells
            cells[action.cell.id] = action.cell
            return {
                ...state, cells: [...cells]
            }
        case SELECT_CELL:
            return {
                ...state, currentCell: action.name
            }
        default:
            return state
    }
}
function getDefaultCells() {
    let cells = []
    const countCells = 64
    for (let i = 0; i < countCells; i++) {
        cells.push({
            type: EMPTY,
            id: i,
            isGrown: false,
            timer: null
        })
    }
    return cells
}
