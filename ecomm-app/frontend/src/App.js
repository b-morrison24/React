import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import PrivateRoute from './components/Auth/PrivateRoute';
import Dashboard from './components/Auth/Dashboard';


export default function App() {
	return (
	<div className="App">
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route
						path="/dashboard"
						element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>}
					/>
				</Routes>
			</Router>
		</AuthProvider>
	</div>
	);
}
