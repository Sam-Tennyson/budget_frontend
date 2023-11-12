// libs
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import { PersistGate } from 'redux-persist/integration/react'

// store
import { persistor, store } from './app/store'

// components
import RootRouter from './routes/RootRouter'

// utils
import { SnackbarUtilConfig } from './shared/snackbar'

// styles
import './App.scss'

function App() {
	return (
		<>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<SnackbarProvider
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "center",
						}}
						maxSnack={3}
					>
						<SnackbarUtilConfig />
						<RootRouter />
					</SnackbarProvider>
				</PersistGate>
			</Provider>
		</>
	)
}

export default App
