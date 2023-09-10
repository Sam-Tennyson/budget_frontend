// libs
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'

// store
import { store } from './app/store'

// components
import RootRouter from './routes/RootRouter'

// utils
import { SnackbarUtilConfig } from './shared/Snackbar'

// styles
import './App.css'

function App() {
	return (
		<>
			<Provider store={store}>
				<SnackbarProvider
					anchorOrigin={{
						vertical: "top",
						horizontal: "center",
					}}
					maxSnack={3}
				>
					<SnackbarUtilConfig />
					<RootRouter />
				</SnackbarProvider>
			</Provider>
		</>
	)
}

export default App
