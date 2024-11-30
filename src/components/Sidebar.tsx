import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><Link to="/">Home (Dashboard)</Link></li>
          <li><Link to="/inventory">Inventory</Link></li>
          <li><Link to="/transactions">Transactions</Link></li>
          <li><Link to="/items">Items</Link></li> {/* Added link to Items page */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;