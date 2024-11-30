import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import ItemsPage from './pages/ItemsPage';
import InventoryPage from './pages/InventoryPage';
import './Styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="app">
          <Sidebar />
          <div className="main-content">
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/items" element={<ItemsPage />} />
                <Route path="/inventory" element={<InventoryPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;