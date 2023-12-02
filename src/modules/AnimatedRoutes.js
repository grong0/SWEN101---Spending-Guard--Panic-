import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";

import NoteTaker from "./NoteTaker.js";
import GraphViewer from "./GraphViewer.js";
import Currency from "./Currency.js";

function AnimatedRoutes() {
	var location = useLocation();

	return (
		<AnimatePresence>
			<Routes location={location} key={location.pathname}>
				<Route exact path="/" element={<NoteTaker />} />
				<Route path="/graph" element={<GraphViewer />} />
                <Route path="/currency" element={<Currency />} />
			</Routes>
		</AnimatePresence>
	);
}

export default AnimatedRoutes;
