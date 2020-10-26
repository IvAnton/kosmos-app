import React from "react";
import classes from './CellSelector.module.css'
import {CHICKEN, COW, WHEAT} from "../Cell/cellTypes";
import {selectCell} from "../../redux/actions/actions";
import {connect} from "react-redux";

class CellSelector extends React.Component {
    getClassesCell(type) {
        const cls = [classes.cell, classes[type]]
        if(this.props.currentCell === type) {
            cls.push(classes.selected)
        }
        return cls.join(' ')
    }
    render() {
        return (
            <React.Fragment>
                <div className={classes.container}>
                    <h2>Магазин</h2>
                    <div className={classes.CellSelector}>
                        <div
                            className={this.getClassesCell(WHEAT)}
                            onClick={() => this.props.selectCell(WHEAT)}
                        >
                            Пшено
                        </div>
                        <div
                            className={this.getClassesCell(COW)}
                            onClick={() => this.props.selectCell(COW)}
                        >
                            Корова
                        </div>
                        <div
                            className={this.getClassesCell(CHICKEN)}
                            onClick={() => this.props.selectCell(CHICKEN)}
                        >
                            Курица
                        </div>
                        <div
                            className={`${classes.cell} ${classes.cancel}`}
                            onClick={() => this.props.selectCell(null)}
                        >
                            Отмена
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
function mapStateToProps(state) {
    return {
        currentCell: state.currentCell
    }
}

function mapDispatchProps(dispatch) {
    return {
        selectCell: name => dispatch(selectCell(name))
    }
}
export default connect(mapStateToProps, mapDispatchProps)(CellSelector)
