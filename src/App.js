import React, {Component} from 'react';
import './App.css';
import Database from './database'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isListPage: true,
            shoppingCart: []
        };
    }

    render() {
        const th = <tr><th>name</th><th>unit</th><th>price</th><th>promotion</th><th>quantity</th><th>add to chart</th></tr>;
        const items = Database.loadAllItems().map(item => <tr>
            <td>{item.name}</td>
            <td>{item.unit}</td>
            <td>{item.price}</td>
            <td>{this.outputPromotion(this.isPromotion(item))}</td>
            <td><input type="number" min="0" defaultValue="1" className=""/></td>
            <td>
                <button onClick={() => {
                    this.addToCartList(item)
                }}>add to chart
                </button>
            </td>

        </tr>);

        return (
            <div className="App">
                <button onClick={() => {
                    this.jumpToShoppingCartPage();
                }}>GO TO SHOPPING CART</button>
                <h3>ITEMS LIST</h3>
                <table>
                    <tbody>
                    {th}
                    {items}
                    </tbody>


                </table>
            </div>
        );
    }

    isPromotion(item) {
        if (Database.loadPromotions()[0].barcodes.indexOf(item.barcode) !== -1) {
            return true;
        }
        return false;
    }

    outputPromotion(isPromotion) {
        return isPromotion === true ? 'buy two get one free' : '';
    }

    jumpToShoppingCartPage() {

        this.setState({isListPage: false});
        return (<div>111</div>);
        //return (<div><ShoppingCart/></div>);
        //alert('shopping');

    }


    addToCartList(item) {

        this.setState({shoppingCart: [...this.state.shoppingCart, item]});
        alert('add succeed');
    }

}

class ShoppingCart extends Component {
    getTotalAmount() {
        let amount = 0;
        App.props.items.forEach(item => {
            amount += item.price * item.input.values;
        });
        return amount;
    };

    logCart() {
        const result = [];
        App.state.shoppingCart.forEach(item => {
            result.push(`${item.barcode}-${item.amount}`);
        });
        console.log(result);
        //alert(result);
    };


    render() {
        return (
            <div>
                <button onClick={App.props.jumpToListPage}>
                    GO TO ITEM LIST
                </button>
                <h3>SHOPPING CART</h3>
                <ul>
                    {App.state.shoppingCart.map(item => (
                        <li key={item.barcode}>
                            <div>
                                <div>{item.name}</div>
                                <div>
                                    {item.price}元/{item.unit}
                                </div>
                                <div>
                                    共 {item.amount} {item.unit}
                                </div>
                                <div>
                                    小计：{item.amount * item.price} 元
                                </div>
                            </div>
                        </li>
                    ))}
                    <li key="total">
                        <div>
                            <div>总计：</div>
                            <div>{this.getTotalAmount()}元</div>
                        </div>
                    </li>
                </ul>
                <button onClick={this.logCart()}>
                    CHECK OUT
                </button>
            </div>
        );
    }
}

export default App




