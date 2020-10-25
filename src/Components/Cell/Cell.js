import React from "react";
import classes from './Cell.module.css'


class Cell extends React.Component {

    render() {
        const cls = []
        cls.push(
            classes.Cell,
            classes[this.props.type],
        )
        if (this.props.isGrown) {
            cls.push(
                classes.success
            )

        }
        return (
            <div
                className={cls.join(' ')}
                onClick={() => this.props.cellClick(this.props.id)}
            >
            </div>
        )
    }
}

export default Cell
