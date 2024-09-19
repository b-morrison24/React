import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

export default function App() {
	return (
	<div className="App">
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
					{/* TODO: Create PrivateRoute component for authorized users */}
				</Routes>
			</Router>
		</AuthProvider>
	</div>
	);
}
