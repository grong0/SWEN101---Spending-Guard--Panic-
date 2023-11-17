import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';

import NoteTaker from "./NoteTaker.js";

function AnimatedRoutes() {
    var location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route exact path="/" element={<NoteTaker />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes;