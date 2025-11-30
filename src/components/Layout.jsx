import { useState } from 'react';
import Sidebar from './Sidebar';
import AnimatedBackground from './AnimatedBackground';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-lc-bg-primary relative overflow-hidden">
      {/* Subtle gradient background */}
      <AnimatedBackground />

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="menu-overlay md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="flex min-h-screen relative z-10">
        {/* Sidebar - hidden on mobile, visible on desktop */}
        <Sidebar
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Main content area */}
        <main className="flex-1 md:ml-16 lg:ml-64 transition-all duration-300">
          {/* Mobile header with hamburger */}
          <div className="md:hidden fixed top-0 left-0 right-0 z-30 px-4 py-3 bg-lc-bg-secondary/95 backdrop-blur-sm border-b border-lc-border">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2.5 bg-lc-bg-elevated hover:bg-lc-bg-hover rounded-lg transition-all duration-200"
              aria-label="Open menu"
            >
              <svg
                className="w-5 h-5 text-lc-text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Content with padding for mobile header */}
          <div className="pt-16 md:pt-0 min-h-screen">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
