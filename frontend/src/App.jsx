import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Article from './pages/Article';
import Author from './pages/Author';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NotFound from './components/NotFound';
import '';
function AppContent() {
    const location = useLocation();
    const token = localStorage.getItem('token');

    // الصفحات اللي مش عايز أظهر فيها الـ Navbar
    const hideNavbarRoutes = ['/login', '/signup'];
    const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname.toLowerCase());

    return (
        <>
            {!shouldHideNavbar && token && <Navbar />}
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/article/:id" element={<Article />} />
                    <Route path="/author/:id" element={<Author />} />
                    <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </>
    );
}

export default function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}
