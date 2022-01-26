import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  HashRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
// import Login from './components/Login';
import Register from './components/Register';
import UserContext from "./userContext";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
 const DefaultLayout = React.lazy(() => import("./components/Layout"));

// Pages
const Login = React.lazy(() => import("./components/Login"));

const App = () => {
	let user = null;
	let navigate = useNavigate();

	useEffect(() => {
    const token = localStorage.getItem('user');
    if(!token){
    navigate("/login", { replace: true });
    }
  }, [])

	return (
		<UserContext.Provider value={user}>
			<React.Suspense fallback={loading()}>
				<Routes>
					<Route
						path="/login"
						name="Login Page"
						element={<Login />}
					/>

					<Route
						path="/register"
						name="Register New user"
						element={ <Register/>}
					/>

					<Route
						path="/"
						name="Home"
						element={ <DefaultLayout/>}
					/>
				</Routes>
				</React.Suspense>
	</UserContext.Provider>
	);
};

export default App;
