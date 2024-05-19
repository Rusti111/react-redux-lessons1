import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './pages';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route element={<Main />} path='/' />
            </Routes>
        </Router>
    );
}

export default App;
