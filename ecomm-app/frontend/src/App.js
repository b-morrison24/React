import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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
					{/* Add other routes here */}
				</Routes>
			</Router>
		</AuthProvider>
	</div>
	);
}
