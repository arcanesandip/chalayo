import React from 'react';

/**
 * Sidebar
 *
 * A responsive, collapsible navigation sidebar with three modes:
 *
 *   1. Mobile  (< 1024 px) – fixed overlay drawer, hidden off-screen by default.
 *              Slides in when `sidebarOpen` is true. A ✕ button dismisses it.
 *
 *   2. Desktop expanded  (≥ 1024 px, sidebarCollapsed = false) – 256 px wide.
 *              Shows logo icon + brand name, nav icons + labels, and a « collapse button.
 *              Clicking the logo navigates to the Overview tab.
 *
 *   3. Desktop collapsed (≥ 1024 px, sidebarCollapsed = true) – 68 px icon-only rail.
 *              Labels and brand name slide out; icons stay FIXED in place (no horizontal shift).
 *              Clicking the logo icon re-expands the sidebar to full width.
 *              Hovering a nav icon shows a label tooltip to the right.
 *
 * ── KEY CHANGES vs. previous version ────────────────────────────────────────
 *   [CHANGE 1] Icon alignment: logo icon and all nav icons share the same
 *              left-edge x-position (LEFT_PAD = 14px). They never shift.
 *
 *   [CHANGE 2] No-shift collapse: navItem no longer switches to justify-content:center
 *              in collapsed mode. padding and icon margin-right are always the same.
 *              The label simply fades + slides out via max-width/opacity; the icon stays.
 *
 *   [CHANGE 3] Dual logo click behaviour:
 *              • Collapsed (icon-only) → setSidebarCollapsed(false)  (expand)
 *              • Expanded              → setActiveTab('overview')     (go to Overview)
 *
 *   [CHANGE 4] Collapse button hidden in icon-only mode (no orphaned button visible).
 *              In collapsed mode a dedicated expand button replaces the collapse button
 *              so the header area stays symmetric.
 *
 *   [CHANGE 5] Sidebar collapsed width reduced to 68 px (from 80 px) to give the
 *              icon-only rail a tighter feel similar to Claude / ChatGPT.
 *
 * Props:
 *   menuItems           {Array<{id,label,icon}>} – nav items
 *   activeTab           {string}   – id of currently active tab
 *   setActiveTab        {Function} – switches active tab in parent
 *   sidebarOpen         {boolean}  – mobile drawer open state
 *   setSidebarOpen      {Function} – open / close mobile drawer
 *   sidebarCollapsed    {boolean}  – desktop collapsed state
 *   setSidebarCollapsed {Function} – expand / collapse desktop sidebar
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
  /**
   * isLargeScreen – true when window.innerWidth ≥ 1024 px (Tailwind's `lg`).
   * Initialised synchronously to avoid a layout flash on first render.
   * SSR-safe via the `typeof window` guard.
   */
  const [isLargeScreen, setIsLargeScreen] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );

  // ── Hover tracking ────────────────────────────────────────────────────────
  // hoveredItem: id of the nav item under the cursor (drives bg + tooltip)
  // hoveredBtn:  key of the header button under the cursor ('collapse' | 'close')
  // Both replace CSS :hover which cannot be used with inline styles.
  const [hoveredItem, setHoveredItem] = React.useState(null);
  const [hoveredBtn, setHoveredBtn] = React.useState(null);

  // ── Resize listener ───────────────────────────────────────────────────────
  // Keeps isLargeScreen in sync as the window is resized.
  // Cleanup on unmount prevents a memory leak.
  React.useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── Layout constants ──────────────────────────────────────────────────────
  /**
   * [CHANGE 1 + 2] LEFT_PAD is the single shared left-offset for both the
   * logo icon and every nav icon. By using the same constant in both the
   * header and navItem styles, the icons are always left-edge aligned and
   * never shift horizontally during the expand/collapse transition.
   *
   * Previous code used `padding: '24px 20px'` for the header and
   * `padding: isLargeScreen && sidebarCollapsed ? '12px 0' : '12px 16px'`
   * for nav items – this caused nav icons to jump to centre in collapsed mode.
   */
  const LEFT_PAD = 14; // px – shared left padding for header and nav items

  // ── Derived values ────────────────────────────────────────────────────────
  // [CHANGE 5] 68 px collapsed (was 80 px) – tighter icon-only rail
  const sidebarWidth = isLargeScreen && sidebarCollapsed ? '57px' : '256px';

  // Mobile: hide off-screen when closed; visible when open.
  // Desktop: transform has no effect (position:relative) but stays at 0 for clarity.
  const sidebarTransform =
    !isLargeScreen && !sidebarOpen ? 'translateX(-100%)' : 'translateX(0)';

  // ── Style objects ─────────────────────────────────────────────────────────
  /**
   * Styles are defined inside the component body so they can reference live
   * state values (isLargeScreen, sidebarCollapsed, hoveredItem, hoveredBtn).
   * iconBtn() and navItem() are factory functions that accept dynamic args.
   */
  const styles = {
    // ── Overlay backdrop (mobile only) ─────────────────────────────────────
    overlay: {
      position: 'fixed',
      inset: 0,
      zIndex: 40,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },

    // ── Main sidebar panel ─────────────────────────────────────────────────
    // position:relative on desktop (participates in flex layout),
    // position:fixed on mobile (overlay drawer).
    // Both width and transform are animated so expand/collapse is smooth.
    sidebar: {
      position: isLargeScreen ? 'relative' : 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      zIndex: 50,
      width: sidebarWidth, // [CHANGE 5] 68px or 256px
      height: '100vh',
      flexShrink: 0,
      overflowY: 'auto',
      overflowX: 'hidden', // hides content bleeding during animation
      background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
      color: '#ffffff',
      boxShadow: '4px 0 24px rgba(0,0,0,0.3)',
      transform: sidebarTransform,
      transition: 'transform 300ms ease-in-out, width 300ms ease-in-out',
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(255,255,255,0.1) transparent',
    },

    // ── Header row (logo + action buttons) ────────────────────────────────
    // [FIX 5] paddingLeft is now always 10px – same as navItem padding – so
    // the logo icon left-edge is always flush with every tab icon left-edge
    // in both expanded and collapsed modes. No more conditional switching.
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      paddingLeft: '10px', // [FIX 5] always 10px = same as navItem padding
      paddingRight: '8px',
      height: '72px',
      flexShrink: 0,
    },

    // ── Logo area (left side of header) ────────────────────────────────────
    // flex:1 + overflow:hidden so the brand text slide animation works cleanly.
    logoArea: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      overflow: 'hidden',
      minWidth: 0,
    },

    // ── Logo button ─────────────────────────────────────────────────────────
    // [CHANGE 3] onClick logic now has TWO branches:
    //   • collapsed → expand (setSidebarCollapsed(false))
    //   • expanded  → navigate to overview (setActiveTab('overview'))
    // padding:0 so the logo icon left edge sits exactly at LEFT_PAD
    // (the header already provides left padding via `styles.header.paddingLeft`).
    logoBtn: {
      display: 'flex',
      alignItems: 'center',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '8px 0', // [CHANGE 1] no extra horizontal padding here
      color: 'white',
      borderRadius: '8px',
      transition: 'opacity 0.15s ease',
      width: '100%',
      textAlign: 'left',
    },

    // ── Emerald icon square (receipt icon) ────────────────────────────────
    // [FIX 3] width/height bumped from 32px → 36px.
    // Nav icons (navIcon) are also 36px wide, so both the logo badge and
    // every tab icon share the same bounding box width. With both at LEFT_PAD
    // from the left edge the optical centres land at exactly the same x.
    // [COLOR FIX] boxShadow matches the active-item glow so the logo badge and
    // active nav items share the same visual language (same green, same glow).
    logoIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '36px', // [FIX 3] was 32px
      width: '36px', // [FIX 3] was 32px
      minWidth: '36px', // [FIX 3] was 32px
      borderRadius: '10px',
      backgroundColor: '#10b981',
      // boxShadow: '0 4px 14px rgba(16,185,129,0.4)',
      flexShrink: 0,
    },

    // ── Brand text ─────────────────────────────────────────────────────────
    // Slides out (max-width → 0, opacity → 0) when collapsed.
    // Same slide technique as nav labels – icons are unaffected.
    logoText: {
      marginLeft: '10px',
      fontSize: '1.125rem',
      fontWeight: 700,
      letterSpacing: '-0.025em',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      maxWidth: isLargeScreen && sidebarCollapsed ? '0' : '180px',
      opacity: isLargeScreen && sidebarCollapsed ? 0 : 1,
      transition: 'max-width 300ms ease, opacity 300ms ease',
    },

    // ── Header icon buttons (collapse / close) ────────────────────────────
    // Factory: returns a style object for a given button `key`.
    // [COLOR FIX] Hover background is now emerald-tinted rgba(16,185,129,0.18)
    // to stay in the same colour family as the logo icon, instead of the
    // previous cold white/10% which clashed visually.
    iconBtn: (key) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '32px',
      width: '32px',
      minWidth: '32px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      // [COLOR FIX] was rgba(255,255,255,0.1) – cold grey, clashed with emerald logo
      backgroundColor:
        hoveredBtn === key ? 'rgba(16,185,129,0.18)' : 'transparent',
      transition: 'background-color 0.15s ease',
      // [COLOR FIX] icon turns emerald-300 on hover to match the green family
      color: hoveredBtn === key ? '#6ee7b7' : 'rgba(255,255,255,0.7)',
      flexShrink: 0,
    }),

    // ── Navigation <ul> ────────────────────────────────────────────────────
    // padding:8px gives 8px breathing room all around the item list.
    // gap:2px is tighter than before (was 4px) matching ChatGPT/Claude density.
    nav: {
      listStyle: 'none',
      margin: 0,
      padding: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.2rem',
    },

    // ── Nav item <li> – style factory ─────────────────────────────────────
    // [CHANGE 2] justifyContent is ALWAYS 'flex-start'. No icon jump.
    // [CHANGE 1] paddingLeft always matches LEFT_PAD in expanded mode.
    //
    // [FIX 4] Icon-only padding:
    //   Expanded:    padding: 10px 8px 10px LEFT_PAD  (left-aligned, icon at LEFT_PAD)
    //   Collapsed:   padding: 10px  (equal on all sides)
    //   In collapsed mode the label is hidden (width=0), so the row contains only
    //   the 36px icon + 10px marginRight. Using equal padding looks symmetrical
    //   and professional instead of left-heavy.
    navItem: (id, index) => ({
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      cursor: 'pointer',
      borderRadius: '10px',
      // [FIX 5] Always equal x and y padding (10px all sides) in both expanded
      // and collapsed modes. Previously expanded mode used LEFT_PAD (14px) on
      // the left which made the left gap wider than the top/bottom, causing the
      // icon column to sit further right than the logo badge.
      // Now both the logo header and every nav row have the same 10px all-round
      // padding, so the icon left-edges form a clean vertical column.
      padding: '10px',
      transition:
        'background-color 200ms ease, box-shadow 200ms ease, color 200ms ease',
      animationDelay: `${index * 30}ms`,
      backgroundColor:
        activeTab === id
          ? '#10b981'
          : hoveredItem === id
            ? 'rgba(16,185,129,0.15)'
            : 'transparent',
      color:
        activeTab === id
          ? '#ffffff'
          : hoveredItem === id
            ? '#6ee7b7'
            : '#94a3b8',
      boxShadow: activeTab === id ? '0 4px 14px rgba(16,185,129,0.35)' : 'none',
    }),

    // ── Font Awesome icon inside each nav item ────────────────────────────
    // [FIX 3] width/minWidth bumped from 20px → 36px to match the logo icon
    // badge (also 36px). Both now have the same bounding-box width, so their
    // optical centres land at the same x-position (LEFT_PAD + 18px) and the
    // logo and all tab icons are perfectly column-aligned.
    // marginRight stays 10px and never changes (no jump on collapse).
    navIcon: {
      width: '20px', // [FIX 3] was 20px – now matches logoIcon width
      minWidth: '20px', // [FIX 3] was 20px
      textAlign: 'center',
      fontSize: '1rem',
      flexShrink: 0,
      marginRight: '10px',
    },

    // ── Nav label text ─────────────────────────────────────────────────────
    // Same max-width slide technique as logoText.
    // When maxWidth collapses to 0 the label disappears but the icon is
    // unaffected because it has fixed width + fixed marginRight.
    navLabel: {
      fontSize: '0.875rem',
      fontWeight: 500,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      maxWidth: isLargeScreen && sidebarCollapsed ? '0' : '160px',
      opacity: isLargeScreen && sidebarCollapsed ? 0 : 1,
      transition: 'max-width 300ms ease, opacity 300ms ease',
    },

    // ── Tooltip (collapsed desktop only) ──────────────────────────────────
    // Floats to the right of the icon when the sidebar is in icon-only mode.
    // pointerEvents:none prevents the tooltip from triggering mouse-leave on the <li>.
    tooltip: {
      position: 'absolute',
      left: 'calc(100% + 10px)',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 50,
      backgroundColor: '#1e293b',
      border: '1px solid #334155',
      color: '#ffffff',
      fontSize: '0.8125rem',
      padding: '6px 10px',
      borderRadius: '8px',
      whiteSpace: 'nowrap',
      boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
      pointerEvents: 'none',
    },

    // ── Tooltip arrow (left-pointing triangle) ────────────────────────────
    // CSS border trick: zero-size element with only the right border coloured.
    tooltipArrow: {
      position: 'absolute',
      top: '50%',
      right: '100%',
      transform: 'translateY(-50%)',
      width: 0,
      height: 0,
      borderTop: '4px solid transparent',
      borderBottom: '4px solid transparent',
      borderRight: '4px solid #1e293b',
    },
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Mobile overlay backdrop ─────────────────────────────────────────
          Rendered only on small screens when the drawer is open.
          Clicking it closes the sidebar.
      ──────────────────────────────────────────────────────────────────────── */}
      {sidebarOpen && !isLargeScreen && (
        <div style={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar panel ──────────────────────────────────────────────────── */}
      <div style={styles.sidebar}>
        {/* [FIX 6] Keyframe for the collapse button delayed fade-in.
            Injected here (scoped to sidebar render) so it only exists when
            the sidebar is mounted. The animation name is specific enough to
            avoid collisions with other components' keyframes. */}
        <style>{`
          @keyframes collapseButtonFadeIn {
            from { opacity: 0; transform: scale(0.8); }
            to   { opacity: 1; transform: scale(1); }
          }
        `}</style>

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div style={styles.header}>
          {/* Logo button
              [CHANGE 3] Dual-mode click:
                collapsed → setSidebarCollapsed(false)  expand the rail
                expanded  → setActiveTab('overview')    go back to overview
              title attribute provides a tooltip hint for each mode.
              onMouseEnter/Leave directly set element opacity (simpler than state
              for a one-property effect that only needs to avoid a full re-render). */}
          <div style={styles.logoArea}>
            <button
              style={styles.logoBtn}
              onClick={() => {
                if (sidebarCollapsed) {
                  // [CHANGE 3a] Icon-only mode → expand sidebar
                  setSidebarCollapsed(false);
                } else {
                  // [FIX 2] was setActiveTab('overview') – hardcoded string that
                  // only works if the first menu item's id is literally 'overview'.
                  // Now uses menuItems[0]?.id so it always navigates to whatever
                  // the actual first/dashboard item is, making it go active (green).
                  setActiveTab(menuItems[0]?.id);
                }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.75';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              title={sidebarCollapsed ? 'Expand sidebar' : 'Go to Overview'}
            >
              {/* [CHANGE 1] Logo icon – left edge sits at LEFT_PAD (14px).
                  minWidth:32px ensures it never shrinks during the width transition.
                  This is the reference anchor for all icon alignment. */}
              <div style={styles.logoIcon}>
                <i
                  className="fas fa-receipt"
                  // [FIX 1] was 0.875rem – smaller than nav icons (1rem).
                  // Now matches navIcon fontSize exactly so the receipt icon
                  // has the same visual weight as every tab icon.
                  style={{ fontSize: '1rem', color: 'white' }}
                />
              </div>

              {/* Brand text – slides out when collapsed, in when expanded */}
              <span style={styles.logoText}>CHALAYO</span>
            </button>
          </div>

          {/* ── Collapse button (desktop, expanded only) ──────────────────────
              [CHANGE 4] Only shown when the sidebar is currently expanded.
              In collapsed mode there is no button here; the logo itself acts
              as the expand trigger (see [CHANGE 3a] above).

              [FIX 6] The button was appearing instantly (at t=0ms) while the
              sidebar width animation takes 300ms, making it pop in awkwardly
              before the panel had finished opening.
              Fix: animate opacity from 0 → 1 with a 200ms delay so the button
              only becomes visible near the END of the width transition, giving
              a smooth "settle-in" feel instead of a jarring instant pop.
              animationFillMode:'both' keeps it invisible (opacity:0) during
              the delay period so there is no flash before the fade starts.
          ──────────────────────────────────────────────────────────────────── */}
          {isLargeScreen && !sidebarCollapsed && (
            <button
              style={{
                ...styles.iconBtn('collapse'),
                // [FIX 6] fade in after the width animation has mostly finished.
                // delay 200ms → button invisible while sidebar is still opening,
                // then fades in over 150ms as the panel reaches full width.
                animation: 'collapseButtonFadeIn 150ms ease 200ms both',
              }}
              onMouseEnter={() => setHoveredBtn('collapse')}
              onMouseLeave={() => setHoveredBtn(null)}
              onClick={() => setSidebarCollapsed(true)}
              title="Collapse sidebar"
            >
              {/* Double left-chevron « – signals "collapse left" */}
              <svg
                height="18"
                width="18"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* ── Close button (mobile drawer only) ─────────────────────────── */}
          {!isLargeScreen && (
            <button
              style={styles.iconBtn('close')}
              onMouseEnter={() => setHoveredBtn('close')}
              onMouseLeave={() => setHoveredBtn(null)}
              onClick={() => setSidebarOpen(false)}
              title="Close menu"
            >
              <svg
                height="18"
                width="18"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* ── Navigation list ──────────────────────────────────────────────
            [CHANGE 1+2] Each item now has consistent left padding (LEFT_PAD)
            and the icon always has marginRight:10px. The icon NEVER moves.
            Only the label (navLabel) animates in/out.
        ─────────────────────────────────────────────────────────────────── */}
        <ul style={styles.nav}>
          {menuItems.map((item, index) => (
            <li
              key={item.id}
              style={styles.navItem(item.id, index)}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false); // close mobile drawer; no-op on desktop
              }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* [CHANGE 2] Nav icon – left edge always at LEFT_PAD, never jumps.
                  marginRight:10px is fixed regardless of collapsed state. */}
              <i className={`fas ${item.icon}`} style={styles.navIcon} />

              {/* Label – fades and slides to width 0 when collapsed.
                  Because the icon has fixed width + fixed margin, the icon
                  position is completely unaffected by the label's animation. */}
              <span style={styles.navLabel}>{item.label}</span>

              {/* Tooltip – shown when collapsed + hovered on desktop only.
                  pointerEvents:none prevents hover-flicker caused by the tooltip
                  itself triggering onMouseLeave on the parent <li>. */}
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
