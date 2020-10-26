import {
    ADD_WHEAT,
    BUY_PRODUCT,
    CHICKEN_GIVE_EGG,
    COW_GIVE_MILK,
    EAT_WHEAT,
    EDIT_CELL,
    SELECT_CELL,
    SELL_PRODUCT
} from "./actionTypes";
import {CHICKEN, COW, EMPTY, WHEAT} from "../../Components/Cell/cellTypes";

export function clickOnCell(id) {
    return (dispatch, getState) => {
        const state = getState()
        const cell = state.cells[id]

        if(cell.isGrown && cell.type === WHEAT) {
            cell.type = EMPTY
            cell.isGrown = false
            dispatch(addWheat())
        } else if (state.currentCell !== cell.type){
            switch (state.currentCell) {
                case WHEAT:
                    cell.type = WHEAT
                    dispatch(buyProduct(WHEAT))
                    dispatch(wheatGrow(id))
                    break
                case COW:
                    cell.type = COW
                    dispatch(buyProduct(COW))
                    dispatch(cowProducesMilk(id))
                    break
                case CHICKEN:
                    cell.type = CHICKEN
                    dispatch(buyProduct(CHICKEN))
                    dispatch(chickenProducesEggs(id))
                    break
                default:
                    break
            }
        }
        dispatch(editCell(cell))
    }
}

function editCell(cell) {
    return {
        type: EDIT_CELL,
        cell
    }
}

function addWheat() {
    return {
        type: ADD_WHEAT
    }
}

function wheatGrow(id) {
    return (dispatch, getState) => {
        const timer = setTimeout(() => {
            dispatch(wheatHasGrown(id))
        },10000)
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

function cowProducesMilk(id) {
    return (dispatch, getState) => {
        const cell = getState().cells[id]
        const timer = setInterval(() => {
            const wheat = getState().wheat
            if(wheat){
                dispatch(eatWheat())
                dispatch(cowGiveMilk())
            }
        },20000)
        cell.timer = timer
        dispatch(editCell(cell))
    }
}

function cowGiveMilk() {
    return {
        type: COW_GIVE_MILK
    }
}

function chickenProducesEggs(id) {
    return (dispatch, getState) => {
        const cell = getState().cells[id]
        let eatCounter = 0
        const timer = setInterval(() => {
            const wheat = getState().wheat
            if(eatCounter !== 0) {
                dispatch(chickenGiveEgg())
                eatCounter = eatCounter - 1
            } else {
                if(wheat) {
                    dispatch(eatWheat())
                    eatCounter = 3
                }
            }
        },10000)
        cell.timer = timer
        dispatch(editCell(cell))
    }
}

function chickenGiveEgg() {
    return {
        type: CHICKEN_GIVE_EGG
    }
}

function eatWheat() {
    return {
        type: EAT_WHEAT
    }
}

export function selectCell(name) {
    return {
        type: SELECT_CELL,
        name
    }
}

export function sellProduct(product) {
    return {
        type: SELL_PRODUCT,
        product
    }
}

function buyProduct(product) {
    return {
        type: BUY_PRODUCT,
        product
    }
}
