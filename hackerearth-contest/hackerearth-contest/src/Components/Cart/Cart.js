import React from 'react';
import "./Cart.css";
import {connect} from 'react-redux';

class Cart extends React.Component{
    render(){
       return(
           <div className="outerContainer" id={"outerContainer"}>
                <div className="cartContainer">
                    <div className="total">
                        <span>Total</span>
                    </div>
                    <div className="row">
                        <div>Items ({this.props.items})</div>
                        <div>:</div>
                        <div>${this.props.cost}</div>
                    </div>
                    <div className="row">
                        <div>Discount</div>
                        <div>:</div>
                        
                        <div>-${this.props.discount}</div>
                    </div>
                    <div className="row">
                        <div>Type discount</div>
                        <div>:</div>
                        <div>-${this.props.typeDiscount}</div>
                    </div>
                    </div>
               <div className="orderTotal row">
                    <div >Order total</div>
                    <div>${this.props.cost-this.props.discount-this.props.typeDiscount}</div>
               </div>
           </div>
       ) 
    }
}

const mapStateToProps=(state)=>{
    return{
        items:state.items,
        cost:state.cost,
        discount:state.discount,
        typeDiscount:state.typeDiscount
    }
}

export default connect(mapStateToProps)(Cart);