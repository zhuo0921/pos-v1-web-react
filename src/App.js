import React, {Component, PureComponent} from 'react';
import './App.css';
import Database from './database'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isListPage:true,
            shoppingCart:[]
        };

    }

    render() {
        // const th = <th><td>name</td><td>unit</td><td>price</td><td>promotion</td></th>;
        const items = Database.loadAllItems().map(item => <tr><td>{item.name}</td>
            <td>{item.unit}</td><td>{item.price}</td><td>{this.outputPromotion(this.isPromotion(item))}</td>
            <td><input type="number" min="0" defaultValue="0" className=""/></td>
            <td><button onClick={this.addToCartList(item)}>add to chart</button></td></tr>)

        return (
            <div className="App">
                <table>
                    <button onClick={this.jumpToShoppingCartPage()}>GO TO SHOPPING CART</button>
                    <h3>ITEMS LIST</h3>
                    {items}
                </table>
            </div>
        );
    }

    isPromotion(item){
        if(Database.loadPromotions()[0].barcodes.indexOf(item.barcode)!==-1)
        {
            return true;
        }
        return false;
    }

    outputPromotion(isPromotion){
        return isPromotion === true?'buy two get one free':'';
    }

    jumpToShoppingCartPage(){
        this.Setstate = {flag  : false};
    }

    jumpToListPage() {
        this.Setstate = {flag : true};
    }

    addToCartList(item){
        this.setState = {shoppingCart: [...this.state.shoppingCart,item]}
    }






}


export default App;



