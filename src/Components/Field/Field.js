import React from "react";
import classes from './Field.module.css'
import Cell from '../Cell/Cell'
import {connect} from 'react-redux'
import {clickOnCell} from "../../redux/actions/actions";

class Field extends React.Component {
    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            <div className={classes.Fields}>
                {
                    this.props.cells
                        ? this.props.cells.map((cell) => {
                            return (
                                <Cell
                                    type={cell.type}
                                    key={cell.id}
                                    id={cell.id}
                                    isGrown={cell.isGrown}
                                    cellClick={this.props.clickOnCell}
                                />
                            )
                        })
                        : null
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cells: state.cells
    }
}

function mapDispatchProps(dispatch) {
    return {
        clickOnCell: id => dispatch(clickOnCell(id))
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Field)
