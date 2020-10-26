import React from "react";
import classes from './Header.module.css'
import {connect} from 'react-redux'
import {sellProduct} from "../../redux/actions/actions";

const products = {
    eggs: 'eggs',
    milk: 'milk',
    wheat: 'wheat'
}

class Header extends React.Component {

    render() {
        return (
            <div className={classes.Header}>
                <div
                    className={[classes.counter, classes.money].join(' ')}
                >
                    <h2>Деньги</h2>
                    {this.props.money}
                </div>
                <div
                    className={[classes.counter, classes.wheat].join(' ')}
                    onClick={() => this.props.sellProduct(products.wheat)}
                >
                    <h2>Пшено</h2>
                    {this.props.wheat}
                </div>
                <div
                    className={[classes.counter, classes.eggs].join(' ')}
                    onClick={() => this.props.sellProduct(products.eggs)}
                >
                    <h2>Яйца</h2>
                    {this.props.eggs}
                </div>
                <div
                    className={[classes.counter, classes.milk].join(' ')}
                    onClick={() => this.props.sellProduct(products.milk)}
                >
                    <h2>Молоко</h2>
                    {this.props.milk}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        money: state.money,
        wheat: state.wheat,
        eggs: state.eggs,
        milk: state.milk,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sellProduct: product => dispatch(sellProduct(product))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
