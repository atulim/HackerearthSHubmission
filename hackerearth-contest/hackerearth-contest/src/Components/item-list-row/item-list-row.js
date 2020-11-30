import React from "react";
import "./item-list-row.css";

class ItemListRow extends React.Component {
    state = {
        quantity : 1,
        itemPrice: this.props.itemPrice
    }
    
    reduceItemQuantity() {
        console.log("Reduce Quantity")
    }

    componentDidMount() {
        if(this.props.qty > 1){
            this.setState({
                ...this.state,
                itemPrice: this.props.itemPrice * this.props.qty
            })
            console.log("ok",this.state.itemPrice)
        }
    }

    render() {
        return (
            <div className="itemListContainer">
                <div className="item-wrapper">
                    <div className="item-name-image-container">
                    <div className="item-image-container">
                        <img src="https://place-hold.it/40.jpg" alt={""}/>
                    </div>
                    <div className="item-name">
                        <span style={{padding: 10}}>{this.props.itemName}</span>
                    </div>
                    </div>
                    <div className="cancel-icon" onClick={() => this.props.removeItem(this.props.index)}>
                        <span style={{padding: 10}}>X</span>
                    </div>
                </div>
                <div className="item-quantity-container">
                    <div className="minus-icon" onClick={()=>this.props.reduceItemQuantity(this.props.itemData,this.props.index)}>-</div>
                    <div className="quantity">{this.props.qty}</div>
                    <div className="plus-icon" onClick={()=>this.props.addItemQuantity(this.props.itemData,this.props.index)}>+</div>
                </div>
                <div className="item-price-container">
                    <span>${this.props.itemPrice * this.props.qty}</span>
                </div>
            </div>
        );
    }
}

export default ItemListRow;
