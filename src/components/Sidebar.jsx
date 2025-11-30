import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Code2, Map, X } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Tracker', icon: LayoutDashboard },
  { path: '/patterns', label: 'Patterns', icon: Code2 },
  { path: '/roadmap', label: 'Roadmap', icon: Map },
];

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const location = useLocation();

  const NavItem = ({ item }) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    return (
      <NavLink
        to={item.path}
        onClick={() => setIsMobileMenuOpen(false)}
        className={`
          nav-item relative group
          ${isActive ? 'active' : ''}
        `}
      >
        {/* Active indicator bar */}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-lc-accent" />
        )}

        <Icon className={`w-5 h-5 ${isActive ? 'text-lc-accent' : ''}`} />

        {/* Label - hidden on collapsed desktop, visible on expanded and mobile */}
        <span className="text-sm font-medium hidden lg:block">
          {item.label}
        </span>

        {/* Tooltip for collapsed state */}
        <div className="tooltip hidden md:block lg:hidden">
          {item.label}
        </div>
      </NavLink>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sidebar hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-16 lg:w-64 z-50">
        {/* Logo */}
        <div className="p-4 border-b border-lc-border">
          <div className="flex items-center gap-3">
            <div className="logo w-10 h-10 flex items-center justify-center">
              <span className="text-sm font-bold">NC</span>
            </div>
            <div className="hidden lg:block">
              <span className="text-lg font-bold text-lc-text-primary">NeetCode</span>
              <p className="text-xs text-lc-text-tertiary">Progress Tracker</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-lc-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-lc-success" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-lc-success animate-ping opacity-75" />
            </div>
            <span className="hidden lg:block text-xs text-lc-text-tertiary">Tracking Active</span>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside className={`
        md:hidden fixed left-0 top-0 bottom-0 w-80
        bg-lc-bg-secondary border-r border-lc-border
        z-50 transform transition-transform duration-300 ease-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Mobile Header */}
        <div className="p-4 border-b border-lc-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="logo w-10 h-10 flex items-center justify-center">
              <span className="text-sm font-bold">NC</span>
            </div>
            <div>
              <span className="text-lg font-bold text-lc-text-primary">NeetCode</span>
              <p className="text-xs text-lc-text-tertiary">Progress Tracker</p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2.5 bg-lc-bg-elevated hover:bg-lc-error/20 hover:text-lc-error rounded-lg transition-all duration-200"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center gap-4 px-4 py-3.5 rounded-lg
                  transition-all duration-200 relative
                  ${isActive
                    ? 'bg-lc-accent/10 text-lc-accent'
                    : 'text-lc-text-secondary hover:text-lc-text-primary hover:bg-lc-bg-elevated'
                  }
                `}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-lc-accent" />
                )}
                <Icon className={`w-5 h-5 ${isActive ? 'text-lc-accent' : ''}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-lc-border">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-lc-success" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-lc-success animate-ping opacity-75" />
            </div>
            <span className="text-xs text-lc-text-tertiary">Tracking Active</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
