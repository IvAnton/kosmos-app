import {EMPTY} from "../../Components/Cell/cellTypes";
import {
    ADD_WHEAT,
    BUY_PRODUCT, CHICKEN_GIVE_EGG,
    COW_GIVE_MILK,
    EAT_WHEAT,
    EDIT_CELL,
    SELECT_CELL,
    SELL_PRODUCT
} from "../actions/actionTypes";

const initialState = {
    cells: getDefaultCells(),
    currentCell: null,
    money: 100,
    wheat: 0,
    milk: 0,
    eggs: 0
}

export const PRICE = {
    buy: {
        wheat: 15,
        chicken: 30,
        cow: 40
    },
    sell: {
        eggs: 10,
        wheat: 25,
        milk: 30
    }
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
        case COW_GIVE_MILK:
            return {
                ...state, milk: state.milk + 1
            }
        case CHICKEN_GIVE_EGG:
            return {
                ...state, eggs: state.eggs + 1
            }
        case EAT_WHEAT:
            return {
                ...state, wheat: state.wheat - 1
            }
        case ADD_WHEAT:
            return {
                ...state, wheat: state.wheat + 1
            }
        case SELL_PRODUCT:
            return {
               ...state, money: state.money + (PRICE.sell[action.product] * state[action.product]), [action.product]: 0
            }
        case BUY_PRODUCT:
            return {
                ...state, money: state.money - PRICE.buy[action.product]
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
            timer: null,
            progress: 0
        })
    }
    return cells
}
