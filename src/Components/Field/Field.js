import React from "react";
import classes from './Field.module.css'
import Cell from '../Cell/Cell'
import {EMPTY} from "../Cell/cellTypes";

class Field extends React.Component {
    state = {
        cells: []
    }

    constructor(props) {
        super(props);
        const cells = []
        const countCells = 64
        for (let i = 0; i < countCells; i++) {
            cells.push({
                type: EMPTY,
                id: i
            })
        }
        this.state.cells = cells
    }

    render() {
        return (
            <div className={classes.Fields}>
                {this.state.cells.map((cell, index) => {
                    return (
                        <Cell type={cell.type} key={index} />
                    )
                })}
            </div>
        )
    }
}

export default Field
