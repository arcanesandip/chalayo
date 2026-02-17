import React from 'react';

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    padding: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  left: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    gap: '12px',
  },
  hamburger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40px',
    width: '40px',
    borderRadius: '12px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
  },
  hamburgerIcon: {
    height: '24px',
    width: '24px',
    color: '#334155',
  },
  title: {
    margin: 0,
    fontSize: '1.125rem',
    fontWeight: 600,
    color: '#0f172a',
  },
  right: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40px',
    width: '40px',
    borderRadius: '12px',
    background: 'linear-gradient(to bottom right, #10b981, #0d9488)',
    fontSize: '0.875rem',
    fontWeight: 700,
    color: '#ffffff',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
};

export default function Header({ menuItems, activeTab, setSidebarOpen }) {
  const [hamburgerHovered, setHamburgerHovered] = React.useState(false);

  // Hide hamburger on large screens (≥1024px)
  const [isLargeScreen, setIsLargeScreen] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );

  React.useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeLabel =
    menuItems.find((item) => item.id === activeTab)?.label || 'Dashboard';

  return (
    <div style={styles.header}>
      {/* Left - Hamburger + Title */}
      <div style={styles.left}>
        {!isLargeScreen && (
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              ...styles.hamburger,
              backgroundColor: hamburgerHovered ? '#f1f5f9' : 'transparent',
            }}
            onMouseEnter={() => setHamburgerHovered(true)}
            onMouseLeave={() => setHamburgerHovered(false)}
            aria-label="Open menu"
          >
            <svg
              style={styles.hamburgerIcon}
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
        )}
        <h2 style={styles.title}>{activeLabel}</h2>
      </div>

      {/* Right - Avatar */}
      <div style={styles.right}>
        <div style={styles.avatar}>S</div>
      </div>
    </div>
  );
}
