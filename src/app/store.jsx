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

// services
import { authApi } from '../services/AuthServices';

// Configuration for Redux Persist
const persistConfig = {
	key: 'root', // Change this to your preferred key
	storage,
};

const RootReducer = combineReducers({
	// Include other reducers from your application
	auth: authReducer,
});

// Create a persisted reducer using Redux Persist
const persistedReducer = persistReducer(persistConfig, RootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	[authApi.reducerPath]: authApi.reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(authApi.middleware),
})

setupListeners(store.dispatch)

// Create a persisted store using Redux Persist
export const persistor = persistStore(store);
export default { store, persistor };