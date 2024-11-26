import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ShowDetail from './pages/ShowDetail';
import Favorites from './pages/Favorites';
import { FavoritesProvider } from './context/FavoritesContext';
import './styles/App.css';

const App = () => {
    return (
        <FavoritesProvider>
            <Router>
                <div className="app">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/show/:id" element={<ShowDetail />} />
                        <Route path="/favorites" element={<Favorites />} />
                    </Routes>
                </div>
            </Router>
        </FavoritesProvider>
    );
};

export default App;