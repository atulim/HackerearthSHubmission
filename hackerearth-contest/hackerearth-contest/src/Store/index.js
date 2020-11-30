import { createStore } from "redux";
import rootReducer from '../Store/Reducer/Reducer'

const storeConfig = createStore(rootReducer);

export default storeConfig;