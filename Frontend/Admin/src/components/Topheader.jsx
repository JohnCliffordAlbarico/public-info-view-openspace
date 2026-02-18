// src/components/TopHeader.jsx
import { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Settings, 
  User, 
  LogOut,
  ChevronDown 
} from 'lucide-react';

function TopHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Toggle sidebar class for mobile
    const sidebar = document.querySelector('.dashboard__sidebar');
    const overlay = document.querySelector('.mobile-overlay');
    if (sidebar && overlay) {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('show');
    }
  };

  return (
    <>
      <div className="header-left">
        <button className="menu-toggle" onClick={toggleMenu}>
          <Menu size={20} />
        </button>
        
        <div className="search-bar">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Search anything..."
          />
        </div>
      </div>

      <div className="header-right">
        <button className="icon-button">
          <Bell size={20} />
        </button>
        
        <div className="user-menu">
          <div className="user-avatar">
            <User size={20} />
          </div>
          <div className="user-info">
            <div className="user-name">Admin User</div>
            <div className="user-role">Administrator</div>
          </div>
          <ChevronDown size={16} className="dropdown-icon" />
        </div>
      </div>

      {/* Mobile Overlay */}
      <div className="mobile-overlay" onClick={toggleMenu}></div>
    </>
  );
}

export default TopHeader;