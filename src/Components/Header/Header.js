import React from "react";
import classes from './Header.module.css'

const Header = props => {
    return (
        <div className={classes.Header}>
            <label>Text1</label>
            <label>Text2</label>
            <label>Text3</label>
            <label>Text4</label>
            <label>Text5</label>
        </div>
    )
}
export default Header
