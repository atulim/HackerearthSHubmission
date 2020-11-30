import React from "react";
import ItemListRow from "../item-list-row/item-list-row";
import {connect} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {
    deleteItem,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    loadState,
    setReduxState
} from "../../Store/Actions/Action.js"
import "./item-list-contianer.css";

class ItemListContainer extends React.Component {

    removeItem = async (itemIndex) => {
        (()=>toast(this.props.itemListData[itemIndex].name+" deleted ",{
            autoClose:1000,
            position:"top-center"
        }))();
        await this.props.deleteItem(itemIndex);
        await localStorage.setItem("Product_data", JSON.stringify(this.props.itemListData));
    }

    addItemQuantity = async (product, index) => {
        await this.props.increaseQuantity(product, index);
        await localStorage.setItem("Product_data", JSON.stringify(this.props.itemListData));
    }
    reduceItemQuantity = async (product, index) => {
        if (product.qty > 0) {
            await this.props.decreaseQuantity(product, index);
        }
        await localStorage.setItem("Product_data", JSON.stringify(this.props.itemListData));
    }

    render() {
        // console.log("sdaf", this.props.itemListData)
        return (
            <div className="item-container">
                <div className="item-list-tab-bar">
                    <div className="total-items">items({this.props.items})</div>
                    <div className="quantity-title">QTY</div>
                    <div className="price-title">Price</div>
                </div>
                {this.props.itemListData && this.props.itemListData.length > 0 ?
                (<div className="item-list-container">
                        {this.props.itemListData.map((user, index) => (
                            <ItemListRow
                                itemData={user} itemName={user.name}
                                itemPrice={user.price}
                                itemDiscount={user.discount}
                                qty={user.qty}
                                removeItem={(itemIndex) => this.removeItem(itemIndex)}
                                addItemQuantity={(product,index)=>this.addItemQuantity(product,index)}
                                reduceItemQuantity={(product,index)=>this.reduceItemQuantity(product,index)}
                                index={index}/>

                        ))}
                    </div>
                )
                :
                <button onClick={()=>this.props.loadState()}>Load Data</button>
            }
            <ToastContainer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        itemListData: state.data,
        items: state.items,
        cost: state.cost,
        discount: state.discount,
        typeDiscount: state.typeDiscount
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteItem: (index) => dispatch(deleteItem(index)),
        updateQuantity: (data) => dispatch(updateQuantity(data)),
        increaseQuantity: (data,index) => dispatch(increaseQuantity(data,index)),
        decreaseQuantity: (data,index) => dispatch(decreaseQuantity(data,index)),
        loadState:()=>dispatch(loadState()),
        setReduxState: (data) => dispatch(setReduxState(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemListContainer);