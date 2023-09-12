// libs
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'

import { setupListeners } from '@reduxjs/toolkit/query'

// reducers
import authReducer from "../reducer/AuthSlice"
import budgetReducer from "../reducer/Budget"

// services
import { authApi } from '../services/AuthServices';
import { budgetApi } from '../services/BudgetServices';

// Configuration for Redux Persist
const persistConfig = {
	key: 'root', // Change this to your preferred key
	storage,
};

const RootReducer = combineReducers({
	// Include other reducers from your application
	auth: authReducer,
	// budget: budgetReducer,
});

// Create a persisted reducer using Redux Persist
const persistedReducer = persistReducer(persistConfig, RootReducer);

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[budgetApi.reducerPath]: budgetApi.reducer,
		persistedReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(authApi.middleware, budgetApi.middleware),
})

setupListeners(store.dispatch)

// Create a persisted store using Redux Persist
export const persistor = persistStore(store);
export default { store, persistor };