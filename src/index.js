import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./modules/App";
import { StyledEngineProvider, CssVarsProvider } from "@mui/joy/styles";
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	//   <React.StrictMode>
	<StyledEngineProvider>
		<CssVarsProvider defaultMode="dark" modeStorageKey="">
			<App />
		</CssVarsProvider>
	</StyledEngineProvider>

	//   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
