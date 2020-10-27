import React from "react";
import classes from './Header.module.css'
import {connect} from 'react-redux'
import {sellProduct} from "../../redux/actions/actions";
import money from '../../images/money.png'
import milk from '../../images/milk.png'
import wheat from '../../images/wheat-grown.png'
import eggs from '../../images/eggs.png'

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
                    <img src={money} alt="Деньги"/>
                    {this.props.money}
                </div>
                <div
                    className={[classes.counter, classes.wheat].join(' ')}
                    onClick={() => this.props.sellProduct(products.wheat)}
                >
                    <img src={wheat} alt="Деньги"/>
                    {this.props.wheat}
                </div>
                <div
                    className={[classes.counter, classes.eggs].join(' ')}
                    onClick={() => this.props.sellProduct(products.eggs)}
                >
                    <img src={eggs} alt="Деньги"/>
                    {this.props.eggs}
                </div>
                <div
                    className={[classes.counter, classes.milk].join(' ')}
                    onClick={() => this.props.sellProduct(products.milk)}
                >
                    <img src={milk} alt="Деньги"/>
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
