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
            if (cell.timer) {
                clearInterval(cell.timer)
                cell.progress = 0
                cell.timer = null
            }
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
                    cell.type = EMPTY
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
        const cell = getState().cells[id]
        let progressCounter = 0
        const endProgress = 10
        cell.timer = setInterval(() => {
            if(progressCounter === endProgress) {
                dispatch(wheatHasGrown(id))
            } else {
                progressCounter = progressCounter + 1
                cell.progress = getProgress(progressCounter, endProgress)
                dispatch(editCell(cell))
            }
        },1000)
        dispatch(editCell(cell))
    }
}

function wheatHasGrown(id) {
    return (dispatch, getState) => {
        const cell = getState().cells[id]
        if(!cell.timer) {
            return
        }
        clearInterval(cell.timer)
        cell.isGrown = true
        cell.progress = 0
        cell.timer = null
        dispatch(editCell(cell))
    }
}

function cowProducesMilk(id) {
    return (dispatch, getState) => {
        const cell = getState().cells[id]
        let progressCounter = 0
        const endProgress = 20
        let isHungry = true
        cell.timer = setInterval(() => {
            const wheat = getState().wheat
            if (progressCounter === 0 && isHungry) {
                if (wheat) {
                    dispatch(eatWheat())
                    isHungry = false
                }
            } else if (progressCounter === endProgress) {
                dispatch(cowGiveMilk())
                progressCounter = 0
                cell.progress = getProgress(progressCounter, endProgress)
                dispatch(editCell(cell))
                isHungry = true
            } else {
                progressCounter = progressCounter + 1
                cell.progress = getProgress(progressCounter, endProgress)
                dispatch(editCell(cell))
            }
        }, 1000)
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
        let progressCounter = 0
        const endProgress = 30
        let isHungry = true

        cell.timer = setInterval(() => {
            cell.progress = getProgress(progressCounter, endProgress)
            dispatch(editCell(cell))
            if (isHungry) {
                const wheat = getState().wheat
                if(wheat){
                    dispatch(eatWheat())
                    isHungry = false
                    progressCounter = progressCounter + 1
                }
            } else {
                progressCounter = progressCounter + 1
                if (progressCounter === (endProgress / 3) || progressCounter === ((endProgress / 3) * 2)) {
                    dispatch(chickenGiveEgg())
                } else if (progressCounter === endProgress) {
                    dispatch(chickenGiveEgg())
                    progressCounter = 0
                    isHungry = true
                }
            }
        }, 1000)
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

function getProgress(currentValue, maxValue) {
    return (100 / maxValue) * currentValue
}
