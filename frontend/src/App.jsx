import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Article from './pages/Article';
import Author from './pages/Author';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NotFound from './components/NotFound';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/article/:id" element={<Article />} />
                    <Route path="/author/:id" element={<Author />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;