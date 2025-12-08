import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import React from "react";
import Login from "./pages/Login/Login.jsx";
import CriarConta from "./pages/CriarConta/CriarConta.jsx";
import Pagina404 from "./pages/Pagina404/Pagina404.jsx";
import HomeCliente from "./pages/HomeCliente/HomeCliente.jsx";
import "./fonts.css";
import theme from "./assets/themes/theme.js";
function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Switch>
					<Route exact path="/">
						<Login />
					</Route>

					<Route path="/cliente/:conta">
						<HomeCliente />
					</Route>

					<Route path="/criarConta">
						<CriarConta />
					</Route>
					<Route>
						<Pagina404 />
					</Route>
				</Switch>
			</Router>
		</ThemeProvider>
	);
}

export default App;
