import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA
// Defined outside the component so they are not re-created on every render.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * statCards – the four KPI tiles at the top of the left column.
 *
 * Each entry drives:
 *   bg        → CSS gradient applied as the card's background
 *   iconBg    → solid fill for the icon badge (top-right of card)
 *   textColor → kept for potential future use (e.g. value colouring)
 *
 * Tailwind → plain-CSS colour mapping used here:
 *   emerald-50/100  → #ecfdf5 / #d1fae5   emerald-500 → #10b981   emerald-600 → #059669
 *   rose-50/100     → #fff1f2 / #ffe4e6   rose-500    → #f43f5e   rose-600    → #e11d48
 *   blue-50/100     → #eff6ff / #dbeafe   blue-500    → #3b82f6   blue-600    → #2563eb
 *   amber-50/100    → #fffbeb / #fef3c7   amber-500   → #f59e0b   amber-600   → #d97706
 */
const statCards = [
  {
    label: 'To Receive',
    value: '0',
    icon: 'fa-arrow-down',
    bg: 'linear-gradient(135deg, #ecfdf5, #d1fae5)', // emerald-50 → emerald-100
    iconBg: '#10b981', // emerald-500
    textColor: '#059669', // emerald-600
  },
  {
    label: 'To Give',
    value: '0',
    icon: 'fa-arrow-up',
    bg: 'linear-gradient(135deg, #fff1f2, #ffe4e6)', // rose-50 → rose-100
    iconBg: '#f43f5e', // rose-500
    textColor: '#e11d48', // rose-600
  },
  {
    label: 'Sales',
    value: '0',
    icon: 'fa-cart-shopping',
    bg: 'linear-gradient(135deg, #eff6ff, #dbeafe)', // blue-50 → blue-100
    iconBg: '#3b82f6', // blue-500
    textColor: '#2563eb', // blue-600
  },
  {
    label: 'Expense',
    value: '0',
    icon: 'fa-wallet',
    bg: 'linear-gradient(135deg, #fffbeb, #fef3c7)', // amber-50 → amber-100
    iconBg: '#f59e0b', // amber-500
    textColor: '#d97706', // amber-600
  },
];

/**
 * quickActions – buttons rendered in a 2×2 grid inside the Quick Actions card.
 * The first item (primary: true) gets the green accent style; the rest are neutral.
 */
const quickActions = [
  { label: 'Add Product', icon: 'fa-plus', primary: true },
  { label: 'View Stock', icon: 'fa-box' },
  { label: 'Categories', icon: 'fa-tags' },
  { label: 'Analytics', icon: 'fa-chart-line' },
];

/**
 * summaryItems – the three rows in "Today's Summary".
 * colour uses plain hex instead of Tailwind text-color utilities:
 *   text-emerald-600 → #059669
 *   text-rose-600    → #e11d48
 */
const summaryItems = [
  { label: 'Revenue', value: '$4,850', color: '#059669' },
  { label: 'Expenses', value: '$1,230', color: '#e11d48' },
  { label: 'Profit', value: '$3,620', color: '#059669' },
];

// Day labels for the bar-chart x-axis (Mon – Sun abbreviated)
const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

// Bar heights expressed as percentages of the 192 px chart container.
// These are placeholder/mock values — replace with real data from your API.
const incomeHeights = [80, 70, 90, 75, 85, 65, 50];
const expenseHeights = [40, 45, 35, 50, 30, 55, 40];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Overview
 *
 * The main dashboard view rendered when the "Overview" nav item is active.
 * Layout: a two-column CSS grid (single column on mobile, 2fr+1fr on ≥1024 px).
 *   Left  column → KPI stats, bar chart, recent-bills table
 *   Right column → quick actions, today's summary, recent activity feed
 *
 * All styling is done with inline style objects (no Tailwind).
 * Responsive breakpoints are injected via a <style> tag because CSS media
 * queries cannot be expressed as inline styles.
 */
