import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";

import NoteTaker from "./NoteTaker.js";
import GraphViewer from "./GraphViewer.js";
import Currency from "./Currency.js";

function AnimatedRoutes() {
	var location = useLocation();
	console.log(location);
	console.log(location.pathname);

	return (
		<AnimatePresence>
			<Routes location={location} key={location.pathname}>
				<Route exact path="/SWEN101---Spending-Guard--Panic-/" element={<NoteTaker />} />
				<Route path="/SWEN101---Spending-Guard--Panic-/graph" element={<GraphViewer />} />
				<Route path="/SWEN101---Spending-Guard--Panic-/currency" element={<Currency />} />
			</Routes>
		</AnimatePresence>
	);
}

export default AnimatedRoutes;
