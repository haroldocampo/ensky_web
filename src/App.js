import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import InvestmentList from './components/InvestmentList';
import UserList from './components/UserList';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/investments">Investments</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="investments" element={<InvestmentList />} />
          <Route path="users" element={<UserList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;