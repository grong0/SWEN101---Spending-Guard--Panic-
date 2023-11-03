import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import createMemoryHistory from '@remix-run/router';

import AnimatedRoutes from './AnimatedRoutes';
import NavHub from './NavHub';

function App() {
    const history = createMemoryHistory();

    return (
        <Router location={history.location}>
            <AnimatedRoutes />
            <NavHub />
        </Router>
	);
}

export default App;
