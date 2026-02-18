import React from 'react';

/**
 * Sidebar
 *
 * All colours, fonts, spacing, shadows and radii come from the shared
 * design-system tokens in variables.css. The only sidebar-specific vars
 * consumed here are --gradient-sidebar, --color-sidebar-border, and
 * --color-sidebar-overlay (the 3 dark-bg values that have no light-theme
 * equivalent). Everything else reuses the same primary/secondary/neutral
 * tokens used by Login and the rest of the app.
 *
 * Token mapping quick-reference:
 *   Active bg         → --gradient-brand          (blue→indigo, same as login header/button)
 *   Active text       → --color-text-inverse       (white)
 *   Active glow       → --shadow-brand
 *   Hover bg          → --color-primary-900 (15 % opacity, inline rgba)
 *   Hover text        → --color-primary-300
 *   Idle text         → --color-neutral-400
 *   Header icon muted → --color-neutral-400
 *   Header icon hover → --color-primary-300
 *   Btn hover bg      → rgba of --color-primary-600 at 18 %
 *   Tooltip bg        → dark sidebar bg (#1e293b — same as --gradient-sidebar end)
 *   Tooltip border    → --color-neutral-700 (slate-ish, close to sidebar border)
 *   Brand font        → --font-secondary
 *   Label font        → --font-primary
 *   Spacing           → --space-*
 *   Radii             → --radius-*
 *   Text sizes        → --text-*
 *   Font weights      → --font-*
 *   Transitions       → --transition-*
 *   Z-index           → --z-*
 */