export default function Overview() {
  // Track which quick-action button the cursor is over so we can swap its
  // background colour on hover (replaces Tailwind's hover: variants).
  const [hoveredAction, setHoveredAction] = React.useState(null);

  return (
    // ── Outer scroll container ──────────────────────────────────────────────
    // flex:1 lets this fill remaining height inside a flex parent.
    // scrollbarWidth:'thin' is the CSS Scrollbar Styling API (Firefox + Chrome).
    // Equivalent to the custom `.thin-scrollbar` utility class from Tailwind.
    <div
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px', // md:p-6 → bumped to 24 px via media query below
        scrollbarWidth: 'thin',
      }}
    >
      {/* ── Injected global styles ────────────────────────────────────────────
          Because inline styles cannot express:
            • @keyframes animations
            • :hover pseudo-class on gradient backgrounds
            • CSS media queries for responsive layout
          we inject a <style> block. All class names used are scoped to this
          component's elements to avoid collisions.
      ──────────────────────────────────────────────────────────────────────── */}
      <style>{`
        /* Slide-in animation for stat cards.
           Replaces Tailwind's 'animate-slideInLeft' custom utility.
           'both' fill-mode means the element starts in the 'from' state
           before the animation fires (respects animationDelay). */
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .stat-card { animation: slideInLeft 400ms ease both; }

        /* Elevated shadow on stat-card hover.
           !important overrides the inline boxShadow set during normal state. */
        .stat-card:hover { box-shadow: 0 20px 40px rgba(0,0,0,0.12) !important; }

        /* Bar chart bar colours + hover darkening.
           Gradients cannot be transitioned smoothly in CSS, so we swap the
           entire gradient on :hover instead.
           emerald: #34d399 (emerald-400) → #10b981 (emerald-500)
           rose:    #fb7185 (rose-400)    → #f43f5e (rose-500)     */
        .bar-income  { background: linear-gradient(to top, #34d399, #10b981); }
        .bar-income:hover  { background: linear-gradient(to top, #10b981, #059669); }
        .bar-expense { background: linear-gradient(to top, #fb7185, #f43f5e); }
        .bar-expense:hover { background: linear-gradient(to top, #f43f5e, #e11d48); }

        /* Emerald focus ring for text inputs and selects.
           Replaces Tailwind's focus:ring-2 focus:ring-emerald-500. */
        input:focus, select:focus {
          outline: none;
          box-shadow: 0 0 0 2px #10b981;
        }

        /* Responsive: on ≥768 px increase outer padding (md:p-6) and stat-grid gap (md:gap-4). */
        @media (min-width: 768px) {
          .overview-padding { padding: 24px !important; }
          .stats-grid       { gap: 16px !important; }
        }

        /* Responsive: on ≥1024 px switch the outer grid to 2-column layout (lg:grid-cols-3
           with col-span-2 on the left → approximated as 2fr 1fr). */
        @media (min-width: 1024px) {
          .overview-grid { grid-template-columns: 2fr 1fr !important; }
        }
      `}</style>

      {/* ── Two-column outer grid ──────────────────────────────────────────────
          Default: single column (mobile).
          ≥1024 px: 2fr left + 1fr right (injected media query above).
      ──────────────────────────────────────────────────────────────────────── */}
      <div
        className="overview-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr', // overridden to '2fr 1fr' at lg breakpoint
          gap: '24px',
        }}
      >
        {/* ════════════════════════════════════════════════════════════════════
            LEFT COLUMN  (lg:col-span-2)
            Contains: KPI stat cards · bar chart · recent bills table
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* ── KPI Stat Cards (2×2 grid) ──────────────────────────────────────
              Each card shows a metric label, a coloured icon badge, and a value.
              `.stats-grid` gets gap bumped from 12 → 16 px at md breakpoint.
          ─────────────────────────────────────────────────────────────────── */}
          <div
            className="stats-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr', // always 2 columns (col-2 grid)
              gap: '12px', // → 16 px at ≥768 px via media query
            }}
          >
            {statCards.map((stat, index) => (
              <div
                key={stat.label}
                className="stat-card" // triggers slideInLeft animation + hover shadow
                style={{
                  background: stat.bg, // per-card gradient
                  borderRadius: '16px', // rounded-2xl
                  padding: '16px', // p-4
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)', // shadow-sm
                  transition: 'box-shadow 300ms ease',
                  animationDelay: `${index * 100}ms`, // stagger entrance by 100 ms per card
                }}
              >
                {/* Card header: label (left) + icon badge (right) */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: '#475569',
                      margin: 0,
                    }}
                  >
                    {stat.label}
                  </p>

                  {/* Coloured icon badge – rounded square with drop shadow */}
                  <div
                    style={{
                      height: '32px',
                      width: '32px',
                      backgroundColor: stat.iconBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '12px', // rounded-xl
                      boxShadow: '0 4px 8px rgba(0,0,0,0.15)', // shadow-lg
                    }}
                  >
                    <i
                      className={`fas ${stat.icon}`}
                      style={{ fontSize: '0.75rem', color: 'white' }}
                    />
                  </div>
                </div>

                {/* Metric value – large bold number */}
                <h3
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    margin: 0,
                  }}
                >
                  {stat.value}
                </h3>
              </div>
            ))}
          </div>

          {/* ── Income vs Expense Bar Chart ─────────────────────────────────────
              A simple custom bar chart – no charting library needed.
              Each day column contains two bars side-by-side (income + expense).
              Bar heights are percentage-based within the 192 px tall container.
          ─────────────────────────────────────────────────────────────────── */}
          <div
            style={{
              borderRadius: '16px',
              border: '1px solid #e2e8f0', // border-slate-200
              backgroundColor: '#ffffff',
              padding: '24px', // p-6
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            {/* Chart header: title + time-range dropdown */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
              }}
            >
              <h3
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  margin: 0,
                }}
              >
                Income vs Expense
              </h3>

              {/* Time-range selector – focus ring applied via injected CSS */}
              <select
                style={{
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1', // border-slate-300
                  padding: '8px 12px',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div>

            {/* Bar chart area – flex row, bars grow from the bottom (align-items: flex-end) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end', // bars "stand" on the baseline
                gap: '8px',
                height: '192px', // h-48 – fixed height so % bars are meaningful
              }}
            >
              {days.map((day, idx) => (
                // One column per day: contains the bar pair + the day label below
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    height: '100%',
                    justifyContent: 'flex-end',
                  }}
                >
                  {/* Bar pair wrapper – keeps the two bars side-by-side and bottom-aligned */}
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'center',
                      gap: '4px',
                      alignItems: 'flex-end',
                      flex: 1, // fills the available height so percentage heights work
                    }}
                  >
                    {/* Income bar – green gradient, darkens on hover via CSS class */}
                    <div
                      className="bar-income"
                      style={{
                        width: '12px',
                        borderRadius: '4px 4px 0 0', // rounded top corners only
                        height: `${incomeHeights[idx]}%`,
                        transition: 'height 500ms ease',
                      }}
                    />

                    {/* Expense bar – red/rose gradient, darkens on hover via CSS class */}
                    <div
                      className="bar-expense"
                      style={{
                        width: '12px',
                        borderRadius: '4px 4px 0 0',
                        height: `${expenseHeights[idx]}%`,
                        transition: 'height 500ms ease',
                      }}
                    />
                  </div>

                  {/* Day label below the bars (M T W …) */}
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: '#64748b',
                    }}
                  >
                    {day}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend – Income (green dot) and Expense (red dot) */}
            <div
              style={{
                marginTop: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '24px',
                borderTop: '1px solid #e2e8f0',
                paddingTop: '16px',
              }}
            >
              {[
                { label: 'Income', color: '#10b981' }, // emerald-500
                { label: 'Expense', color: '#f43f5e' }, // rose-500
              ].map((legend) => (
                <div
                  key={legend.label}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  {/* Colour dot */}
                  <div
                    style={{
                      height: '12px',
                      width: '12px',
                      borderRadius: '50%',
                      backgroundColor: legend.color,
                    }}
                  />
                  <span style={{ fontSize: '0.875rem', color: '#475569' }}>
                    {legend.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Recent Bills Table ──────────────────────────────────────────────
              Horizontally scrollable so narrow viewports don't break the layout.
              Empty state is a single full-width row with a centred message.
          ─────────────────────────────────────────────────────────────────── */}
          <div
            style={{
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#ffffff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              overflow: 'hidden', // clips child elements to the rounded corners
            }}
          >
            {/* Table header row: title + search + view-all link */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #e2e8f0',
                padding: '16px',
              }}
            >
              <h3
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  margin: 0,
                }}
              >
                Recent Bills
              </h3>

              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {/* Search field with absolutely-positioned icon overlay */}
                <div style={{ position: 'relative' }}>
                  {/* The search icon sits inside the input's left padding area */}
                  <i
                    className="fas fa-search"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '12px',
                      transform: 'translateY(-50%)',
                      fontSize: '0.875rem',
                      color: '#94a3b8', // slate-400
                    }}
                  />
                  {/* pl-9 (36 px) leaves room for the icon without text overlap */}
                  <input
                    type="text"
                    placeholder="Search..."
                    style={{
                      width: '160px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      padding: '8px 12px 8px 36px', // pr-3 pl-9 py-2
                      fontSize: '0.875rem',
                    }}
                  />
                </div>

                {/* View All – plain text button, no background */}
                <button
                  style={{
                    padding: '8px 12px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#059669', // emerald-600
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  View All
                </button>
              </div>
            </div>

            {/* Scrollable table wrapper */}
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  fontSize: '0.875rem',
                  borderCollapse: 'collapse',
                }}
              >
                {/* Column headers – slate-50 background, slate-600 text */}
                <thead style={{ backgroundColor: '#f8fafc' }}>
                  <tr>
                    {[
                      'Date',
                      'Type',
                      'Name',
                      'Total',
                      'Rec/Paid',
                      'Balance',
                    ].map((col) => (
                      <th
                        key={col}
                        style={{
                          padding: '12px 16px',
                          textAlign: 'left',
                          fontWeight: 600,
                          color: '#475569', // slate-600
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Body – shows empty-state message until real rows are passed in */}
                <tbody>
                  <tr>
                    <td
                      colSpan={6}
                      style={{
                        padding: '32px',
                        textAlign: 'center',
                        color: '#64748b',
                      }}
                    >
                      No recent bills to display
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            RIGHT COLUMN  (lg:col-span-1 / 1fr)
            Contains: quick actions · today's summary · recent activity feed
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* ── Quick Actions 2×2 Grid ──────────────────────────────────────────
              Primary button (Add Product) uses the emerald accent colour.
              All others use a neutral slate background.
              Hover colour is driven by `hoveredAction` state (replaces hover: classes).
          ─────────────────────────────────────────────────────────────────── */}
          <div
            style={{
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#ffffff',
              padding: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <h4
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#0f172a',
                margin: '0 0 12px',
              }}
            >
              Quick Actions
            </h4>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
              }}
            >
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  // onMouseEnter/Leave update hoveredAction state, driving the
                  // conditional backgroundColor below (replaces hover: Tailwind classes).
                  onMouseEnter={() => setHoveredAction(action.label)}
                  onMouseLeave={() => setHoveredAction(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    border: 'none',
                    cursor: 'pointer',
                    transition:
                      'background-color 200ms ease, box-shadow 200ms ease',
                    // Primary: emerald; secondary: slate-100. Both darken on hover.
                    backgroundColor: action.primary
                      ? hoveredAction === action.label
                        ? '#059669'
                        : '#10b981'
                      : hoveredAction === action.label
                        ? '#e2e8f0'
                        : '#f1f5f9',
                    color: action.primary ? '#ffffff' : '#334155', // slate-700
                    // Green glow only for the primary action (shadow-emerald-500/30)
                    boxShadow: action.primary
                      ? '0 4px 12px rgba(16,185,129,0.3)'
                      : 'none',
                  }}
                >
                  <i className={`fas ${action.icon}`} />
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Today's Summary ─────────────────────────────────────────────────
              Three rows (Revenue / Expenses / Profit) with right-aligned values.
              The "+12%" badge is a pill-shaped span (border-radius: 9999 px).
          ─────────────────────────────────────────────────────────────────── */}
          <div
            style={{
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#ffffff',
              padding: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            {/* Card header: title + percentage badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <h4
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  margin: 0,
                }}
              >
                Today's Summary
              </h4>

              {/* Pill badge – rounded-full bg-emerald-50 text-emerald-600 */}
              <span
                style={{
                  borderRadius: '9999px',
                  backgroundColor: '#ecfdf5', // emerald-50
                  padding: '4px 8px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#059669', // emerald-600
                }}
              >
                +12%
              </span>
            </div>

            {/* Metric rows – label on left, coloured value on right */}
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              {summaryItems.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '0.875rem', color: '#475569' }}>
                    {item.label}
                  </span>
                  {/* Value is coloured per item (green = positive, red = negative) */}
                  <span
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: item.color,
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Recent Activity Feed ────────────────────────────────────────────
              A live-updating list of events (empty state shown for now).
              The "Live" badge uses a soft green pill to signal real-time data.
          ─────────────────────────────────────────────────────────────────── */}
          <div
            style={{
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#ffffff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            {/* Card header: title + "Live" badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #e2e8f0',
                padding: '16px',
              }}
            >
              <h3
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  margin: 0,
                }}
              >
                Recent Activity
              </h3>

              {/* "Live" indicator pill – emerald-100 bg, emerald-800 text for contrast */}
              <span
                style={{
                  borderRadius: '9999px',
                  backgroundColor: '#d1fae5', // emerald-100
                  padding: '4px 8px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: '#065f46', // emerald-800
                }}
              >
                Live
              </span>
            </div>

            {/* Empty state – replace with a mapped list of activity items later */}
            <div
              style={{
                padding: '16px',
                textAlign: 'center',
                fontSize: '0.875rem',
                color: '#64748b', // slate-500
              }}
            >
              No recent activity
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
