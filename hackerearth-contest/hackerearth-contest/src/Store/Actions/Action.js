export const DELETE_ITEM="DELETE_ITEM"
export const UPDATE_QUANTITY="UPDATE_QUANTITY"
export const LOAD_STATE="LOAD_STATE"
export const INCREASE_QUANTITY="INCREASE_QUANTITY"
export const DECREASE_QUANTITY="DECREASE_QUANTITY"
export const REDUX_STATE_ITEM="REDUX_STATE_ITEM"

export const deleteItem = (index) => {
    return{
        type: DELETE_ITEM,
        payload: index,
    } 
};

export const updateQuantity=(data)=>{
    return{
        type:UPDATE_QUANTITY,
        payload:data,
    } 
};

export const increaseQuantity=(data,index)=>{
    return{
        type:INCREASE_QUANTITY,
        payload:{
            data,
            index
        }
    }
}

export const decreaseQuantity=(data,index)=>{
    return{
        type:DECREASE_QUANTITY,
        payload:{
            data,
            index
        }
    }
}
export const loadState=()=>{
    return{
        type:LOAD_STATE,
    }
}

export const setReduxState = (Product_data) => {
    return{
        type:REDUX_STATE_ITEM,
        payload: JSON.parse(Product_data)
    }
}