import "../styles/App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { createMemoryHistory } from "@remix-run/router";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import CssBaseLine from "@mui/joy/CssBaseline";

import AnimatedRoutes from "./AnimatedRoutes";
import NavHub from "./NavHub";

const theme = extendTheme({
    palatte: {
        background: {
            default: "#0b1c2b"
        }
    },
    fontFamily: {
        display: "Rubik, var(--joy-font-fallback)", // applies to `h1`–`h4`
        body: "Rubik, var(--joy-font-fallback)", // applies to `title-*` and `body-*`
    }
});

function App() {
	const history = createMemoryHistory();

	return (
		<CssVarsProvider defaultMode="dark" disableNestedContext >
            <CssBaseLine />
			<Router location={history.location}>
				<div id="router-content">
					<AnimatedRoutes />
					<NavHub />
				</div>
			</Router>
		</CssVarsProvider>
	);
}

export default App;
