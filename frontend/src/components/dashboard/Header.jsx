import React from 'react';

const styles = {
  header: {
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'space-between',
    borderBottom:    '1px solid var(--color-border-default)',
    backgroundColor: 'var(--color-bg-surface)',
    padding:         'var(--space-4)',
    boxShadow:       'var(--shadow-sm)',
  },
  left: {
    display:    'flex',
    flex:        1,
    alignItems: 'center',
    gap:        'var(--space-3)',
  },
  hamburger: {
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    height:          '40px',
    width:           '40px',
    borderRadius:    'var(--radius-md)',
    border:          'none',
    background:      'transparent',
    cursor:          'pointer',
    transition:      'var(--transition-color)',
  },
  hamburgerIcon: {
    height: '24px',
    width:  '24px',
    color:  'var(--color-text-primary)',
  },
  title: {
    margin:     0,
    fontSize:   'var(--text-lg)',
    fontWeight: 'var(--font-semibold)',
    fontFamily: 'var(--font-primary)',
    color:      'var(--color-neutral-900)',
  },
  right: {
    display:        'flex',
    flex:            1,
    alignItems:     'center',
    justifyContent: 'flex-end',
  },
  avatar: {
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    height:          '40px',
    width:           '40px',
    borderRadius:    'var(--radius-md)',
    background:      'var(--gradient-brand)',
    fontSize:        'var(--text-sm)',
    fontWeight:      'var(--font-bold)',
    fontFamily:      'var(--font-primary)',
    color:           'var(--color-text-inverse)',
    boxShadow:       'var(--shadow-md)',
  },
};

export default function Header({ menuItems, activeTab, setSidebarOpen }) {
  const [hamburgerHovered, setHamburgerHovered] = React.useState(false);

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
      {/* Left — Hamburger + Title */}
      <div style={styles.left}>
        {!isLargeScreen && (
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              ...styles.hamburger,
              // dynamic hover — runtime state, must stay inline
              backgroundColor: hamburgerHovered
                ? 'var(--color-neutral-100)'
                : 'transparent',
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

      {/* Right — Avatar */}
      <div style={styles.right}>
        <div style={styles.avatar}>S</div>
      </div>
    </div>
  );
}