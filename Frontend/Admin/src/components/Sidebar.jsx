// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { 
  Home, 
  User, 
  Settings, 
  LogOut, 
  Shield, 
  FileText, 
  BarChart3, 
  Users, 
  Calendar,
  Mail,
  Bell
} from "lucide-react";

function Sidebar() {
  const menuItems = [
    {
      to: "home",
      icon: Home,
      text: "Dashboard",
      badge: null
    },
    {
      to: "profile",
      icon: User,
      text: "Profile",
      badge: null
    },
    {
      to: "settings",
      icon: Settings,
      text: "Settings",
      badge: null
    },
    {
      to: "reports",
      icon: FileText,
      text: "Reports",
      badge: "3"
    },
    {
      to: "analytics",
      icon: BarChart3,
      text: "Analytics",
      badge: null
    },
    {
      to: "users",
      icon: Users,
      text: "Users",
      badge: "12"
    },
    {
      to: "calendar",
      icon: Calendar,
      text: "Calendar",
      badge: null
    }
  ];

  return (
    <nav className="sidebar-nav">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <a href="#" className="logo">
          <div className="logo-icon">
            <Shield size={24} />
          </div>
          <span>Admin Panel</span>
        </a>
      </div>

      {/* Main Navigation */}
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink 
              to={item.to} 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <item.icon className="nav-icon" size={20} />
              <span className="nav-text">{item.text}</span>
              {item.badge && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Sidebar Sections */}
      <div className="sidebar-section">
        <div className="section-title">System</div>
        <ul>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <LogOut className="nav-icon" size={20} />
              <span className="nav-text">Logout</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;