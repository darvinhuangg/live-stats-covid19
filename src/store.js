import { createStore, combineReducers } from 'redux';
import dataReducer from '@reducers/dataReducer';

const rootReducer = combineReducers({
	dataReducer: dataReducer
})

const configureStore = () => createStore(rootReducer);

export default configureStore;