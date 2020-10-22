import React from "react";
import classes from './Cell.module.css'

class Cell extends React.Component {

    render() {
        return (
            <div className={`${classes.Cell} ${classes[this.props.type]}`}></div>
        )
    }

}
export default Cell
