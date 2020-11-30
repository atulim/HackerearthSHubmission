import './App.css';
import ItemListContainer from './Components/item-list-container/item-list-container.js';
import Cart from './Components/Cart/Cart';
import React from "react";

import {connect} from "react-redux";
import {loadState, setReduxState} from "./Store/Actions/Action"

let width = window.innerWidth;
if (width <= 1000) {
    window.onload = function () {
        document.getElementById("item-container").classList.add('item-container-mobile-view');
        document.getElementById("outerContainer").classList.add('outerContainer-mobile-view');
    }
}

class App extends React.Component {
  componentWillMount(){
    this.props.loadState();
      let storedData = localStorage.getItem("Product_data");
      if ( storedData != null){
          this.props.setReduxState(storedData);
      }
  };

  render() {
      return (
          <div className="App">
              <div className="item-list-header"><span> &lt; ORDER SUMMARY </span></div>
              <div className="item-container1" id="item-container">
                  <ItemListContainer id="item-list" className="item-list"/>
                  <Cart/>
              </div>
          </div>
      )
  }
}

const mapStateToProps = (state) => {
    return {
        itemListData: state.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadState: (data) => dispatch(loadState(data)),
        setReduxState: (data) => dispatch(setReduxState(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);