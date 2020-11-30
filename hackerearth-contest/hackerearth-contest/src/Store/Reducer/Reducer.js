import {
    UPDATE_QUANTITY,
    DELETE_ITEM,
    LOAD_STATE,
    INCREASE_QUANTITY,
    DECREASE_QUANTITY,
    REDUX_STATE_ITEM
} from '../Actions/Action'

const orderState={
    originalData:[
        {
            "id": 9090,
            "name": "Item1",
            "price": 200,
            "discount": 10,
            "type": "fiction",
            "img_url": "https://place-hold.it/40.jpg"
        },
        {
            "id": 9091,
            "name": "Item2",
            "price": 250,
            "discount": 15,
            "type": "literature",
            "img_url": "https://place-hold.it/40.jpg"
        },
        {
            "id": 9092,
            "name": "Item3",
            "price": 320,
            "discount": 5,
            "type": "literature",
            "img_url": "https://place-hold.it/40.jpg"
        },
        {
            "id": 9093,
            "name": "Item4",
            "price": 290,
            "discount": 0,
            "type": "thriller",
            "img_url": "https://place-hold.it/40.jpg"
        },
        {
            "id": 9094,
            "name": "Item5",
            "price": 500,
            "discount": 25,
            "type": "thriller",
            "img_url": "https://place-hold.it/40.jpg"
        },
        {
            "id": 9095,
            "name": "Item6",
            "price": 150,
            "discount": 5,
            "type": "literature",
            "img_url": "https://place-hold.it/40.jpg"
        },
        {
            "id": 9096,
            "name": "Item7",
            "price": 700,
            "discount": 22,
            "type": "literature",
            "img_url": "https://place-hold.it/40.jpg"
        },
        {
            "id": 9097,
            "name": "Item8",
            "price": 350,
            "discount": 18,
            "type": "fiction",
            "img_url": "https://place-hold.it/40.jpg"
        }
    ],
    data :[],
    items:0,
    cost:0,
    discount:0,
    typeDiscount:0
}

export default function rootReducer(state=orderState,action){
    let products=[...state.data];
    let index;
    switch(action.type){
        case INCREASE_QUANTITY:
            index=action.payload.index
            products[index].qty++;
            if(products[index].type=='fiction')
                state.typeDiscount+=(0.15*products[index].price)
            return {
                ...state,
                data: [
                    ...products
                ],
                items:state.items+1,
                cost:state.cost+products[index].price,
                discount:state.discount+products[index].discount,
            };

        case DECREASE_QUANTITY:
            index=action.payload.index
            products[index].qty--;
            if(products[index].type=='fiction')
                state.typeDiscount-=(0.15*products[index].price)
            return {
                ...state,
                data: [...products],
                items:state.items-1,
                cost:state.cost-products[index].price,
                discount:state.discount-products[index].discount,
            };
        case UPDATE_QUANTITY:{
            return{
                ...state,
                items:action.payload.items,
                cost:action.payload.cost,
                discount:action.payload.discount
            }
        }

        case DELETE_ITEM:{
            index=action.payload
            let qty=products[index].qty
            state.items-=(qty)
            state.cost-=(qty*products[index].price)
            state.discount-=(qty*products[index].discount)
            if(products[index].type=='fiction')
            
                state.typeDiscount-=(0.15*qty*products[index].price)
            state.data.splice(index,1)
            return {
                ...state
            };
        }
        case LOAD_STATE:{
            let obj={
                items:0,
                cost:0,
                discount:0,
                typeDiscount:0
            }
            state.data=state.originalData
            state.data.map((product) => {
                product.qty=1
                obj.items++;
                obj.cost+=product.price;
                obj.discount+=product.discount;
                if(product.type=='fiction')
                    obj.typeDiscount+=(0.15*product.price);
            });
            return{
                ...state,
                data:[...state.data],
                items:obj.items,
                cost:obj.cost,
                discount:obj.discount,
                typeDiscount:obj.typeDiscount
            }
        }
        case REDUX_STATE_ITEM:{
            state.data = action.payload
            let obj={
                items:0,
                cost:0,
                discount:0,
                typeDiscount:0
            }
            state.data.map((product) => {
                obj.items+=product.qty;
                obj.cost+=product.price;
                obj.discount+=product.discount;
                if(product.type=='fiction')
                    obj.typeDiscount+=(0.15*product.price);
            });
            return {
                ...state,
                items:obj.items,
                cost:obj.cost,
                discount:obj.discount,
                typeDiscount:obj.typeDiscount
            }
        }
        default:
            return state
    }

}