export default function Sidebar({
  menuItems,
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  sidebarCollapsed,
  setSidebarCollapsed,
}) {
  // ── Breakpoint state ──────────────────────────────────────────────────────
  const [isLargeScreen, setIsLargeScreen] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );

  // ── Hover tracking ────────────────────────────────────────────────────────
  const [hoveredItem, setHoveredItem] = React.useState(null);
  const [hoveredBtn,  setHoveredBtn]  = React.useState(null);

  // ── Resize listener ───────────────────────────────────────────────────────
  React.useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── Derived values ────────────────────────────────────────────────────────
  const collapsed        = isLargeScreen && sidebarCollapsed;
  const sidebarWidth     = collapsed
    ? 'var(--sidebar-width-collapsed)'
    : 'var(--sidebar-width-expanded)';
  const sidebarTransform =
    !isLargeScreen && !sidebarOpen ? 'translateX(-100%)' : 'translateX(0)';

  // ── Styles ────────────────────────────────────────────────────────────────
  const styles = {
    // Overlay backdrop — mobile only
    overlay: {
      position:        'fixed',
      inset:            0,
      zIndex:          'var(--z-modal)',
      backgroundColor: 'var(--color-sidebar-overlay)',
    },

    // Main sidebar panel
    sidebar: {
      position:   isLargeScreen ? 'relative' : 'fixed',
      top:         0,
      bottom:      0,
      left:        0,
      zIndex:     'var(--z-modal)',
      width:       sidebarWidth,
      height:      '100vh',
      flexShrink:  0,
      overflowY:  'auto',
      overflowX:  'hidden',
      background: 'var(--gradient-sidebar)',
      color:      'var(--color-text-inverse)',
      boxShadow:  '4px 0 24px rgba(0,0,0,0.3)',
      transform:   sidebarTransform,
      transition: 'transform 300ms ease-in-out, width 300ms ease-in-out',
      scrollbarWidth: 'thin',
      scrollbarColor: 'var(--color-sidebar-border) transparent',
    },

    // Header row
    header: {
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'space-between',
      borderBottom:   '1px solid var(--color-sidebar-border)',
      paddingLeft:    '10px',
      paddingRight:   'var(--space-2)',
      height:         'var(--sidebar-header-height)',
      flexShrink:      0,
    },

    // Logo area
    logoArea: {
      display:    'flex',
      alignItems: 'center',
      flex:        1,
      overflow:   'hidden',
      minWidth:    0,
    },

    // Logo button
    logoBtn: {
      display:      'flex',
      alignItems:   'center',
      background:   'none',
      border:       'none',
      cursor:       'pointer',
      padding:      'var(--space-2) 0',
      color:        'var(--color-text-inverse)',
      borderRadius: 'var(--radius-md)',
      transition:   'var(--transition-fast)',
      width:        '100%',
      textAlign:    'left',
    },

    // Logo icon badge — uses --gradient-brand so it matches login header & submit btn
    logoIcon: {
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
      height:          '36px',
      width:           '36px',
      minWidth:        '36px',
      borderRadius:    'var(--radius-md)',
      background:      'var(--gradient-brand)',
      flexShrink:       0,
      boxShadow:       'var(--shadow-brand)',
    },

    // Brand name — slides out when collapsed
    logoText: {
      marginLeft:    'var(--space-2)',
      fontSize:      'var(--text-lg)',
      fontWeight:    'var(--font-bold)',
      fontFamily:    'var(--font-secondary)',
      letterSpacing: 'var(--tracking-tight)',
      whiteSpace:    'nowrap',
      overflow:      'hidden',
      maxWidth:       collapsed ? '0'   : '180px',
      opacity:        collapsed ?  0    : 1,
      transition:    'max-width 300ms ease, opacity 300ms ease',
    },

    // Header icon buttons — factory
    //   Hover bg  : primary-600 at 18 % opacity (matches login form's focus ring colour)
    //   Hover icon: primary-300 (light blue, readable on dark bg)
    iconBtn: (key) => ({
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
      height:          '32px',
      width:           '32px',
      minWidth:        '32px',
      borderRadius:    'var(--radius-md)',
      border:          'none',
      cursor:          'pointer',
      backgroundColor:
        hoveredBtn === key ? 'rgba(37,99,235,0.18)' : 'transparent',
      color:
        hoveredBtn === key
          ? 'var(--color-primary-300)'
          : 'var(--color-neutral-400)',
      transition: 'var(--transition-color)',
      flexShrink:  0,
    }),

    // Navigation <ul>
    nav: {
      listStyle:     'none',
      margin:         0,
      padding:       'var(--space-2)',
      display:       'flex',
      flexDirection: 'column',
      gap:           '0.2rem',
    },

    // Nav item <li> — factory
    //   Active bg   : --gradient-brand  (same as login header / submit button)
    //   Active glow : --shadow-brand    (same blue glow used on focus states)
    //   Hover bg    : primary-600 at 12 % — subtle blue tint on dark surface
    //   Hover text  : --color-primary-300  (light blue, matches icon btn hover)
    //   Idle text   : --color-neutral-400
    navItem: (id, index) => ({
      position:       'relative',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'flex-start',
      cursor:         'pointer',
      borderRadius:   'var(--radius-md)',
      padding:        '10px',
      transition:
        'background-color 200ms ease, box-shadow 200ms ease, color 200ms ease',
      animationDelay: `${index * 30}ms`,
      background:
        activeTab === id
          ? 'var(--gradient-brand)'
          : hoveredItem === id
          ? 'rgba(37,99,235,0.12)'
          : 'transparent',
      color:
        activeTab === id
          ? 'var(--color-text-inverse)'
          : hoveredItem === id
          ? 'var(--color-primary-300)'
          : 'var(--color-neutral-400)',
      boxShadow:
        activeTab === id ? 'var(--shadow-brand)' : 'none',
    }),

    // Nav icon — fixed, never shifts
    navIcon: {
      width:       '20px',
      minWidth:    '20px',
      textAlign:   'center',
      fontSize:    'var(--text-base)',
      flexShrink:   0,
      marginRight: '10px',
    },

    // Nav label — slides out on collapse
    navLabel: {
      fontSize:   'var(--text-sm)',
      fontWeight: 'var(--font-medium)',
      fontFamily: 'var(--font-primary)',
      whiteSpace: 'nowrap',
      overflow:   'hidden',
      maxWidth:    collapsed ? '0'   : '160px',
      opacity:     collapsed ?  0    : 1,
      transition: 'max-width 300ms ease, opacity 300ms ease',
    },

    // Tooltip — collapsed desktop, on hover
    //   Background reuses the sidebar end-stop colour (#1e293b) — no new var needed.
    //   Border reuses --color-neutral-700 which is already in the system.
    tooltip: {
      position:        'absolute',
      left:            'calc(100% + 10px)',
      top:             '50%',
      transform:       'translateY(-50%)',
      zIndex:          'var(--z-dropdown)',
      backgroundColor: '#1e293b',
      border:          '1px solid var(--color-neutral-700)',
      color:           'var(--color-text-inverse)',
      fontSize:        'var(--text-sm)',
      fontFamily:      'var(--font-primary)',
      padding:         'var(--space-1) var(--space-2)',
      borderRadius:    'var(--radius-md)',
      whiteSpace:      'nowrap',
      boxShadow:       'var(--shadow-xl)',
      pointerEvents:   'none',
    },

    // Tooltip arrow
    tooltipArrow: {
      position:     'absolute',
      top:          '50%',
      right:        '100%',
      transform:    'translateY(-50%)',
      width:         0,
      height:        0,
      borderTop:    '4px solid transparent',
      borderBottom: '4px solid transparent',
      borderRight:  '4px solid #1e293b',
    },
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Mobile overlay backdrop */}
      {sidebarOpen && !isLargeScreen && (
        <div style={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar panel */}
      <div style={styles.sidebar}>
        {/* Collapse-button fade-in keyframe */}
        <style>{`
          @keyframes collapseButtonFadeIn {
            from { opacity: 0; transform: scale(0.8); }
            to   { opacity: 1; transform: scale(1);   }
          }
        `}</style>

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div style={styles.header}>
          <div style={styles.logoArea}>
            <button
              style={styles.logoBtn}
              onClick={() => {
                if (sidebarCollapsed) {
                  setSidebarCollapsed(false);
                } else {
                  setActiveTab(menuItems[0]?.id);
                }
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.75'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              title={sidebarCollapsed ? 'Expand sidebar' : 'Go to Overview'}
            >
              <div style={styles.logoIcon}>
                <i
                  className="fas fa-receipt"
                  style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-inverse)' }}
                />
              </div>
              <span style={styles.logoText}>CHALAYO</span>
            </button>
          </div>

          {/* Collapse button — desktop expanded only */}
          {isLargeScreen && !sidebarCollapsed && (
            <button
              style={{
                ...styles.iconBtn('collapse'),
                animation: 'collapseButtonFadeIn 150ms ease 200ms both',
              }}
              onMouseEnter={() => setHoveredBtn('collapse')}
              onMouseLeave={() => setHoveredBtn(null)}
              onClick={() => setSidebarCollapsed(true)}
              title="Collapse sidebar"
            >
              <svg height="18" width="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Close button — mobile only */}
          {!isLargeScreen && (
            <button
              style={styles.iconBtn('close')}
              onMouseEnter={() => setHoveredBtn('close')}
              onMouseLeave={() => setHoveredBtn(null)}
              onClick={() => setSidebarOpen(false)}
              title="Close menu"
            >
              <svg height="18" width="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* ── Navigation list ──────────────────────────────────────────── */}
        <ul style={styles.nav}>
          {menuItems.map((item, index) => (
            <li
              key={item.id}
              style={styles.navItem(item.id, index)}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <i className={`fas ${item.icon}`} style={styles.navIcon} />
              <span style={styles.navLabel}>{item.label}</span>

              {/* Tooltip — collapsed + hovered on desktop only */}
              {isLargeScreen && sidebarCollapsed && hoveredItem === item.id && (
                <div style={styles.tooltip}>
                  {item.label}
                  <div style={styles.tooltipArrow} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}