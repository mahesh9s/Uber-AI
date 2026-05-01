// Uber Door-to-Door — 9 screens

const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  blue: '#276EF1',
  orange: '#E87722',
  green: '#05A357',
  amber: '#FF6D00',
  gray50: '#F6F6F6',
  gray100: '#EEEEEE',
  gray200: '#E2E2E2',
  gray400: '#9B9B9B',
  gray500: '#6B6B6B',
  gray700: '#3D3D3D',
  amberBg: '#FFF4E5',
  amberBorder: '#FFB366',
  greenBg: '#E6F7EF',
};

const FONT = "'DM Sans', -apple-system, 'Segoe UI', system-ui, sans-serif";

// ─────────────────────────────────────────────────────────────
// Mock Calendar Data
// ─────────────────────────────────────────────────────────────
const MOCK_CALENDAR_EVENTS = {
  flights: [
    { type: 'flight', airline: 'British Airways', number: 'BA178', date: 'May 8', time: '11:00 AM', from: 'JFK', to: 'LHR', detected: true, source: 'British Airways' },
    { type: 'flight', airline: 'British Airways', number: 'BA177', date: 'May 12', time: '6:30 PM', from: 'LHR', to: 'JFK', detected: true, source: 'British Airways' },
  ],
  hotel: {
    type: 'hotel',
    name: 'The Hoxton, Holborn',
    checkIn: 'May 8',
    checkOut: 'May 12',
    address: '199-206 High Holborn, London WC1V 7BD',
    detected: true,
    source: 'Booking.com',
  },
  activities: [
    { type: 'activity', title: 'Tower of London', date: 'May 9', time: '10:00 AM', location: 'Tower Hill, London EC3N 4AB', detected: true, source: 'Viator' },
    { type: 'activity', title: 'The London Eye', date: 'May 10', time: '2:30 PM', location: 'Riverside Building, London SE1 7PB', detected: true, source: 'Viator' },
    { type: 'activity', title: 'Dinner — Dishoom Covent Garden', date: 'May 9', time: '7:30 PM', location: '12 Upper St Martin\'s Lane, London WC2H 9FB', detected: true, source: 'OpenTable' },
  ],
};

// ─────────────────────────────────────────────────────────────
// Shared primitives
// ─────────────────────────────────────────────────────────────
function ScreenShell({ children, bg = '#fff', stickyBottom = null }) {
  return (
    <div style={{ width: '100%', height: '100%', background: bg, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        {children}
      </div>
      {stickyBottom && (
        <div style={{ flexShrink: 0, background: '#fff', borderTop: `0.5px solid ${COLORS.gray200}`, padding: '14px 20px 26px' }}>
          {stickyBottom}
        </div>
      )}
    </div>
  );
}

function BlackButton({ children, onClick, style = {} }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', background: COLORS.black, color: '#fff', border: 'none',
      borderRadius: 14, padding: '17px 20px', fontFamily: FONT, fontSize: 16,
      fontWeight: 700, cursor: 'pointer', letterSpacing: -0.2,
      ...style,
    }}>{children}</button>
  );
}

function GhostText({ children, onClick, style = {} }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', background: 'transparent', color: COLORS.black, border: 'none',
      padding: '14px 20px', fontFamily: FONT, fontSize: 15, fontWeight: 600,
      cursor: 'pointer', letterSpacing: -0.1, ...style,
    }}>{children}</button>
  );
}

function BackArrow({ onClick, dark = false }) {
  return (
    <button onClick={onClick} style={{
      width: 40, height: 40, borderRadius: 20, background: dark ? 'rgba(255,255,255,0.14)' : '#fff',
      border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', boxShadow: dark ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
    }}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M11 4L6 9l5 5" stroke={dark ? '#fff' : '#000'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Calendar Scanning — Loading state during calendar connection
// ─────────────────────────────────────────────────────────────
function CalendarScanning({ go }) {
  const [stage, setStage] = React.useState(0);
  const stages = [
    'Looking for flights...',
    'Finding accommodations...',
    'Detecting meetings...',
    'Building your trip...',
  ];

  React.useEffect(() => {
    const timer = setTimeout(() => go(), 3000);
    const stageTimer = setInterval(() => {
      setStage(s => (s + 1) % stages.length);
    }, 600);
    return () => { clearTimeout(timer); clearInterval(stageTimer); };
  }, [go]);

  return (
    <div style={{
      width: '100%', height: '100%', background: '#000', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontFamily: FONT, gap: 24, padding: '20px',
    }}>
      <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.6 }}>
        Scanning your calendar
      </div>

      {/* Animated scanning indicator */}
      <div style={{ position: 'relative', width: 60, height: 60 }}>
        <svg width="60" height="60" viewBox="0 0 60 60" style={{ position: 'absolute' }}>
          <circle cx="30" cy="30" r="25" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
          <circle cx="30" cy="30" r="25" fill="none" stroke="#E87722" strokeWidth="2"
            strokeDasharray="157" strokeDashoffset="0"
            style={{ animation: 'rotate 2s linear infinite', transformOrigin: '30px 30px' }}/>
        </svg>
      </div>

      {/* Stage text */}
      <div style={{ fontSize: 14, color: '#A8A8A8', minHeight: 20 }}>
        {stages[stage]}
      </div>

      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 2a — Calendar Events Preview
// ─────────────────────────────────────────────────────────────
function Screen2EventsPreview({ go, calendarSource = 'Gmail' }) {
  const allEvents = [
    ...MOCK_CALENDAR_EVENTS.flights,
    MOCK_CALENDAR_EVENTS.hotel,
    ...(MOCK_CALENDAR_EVENTS.activities || MOCK_CALENDAR_EVENTS.meetings || []),
  ].sort((a, b) => {
    const dateOrder = { 'May 8': 0, 'May 9': 1, 'May 10': 2, 'May 11': 3, 'May 12': 4 };
    const dateA = dateOrder[a.date] ?? 0;
    const dateB = dateOrder[b.date] ?? 0;
    return dateA - dateB;
  });

  const sourceLabel = calendarSource === 'outlook' ? 'Outlook' : 'Gmail';

  return (
    <ScreenShell stickyBottom={<BlackButton onClick={go}>Looks good? Continue →</BlackButton>}>
      <div style={{ padding: '58px 20px 0' }}>
        <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 800, letterSpacing: -0.6, marginBottom: 8 }}>
          Calendar events detected
        </div>
        <div style={{ fontFamily: FONT, fontSize: 14, color: COLORS.gray500, marginBottom: 20 }}>
          {allEvents.length} events found via {sourceLabel} Calendar
        </div>
      </div>

      {/* Timeline of events */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {allEvents.map((event, i) => {
          if (event.type === 'flight') {
            return (
              <div key={i} style={{
                background: '#fff', border: `1px solid ${COLORS.gray200}`, borderRadius: 12,
                padding: 14, display: 'flex', gap: 12, alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 8, background: COLORS.orange, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 2l2.3 6.2h6.5l-5.2 4 2 6.3-6-4.6-6 4.6 2-6.3-5.2-4h6.5L12 2z" fill="#fff"/></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700 }}>
                    {event.airline}
                  </div>
                  <div style={{ fontFamily: FONT, fontSize: 12, color: COLORS.gray500, marginTop: 2 }}>
                    {event.number} • {event.from} → {event.to} • {event.date}, {event.time}
                  </div>
                  <div style={{ marginTop: 6, display: 'inline-block', background: COLORS.green, color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>
                    ✓ Flight Detected
                  </div>
                </div>
              </div>
            );
          } else if (event.type === 'hotel') {
            return (
              <div key={i} style={{
                background: '#fff', border: `1px solid ${COLORS.gray200}`, borderRadius: 12,
                padding: 14, display: 'flex', gap: 12, alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 8, background: COLORS.green, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24"><path d="M5 11V9h2V7c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v2h2v2m0 7v2h2v2h-2v1h-2v-1H7v1H5v-1H3v-2h2v-2m2-3h10v6H7z" fill="#fff"/></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700 }}>
                    {event.name}
                  </div>
                  <div style={{ fontFamily: FONT, fontSize: 12, color: COLORS.gray500, marginTop: 2 }}>
                    {event.checkIn} - {event.checkOut} • {event.address}
                  </div>
                  <div style={{ marginTop: 6, display: 'inline-block', background: COLORS.green, color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>
                    ✓ Hotel Found
                  </div>
                </div>
              </div>
            );
          } else if (event.type === 'meeting') {
            return (
              <div key={i} style={{
                background: '#fff', border: `1px solid ${COLORS.gray200}`, borderRadius: 12,
                padding: 14, display: 'flex', gap: 12, alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 8, background: COLORS.blue, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" fill="#fff"/></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700 }}>
                    {event.title}
                  </div>
                  <div style={{ fontFamily: FONT, fontSize: 12, color: COLORS.gray500, marginTop: 2 }}>
                    {event.date}, {event.time} • {event.location}
                  </div>
                  <div style={{ marginTop: 6, display: 'inline-block', background: COLORS.green, color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>
                    ✓ Meeting Detected
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ background: COLORS.gray50, borderRadius: 12, padding: '14px 16px', fontFamily: FONT, fontSize: 12.5, color: COLORS.gray700, lineHeight: 1.45 }}>
          Uber AI extracted these events from your calendar to build your ground transportation plan.
        </div>
      </div>
    </ScreenShell>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 1 — Activate Uber for Business
// ─────────────────────────────────────────────────────────────
function Screen1({ go }) {
  return (
    <ScreenShell>
      <div style={{ padding: '58px 24px 12px', fontFamily: FONT, fontSize: 26, fontWeight: 800, letterSpacing: -0.6 }}>Uber</div>

      <div style={{ padding: '12px 24px 20px' }}>
        <h1 style={{ fontFamily: FONT, fontSize: 28, fontWeight: 800, lineHeight: 1.12, letterSpacing: -0.7, margin: 0, textWrap: 'balance' }}>
          Alex, your Uber One just got smarter ✨
        </h1>
        <p style={{ fontFamily: FONT, fontSize: 15, lineHeight: 1.45, color: COLORS.gray700, margin: '14px 0 22px' }}>
          New Uber AI for members: connect your calendar and we'll detect upcoming trips, plan every ride door-to-door, and adapt in real time. Free with your subscription.
        </p>
        <button onClick={go} style={{
          background: COLORS.black, color: '#fff', border: 'none',
          borderRadius: 10, padding: '12px 18px', fontFamily: FONT, fontSize: 14,
          fontWeight: 700, cursor: 'pointer', letterSpacing: -0.1,
        }}>Try Uber AI →</button>
      </div>

      {/* Hero image */}
      <div style={{ position: 'relative', height: 270, background: '#000', overflow: 'hidden' }}>
        <img src="assets/uber-for-business-hero.jpg" alt="Uber for Business" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
      </div>

      <div style={{ padding: '28px 24px 20px' }}>
        {[
          { icon: 'receipt', title: 'Save on every ride', body: '10% off rides + free Eats delivery, all year' },
          { icon: 'mail', title: 'Auto-detect trips', body: 'Calendar sync finds flights, hotels, and reservations' },
          { icon: 'ai', title: 'AI travel planning', body: 'Door-to-door rides planned automatically — Uber One exclusive', isNew: true },
        ].map((f, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: i < 2 ? `0.5px solid ${COLORS.gray200}` : 'none' }}>
            <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 8, background: COLORS.gray50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {f.icon === 'receipt' && <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 2h12v16l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5V2z" stroke="#000" strokeWidth="1.5" strokeLinejoin="round"/><path d="M7 7h6M7 10h6M7 13h4" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/></svg>}
              {f.icon === 'mail' && <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="1.5" stroke="#000" strokeWidth="1.5"/><path d="M2 5l8 6 8-6" stroke="#000" strokeWidth="1.5"/></svg>}
              {f.icon === 'ai' && <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4z" fill="#000"/><circle cx="16" cy="4" r="1.5" fill="#000"/></svg>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, letterSpacing: -0.2 }}>{f.title}</div>
                {f.isNew && <span style={{ background: COLORS.green, color: '#fff', fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 4, letterSpacing: 0.5 }}>NEW</span>}
              </div>
              <div style={{ fontFamily: FONT, fontSize: 13, color: COLORS.gray500, marginTop: 2 }}>{f.body}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '4px 24px 24px' }}>
      </div>
    </ScreenShell>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 2 — Connect Calendar (Simplified with tiered entry)
// ─────────────────────────────────────────────────────────────
function Screen2({ go, back, skip, goToPermission, goToOAuth }) {
  return (
    <ScreenShell stickyBottom={
      <>
        <BlackButton onClick={() => goToPermission ? goToPermission() : go()}>
          Allow calendar access →
        </BlackButton>
        <button onClick={() => goToOAuth && goToOAuth()} style={{
          width: '100%', background: 'transparent', border: 'none',
          padding: '14px 20px 0', fontFamily: FONT, fontSize: 13.5,
          color: COLORS.gray500, cursor: 'pointer', textAlign: 'center',
          textDecoration: 'underline', textUnderlineOffset: 3,
        }}>
          Work calendar not on this device? Connect manually
        </button>
      </>
    }>
      <div style={{ padding: '58px 20px 0' }}>
        <BackArrow onClick={back}/>
      </div>

      {/* Hero icon */}
      <div style={{ padding: '28px 24px 4px', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: 88, height: 88, borderRadius: 24, background: COLORS.black,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="5" width="18" height="16" rx="2" stroke="#fff" strokeWidth="1.8"/>
            <path d="M3 9h18M8 3v4M16 3v4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
            <circle cx="17" cy="15" r="3" fill="#E87722"/>
            <path d="M15.5 15l1 1 2-2" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div style={{ padding: '24px 24px 12px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: FONT, fontSize: 28, fontWeight: 800, lineHeight: 1.12, letterSpacing: -0.7, margin: 0 }}>
          Connect your calendar
        </h1>
        <p style={{ fontFamily: FONT, fontSize: 14.5, lineHeight: 1.5, color: COLORS.gray500, margin: '12px 20px 0' }}>
          Uber AI reads your upcoming flights, hotels, and meetings to automatically build your complete door-to-door ground transport plan. Every ride, timed and ready — so you never have to worry about traffic delays or last-minute flight changes.
        </p>
      </div>

      {/* Privacy bullets */}
      <div style={{ padding: '28px 28px 12px' }}>
        {[
          { title: 'Read-only access', body: 'We only look for travel events. Never write or change anything.' },
          { title: 'Never stored', body: 'Events are processed in real-time and never saved to our servers.' },
          { title: 'Revoke anytime', body: 'Disconnect instantly in Settings whenever you want.' },
        ].map((f, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0' }}>
            <div style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 11, background: COLORS.greenBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
              <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l3 3 5-6" stroke={COLORS.green} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, letterSpacing: -0.2 }}>{f.title}</div>
              <div style={{ fontFamily: FONT, fontSize: 12.5, color: COLORS.gray500, marginTop: 2, lineHeight: 1.4 }}>{f.body}</div>
            </div>
          </div>
        ))}
      </div>
    </ScreenShell>
  );
}

// ─────────────────────────────────────────────────────────────
// Calendar Permission — Full-screen native permission page
// ─────────────────────────────────────────────────────────────
function CalendarPermission({ onAllow, onDeny, onSkip, back }) {
  const [denied, setDenied] = React.useState(false);

  if (denied) {
    return (
      <ScreenShell stickyBottom={
        <>
          <BlackButton onClick={onSkip}>Skip for now</BlackButton>
          <GhostText onClick={() => setDenied(false)} style={{ paddingBottom: 0 }}>
            Change my mind — allow access
          </GhostText>
        </>
      }>
        <div style={{ padding: '58px 20px 0' }}>
          <BackArrow onClick={back}/>
        </div>
        <div style={{ padding: '60px 28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: 72, height: 72, borderRadius: 36, background: COLORS.gray100,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke={COLORS.gray500} strokeWidth="1.8"/>
              <path d="M8 12h8" stroke={COLORS.gray500} strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 style={{ fontFamily: FONT, fontSize: 24, fontWeight: 800, letterSpacing: -0.5, margin: '20px 0 10px', textAlign: 'center' }}>
            Calendar access denied
          </h1>
          <p style={{ fontFamily: FONT, fontSize: 14, color: COLORS.gray500, textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
            Without calendar access, Uber AI can't auto-detect your trips. You can skip for now and add trips manually, or change your mind.
          </p>
        </div>
      </ScreenShell>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '70px 28px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        {/* App icon style */}
        <div style={{
          width: 78, height: 78, borderRadius: 18, background: COLORS.black,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 10px 28px rgba(0,0,0,0.18)', marginBottom: 20,
        }}>
          <span style={{ fontFamily: FONT, fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: -0.5 }}>Uber</span>
        </div>

        <h1 style={{ fontFamily: FONT, fontSize: 22, fontWeight: 800, letterSpacing: -0.4, margin: '4px 0 14px', lineHeight: 1.2 }}>
          "Uber" Would Like to Access Your Calendar
        </h1>

        {/* What we access / what we don't */}
        <div style={{ marginTop: 28, width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: COLORS.greenBg, borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 10, textAlign: 'left' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="9" cy="9" r="8" fill={COLORS.green}/>
              <path d="M5 9l2.5 2.5L13 6" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div style={{ fontFamily: FONT, fontSize: 12.5, color: '#065F46', fontWeight: 600, lineHeight: 1.45 }}>
              <strong>We will:</strong> read event titles, times, and locations to find travel plans
            </div>
          </div>
          <div style={{ background: COLORS.gray50, borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 10, textAlign: 'left' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="9" cy="9" r="8" fill={COLORS.gray400}/>
              <path d="M6 6l6 6M12 6l-6 6" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            </svg>
            <div style={{ fontFamily: FONT, fontSize: 12.5, color: COLORS.gray700, fontWeight: 600, lineHeight: 1.45 }}>
              <strong>We won't:</strong> store event data, share with third parties, or modify your calendar
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons — iOS-style native feel */}
      <div style={{ flexShrink: 0, borderTop: `0.5px solid ${COLORS.gray200}`, display: 'flex' }}>
        <button onClick={() => setDenied(true)} style={{
          flex: 1, padding: '18px 16px', background: '#fff', border: 'none',
          borderRight: `0.5px solid ${COLORS.gray200}`,
          fontFamily: FONT, fontSize: 16, fontWeight: 500, color: COLORS.black, cursor: 'pointer',
        }}>
          Don't Allow
        </button>
        <button onClick={onAllow} style={{
          flex: 1, padding: '18px 16px', background: '#fff', border: 'none',
          fontFamily: FONT, fontSize: 16, fontWeight: 800, color: COLORS.blue, cursor: 'pointer',
        }}>
          Allow
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Calendar OAuth — Escape hatch for cloud calendar users
// ─────────────────────────────────────────────────────────────
function CalendarOAuth({ go, back, goToScanning }) {
  const [selected, setSelected] = React.useState(null);
  const opts = [
    { title: 'Continue with Gmail', sub: 'Google Calendar · Google Workspace', icon: 'gmail', source: 'gmail' },
    { title: 'Continue with Outlook', sub: 'Microsoft 365 · Exchange Online', icon: 'outlook', source: 'outlook' },
    { title: 'Continue with iCloud', sub: 'Apple Calendar · iCloud.com', icon: 'icloud', source: 'icloud' },
  ];

  const handleContinue = () => {
    if (selected === null) return;
    if (goToScanning) goToScanning(opts[selected].source);
    else go();
  };

  return (
    <ScreenShell stickyBottom={
      <BlackButton
        onClick={handleContinue}
        style={{ opacity: selected === null ? 0.35 : 1, cursor: selected === null ? 'default' : 'pointer' }}
      >
        {selected === null ? 'Select a calendar' : `Sign in with ${opts[selected].title.replace('Continue with ', '')} →`}
      </BlackButton>
    }>
      <div style={{ padding: '58px 20px 0' }}>
        <BackArrow onClick={back}/>
      </div>
      <div style={{ padding: '18px 24px 8px' }}>
        <h1 style={{ fontFamily: FONT, fontSize: 26, fontWeight: 800, lineHeight: 1.15, letterSpacing: -0.6, margin: 0 }}>
          Connect your work calendar
        </h1>
        <p style={{ fontFamily: FONT, fontSize: 14, lineHeight: 1.5, color: COLORS.gray500, margin: '10px 0 22px' }}>
          Sign in to pull your work trips from the cloud — useful if your work calendar isn't synced to this device.
        </p>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {opts.map((o, i) => (
          <button key={i} onClick={() => setSelected(i)} style={{
            width: '100%', textAlign: 'left', background: '#fff',
            border: `${selected === i ? 2 : 1}px solid ${selected === i ? '#000' : COLORS.gray200}`,
            borderRadius: 14, padding: selected === i ? '15px' : '16px',
            display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
            fontFamily: FONT,
          }}>
            <OptIcon kind={o.icon}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.2 }}>{o.title}</div>
              <div style={{ fontSize: 12.5, color: COLORS.gray500, marginTop: 3 }}>{o.sub}</div>
            </div>
            <div style={{
              width: 22, height: 22, borderRadius: 11, flexShrink: 0,
              border: `2px solid ${selected === i ? '#000' : COLORS.gray200}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {selected === i && <div style={{ width: 10, height: 10, borderRadius: 5, background: '#000' }}/>}
            </div>
          </button>
        ))}
      </div>

      <div style={{ padding: '20px 20px 20px' }}>
        <div style={{ background: COLORS.gray50, borderRadius: 12, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
            <rect x="3" y="8" width="12" height="8" rx="1.5" stroke="#000" strokeWidth="1.5"/>
            <path d="M6 8V6a3 3 0 016 0v2" stroke="#000" strokeWidth="1.5"/>
          </svg>
          <div style={{ fontFamily: FONT, fontSize: 12.5, color: COLORS.gray700, lineHeight: 1.45 }}>
            Read-only access · We'll redirect you to sign in securely · Revoke anytime in Settings.
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

function OptIcon({ kind }) {
  const box = (bg, content) => (
    <div style={{ width: 40, height: 40, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{content}</div>
  );
  if (kind === 'gmail' || kind === 'gcal') return box('#fff', (
    <svg width="22" height="22" viewBox="0 0 48 48">
      <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  ));
  if (kind === 'outlook') return box('#fff', (
    <svg width="22" height="22" viewBox="0 0 48 48">
      <path fill="#0364B8" d="M44 13.5v21c0 1.66-1.34 3-3 3H23v-27h18c1.66 0 3 1.34 3 3z"/>
      <path fill="#0078D4" d="M23 10.5H7c-1.66 0-3 1.34-3 3v21c0 1.66 1.34 3 3 3h16v-27z"/>
      <ellipse fill="#fff" cx="15" cy="24" rx="8" ry="9"/>
      <ellipse fill="#0078D4" cx="15" cy="24" rx="4" ry="5"/>
      <path fill="#50D9FF" d="M44 16l-10.5 7L23 16v-5.5h21z" opacity=".4"/>
    </svg>
  ));
  if (kind === 'icloud') return box('#fff', (
    <svg width="26" height="22" viewBox="0 0 48 48">
      <defs>
        <linearGradient id="icloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3B9EFF"/>
          <stop offset="100%" stopColor="#0B6BE6"/>
        </linearGradient>
      </defs>
      <path fill="url(#icloudGrad)" d="M35.5 20.5c-.1 0-.2 0-.3.1C34 14.5 28.5 10 22 10c-7.2 0-13 5.8-13 13 0 .5 0 1 .1 1.5C5.6 25.4 3 28.9 3 33c0 4.9 4.1 9 9 9h23c4.1 0 7.5-3.4 7.5-7.5S39.6 20.5 35.5 20.5z"/>
    </svg>
  ));
  if (kind === 'forward') return box(COLORS.gray50, <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="6" width="16" height="11" rx="1.5" stroke="#000" strokeWidth="1.5"/><path d="M3 7l8 5 8-5" stroke="#000" strokeWidth="1.5"/><path d="M14 3l3 2-3 2" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);
  return box(COLORS.gray50, <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M13 4l5 5-9 9H4v-5l9-9z" stroke="#000" strokeWidth="1.5" strokeLinejoin="round"/></svg>);
}

// ─────────────────────────────────────────────────────────────
// Screen 3 — Business Hub with banner
// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// Screen 3 — Uber One Consumer Home (replaces Business Hub)
// ─────────────────────────────────────────────────────────────
function Screen3({ go, openSheet, goManual, calendarConnected, setCalendarConnected }) {
  const [localConnected, setLocalConnected] = React.useState(true);
  const connected = calendarConnected !== undefined ? calendarConnected : localConnected;
  const toggle = () => {
    if (setCalendarConnected) setCalendarConnected(!connected);
    else setLocalConnected(!connected);
  };

  return (
    <ScreenShell bg="#fff" stickyBottom={
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '4px 0 0' }}>
        {[
          { icon: 'home', label: 'Home', active: true },
          { icon: 'grid', label: 'Services' },
          { icon: 'activity', label: 'Activity' },
          { icon: 'user', label: 'Account' },
        ].map((t, i) => (
          <button key={i} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            color: t.active ? '#000' : COLORS.gray500,
            fontFamily: FONT, fontSize: 11, fontWeight: t.active ? 700 : 500,
          }}>
            {t.icon === 'home' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 11l9-8 9 8v10a2 2 0 01-2 2h-4v-7h-6v7H5a2 2 0 01-2-2V11z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill={t.active ? '#000' : 'none'}/></svg>}
            {t.icon === 'grid' && <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="11" y="3" width="6" height="6" rx="1"/><rect x="19" y="3" width="2" height="6" rx="1"/><rect x="3" y="11" width="6" height="6" rx="1"/><rect x="11" y="11" width="6" height="6" rx="1"/><rect x="19" y="11" width="2" height="6" rx="1"/></svg>}
            {t.icon === 'activity' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M7 9h10M7 13h7M7 17h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}
            {t.icon === 'user' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}
            {t.label}
          </button>
        ))}
      </div>
    }>
      {/* Top: greeting + Uber One badge */}
      <div style={{ padding: '58px 20px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 800, letterSpacing: -0.5, color: '#000' }}>
            Hi, Alex
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 6, padding: '3px 10px 3px 6px', background: '#000', borderRadius: 999 }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: FONT, fontSize: 9, fontWeight: 900, color: '#000', letterSpacing: -0.3 }}>1</span>
            </div>
            <span style={{ fontFamily: FONT, fontSize: 10.5, fontWeight: 800, color: '#fff', letterSpacing: 0.3 }}>UBER ONE</span>
          </div>
        </div>
        {/* Demo toggle — interview helper, flips trip card visibility */}
        <button onClick={toggle} title="Toggle: simulate before/after Uber AI detection" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '5px 10px', borderRadius: 999, fontFamily: FONT,
          fontSize: 10, fontWeight: 700, letterSpacing: 0.3,
          background: connected ? '#ECFDF5' : '#F3F4F6',
          color: connected ? '#065F46' : COLORS.gray700,
          border: `1px dashed ${connected ? '#10B981' : '#D1D5DB'}`,
          cursor: 'pointer', textTransform: 'uppercase',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: connected ? '#10B981' : COLORS.gray400 }}/>
          AI {connected ? 'on' : 'off'}
        </button>
      </div>

      {/* Uber AI hero card — only shown when AI is on (calendar connected) */}
      {connected && (
        <div style={{ padding: '14px 16px 0' }}>
          <div onClick={go} style={{
            position: 'relative', borderRadius: 18, overflow: 'hidden', cursor: 'pointer',
            background: 'linear-gradient(135deg, #1E3A8A 0%, #6D28D9 50%, #EC4899 100%)',
            boxShadow: '0 12px 28px rgba(109,40,217,0.25)',
          }}>
            {/* Sparkle decoration */}
            <div style={{ position: 'absolute', top: 14, right: 16, opacity: 0.85 }}>
              <svg width="40" height="40" viewBox="0 0 40 40">
                <path d="M20 4l2.5 7.5H30l-6 4.5 2.3 7.5L20 19l-6.3 4.5 2.3-7.5-6-4.5h7.5z" fill="#fff"/>
                <circle cx="34" cy="10" r="2" fill="#fff" opacity="0.7"/>
                <circle cx="6" cy="32" r="1.5" fill="#fff" opacity="0.5"/>
              </svg>
            </div>

            <div style={{ padding: '18px 18px 16px', color: '#fff', fontFamily: FONT }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: 'rgba(255,255,255,0.18)', borderRadius: 999, marginBottom: 12 }}>
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase' }}>✨ Uber AI</span>
              </div>

              <div style={{ fontSize: 19, fontWeight: 800, lineHeight: 1.2, letterSpacing: -0.4, marginBottom: 6 }}>
                Trip to London detected
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 14, lineHeight: 1.4 }}>
                Fri May 8 → Tue May 12 · 5 days · Tower of London, London Eye, dinner reservation
              </div>

              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <button style={{
                  background: '#fff', color: '#000', border: 'none',
                  padding: '10px 16px', borderRadius: 10, fontFamily: FONT,
                  fontSize: 13, fontWeight: 800, cursor: 'pointer', letterSpacing: -0.1,
                }}>
                  Review guide →
                </button>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Read from Viator · OpenTable · Booking.com</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skipped state — small enable nudge */}
      {!connected && (
        <div style={{ padding: '14px 16px 0' }}>
          <div style={{
            background: COLORS.gray50, borderRadius: 14, padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 12, fontFamily: FONT,
            border: `1px solid ${COLORS.gray200}`,
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 18 }}>✨</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 800, letterSpacing: -0.2 }}>Try Uber AI</div>
              <div style={{ fontSize: 11.5, color: COLORS.gray500, marginTop: 2, lineHeight: 1.4 }}>Connect calendar to detect trips automatically.</div>
            </div>
            <button onClick={openSheet} style={{
              background: '#000', color: '#fff', border: 'none', borderRadius: 8,
              padding: '8px 12px', fontFamily: FONT, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            }}>Enable</button>
          </div>
        </div>
      )}

      {/* Suggestions — Where to? */}
      <div style={{ padding: '24px 20px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: `1.5px solid ${COLORS.gray200}`, borderRadius: 14, padding: '14px 16px', gap: 12 }}>
          <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" stroke={COLORS.gray500} strokeWidth="1.6" fill="none"/><path d="M14 14l3 3" stroke={COLORS.gray500} strokeWidth="1.8" strokeLinecap="round"/></svg>
          <input placeholder="Where to?" style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: FONT, fontSize: 15, fontWeight: 600, color: COLORS.black,
          }}/>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', background: COLORS.gray50, borderRadius: 6 }}>
            <svg width="13" height="13" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" stroke={COLORS.gray700} strokeWidth="1.4" fill="none"/><path d="M8 4v4l3 2" stroke={COLORS.gray700} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: COLORS.gray700 }}>Now</span>
          </div>
        </div>
      </div>

      {/* Services grid — Go anywhere */}
      <div style={{ padding: '12px 20px 4px' }}>
        <div style={{ fontFamily: FONT, fontSize: 17, fontWeight: 800, letterSpacing: -0.3, marginBottom: 12 }}>Go anywhere</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[
            { label: 'Ride', emoji: '🚗', bg: '#F3F4F6' },
            { label: 'Reserve', emoji: '🕒', bg: '#F3F4F6' },
            { label: 'Wait & Save', emoji: '⏱', bg: '#FEF3C7', promo: true },
          ].map((s, i) => (
            <div key={i} style={{
              background: s.bg, borderRadius: 12, padding: '14px 10px 10px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              position: 'relative', cursor: 'pointer', minHeight: 88,
            }}>
              {s.promo && (
                <span style={{
                  position: 'absolute', top: 6, right: 6,
                  background: COLORS.green, color: '#fff', fontFamily: FONT,
                  fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 4,
                  letterSpacing: 0.3, textTransform: 'uppercase',
                }}>Promo</span>
              )}
              <div style={{ fontSize: 28, lineHeight: 1 }}>{s.emoji}</div>
              <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: COLORS.black, textAlign: 'center' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Get anything delivered — expanded grid */}
      <div style={{ padding: '20px 20px 28px' }}>
        <div style={{ fontFamily: FONT, fontSize: 17, fontWeight: 800, letterSpacing: -0.3, marginBottom: 12 }}>Get anything delivered</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8 }}>
          {[
            { label: 'Food', emoji: '🍱', bg: '#FEE2E2', promo: true },
            { label: 'Grocery', emoji: '🛒', bg: '#DBEAFE', promo: true },
            { label: 'Alcohol', emoji: '🍷', bg: '#FCE7F3', promo: true },
            { label: 'Convenience', emoji: '🥤', bg: '#FED7AA' },
            { label: 'Health', emoji: '💊', bg: '#DCFCE7' },
            { label: 'Personal care', emoji: '🧴', bg: '#E0E7FF' },
            { label: 'Baby', emoji: '🍼', bg: '#FEF3C7' },
            { label: 'Gourmet', emoji: '🥐', bg: '#FFE4E6' },
          ].map((s, i) => (
            <div key={i} style={{
              background: s.bg, borderRadius: 12, padding: '12px 6px 10px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
              position: 'relative', cursor: 'pointer', minHeight: 80,
            }}>
              {s.promo && (
                <span style={{
                  position: 'absolute', top: 5, right: 5,
                  background: COLORS.green, color: '#fff', fontFamily: FONT,
                  fontSize: 8, fontWeight: 800, padding: '2px 5px', borderRadius: 4,
                  letterSpacing: 0.3, textTransform: 'uppercase',
                }}>Promo</span>
              )}
              <div style={{ fontSize: 24, lineHeight: 1 }}>{s.emoji}</div>
              <div style={{ fontFamily: FONT, fontSize: 10.5, fontWeight: 700, color: COLORS.black, textAlign: 'center', lineHeight: 1.2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

    </ScreenShell>
  );
}

// ─────────────────────────────────────────────────────────────
// Legacy Business Hub (kept for reference, not exported)
// ─────────────────────────────────────────────────────────────
function _LegacyBusinessHub({ go, openSheet, goManual, calendarConnected, setCalendarConnected }) {
  const [localConnected, setLocalConnected] = React.useState(false);
  const connected = calendarConnected !== undefined ? calendarConnected : localConnected;
  const toggle = () => {
    if (setCalendarConnected) setCalendarConnected(!connected);
    else setLocalConnected(!connected);
  };
  return (
    <ScreenShell bg="#fff">
      {/* header illustration */}
      <div style={{ height: 180, position: 'relative', background: 'linear-gradient(180deg, #87CEEB 0%, #B5E3F5 100%)', overflow: 'hidden' }}>
        <svg viewBox="0 0 390 180" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMax slice">
          {/* buildings */}
          <rect x="0" y="60" width="80" height="120" fill="#4A90B8" opacity="0.7"/>
          <rect x="80" y="40" width="60" height="140" fill="#5BA0C8" opacity="0.8"/>
          <rect x="140" y="30" width="50" height="150" fill="#4A90B8" opacity="0.9"/>
          <rect x="260" y="50" width="70" height="130" fill="#5BA0C8" opacity="0.8"/>
          <rect x="330" y="35" width="60" height="145" fill="#4A90B8" opacity="0.7"/>
          {/* windows */}
          {[...Array(20)].map((_,i)=><rect key={i} x={10 + (i%5)*14} y={70 + Math.floor(i/5)*14} width="4" height="5" fill="#FFE29A" opacity="0.7"/>)}
          {/* ground */}
          <rect x="0" y="140" width="390" height="40" fill="#2C5F7F"/>
          {/* car */}
          <g transform="translate(140 115)">
            <ellipse cx="55" cy="32" rx="55" ry="4" fill="#000" opacity="0.2"/>
            <path d="M5 22 Q8 10 25 9 L75 9 Q92 10 95 22 L95 30 L5 30 Z" fill="#fff"/>
            <path d="M22 9 L28 2 L72 2 L78 9 Z" fill="#E5E7EB"/>
            <rect x="28" y="4" width="42" height="7" fill="#6B7280" opacity="0.3"/>
            <circle cx="22" cy="30" r="6" fill="#1F2937"/>
            <circle cx="22" cy="30" r="3" fill="#4B5563"/>
            <circle cx="78" cy="30" r="6" fill="#1F2937"/>
            <circle cx="78" cy="30" r="3" fill="#4B5563"/>
          </g>
          {/* person */}
          <g transform="translate(242 110)">
            <circle cx="0" cy="5" r="5" fill="#D4A574"/>
            <rect x="-6" y="10" width="12" height="20" fill="#1E3A5F" rx="2"/>
            <rect x="-5" y="28" width="4" height="12" fill="#2C3E50"/>
            <rect x="1" y="28" width="4" height="12" fill="#2C3E50"/>
          </g>
        </svg>
        <div style={{ position: 'absolute', top: 58, left: 20 }}>
          <BackArrow/>
        </div>
      </div>

      {/* Demo toggle — interview helper, flips banner state live */}
      <div style={{ padding: '12px 16px 0', display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={toggle} title="Demo toggle: simulate calendar connected vs skipped" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '5px 10px', borderRadius: 999, fontFamily: FONT,
          fontSize: 10.5, fontWeight: 700, letterSpacing: 0.3,
          background: connected ? '#ECFDF5' : '#F3F4F6',
          color: connected ? '#065F46' : COLORS.gray700,
          border: `1px dashed ${connected ? '#10B981' : '#D1D5DB'}`,
          cursor: 'pointer', textTransform: 'uppercase',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: connected ? '#10B981' : COLORS.gray400 }}/>
          Calendar {connected ? 'connected' : 'skipped'}
        </button>
      </div>

      {connected ? (
        /* Connected state — subtle confirmation chip, no enable prompt */
        <div style={{ padding: '10px 16px 0' }}>
          <div style={{
            background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 14,
            padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
            fontFamily: FONT,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 18, background: '#10B981',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18"><path d="M4 9.5l3 3 7-7" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#065F46', letterSpacing: -0.2 }}>
                Calendar connected
              </div>
              <div style={{ fontSize: 12.5, color: '#047857', marginTop: 2, lineHeight: 1.35 }}>
                Uber AI is monitoring for upcoming trips. We'll notify you when one's detected.
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Skipped state — educational "Enable now" banner */
        <div style={{ padding: '10px 16px 0' }}>
          <div style={{ background: '#000', borderRadius: 16, padding: 18, color: '#fff', fontFamily: FONT }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: COLORS.green, boxShadow: `0 0 0 3px ${COLORS.green}33` }}/>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', color: '#CFE9DE' }}>New — Uber Business Travel AI</span>
            </div>
            <div style={{ fontSize: 19, fontWeight: 800, lineHeight: 1.2, letterSpacing: -0.4, marginBottom: 8 }}>
              Let Uber plan your next business trip automatically
            </div>
            <div style={{ fontSize: 13, color: '#A8A8A8', lineHeight: 1.4, marginBottom: 14 }}>
              Connect your calendar so Uber AI can detect upcoming trips and pre-book all your ground transport.
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={openSheet} style={{
                flex: 1, background: COLORS.blue, color: '#fff', border: 'none',
                borderRadius: 10, padding: '11px 12px', fontFamily: FONT, fontSize: 13.5,
                fontWeight: 700, cursor: 'pointer',
              }}>Enable now</button>
              <button onClick={goManual} style={{
                flex: 1, background: 'transparent', color: '#fff',
                border: '1px solid rgba(255,255,255,0.3)', borderRadius: 10,
                padding: '11px 12px', fontFamily: FONT, fontSize: 13.5,
                fontWeight: 700, cursor: 'pointer',
              }}>Enter trip manually</button>
            </div>
          </div>
        </div>
      )}

      {/* Company */}
      <div style={{ padding: '22px 24px 6px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: 22, background: COLORS.orange, color: '#fff', fontFamily: FONT, fontWeight: 800, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>A</div>
        <div>
          <div style={{ fontFamily: FONT, fontSize: 18, fontWeight: 800, letterSpacing: -0.3, display: 'flex', alignItems: 'center', gap: 6 }}>
            Uber One
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5l3-3" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div style={{ fontFamily: FONT, fontSize: 12.5, color: COLORS.gray500 }}>saiv@acecorp.com</div>
        </div>
      </div>

      {/* workplace benefits */}
      <div style={{ padding: '18px 24px 24px' }}>
        <div style={{ fontFamily: FONT, fontSize: 17, fontWeight: 800, letterSpacing: -0.3, marginBottom: 14 }}>Your workplace benefits</div>
        {[
          { title: 'Morning commute', body: 'Transport to the office · 6am–9am · Mon–Fri', icon: 'sun' },
          { title: 'Business travel', body: 'Rides anywhere, anytime.', icon: 'briefcase' },
          { title: 'After hours transportation', body: 'Transport home from the office · 7pm–7am · Includes Sa–Sun', icon: 'moon' },
        ].map((b, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: i < 2 ? `0.5px solid ${COLORS.gray100}` : 'none' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: COLORS.gray50, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {b.icon === 'sun' && <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="4" stroke="#000" strokeWidth="1.5"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/></svg>}
              {b.icon === 'briefcase' && <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="7" width="16" height="11" rx="2" stroke="#000" strokeWidth="1.5"/><path d="M7 7V5a2 2 0 014 0v2" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/><path d="M2 11h16" stroke="#000" strokeWidth="1.5"/></svg>}
              {b.icon === 'moon' && <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 2l2.1 5.9H18l-4.9 3.6 1.9 5.7L10 14l-5 3.2 1.9-5.7L2 8h5.9z" fill="#000"/></svg>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONT, fontSize: 14.5, fontWeight: 700 }}>{b.title}</div>
              <div style={{ fontFamily: FONT, fontSize: 12.5, color: COLORS.gray500, marginTop: 2 }}>{b.body}</div>
            </div>
          </div>
        ))}
      </div>

      {/* AI travel planning — new feature section */}
      <div style={{ padding: '4px 24px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ fontFamily: FONT, fontSize: 17, fontWeight: 800, letterSpacing: -0.3 }}>AI travel planning</div>
          <span style={{
            fontFamily: FONT, fontSize: 9.5, fontWeight: 800, letterSpacing: 0.6,
            color: '#fff', background: COLORS.green, padding: '3px 7px', borderRadius: 6,
            textTransform: 'uppercase',
          }}>New</span>
        </div>
        {[
          { title: 'Auto-detect trips', body: 'Pulls flights, hotels, and meetings from your calendar.', icon: 'magic' },
          { title: 'Door-to-door planning', body: 'Every ride, timed and ready — airport to hotel to meetings.', icon: 'route' },
          { title: 'Real-time adjustments', body: 'Adapts to flight delays, traffic, and last-minute changes.', icon: 'live' },
        ].map((b, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: i < 2 ? `0.5px solid ${COLORS.gray100}` : 'none' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: COLORS.gray50, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {b.icon === 'magic' && <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2v3M10 15v3M2 10h3M15 10h3M4.5 4.5l2 2M13.5 13.5l2 2M4.5 15.5l2-2M13.5 6.5l2-2" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="10" r="2.5" fill="#000"/></svg>}
              {b.icon === 'route' && <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="4" cy="5" r="2" stroke="#000" strokeWidth="1.5"/><circle cx="16" cy="15" r="2" stroke="#000" strokeWidth="1.5"/><path d="M4 7v3a3 3 0 003 3h6a3 3 0 003-3" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/></svg>}
              {b.icon === 'live' && <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="#000" strokeWidth="1.5"/><path d="M10 6v4l2.5 2.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONT, fontSize: 14.5, fontWeight: 700 }}>{b.title}</div>
              <div style={{ fontFamily: FONT, fontSize: 12.5, color: COLORS.gray500, marginTop: 2 }}>{b.body}</div>
            </div>
          </div>
        ))}
      </div>
    </ScreenShell>
  );
}

// Bottom sheet for Enable Now
function EnableSheet({ close, go, goToCalendar, goToManual }) {
  const [selected, setSelected] = React.useState(0);
  const opts = [
    { title: 'Continue with Gmail', sub: 'Google Calendar · Google Workspace', icon: 'gmail', kind: 'calendar' },
    { title: 'Continue with Outlook', sub: 'Microsoft 365 · Exchange Online', icon: 'outlook', kind: 'calendar' },
    { title: 'Continue with iCloud', sub: 'Apple Calendar · iCloud.com', icon: 'icloud', kind: 'calendar' },
    { title: 'Enter manually', sub: 'Type or photograph itinerary', icon: 'edit', kind: 'manual' },
  ];

  const handleConnect = () => {
    const picked = opts[selected];
    if (picked.kind === 'calendar' && goToCalendar) {
      goToCalendar();
    } else if (picked.kind === 'manual' && goToManual) {
      goToManual();
    } else if (go) {
      go();
    }
  };
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 100 }}>
      <div onClick={close} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', animation: 'fadeIn .2s ease' }}/>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: '#fff', borderTopLeftRadius: 22, borderTopRightRadius: 22,
        padding: '10px 20px 28px', animation: 'slideUp .28s cubic-bezier(.2,.8,.2,1)',
        maxHeight: '85%', overflowY: 'auto',
      }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: COLORS.gray200, margin: '6px auto 14px' }}/>
        <div style={{ fontFamily: FONT, fontSize: 20, fontWeight: 800, letterSpacing: -0.4, marginBottom: 6 }}>Enable Travel AI</div>
        <div style={{ fontFamily: FONT, fontSize: 13.5, color: COLORS.gray500, marginBottom: 16 }}>Choose a source. Read-only — revoke anytime.</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {opts.map((o, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{
              width: '100%', textAlign: 'left', background: '#fff',
              border: `${selected === i ? 2 : 1}px solid ${selected === i ? '#000' : COLORS.gray200}`,
              borderRadius: 14, padding: selected === i ? '13px' : '14px',
              display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', fontFamily: FONT,
            }}>
              <OptIcon kind={o.icon}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14.5, fontWeight: 700 }}>{o.title}</div>
                <div style={{ fontSize: 12, color: COLORS.gray500, marginTop: 2 }}>{o.sub}</div>
              </div>
              <div style={{ width: 20, height: 20, borderRadius: 10, border: `2px solid ${selected === i ? '#000' : COLORS.gray200}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {selected === i && <div style={{ width: 8, height: 8, borderRadius: 4, background: '#000' }}/>}
              </div>
            </button>
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          <BlackButton onClick={handleConnect}>Connect and continue →</BlackButton>
        </div>
      </div>
    </div>
  );
}

// Manual form
function ManualForm({ back, go }) {
  return (
    <ScreenShell stickyBottom={<BlackButton onClick={go}>Find my trip →</BlackButton>}>
      <div style={{ padding: '58px 20px 0' }}><BackArrow onClick={back}/></div>
      <div style={{ padding: '18px 24px 12px' }}>
        <h1 style={{ fontFamily: FONT, fontSize: 28, fontWeight: 800, lineHeight: 1.12, letterSpacing: -0.7, margin: 0 }}>Enter trip details</h1>
        <p style={{ fontFamily: FONT, fontSize: 14, color: COLORS.gray500, marginTop: 10 }}>Give Uber AI the basics — we'll handle the rest.</p>
      </div>
      <div style={{ padding: '10px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { label: 'Destination city', value: 'London, UK' },
          { label: 'Travel dates', value: 'May 8–12, 2026' },
          { label: 'Flight number (optional)', value: 'BA178' },
          { label: 'Hotel name (optional)', value: 'The Hoxton, Holborn' },
        ].map((f, i) => (
          <div key={i} style={{ border: `1px solid ${COLORS.gray200}`, borderRadius: 12, padding: '12px 14px' }}>
            <div style={{ fontFamily: FONT, fontSize: 11.5, fontWeight: 600, color: COLORS.gray500, textTransform: 'uppercase', letterSpacing: 0.4 }}>{f.label}</div>
            <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 600, marginTop: 3 }}>{f.value}</div>
          </div>
        ))}
        <button style={{
          display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center',
          background: COLORS.gray50, border: `1px dashed ${COLORS.gray400}`,
          borderRadius: 12, padding: '14px', fontFamily: FONT, fontSize: 14,
          fontWeight: 700, cursor: 'pointer',
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="5" width="14" height="10" rx="1.5" stroke="#000" strokeWidth="1.5"/><circle cx="9" cy="10" r="3" stroke="#000" strokeWidth="1.5"/><rect x="6" y="3" width="6" height="3" rx="0.5" stroke="#000" strokeWidth="1.5"/></svg>
          Scan itinerary photo
        </button>
      </div>
    </ScreenShell>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 4 — Trip Found
// ─────────────────────────────────────────────────────────────
function Screen4({ go, back }) {
  const [fields, setFields] = React.useState([
    { icon: 'plane', label: 'Outbound flight', value: 'BA178 · Fri May 8 · JFK → LHR · 11:00 AM' },
    { icon: 'bed',   label: 'Hotel',  value: 'The Hoxton, Holborn · 4 nights' },
    { icon: 'plane', label: 'Return flight', value: 'BA177 · Tue May 12 · LHR → JFK · 6:30 PM' },
  ]);
  const [editing, setEditing] = React.useState(null); // index being edited
  const [draft, setDraft] = React.useState('');
  const [adding, setAdding] = React.useState(false);
  const [addType, setAddType] = React.useState('meeting');
  const [addValue, setAddValue] = React.useState('');

  const ADD_TYPES = [
    { key: 'meeting', label: 'Activity', placeholder: 'e.g. Sky Garden visit · Sun 4pm', icon: 'cal' },
    { key: 'flight',  label: 'Flight',  placeholder: 'e.g. BA289 · May 9, 8:00 AM LHR → EDI', icon: 'plane' },
    { key: 'hotel',   label: 'Hotel',   placeholder: 'e.g. The Savoy · 1 night', icon: 'bed' },
    { key: 'location',label: 'Reservation',placeholder: 'e.g. Tea at The Wolseley · 3pm', icon: 'pin' },
  ];

  const confirmAdd = () => {
    if (!addValue.trim()) return;
    const t = ADD_TYPES.find(t => t.key === addType);
    setFields(f => [...f, { icon: t.icon, label: t.label, value: addValue.trim() }]);
    setAdding(false);
    setAddValue('');
  };

  const startEdit = (i) => { setEditing(i); setDraft(fields[i].value); };
  const saveEdit  = () => {
    if (editing === null) return;
    setFields(f => f.map((r, i) => i === editing ? { ...r, value: draft } : r));
    setEditing(null);
  };

  return (
    <ScreenShell stickyBottom={
      <>
        <BlackButton onClick={go}>Build my ground transportation plan with Uber AI →</BlackButton>
        <GhostText onClick={back} style={{ paddingBottom: 0 }}>Not now</GhostText>
      </>
    }>
      {/* Dark header */}
      <div style={{ background: '#000', color: '#fff', padding: '58px 20px 26px', position: 'relative', overflow: 'hidden' }}>
        <BackArrow onClick={back} dark/>
        <div style={{ position: 'absolute', right: -20, top: 40, width: 260, height: 180, opacity: 0.5 }}>
          <svg viewBox="0 0 260 180" width="100%" height="100%">
            <defs>
              <linearGradient id="cgrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#276EF1" stopOpacity="0.4"/>
                <stop offset="1" stopColor="#276EF1" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0 180 L0 140 L20 140 L20 100 L40 100 L40 120 L60 120 L60 80 L80 80 L80 110 L100 110 L100 60 L115 60 L115 40 L125 40 L125 60 L140 60 L140 90 L160 90 L160 50 L180 50 L180 100 L200 100 L200 70 L220 70 L220 110 L240 110 L240 130 L260 130 L260 180 Z" fill="url(#cgrad)"/>
          </svg>
        </div>
        <div style={{ marginTop: 22, fontFamily: FONT, fontSize: 10.5, fontWeight: 700, letterSpacing: 1.4, color: COLORS.green, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: COLORS.green }}/>
          Uber AI · Trip detected
        </div>
        <div style={{ fontFamily: FONT, fontSize: 36, fontWeight: 800, letterSpacing: -0.8, lineHeight: 1.05, marginTop: 8 }}>London,<br/>UK 🇬🇧</div>
        <div style={{ fontFamily: FONT, fontSize: 14, color: '#A8A8A8', marginTop: 10 }}>Fri May 8 → Tue May 12 · 5 days · couple</div>
      </div>

      <div style={{ padding: '24px 24px 10px' }}>
        <h2 style={{ fontFamily: FONT, fontSize: 22, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1.18, margin: 0 }}>Your London trip, planned door to door</h2>
        <p style={{ fontFamily: FONT, fontSize: 14, color: COLORS.gray500, lineHeight: 1.45, marginTop: 10 }}>
          We pulled your flights, hotel, and activities from your calendar. Let Uber AI handle every ride between them — so you can focus on the trip, not the logistics.
        </p>
        {/* "Something wrong?" hint */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke={COLORS.gray400} strokeWidth="1.3"/><path d="M7 4v3M7 9.5v.5" stroke={COLORS.gray400} strokeWidth="1.3" strokeLinecap="round"/></svg>
          <span style={{ fontFamily: FONT, fontSize: 12.5, color: COLORS.gray400 }}>Something wrong? Tap any row to edit.</span>
        </div>
      </div>

      <div style={{ padding: '10px 20px 24px' }}>
        <div style={{ background: COLORS.gray50, borderRadius: 14, padding: 4 }}>
          {fields.map((r, i) => (
            <div key={i}>
              {editing === i ? (
                /* ── inline edit row ── */
                <div style={{ padding: '12px 14px', borderBottom: i < 2 ? `0.5px solid ${COLORS.gray200}` : 'none' }}>
                  <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: COLORS.gray500, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 6 }}>{r.label}</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input
                      autoFocus
                      value={draft}
                      onChange={e => setDraft(e.target.value)}
                      style={{
                        flex: 1, fontFamily: FONT, fontSize: 14, fontWeight: 600,
                        border: `1.5px solid #000`, borderRadius: 8, padding: '8px 10px',
                        outline: 'none', background: '#fff',
                      }}
                    />
                    <button onClick={saveEdit} style={{
                      background: '#000', color: '#fff', border: 'none', borderRadius: 8,
                      padding: '0 14px', fontFamily: FONT, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                    }}>Save</button>
                  </div>
                  <button onClick={() => setEditing(null)} style={{
                    marginTop: 6, background: 'none', border: 'none', fontFamily: FONT,
                    fontSize: 12, color: COLORS.gray400, cursor: 'pointer', padding: 0,
                  }}>Cancel</button>
                </div>
              ) : (
                /* ── normal row ── */
                <button onClick={() => startEdit(i)} style={{
                  width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 14px',
                  borderBottom: i < 2 ? `0.5px solid ${COLORS.gray200}` : 'none',
                }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {r.icon === 'plane' && <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1l2 7 6 2v2l-6-1-2 5 1 1H7l1-1-2-5-6 1V10l6-2 2-7z" fill="#000"/></svg>}
                    {r.icon === 'bed'   && <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><path d="M1 12V2M17 12V6a2 2 0 00-2-2H8v8M1 8h16M1 12h16" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/><circle cx="5" cy="7" r="1.5" fill="#000"/></svg>}
                    {r.icon === 'cal'   && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="3" width="13" height="11" rx="1.5" stroke="#000" strokeWidth="1.5"/><path d="M1.5 6h13M5 1v3M11 1v3" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                    {r.icon === 'pin'   && <svg width="14" height="18" viewBox="0 0 14 18" fill="none"><path d="M7 1a6 6 0 016 6c0 4-6 10-6 10S1 11 1 7a6 6 0 016-6z" stroke="#000" strokeWidth="1.5"/><circle cx="7" cy="7" r="2" fill="#000"/></svg>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: FONT, fontSize: 11.5, fontWeight: 600, color: COLORS.gray500, textTransform: 'uppercase', letterSpacing: 0.3 }}>{r.label}</div>
                    <div style={{ fontFamily: FONT, fontSize: 13.5, fontWeight: 600, marginTop: 2 }}>{r.value}</div>
                  </div>
                  {/* pencil edit icon */}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M11 2l3 3-8 8H3v-3l8-8z" stroke={COLORS.gray400} strokeWidth="1.4" strokeLinejoin="round"/>
                    <path d="M9 4l3 3" stroke={COLORS.gray400} strokeWidth="1.4"/>
                  </svg>
                </button>
              )}
            </div>
          ))}

          {/* Add detail row */}
          {!adding ? (
            <button onClick={() => setAdding(true)} style={{
              width: '100%', background: 'none', border: 'none', textAlign: 'left',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
              padding: '13px 14px', borderTop: `0.5px solid ${COLORS.gray200}`,
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#fff', border: `1.5px dashed ${COLORS.gray400}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="#000" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
              <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: '#000' }}>Add missing detail</div>
              <div style={{ marginLeft: 'auto', fontFamily: FONT, fontSize: 12, color: COLORS.gray400 }}>flight, hotel, meeting…</div>
            </button>
          ) : (
            <div style={{ padding: '14px 14px', borderTop: `0.5px solid ${COLORS.gray200}` }}>
              {/* type chips */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                {ADD_TYPES.map(t => (
                  <button key={t.key} onClick={() => setAddType(t.key)} style={{
                    padding: '5px 12px', borderRadius: 20, fontFamily: FONT, fontSize: 12.5, fontWeight: 700,
                    cursor: 'pointer', border: 'none',
                    background: addType === t.key ? '#000' : COLORS.gray100,
                    color: addType === t.key ? '#fff' : COLORS.gray700,
                    transition: 'all 0.15s',
                  }}>{t.label}</button>
                ))}
              </div>
              {/* input */}
              <input
                autoFocus
                value={addValue}
                onChange={e => setAddValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && confirmAdd()}
                placeholder={ADD_TYPES.find(t => t.key === addType)?.placeholder}
                style={{
                  width: '100%', fontFamily: FONT, fontSize: 14, fontWeight: 500,
                  border: `1.5px solid #000`, borderRadius: 8, padding: '9px 12px',
                  outline: 'none', background: '#fff', marginBottom: 10,
                }}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={confirmAdd} style={{
                  flex: 1, background: '#000', color: '#fff', border: 'none', borderRadius: 8,
                  padding: '10px', fontFamily: FONT, fontSize: 13.5, fontWeight: 700, cursor: 'pointer',
                }}>Add</button>
                <button onClick={() => { setAdding(false); setAddValue(''); }} style={{
                  flex: 1, background: COLORS.gray100, color: '#000', border: 'none', borderRadius: 8,
                  padding: '10px', fontFamily: FONT, fontSize: 13.5, fontWeight: 700, cursor: 'pointer',
                }}>Cancel</button>
              </div>
            </div>
          )}
        </div>

        {/* Also add a row icon for pin if used */}
      </div>

      {/* Day-by-day handoff — activities live in the daily plan */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{
          background: '#0F172A', borderRadius: 14, padding: '14px 16px',
          display: 'flex', alignItems: 'center', gap: 12, color: '#fff',
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'linear-gradient(135deg, #6D28D9 0%, #EC4899 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            fontSize: 18,
          }}>📅</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: FONT, fontSize: 13.5, fontWeight: 800, letterSpacing: -0.2 }}>
              Day 2 plan: Tower of London + dinner
            </div>
            <div style={{ fontFamily: FONT, fontSize: 12, color: '#A8A8A8', marginTop: 2, lineHeight: 1.4 }}>
              Tower of London · London Eye · Dishoom — scheduled in your daily plan
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, opacity: 0.7 }}>
            <path d="M5 3l4 4-4 4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </ScreenShell>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 5 — Loading
// ─────────────────────────────────────────────────────────────
function Screen5({ go }) {
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    const timers = [];
    for (let i = 1; i <= 5; i++) {
      timers.push(setTimeout(() => setStep(i), i * 800));
    }
    timers.push(setTimeout(() => go(), 5 * 800 + 900));
    return () => timers.forEach(clearTimeout);
  }, []);
  const steps = [
    { type: 'gray', text: 'Reading your calendar...' },
    { type: 'check', text: 'Found flight BA178 to London (LHR)' },
    { type: 'check', text: 'Found The Hoxton, Holborn' },
    { type: 'check', text: 'Detected Tower of London, London Eye, dinner reservation' },
    { type: 'arrow', text: 'Building your London guide...' },
  ];
  return (
    <ScreenShell>
      <div style={{ padding: '80px 28px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100%' }}>
        <div style={{
          width: 58, height: 58, borderRadius: 29,
          border: `3px solid ${COLORS.gray100}`,
          borderTopColor: '#000',
          animation: 'spin 0.9s linear infinite',
        }}/>
        <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 800, letterSpacing: -0.6, marginTop: 26, textAlign: 'center' }}>Building your guide</div>
        <div style={{ fontFamily: FONT, fontSize: 14, color: COLORS.gray500, marginTop: 8, textAlign: 'center' }}>Uber AI is mapping your London trip...</div>

        <div style={{ width: '100%', marginTop: 40, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              opacity: step > i ? 1 : 0,
              transform: step > i ? 'translateY(0)' : 'translateY(8px)',
              transition: 'all 0.36s cubic-bezier(.2,.8,.2,1)',
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: 13, flexShrink: 0,
                background: s.type === 'check' ? COLORS.green : s.type === 'arrow' ? '#000' : COLORS.gray200,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {s.type === 'check' && <svg width="12" height="12" viewBox="0 0 12 12"><path d="M3 6l2 2 4-4" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                {s.type === 'arrow' && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5h6M6 2l3 3-3 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>}
              </div>
              <div style={{ fontFamily: FONT, fontSize: 14.5, fontWeight: 600, color: s.type === 'gray' ? COLORS.gray500 : '#000' }}>{s.text}</div>
            </div>
          ))}
        </div>
      </div>
    </ScreenShell>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 6 — Door-to-Door Plan
// ─────────────────────────────────────────────────────────────
function Screen6({ goApprove, goDelay, back }) {
  return (
    <ScreenShell stickyBottom={
      <BlackButton onClick={goApprove}>Save my London guide →</BlackButton>
    }>
      {/* dark header */}
      <div style={{ background: '#000', color: '#fff', padding: '58px 20px 22px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <BackArrow onClick={back} dark/>
          <div style={{
            background: COLORS.green, color: '#fff',
            padding: '6px 11px', borderRadius: 100,
            fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: 0.2,
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 1l1 3h3l-2.5 2 1 3L5 7 2.5 9l1-3L1 4h3z" fill="#fff"/></svg>
            AI Built
          </div>
        </div>
        <div style={{ marginTop: 18, fontFamily: FONT, fontSize: 10.5, fontWeight: 700, letterSpacing: 1.4, color: '#A8A8A8', textTransform: 'uppercase' }}>Your London guide</div>
        <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 800, letterSpacing: -0.6, lineHeight: 1.08, marginTop: 6 }}>Trip to London 🇬🇧</div>
        <div style={{ fontFamily: FONT, fontSize: 13.5, color: '#A8A8A8', marginTop: 8 }}>May 8–12 · 5 days · tap any day to expand</div>
      </div>

      {/* Day 1 — Travel out */}
      <DaySection label="FRI MAY 8 — DEPARTURE" summary="Travel day · 3 ride suggestions">
        <TripLeg type="ride" title="Home → JFK Airport" meta="8:00 AM · UberX suggested" detail="TSA Wait Time ~14 min · Terminal 7 · Flight delays monitored"/>
        <TripLeg type="flight" title="BA178: JFK → LHR" meta="11:00 AM → 11:00 PM (London time)" detail="Real-time delay monitoring active · 7h flight" tag="Monitoring"/>
        <TripLeg type="ride" title="The Hoxton, Holborn" meta="Pickup ~11:45 PM" detail="~40 min from LHR to central London · light late-night traffic" bookHint="Book when you've grabbed your bags" last/>
      </DaySection>

      {/* Day 2 — Activity day 1 */}
      <DaySection label="SAT MAY 9 — TOWER & DISHOOM" summary="5 rides · 1 dinner reservation alert">
        <TripLeg type="ride" title="Hotel → Tower of London" meta="9:30 AM · ~12 min" detail="Viator timed entry at 10:00 AM · No queue"/>
        <TripLeg type="ride" title="Tower of London → Borough Market" meta="1:00 PM · ~10 min" detail="Lunch break · iconic food market"/>
        <TripLeg type="ride" title="Borough Market → Hotel" meta="3:30 PM · ~14 min" detail="Rest before dinner"/>
        <TripLeg type="warn" title="Leave at 7:00 PM for dinner reservation" meta="Hotel → Dishoom Covent Garden · 7:30 PM seating" detail="▲ Sat eve West End traffic · ~18 min ride · arrive 5 min early" tag="Reservation"/>
        <TripLeg type="ride" title="Dishoom → Hotel" meta="9:45 PM · ~12 min" last/>
      </DaySection>

      {/* Day 3 — Activity day 2 */}
      <DaySection label="SUN MAY 10 — LONDON EYE" summary="4 rides · British Museum + London Eye">
        <TripLeg type="ride" title="Hotel → British Museum" meta="10:00 AM · ~6 min" detail="Free entry · self-paced morning"/>
        <TripLeg type="ride" title="British Museum → London Eye" meta="1:30 PM · ~14 min" detail="Viator timed entry at 2:30 PM"/>
        <TripLeg type="ride" title="London Eye → Hotel" meta="4:30 PM · ~10 min"/>
        <TripLeg type="ride" title="Hotel → Sunday roast (Hawksmoor Seven Dials)" meta="7:00 PM · ~8 min" detail="Classic London Sunday meal" last/>
      </DaySection>

      {/* Day 4 — Activity day 3 */}
      <DaySection label="MON MAY 11 — WESTMINSTER & TATE" summary="4 rides · Westminster + Tate Modern">
        <TripLeg type="ride" title="Hotel → Westminster Abbey" meta="10:00 AM · ~12 min" detail="Self-paced morning visit"/>
        <TripLeg type="ride" title="Westminster → Tate Modern" meta="1:00 PM · ~10 min" detail="Lunch en route at Borough · then museum"/>
        <TripLeg type="ride" title="Tate Modern → Hotel" meta="5:00 PM · ~12 min"/>
        <TripLeg type="ride" title="Hotel → Sky Garden (sunset drinks)" meta="7:30 PM · ~14 min" detail="Free observation deck · book ahead" last/>
      </DaySection>

      {/* Day 5 — Return */}
      <DaySection label="TUE MAY 12 — RETURN DAY" summary="Return day · 3 rides · airport alert">
        <TripLeg type="warn" title="Hotel → LHR Airport" meta="3:00 PM · Flight at 6:30 PM" detail="▲ Tue afternoon traffic to LHR · Avg security wait ~28 min · Allow 75 min total" tag="Airport alert"/>
        <TripLeg type="flight" title="BA177: LHR → JFK" meta="6:30 PM → 9:30 PM (NYC time)" tag="Monitoring"/>
        <TripLeg type="ride" title="JFK Airport → Home" meta="~10:15 PM · evening" bookHint="Book when you've grabbed your bags" last/>
      </DaySection>

      <div style={{ height: 16 }}/>
    </ScreenShell>
  );
}

function DaySection({ label, summary, defaultOpen = false, children }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div style={{ padding: '14px 20px 4px' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '8px 0', textAlign: 'left',
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: 1, color: COLORS.gray700, textTransform: 'uppercase' }}>{label}</div>
          {!open && summary && (
            <div style={{ fontFamily: FONT, fontSize: 12, color: COLORS.gray500, marginTop: 4, fontWeight: 500 }}>{summary}</div>
          )}
        </div>
        <div style={{
          width: 28, height: 28, borderRadius: 14, background: COLORS.gray50,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          transition: 'transform 0.2s ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5l3 3 3-3" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>
      {open && (
        <div style={{ marginTop: 12, paddingBottom: 4 }}>{children}</div>
      )}
      {!open && (
        <div style={{ height: 0.5, background: COLORS.gray100, marginTop: 8 }}/>
      )}
    </div>
  );
}

function TripLeg({ type, title, meta, detail, tag, tagOrange, last, waitSave, bookHint }) {
  const [editing, setEditing] = React.useState(false);
  const [metaVal, setMetaVal] = React.useState(meta);
  const [detailVal, setDetailVal] = React.useState(detail || '');
  const [waitSaveOn, setWaitSaveOn] = React.useState(false);
  // "Reserve" tag from old auto-booking model is now treated as a regular ride
  // (no auto-action). Each ride card surfaces a soft "Book ride →" link instead.
  const isBookable = (type === 'ride' || type === 'rideGray' || type === 'warn');
  const dotMeta = {
    ride:     { bg: '#000' },
    rideGray: { bg: COLORS.gray400 },
    flight:   { bg: COLORS.blue },
    meal:     { bg: '#F5A524' },
    warn:     { bg: COLORS.amber },
  }[type];
  const dot = dotMeta;

  const sz = 18;
  const emojiMap = {
    ride: '🚗',
    rideGray: '🚗',
    flight: '✈️',
    meal: '🍽️',
    warn: '⚠️',
  };
  const DotIcon = () => (
    <span style={{ fontSize: 14, lineHeight: 1 }}>{emojiMap[type]}</span>
  );
  const warn = type === 'warn';
  return (
    <div style={{ display: 'flex', gap: 14, position: 'relative', paddingBottom: last ? 0 : 14 }}>
      <div style={{ width: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 17, background: dot.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1,
          flexShrink: 0,
        }}><DotIcon/></div>
        {!last && <div style={{ flex: 1, width: 1.5, background: COLORS.gray200, marginTop: 2, minHeight: 24 }}/>}
      </div>
      <div style={{
        flex: 1, borderRadius: 12, padding: '10px 14px 12px',
        background: warn ? COLORS.amberBg : '#fff',
        border: `0.5px solid ${warn ? COLORS.amberBorder : editing ? '#000' : COLORS.gray200}`,
        transition: 'border-color 0.15s',
      }}>
        {!editing ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'flex-start' }}>
              <div style={{ fontFamily: FONT, fontSize: 14.5, fontWeight: 700, letterSpacing: -0.2, flex: 1 }}>{title}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                {/* Soft tag — only show meaningful tags (Monitoring, Reservation, Eats).
                    "Reserve" and "Suggested" are dropped — guidance, not bookings. */}
                {tag && tag !== 'Reserve' && tag !== 'Suggested' && (
                  <span style={{
                    fontFamily: FONT, fontSize: 10, fontWeight: 700, padding: '3px 8px',
                    borderRadius: 10, letterSpacing: 0.2,
                    background: tagOrange ? COLORS.orange : warn ? COLORS.amber : COLORS.gray50,
                    color: tagOrange || warn ? '#fff' : COLORS.gray700,
                    whiteSpace: 'nowrap',
                  }}>{tag}</span>
                )}
                <button onClick={() => setEditing(true)} style={{
                  width: 24, height: 24, borderRadius: 6, background: COLORS.gray100,
                  border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M8.5 1.5l2 2-6 6H2.5v-2l6-6z" stroke="#555" strokeWidth="1.2" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <div style={{ fontFamily: FONT, fontSize: 12.5, color: warn ? '#B45309' : COLORS.gray500, marginTop: 3, fontWeight: 500 }}>{metaVal}</div>
            {detailVal && <div style={{ fontFamily: FONT, fontSize: 12, color: warn ? '#B45309' : COLORS.gray500, marginTop: 5, lineHeight: 1.4 }}>{detailVal}</div>}
            {/* Soft "Book ride" link — user-initiated, no auto-action */}
            {isBookable && (
              <div style={{ marginTop: 10, paddingTop: 9, borderTop: `0.5px dashed ${warn ? COLORS.amberBorder : COLORS.gray200}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: FONT, fontSize: 11, color: warn ? '#B45309' : COLORS.gray500, fontWeight: 600 }}>
                  {bookHint || "We'll notify you when to leave"}
                </span>
                <button onClick={(e) => e.stopPropagation()} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: FONT, fontSize: 12, fontWeight: 800, color: '#000',
                  padding: '2px 0', display: 'inline-flex', alignItems: 'center', gap: 4,
                }}>
                  Book ride
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M3 2.5L6.5 5 3 7.5" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
            {waitSave && (
              <div style={{ marginTop: 9, paddingTop: 9, borderTop: `0.5px dashed ${COLORS.gray200}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6.5" stroke={waitSaveOn ? '#0A7C42' : COLORS.gray500} strokeWidth="1.4"/>
                    <path d="M8 4.5V8l2.2 1.5" stroke={waitSaveOn ? '#0A7C42' : COLORS.gray500} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontFamily: FONT, fontSize: 11.5, fontWeight: 700, color: waitSaveOn ? '#0A7C42' : COLORS.gray700 }}>
                    {waitSaveOn ? 'Wait & Save · ~12 min wait, save 15%' : 'Wait & Save available · save up to 15%'}
                  </span>
                </div>
                <button onClick={(e) => { e.stopPropagation(); setWaitSaveOn(!waitSaveOn); }} style={{
                  width: 32, height: 18, borderRadius: 9, border: 'none', cursor: 'pointer',
                  background: waitSaveOn ? '#0A7C42' : COLORS.gray200, position: 'relative',
                  transition: 'background 0.18s ease', flexShrink: 0,
                }}>
                  <span style={{
                    position: 'absolute', top: 2, left: waitSaveOn ? 16 : 2,
                    width: 14, height: 14, borderRadius: 7, background: '#fff',
                    transition: 'left 0.18s ease',
                  }}/>
                </button>
              </div>
            )}
          </>
        ) : (
          <div>
            <div style={{ fontFamily: FONT, fontSize: 14.5, fontWeight: 700, letterSpacing: -0.2, marginBottom: 10 }}>{title}</div>
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontFamily: FONT, fontSize: 10.5, fontWeight: 700, color: COLORS.gray500, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 4 }}>Time / details</div>
              <input value={metaVal} onChange={e => setMetaVal(e.target.value)} style={{
                width: '100%', fontFamily: FONT, fontSize: 13, fontWeight: 500,
                border: `1.5px solid #000`, borderRadius: 7, padding: '7px 10px',
                outline: 'none', background: '#fff',
              }}/>
            </div>
            <div style={{ marginBottom: 10 }}/>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setEditing(false)} style={{
                flex: 1, background: '#000', color: '#fff', border: 'none', borderRadius: 7,
                padding: '8px', fontFamily: FONT, fontSize: 13, fontWeight: 700, cursor: 'pointer',
              }}>Save</button>
              <button onClick={() => { setMetaVal(meta); setDetailVal(detail||''); setEditing(false); }} style={{
                flex: 1, background: COLORS.gray100, color: '#000', border: 'none', borderRadius: 7,
                padding: '8px', fontFamily: FONT, fontSize: 13, fontWeight: 700, cursor: 'pointer',
              }}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 7 — Flight Delay
// ─────────────────────────────────────────────────────────────
function Screen7({ back }) {
  return (
    <ScreenShell stickyBottom={<BlackButton onClick={back}>Got it, back to my plan</BlackButton>}>
      <div style={{ padding: '58px 20px 0' }}><BackArrow onClick={back}/></div>

      <div style={{ padding: '18px 20px 12px' }}>
        <div style={{ background: COLORS.amberBg, border: `1px solid ${COLORS.amberBorder}`, borderRadius: 14, padding: '16px 16px', display: 'flex', gap: 12 }}>
          <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 18, background: COLORS.amber, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 1.5L15 14H1L8 1.5z" fill="#fff"/><rect x="7.2" y="5.5" width="1.6" height="4.5" fill={COLORS.amber}/><circle cx="8" cy="11.8" r="0.9" fill={COLORS.amber}/></svg>
          </div>
          <div>
            <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 800, color: '#7C2D12' }}>Flight Delay Detected</div>
            <div style={{ fontFamily: FONT, fontSize: 13, color: '#7C2D12', marginTop: 4, lineHeight: 1.4 }}>BA178 delayed 35 min. Your suggested pickup time has been re-timed.</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 20px 6px', fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: 1, color: COLORS.gray500, textTransform: 'uppercase' }}>What changed</div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <ChangeCard title="Flight BA178" oldVal="Arrives 11:00 PM" newVal="Now 11:35 PM"/>
        <ChangeCard title="LHR Pickup" oldVal="Pickup 11:45 PM" newVal="Now 12:20 AM"/>
        <div style={{ background: COLORS.greenBg, border: `1px solid #A7E3C4`, borderRadius: 12, padding: '14px' }}>
          <div style={{ fontFamily: FONT, fontSize: 13.5, fontWeight: 700, color: '#065F46' }}>10:00 AM Tower of London timed entry (Sat)</div>
          <div style={{ fontFamily: FONT, fontSize: 12.5, color: COLORS.green, marginTop: 4, fontWeight: 600 }}>✓ Still on time — hotel check-in & ride re-routed</div>
        </div>
      </div>

      <div style={{ padding: '20px 20px 24px' }}>
        <div style={{ background: COLORS.gray50, borderRadius: 12, padding: '14px 16px', fontFamily: FONT, fontSize: 12.5, color: COLORS.gray700, lineHeight: 1.45 }}>
          We'll keep monitoring and notify you if anything else changes — book your ride when you're ready.
        </div>
      </div>
    </ScreenShell>
  );
}

function ChangeCard({ title, oldVal, newVal }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${COLORS.gray200}`, borderRadius: 12, padding: '14px' }}>
      <div style={{ fontFamily: FONT, fontSize: 13.5, fontWeight: 700 }}>{title}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6, fontFamily: FONT, fontSize: 13 }}>
        <span style={{ color: COLORS.gray400, textDecoration: 'line-through' }}>{oldVal}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 6h6M7 3l2 3-2 3" stroke={COLORS.gray400} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span style={{ color: COLORS.amber, fontWeight: 700 }}>{newVal}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 8 — Plan Confirmed
// ─────────────────────────────────────────────────────────────
function Screen8({ go }) {
  const [pop, setPop] = React.useState(false);
  React.useEffect(() => { setTimeout(() => setPop(true), 60); }, []);
  return (
    <ScreenShell stickyBottom={<BlackButton onClick={go}>Preview morning of experience →</BlackButton>}>
      <div style={{ padding: '82px 28px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: 88, height: 88, borderRadius: 44, background: COLORS.green,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: pop ? 'scale(1)' : 'scale(0.3)',
          opacity: pop ? 1 : 0,
          transition: 'all 0.55s cubic-bezier(.2,1.2,.3,1)',
          boxShadow: `0 10px 30px ${COLORS.green}55`,
        }}>
          <svg width="42" height="42" viewBox="0 0 42 42"><path d="M11 21l7 7 14-14" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 800, letterSpacing: -0.6, marginTop: 24, textAlign: 'center' }}>Your London guide is ready</div>
        <div style={{ fontFamily: FONT, fontSize: 14, color: COLORS.gray500, marginTop: 10, textAlign: 'center', lineHeight: 1.45, textWrap: 'balance' }}>
          We'll notify you when to leave for each ride — tap to book on your terms.
        </div>
      </div>

      <div style={{ padding: '12px 20px 14px' }}>
        <div style={{ background: '#000', color: '#fff', borderRadius: 16, padding: 18 }}>
          <div style={{ fontFamily: FONT, fontSize: 10.5, fontWeight: 700, letterSpacing: 1.4, color: '#A8A8A8', textTransform: 'uppercase' }}>Upcoming trip</div>
          <div style={{ fontFamily: FONT, fontSize: 20, fontWeight: 800, letterSpacing: -0.4, marginTop: 4 }}>London · May 8–12</div>
          <div style={{ height: 0.5, background: 'rgba(255,255,255,0.12)', margin: '14px 0 2px' }}/>
          {[
            { icon: 'car', text: '12 ride suggestions across 5 days · book any with one tap' },
            { icon: 'plane', text: 'Flights BA178 + BA177 monitored for delays' },
            { icon: 'bell', text: 'Tower of London, London Eye, dinner alerts queued' },
            { icon: 'dollar', text: 'Uber One member · 10% off when you book' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < 3 ? `0.5px solid rgba(255,255,255,0.08)` : 'none' }}>
              <div style={{ width: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {r.icon === 'car' && <svg width="20" height="14" viewBox="0 0 20 14" fill="none"><path d="M2 8 Q4 4 10 4 Q16 4 18 8 L18 11 L2 11 Z" fill="#fff"/><circle cx="6" cy="11" r="1.8" fill="#000"/><circle cx="14" cy="11" r="1.8" fill="#000"/></svg>}
                {r.icon === 'plane' && <svg width="18" height="18" viewBox="0 0 18 18"><path d="M9 1l2 7 6 2v2l-6-1-2 5 1 1H7l1-1-2-5-6 1V10l6-2 2-7z" fill="#fff"/></svg>}
                {r.icon === 'bell' && <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 13V8a5 5 0 0110 0v5l1.5 2h-13L4 13zM7 15a2 2 0 004 0" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/></svg>}
                {r.icon === 'dollar' && <svg width="16" height="18" viewBox="0 0 16 18" fill="none"><path d="M8 1v16M12 5H6a2 2 0 000 4h4a2 2 0 010 4H4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/></svg>}
              </div>
              <div style={{ fontFamily: FONT, fontSize: 13.5, fontWeight: 500 }}>{r.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 20px 24px' }}>
        <div style={{ background: COLORS.gray50, borderRadius: 12, padding: '14px 16px', fontFamily: FONT, fontSize: 12.5, color: COLORS.gray700, lineHeight: 1.45 }}>
          We'll notify you when to leave. Tap any leg to book your ride.
        </div>
      </div>
    </ScreenShell>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 9 — Morning Of
// ─────────────────────────────────────────────────────────────
const DAY_DATA = {
  1: {
    tabLabel: 'Day 1',
    tabSub: 'Fri May 8',
    dateLabel: 'FRI MAY 8 · 7:00 AM',
    subtitle: 'Your London trip starts today 🇬🇧',
    nextRide: {
      label: 'Time to leave · in 60 min',
      title: 'Home → JFK Airport',
      stats: [
        { label: 'Pickup', value: '8:00 AM', color: '#fff' },
        { label: 'TSA Wait Time', value: '~14 min', color: '#fff' },
        { label: 'Traffic', value: 'Light', color: COLORS.green },
      ],
    },
    prompt: null,
    schedule: [
      { dot: COLORS.green, active: true, title: 'Ride to JFK Airport', time: '8:00 AM' },
      { dot: COLORS.gray400, title: 'Flight BA178 to London (LHR)', time: '11:00 AM' },
      { dot: COLORS.gray400, title: 'Ride LHR → The Hoxton, Holborn', time: '11:45 PM (UK)' },
    ],
  },
  2: {
    tabLabel: 'Day 2',
    tabSub: 'Sat May 9',
    dateLabel: 'SAT MAY 9 · 9:00 AM',
    subtitle: 'Tower of London + Dishoom dinner tonight',
    nextRide: {
      label: 'Time to leave · in 30 min',
      title: 'Hotel → Tower of London',
      stats: [
        { label: 'Pickup', value: '9:30 AM', color: '#fff' },
        { label: 'Drive Time', value: '~12 min', color: '#fff' },
        { label: 'Traffic', value: 'Light', color: COLORS.green },
      ],
    },
    prompt: null,
    schedule: [
      { dot: COLORS.green, active: true, title: 'Ride to Tower of London', time: '9:30 AM' },
      { dot: COLORS.gray400, title: 'Ride to Borough Market · lunch', time: '1:00 PM' },
      { dot: COLORS.gray400, title: 'Ride back to hotel', time: '3:30 PM' },
      { dot: COLORS.gray400, title: 'Ride to Dishoom · 7:30 PM seating', time: '7:00 PM' },
      { dot: COLORS.gray400, title: 'Ride home from dinner', time: '9:45 PM' },
    ],
  },
  3: {
    tabLabel: 'Day 3',
    tabSub: 'Sun May 10',
    dateLabel: 'SUN MAY 10 · 9:00 AM',
    subtitle: 'British Museum + London Eye this afternoon',
    nextRide: {
      label: 'Time to leave · in 60 min',
      title: 'Hotel → British Museum',
      stats: [
        { label: 'Pickup', value: '10:00 AM', color: '#fff' },
        { label: 'Drive Time', value: '~6 min', color: '#fff' },
        { label: 'Traffic', value: 'Light', color: COLORS.green },
      ],
    },
    prompt: null,
    schedule: [
      { dot: COLORS.green, active: true, title: 'Ride to British Museum', time: '10:00 AM' },
      { dot: COLORS.gray400, title: 'Ride to London Eye (Viator entry 2:30 PM)', time: '1:30 PM' },
      { dot: COLORS.gray400, title: 'Ride back to hotel', time: '4:30 PM' },
      { dot: COLORS.gray400, title: 'Ride to Sunday roast (Hawksmoor)', time: '7:00 PM' },
    ],
  },
  4: {
    tabLabel: 'Day 4',
    tabSub: 'Mon May 11',
    dateLabel: 'MON MAY 11 · 9:30 AM',
    subtitle: 'Westminster Abbey + Tate Modern',
    nextRide: {
      label: 'Time to leave · in 30 min',
      title: 'Hotel → Westminster Abbey',
      stats: [
        { label: 'Pickup', value: '10:00 AM', color: '#fff' },
        { label: 'Drive Time', value: '~12 min', color: '#fff' },
        { label: 'Traffic', value: 'Mon AM moderate', color: COLORS.amber },
      ],
    },
    prompt: null,
    schedule: [
      { dot: COLORS.green, active: true, title: 'Ride to Westminster Abbey', time: '10:00 AM' },
      { dot: COLORS.gray400, title: 'Ride to Tate Modern · lunch', time: '1:00 PM' },
      { dot: COLORS.gray400, title: 'Ride back to hotel', time: '5:00 PM' },
      { dot: COLORS.gray400, title: 'Ride to Sky Garden · sunset', time: '7:30 PM' },
    ],
  },
  5: {
    tabLabel: 'Day 5',
    tabSub: 'Tue May 12',
    dateLabel: 'TUE MAY 12 · 12:00 PM',
    subtitle: 'Heading home today — flight at 6:30 PM',
    nextRide: {
      label: 'Time to leave · in 3 hr',
      title: 'Hotel → LHR Airport',
      stats: [
        { label: 'Pickup', value: '3:00 PM', color: '#fff' },
        { label: 'Security', value: '~28 min', color: COLORS.amber },
        { label: 'Traffic', value: 'Tue PM heavy', color: COLORS.amber },
      ],
    },
    prompt: null,
    schedule: [
      { dot: COLORS.green, active: true, title: 'Ride to LHR Airport', time: '3:00 PM' },
      { dot: COLORS.gray400, title: 'Flight BA177 to JFK', time: '6:30 PM' },
      { dot: COLORS.gray400, title: 'Ride JFK → Home', time: '10:15 PM' },
    ],
  },
};

const RESTAURANTS = [
  { name: 'Dishoom Covent Garden', cuisine: 'Bombay café · Iconic London', rating: 4.8, reviews: '8.2k', price: '$$', rideMin: 18, tag: 'Your reservation', tagColor: COLORS.green, accent: '#065F46', bg: '#E6F7EF' },
  { name: 'Padella', cuisine: 'Italian · Handmade pasta', rating: 4.7, reviews: '4.1k', price: '$$', rideMin: 14, tag: 'Trending', tagColor: COLORS.orange, accent: '#7C2D12', bg: '#FFF4E5' },
  { name: 'Hawksmoor Seven Dials', cuisine: 'British · Steakhouse', rating: 4.8, reviews: '5.6k', price: '$$$$', rideMin: 8, tag: 'Trending', tagColor: COLORS.orange, accent: '#1F2937', bg: '#F3F4F6' },
  { name: 'St. JOHN', cuisine: 'British · Nose-to-tail', rating: 4.6, reviews: '2.3k', price: '$$$', rideMin: 12, tag: 'Neighborhood favorite', tagColor: COLORS.green, accent: '#065F46', bg: '#E6F7EF' },
  { name: 'Gymkhana', cuisine: 'Indian · Mayfair', rating: 4.9, reviews: '3.4k', price: '$$$$', rideMin: 16, tag: null, tagColor: null, accent: '#3D3D3D', bg: '#F6F6F6' },
];

function ExploreRestaurants({ close, onPick }) {
  const [sort, setSort] = React.useState('Trending');
  const [picked, setPicked] = React.useState(null);
  const chips = ['Trending', 'Highest rated', 'Quick bites', '$$ or less', 'Group-friendly'];
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 100 }}>
      <div onClick={close} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', animation: 'fadeIn .2s ease' }}/>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, top: 40,
        background: '#fff', borderTopLeftRadius: 22, borderTopRightRadius: 22,
        display: 'flex', flexDirection: 'column',
        animation: 'slideUp .3s cubic-bezier(.2,.8,.2,1)',
      }}>
        <div style={{ flexShrink: 0, padding: '10px 20px 0' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: COLORS.gray200, margin: '6px auto 14px' }}/>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: 1, color: COLORS.gray500, textTransform: 'uppercase' }}>Dinner · Sat May 9</div>
              <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 800, letterSpacing: -0.5, marginTop: 4 }}>Dishoom area · Covent Garden</div>
              <div style={{ fontFamily: FONT, fontSize: 13, color: COLORS.gray500, marginTop: 4 }}>Pickup ready at 7:00 PM · Reservation at 7:30 PM</div>
            </div>
            <button onClick={close} aria-label="Close" style={{
              width: 32, height: 32, borderRadius: 16, border: 'none',
              background: COLORS.gray100, cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 3l8 8M11 3l-8 8" stroke="#000" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </button>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14, overflowX: 'auto', paddingBottom: 4, marginLeft: -20, paddingLeft: 20, marginRight: -20, paddingRight: 20 }}>
            {chips.map(c => {
              const active = sort === c;
              return (
                <button key={c} onClick={() => setSort(c)} style={{
                  flexShrink: 0, background: active ? '#000' : '#fff',
                  color: active ? '#fff' : '#000',
                  border: `1px solid ${active ? '#000' : COLORS.gray200}`,
                  borderRadius: 999, padding: '8px 14px',
                  fontFamily: FONT, fontSize: 13, fontWeight: 700,
                  cursor: 'pointer', whiteSpace: 'nowrap',
                }}>{c}</button>
              );
            })}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {RESTAURANTS.map((r, i) => {
              const selected = picked === i;
              return (
                <button key={i} onClick={() => setPicked(i)} style={{
                  textAlign: 'left', width: '100%', background: '#fff',
                  border: `${selected ? 2 : 1}px solid ${selected ? '#000' : COLORS.gray200}`,
                  borderRadius: 16, padding: selected ? 13 : 14,
                  display: 'flex', gap: 14, cursor: 'pointer', fontFamily: FONT,
                }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: 12, background: r.bg,
                    flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: r.accent, letterSpacing: -0.5 }}>{r.name.charAt(0)}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ fontSize: 15.5, fontWeight: 800, letterSpacing: -0.2, color: '#000' }}>{r.name}</div>
                      {r.tag && (
                        <span style={{ background: r.tagColor, color: '#fff', fontSize: 9.5, fontWeight: 800, padding: '2px 6px', borderRadius: 6, letterSpacing: 0.3, textTransform: 'uppercase' }}>{r.tag}</span>
                      )}
                    </div>
                    <div style={{ fontSize: 12.5, color: COLORS.gray500, marginTop: 3 }}>{r.cuisine}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, fontSize: 12.5, color: COLORS.gray700, fontWeight: 600 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                        <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1l1.5 3.3 3.5.4-2.6 2.4.8 3.5L6 8.9 2.8 10.6l.8-3.5L1 4.7l3.5-.4L6 1z" fill="#000"/></svg>
                        {r.rating}
                        <span style={{ color: COLORS.gray500, fontWeight: 500 }}>({r.reviews})</span>
                      </span>
                      <span style={{ color: COLORS.gray400 }}>·</span>
                      <span>{r.price}</span>
                      <span style={{ color: COLORS.gray400 }}>·</span>
                      <span>{r.rideMin} min ride</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '20px 2px 16px', padding: '12px 14px', background: COLORS.gray50, borderRadius: 12 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}><path d="M8 1l1.8 4.2L14 6l-3.2 3 .8 4.3L8 11.2 4.4 13.3l.8-4.3L2 6l4.2-.8L8 1z" fill={COLORS.blue}/></svg>
            <div style={{ fontFamily: FONT, fontSize: 12, color: COLORS.gray700, lineHeight: 1.4 }}>
              Uber AI will learn your taste with each trip — future picks get more personal.
            </div>
          </div>
        </div>

        <div style={{ flexShrink: 0, padding: '14px 20px 26px', borderTop: `0.5px solid ${COLORS.gray100}`, background: '#fff' }}>
          <BlackButton
            onClick={() => picked !== null && onPick(RESTAURANTS[picked])}
            style={{ opacity: picked === null ? 0.35 : 1, cursor: picked === null ? 'default' : 'pointer' }}
          >
            {picked === null ? 'Select a spot' : `Book ride to ${RESTAURANTS[picked].name} · 7:00 PM →`}
          </BlackButton>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Explore London — single hero card + drawer with full city insights
// (replaces the previous Discover / Wait Times tabbed widget)
// ─────────────────────────────────────────────────────────────
const LONDON_PERKS = [
  {
    name: 'Monmouth Coffee', where: 'Borough Market · 0.8 mi', rating: 4.8,
    perk: '10% off for Members', time: '~5 min',
    img: { bg: 'linear-gradient(135deg, #6F4E37 0%, #A0826D 100%)', emoji: '☕' },
  },
  {
    name: 'Shoreditch Works', where: 'Shoreditch · 1.2 mi', rating: 4.6,
    perk: 'Free first hour', time: '~2 min',
    img: { bg: 'linear-gradient(135deg, #4B5563 0%, #9CA3AF 100%)', emoji: '💼' },
  },
  {
    name: 'Sky Garden', where: 'Fenchurch St · 2.1 mi', rating: 4.9,
    perk: 'Skip the queue', time: 'No wait',
    img: { bg: 'linear-gradient(135deg, #0EA5E9 0%, #FB923C 100%)', emoji: '🌇' },
  },
  {
    name: 'Borough Market', where: 'Southwark · 1.0 mi', rating: 4.7,
    perk: '£5 Eats credit', time: '~4 min',
    img: { bg: 'linear-gradient(135deg, #16A34A 0%, #FCD34D 100%)', emoji: '🥖' },
  },
];

const LONDON_NEIGHBORHOODS = [
  { name: 'Soho', wait: 3, level: 'med' },
  { name: 'Shoreditch', wait: 2, level: 'low' },
  { name: 'Camden', wait: 5, level: 'high' },
  { name: 'Covent Garden', wait: 4, level: 'med' },
  { name: 'South Bank', wait: 2, level: 'low' },
  { name: 'Notting Hill', wait: 6, level: 'high' },
];

const LONDON_AIRPORTS = [
  { code: 'LHR', name: 'London Heathrow Airport' },
  { code: 'LGW', name: 'London Gatwick Airport' },
  { code: 'STN', name: 'London Stansted Airport' },
  { code: 'LCY', name: 'London City Airport' },
  { code: 'LTN', name: 'London Luton Airport' },
];

function LondonHeroSkyline() {
  return (
    <div style={{
      height: 160, position: 'relative', overflow: 'hidden',
      background: '#1E3A8A',
    }}>
      <img src="assets/Lonben.jpeg" alt="London — Big Ben"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
    </div>
  );
}

function ExploreLondonCard({ onOpen }) {
  return (
    <button onClick={onOpen} style={{
      width: '100%', background: '#fff', border: `1px solid ${COLORS.gray200}`,
      borderRadius: 16, overflow: 'hidden', cursor: 'pointer', textAlign: 'left',
      padding: 0, display: 'block',
    }}>
      <LondonHeroSkyline/>
      <div style={{ padding: '16px 18px 18px' }}>
        <div style={{ fontFamily: FONT, fontSize: 19, fontWeight: 800, letterSpacing: -0.4, color: '#000' }}>
          Explore in London 🇬🇧
        </div>
        <div style={{ fontFamily: FONT, fontSize: 13.5, color: COLORS.gray700, marginTop: 8, lineHeight: 1.4 }}>
          Avg wait <strong style={{ color: '#000' }}>10–15 min</strong> · Avg ride price <strong style={{ color: '#000' }}>€17–€24</strong>
        </div>
        <div style={{ fontFamily: FONT, fontSize: 13.5, fontWeight: 800, color: '#000', marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          Get city insights
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M3 2.5L7 5.5 3 8.5" stroke="#000" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </button>
  );
}

function ExploreLondonDrawer({ open, onClose }) {
  const [expandedAirport, setExpandedAirport] = React.useState(null);
  if (!open) return null;
  const chipColor = (level) => {
    if (level === 'low') return { bg: '#DCFCE7', fg: '#065F46' };
    if (level === 'med') return { bg: '#FEF3C7', fg: '#92400E' };
    return { bg: '#FEE2E2', fg: '#9F1239' };
  };
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 100 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', animation: 'fadeIn 0.2s ease' }}/>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, top: 60,
        background: '#fff', borderTopLeftRadius: 22, borderTopRightRadius: 22,
        animation: 'slideUp 0.3s cubic-bezier(.2,.8,.2,1)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{ flexShrink: 0, padding: '10px 20px 14px', borderBottom: `0.5px solid ${COLORS.gray100}` }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: COLORS.gray200, margin: '6px auto 14px' }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>Explore in London</div>
              <div style={{ fontFamily: FONT, fontSize: 12.5, color: COLORS.gray500, marginTop: 6, lineHeight: 1.5 }}>
                It takes an average of <strong style={{ color: '#000' }}>10–15 min</strong> to get a ride in central London,
                with rides typically costing <strong style={{ color: '#000' }}>€17–€24</strong>. Member perks unlock free delivery, queue skips, and ride credits.
              </div>
            </div>
            <button onClick={onClose} aria-label="Close" style={{
              width: 32, height: 32, borderRadius: 16, border: 'none',
              background: COLORS.gray100, cursor: 'pointer', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 3l8 8M11 3l-8 8" stroke="#000" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px 28px' }}>
          {/* Uber Eats nearby */}
          <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: 1, color: COLORS.gray500, textTransform: 'uppercase', marginBottom: 10 }}>
            ✨ Uber Eats nearby
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
            {LONDON_PERKS.map((p, i) => (
              <div key={i} style={{
                background: '#fff', border: `1px solid ${COLORS.gray200}`, borderRadius: 14,
                padding: 10, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
              }}>
                <div style={{
                  width: 60, height: 60, borderRadius: 10, background: p.img.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: 24,
                }}>{p.img.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
                    <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 800, letterSpacing: -0.2 }}>{p.name}</div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
                      <span style={{ color: '#F59E0B', fontSize: 12 }}>★</span>
                      <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: '#000' }}>{p.rating}</span>
                    </div>
                  </div>
                  <div style={{ fontFamily: FONT, fontSize: 11.5, color: COLORS.gray500, marginTop: 2 }}>{p.where}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                    <span style={{
                      background: '#DBEAFE', color: '#1D4ED8',
                      fontFamily: FONT, fontSize: 11, fontWeight: 700,
                      padding: '3px 8px', borderRadius: 6, letterSpacing: -0.1,
                    }}>{p.perk}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontFamily: FONT, fontSize: 11, color: COLORS.gray500 }}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="5" stroke={COLORS.gray500} strokeWidth="1.2"/>
                        <path d="M6 3.5V6l1.8 1.2" stroke={COLORS.gray500} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {p.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Predicted wait times */}
          <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: 1, color: COLORS.gray500, textTransform: 'uppercase', marginBottom: 10 }}>
            🗺 Predicted wait times by area
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 22 }}>
            {LONDON_NEIGHBORHOODS.map((n, i) => {
              const c = chipColor(n.level);
              return (
                <div key={i} style={{
                  background: '#fff', border: `1px solid ${COLORS.gray200}`, borderRadius: 12,
                  padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M7 1.5C4.8 1.5 3 3.3 3 5.5c0 3 4 7 4 7s4-4 4-7c0-2.2-1.8-4-4-4z" stroke={COLORS.gray500} strokeWidth="1.4" strokeLinejoin="round"/>
                    <circle cx="7" cy="5.5" r="1.5" stroke={COLORS.gray500} strokeWidth="1.4"/>
                  </svg>
                  <div style={{ flex: 1, fontFamily: FONT, fontSize: 13.5, fontWeight: 700, color: '#000' }}>{n.name}</div>
                  <span style={{
                    background: c.bg, color: c.fg, fontFamily: FONT,
                    fontSize: 11, fontWeight: 800, padding: '4px 9px', borderRadius: 6,
                  }}>{n.wait} min</span>
                </div>
              );
            })}
          </div>

          {/* Airports */}
          <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: 1, color: COLORS.gray500, textTransform: 'uppercase', marginBottom: 10 }}>
            ✈️ Need a ride to the airport?
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {LONDON_AIRPORTS.map((a, i) => {
              const isOpen = expandedAirport === a.code;
              return (
                <div key={i} style={{
                  background: '#fff', border: `1px solid ${COLORS.gray200}`, borderRadius: 12, overflow: 'hidden',
                }}>
                  <button onClick={() => setExpandedAirport(isOpen ? null : a.code)} style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                    padding: '11px 14px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left',
                  }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 8, background: '#000',
                      color: '#fff', fontFamily: FONT, fontSize: 11.5, fontWeight: 800,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      letterSpacing: 0.3,
                    }}>{a.code}</div>
                    <div style={{ flex: 1, fontFamily: FONT, fontSize: 13.5, fontWeight: 700, color: '#000' }}>{a.name}</div>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{
                      flexShrink: 0, transition: 'transform 0.18s ease',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}>
                      <path d="M3 4.5l3 3 3-3" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 14px 12px', fontFamily: FONT, fontSize: 12, color: COLORS.gray700, lineHeight: 1.5 }}>
                      Avg ride from central London · <strong>£45–£75</strong> · ~45–60 min depending on traffic. Pre-book via the standard Uber flow.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrapper to keep the existing call site working
function LocalRecsWidget() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <>
      <ExploreLondonCard onOpen={() => setDrawerOpen(true)}/>
      <ExploreLondonDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}/>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// (Removed legacy LocalRecsWidget data — now lives at top of file)
// ─────────────────────────────────────────────────────────────
function _LegacyLocalRecsWidget_unused() {
  const [tab, setTab] = React.useState('discover');
  const PERKS = [
    {
      name: 'Monmouth Coffee',
      where: 'Borough Market · 0.8 mi',
      rating: 4.8,
      perk: '10% off for Members',
      perkColor: '#1D4ED8',
      perkBg: '#DBEAFE',
      time: '~5 min',
      img: { bg: 'linear-gradient(135deg, #6F4E37 0%, #A0826D 100%)', emoji: '☕' },
    },
    {
      name: 'Shoreditch Works',
      where: 'Shoreditch · 1.2 mi',
      rating: 4.6,
      perk: 'Free first hour',
      perkColor: '#1D4ED8',
      perkBg: '#DBEAFE',
      time: '~2 min',
      img: { bg: 'linear-gradient(135deg, #4B5563 0%, #9CA3AF 100%)', emoji: '💼' },
    },
    {
      name: 'Sky Garden',
      where: 'Fenchurch St · 2.1 mi',
      rating: 4.9,
      perk: 'Skip the queue',
      perkColor: '#1D4ED8',
      perkBg: '#DBEAFE',
      time: 'No wait',
      img: { bg: 'linear-gradient(135deg, #0EA5E9 0%, #FB923C 100%)', emoji: '🌇' },
    },
    {
      name: 'Borough Market',
      where: 'Southwark · 1.0 mi',
      rating: 4.7,
      perk: '£5 Eats credit',
      perkColor: '#1D4ED8',
      perkBg: '#DBEAFE',
      time: '~4 min',
      img: { bg: 'linear-gradient(135deg, #16A34A 0%, #FCD34D 100%)', emoji: '🥖' },
    },
  ];

  const NEIGHBORHOODS = [
    { name: 'Soho', wait: 3, level: 'med' },
    { name: 'Shoreditch', wait: 2, level: 'low' },
    { name: 'Camden', wait: 5, level: 'high' },
    { name: 'Covent Garden', wait: 4, level: 'med' },
    { name: 'South Bank', wait: 2, level: 'low' },
    { name: 'Notting Hill', wait: 6, level: 'high' },
  ];

  const chipColor = (level) => {
    if (level === 'low') return { bg: '#DCFCE7', fg: '#065F46' };
    if (level === 'med') return { bg: '#FEF3C7', fg: '#92400E' };
    return { bg: '#FEE2E2', fg: '#9F1239' };
  };

  return (
    <div>
      {/* Tab toggle */}
      <div style={{
        display: 'flex', gap: 6, padding: 4, background: COLORS.gray50,
        borderRadius: 12, border: `1px solid ${COLORS.gray200}`, marginBottom: 14,
      }}>
        {[
          { k: 'discover', label: 'Discover', icon: '✨' },
          { k: 'waitTimes', label: 'Wait Times', icon: '🗺' },
        ].map(t => {
          const active = tab === t.k;
          return (
            <button key={t.k} onClick={() => setTab(t.k)} style={{
              flex: 1, padding: '9px 12px', borderRadius: 9,
              background: active ? '#fff' : 'transparent',
              border: active ? `1px solid ${COLORS.gray300 || '#D1D5DB'}` : '1px solid transparent',
              fontFamily: FONT, fontSize: 13, fontWeight: 700,
              color: active ? '#000' : COLORS.gray500, cursor: 'pointer',
              boxShadow: active ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              transition: 'all 0.15s ease',
            }}>
              <span style={{ fontSize: 13 }}>{t.icon}</span>
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === 'discover' && (
        <>
          <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: 1, color: COLORS.gray500, textTransform: 'uppercase', marginBottom: 10 }}>
            Member perks nearby
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PERKS.map((p, i) => (
              <div key={i} style={{
                background: '#fff', border: `1px solid ${COLORS.gray200}`, borderRadius: 14,
                padding: 10, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 10, background: p.img.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: 26,
                }}>
                  {p.img.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
                    <div style={{ fontFamily: FONT, fontSize: 14.5, fontWeight: 800, letterSpacing: -0.2 }}>{p.name}</div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
                      <span style={{ color: '#F59E0B', fontSize: 12 }}>★</span>
                      <span style={{ fontFamily: FONT, fontSize: 12.5, fontWeight: 700, color: '#000' }}>{p.rating}</span>
                    </div>
                  </div>
                  <div style={{ fontFamily: FONT, fontSize: 12, color: COLORS.gray500, marginTop: 2 }}>{p.where}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 7 }}>
                    <span style={{
                      background: p.perkBg, color: p.perkColor,
                      fontFamily: FONT, fontSize: 11, fontWeight: 700,
                      padding: '3px 8px', borderRadius: 6, letterSpacing: -0.1,
                    }}>{p.perk}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontFamily: FONT, fontSize: 11.5, color: COLORS.gray500 }}>
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="5" stroke={COLORS.gray500} strokeWidth="1.2"/>
                        <path d="M6 3.5V6l1.8 1.2" stroke={COLORS.gray500} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {p.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'waitTimes' && (
        <>
          <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: 1, color: COLORS.gray500, textTransform: 'uppercase', marginBottom: 10 }}>
            Predicted Uber wait times
          </div>
          {/* Map hero */}
          <div style={{
            position: 'relative', height: 130, borderRadius: 14,
            background: 'linear-gradient(135deg, #E5E7EB 0%, #F3F4F6 50%, #E5E7EB 100%)',
            overflow: 'hidden', marginBottom: 12,
          }}>
            {/* Pseudo street grid */}
            <svg viewBox="0 0 320 130" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <path d="M0 30 L320 30 M0 65 L320 65 M0 100 L320 100" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="4 4"/>
              <path d="M50 0 L50 130 M120 0 L120 130 M200 0 L200 130 M270 0 L270 130" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="4 4"/>
              <path d="M30 110 Q90 70 160 80 T300 50" stroke="#9CA3AF" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M0 50 L320 50" stroke="#3B82F6" strokeWidth="2" opacity="0.3" strokeDasharray="6 6"/>
              {/* Pins */}
              <circle cx="80" cy="40" r="6" fill="#10B981"/>
              <circle cx="80" cy="40" r="3" fill="#fff"/>
              <circle cx="220" cy="90" r="6" fill="#F59E0B"/>
              <circle cx="220" cy="90" r="3" fill="#fff"/>
              <circle cx="270" cy="30" r="6" fill="#EF4444"/>
              <circle cx="270" cy="30" r="3" fill="#fff"/>
            </svg>
            {/* Centered overlay */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              background: '#fff', borderRadius: 12, padding: '10px 14px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.12)', textAlign: 'center',
            }}>
              <div style={{ fontFamily: FONT, fontSize: 13.5, fontWeight: 800, letterSpacing: -0.2 }}>Central London</div>
              <div style={{ fontFamily: FONT, fontSize: 11.5, color: COLORS.gray500, marginTop: 1 }}>Avg. wait: 3 min</div>
            </div>
          </div>

          {/* Neighborhood list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {NEIGHBORHOODS.map((n, i) => {
              const c = chipColor(n.level);
              return (
                <div key={i} style={{
                  background: '#fff', border: `1px solid ${COLORS.gray200}`, borderRadius: 12,
                  padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
                  cursor: 'pointer',
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M7 1.5C4.8 1.5 3 3.3 3 5.5c0 3 4 7 4 7s4-4 4-7c0-2.2-1.8-4-4-4z" stroke={COLORS.gray500} strokeWidth="1.4" strokeLinejoin="round"/>
                    <circle cx="7" cy="5.5" r="1.5" stroke={COLORS.gray500} strokeWidth="1.4"/>
                  </svg>
                  <div style={{ flex: 1, fontFamily: FONT, fontSize: 14, fontWeight: 700, color: '#000' }}>{n.name}</div>
                  <span style={{
                    background: c.bg, color: c.fg, fontFamily: FONT,
                    fontSize: 11.5, fontWeight: 800, padding: '4px 9px', borderRadius: 6,
                    letterSpacing: -0.1,
                  }}>{n.wait} min</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0, opacity: 0.5 }}>
                    <path d="M3 2.5L6.5 5 3 7.5" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Flight Details Drawer — OAG-powered live flight info
// Shows: check-in desk, baggage drop, gates (with change alert),
// in-flight status, arrival gate, baggage carousel, terminal info.
// ─────────────────────────────────────────────────────────────
function FlightDetailsDrawer({ open, onClose }) {
  if (!open) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 100 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', animation: 'fadeIn 0.2s ease' }}/>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, top: 40,
        background: '#fff', borderTopLeftRadius: 22, borderTopRightRadius: 22,
        animation: 'slideUp 0.3s cubic-bezier(.2,.8,.2,1)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>
        {/* Drag handle + close */}
        <div style={{ flexShrink: 0, position: 'relative' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.4)', margin: '8px auto 0', position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}/>
          <button onClick={onClose} aria-label="Close" style={{
            position: 'absolute', top: 16, right: 16, zIndex: 2,
            width: 32, height: 32, borderRadius: 16, border: 'none',
            background: 'rgba(255,255,255,0.18)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 3l8 8M11 3l-8 8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Dark hero — flight summary */}
        <div style={{ flexShrink: 0, background: '#000', color: '#fff', padding: '26px 22px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: 1, color: COLORS.green,
              textTransform: 'uppercase',
            }}>● Live · OAG data</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 10 }}>
            <span style={{ fontFamily: FONT, fontSize: 28, fontWeight: 800, letterSpacing: -0.6 }}>BA178</span>
            <span style={{ fontFamily: FONT, fontSize: 12.5, color: '#fff', fontWeight: 700, letterSpacing: -0.1 }}>British Airways · Boeing 777</span>
          </div>

          {/* Route */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 800, letterSpacing: -0.5 }}>JFK</div>
              <div style={{ fontFamily: FONT, fontSize: 12.5, color: '#fff', fontWeight: 700, marginTop: 4, letterSpacing: -0.1 }}>New York · 11:00 AM</div>
            </div>
            <div style={{ flex: 1.4, position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
              <div style={{ height: 1.5, flex: 1, background: 'rgba(255,255,255,0.25)' }}/>
              <svg width="20" height="20" viewBox="0 0 24 24" style={{ margin: '0 6px' }}>
                <path d="M22 12 L2 4 L5 12 L2 20 Z" fill="#fff"/>
              </svg>
              <div style={{ height: 1.5, flex: 1, background: 'rgba(255,255,255,0.25)' }}/>
            </div>
            <div style={{ flex: 1, textAlign: 'right' }}>
              <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 800, letterSpacing: -0.5 }}>LHR</div>
              <div style={{ fontFamily: FONT, fontSize: 12.5, color: '#fff', fontWeight: 700, marginTop: 4, letterSpacing: -0.1 }}>London · 11:00 PM</div>
            </div>
          </div>

          {/* Status row */}
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              background: COLORS.green, color: '#fff', fontFamily: FONT, fontSize: 11, fontWeight: 800,
              padding: '4px 10px', borderRadius: 999, letterSpacing: 0.3, textTransform: 'uppercase',
            }}>● On time</span>
            <span style={{ fontFamily: FONT, fontSize: 12.5, color: '#fff', fontWeight: 700, letterSpacing: -0.1 }}>7h 5m flight · 3,459 mi</span>
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 28px' }}>

          {/* DEPARTURE */}
          <div style={{ marginBottom: 22 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
              fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: 1,
              color: COLORS.gray500, textTransform: 'uppercase',
            }}>
              <span>🛫</span> Departure · JFK Terminal 7
            </div>
            <div style={{ background: COLORS.gray50, border: `0.5px solid ${COLORS.gray200}`, borderRadius: 14, overflow: 'hidden' }}>
              <FlightInfoRow label="Check-in desk" value="Desk D" sub="Open until 9:30 AM"/>
              <FlightInfoRow label="Baggage drop" value="Counter 12" sub="3 min walk from check-in"/>
              <FlightInfoRow
                label="Boarding gate"
                value="B22"
                sub="Subject to change · 8 min walk"
                rightBadge={{ text: 'May change', bg: COLORS.amberBg, fg: '#92400E' }}
              />
              <FlightInfoRow label="Boarding time" value="10:30 AM" sub="30 min before takeoff" last/>
            </div>
          </div>

          {/* IN FLIGHT */}
          <div style={{ marginBottom: 22 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
              fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: 1,
              color: COLORS.gray500, textTransform: 'uppercase',
            }}>
              <span>✈️</span> In flight
            </div>
            <div style={{ background: COLORS.gray50, border: `0.5px solid ${COLORS.gray200}`, borderRadius: 14, overflow: 'hidden' }}>
              <FlightInfoRow label="Real-time tracking" value="Active" sub="Monitoring for change"/>
              <FlightInfoRow label="Estimated duration" value="7h 5m" sub="Lands ~11:00 PM London time"/>
              <FlightInfoRow label="Wi-Fi" value="Available" sub="BA Connect · purchase onboard" last/>
            </div>
          </div>

          {/* ARRIVAL */}
          <div style={{ marginBottom: 22 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
              fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: 1,
              color: COLORS.gray500, textTransform: 'uppercase',
            }}>
              <span>🛬</span> Arrival · LHR Terminal 5
            </div>
            <div style={{ background: COLORS.gray50, border: `0.5px solid ${COLORS.gray200}`, borderRadius: 14, overflow: 'hidden' }}>
              <FlightInfoRow label="Arrival gate" value="Gate 14" sub="Updated in real time"/>
              <FlightInfoRow label="Terminal" value="Terminal 5"/>
              <FlightInfoRow
                label="Baggage carousel"
                value="Belt 3"
                sub="Revealed ~5 min before landing"
                rightBadge={{ text: 'Real-time', bg: COLORS.greenBg, fg: '#065F46' }}
              />
              <FlightInfoRow
                label="Walk to Uber pickup"
                value="Zone C"
                sub="4 min walk from Arrivals Hall"
                last
              />
            </div>
          </div>

          {/* Footer attribution */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            padding: '10px 0 4px', fontFamily: FONT, fontSize: 11, color: COLORS.gray500,
          }}>
            <svg width="10" height="10" viewBox="0 0 10 10">
              <circle cx="5" cy="5" r="4" fill={COLORS.green}/>
            </svg>
            <span>Powered by OAG · Live updates pushed to your lock screen</span>
          </div>

        </div>
      </div>
    </div>
  );
}

function FlightInfoRow({ label, value, sub, rightBadge, last }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 14,
      padding: '14px 16px',
      borderBottom: !last ? `0.5px solid ${COLORS.gray200}` : 'none',
      background: '#fff',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: 0.4,
          color: COLORS.gray500, textTransform: 'uppercase',
        }}>{label}</div>
        <div style={{
          fontFamily: FONT, fontSize: 16, fontWeight: 800, color: '#000', marginTop: 3,
          letterSpacing: -0.2,
        }}>{value}</div>
        {sub && (
          <div style={{ marginTop: 6 }}>
            <span style={{
              display: 'inline-block',
              fontFamily: FONT, fontSize: 11.5, fontWeight: 600,
              color: COLORS.gray700, background: COLORS.gray100,
              padding: '4px 9px', borderRadius: 6,
              letterSpacing: -0.1, lineHeight: 1.3,
            }}>{sub}</span>
          </div>
        )}
      </div>
      {rightBadge && (
        <span style={{
          background: rightBadge.bg, color: rightBadge.fg,
          fontFamily: FONT, fontSize: 10, fontWeight: 800,
          padding: '4px 8px', borderRadius: 6, letterSpacing: 0.2,
          flexShrink: 0, textTransform: 'uppercase', marginTop: 4,
        }}>{rightBadge.text}</span>
      )}
    </div>
  );
}

function Screen9() {
  const [day, setDay] = React.useState(1);
  const [orderedMap, setOrderedMap] = React.useState({});
  const [exploreOpen, setExploreOpen] = React.useState(false);
  const [pickedRestaurant, setPickedRestaurant] = React.useState(null);
  const tabStripRef = React.useRef(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);
  const [flightDetailsOpen, setFlightDetailsOpen] = React.useState(false);
  const d = DAY_DATA[day];

  // 5-day London trip — all days are active

  const updateScrollState = () => {
    const el = tabStripRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  React.useEffect(() => {
    // Run twice — once immediately, once after layout settles
    updateScrollState();
    const t = setTimeout(updateScrollState, 50);
    const el = tabStripRef.current;
    if (!el) return () => clearTimeout(t);
    el.addEventListener('scroll', updateScrollState);
    window.addEventListener('resize', updateScrollState);
    return () => {
      clearTimeout(t);
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  const scrollTabs = (dir) => {
    const el = tabStripRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 120, behavior: 'smooth' });
  };
  const ordered = !!orderedMap[day];
  const markOrdered = () => setOrderedMap(m => ({ ...m, [day]: true }));
  const onCtaClick = () => { if (day === 2) setExploreOpen(true); else markOrdered(); };
  const onRestaurantPick = (r) => { setPickedRestaurant(r); setExploreOpen(false); markOrdered(); };
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
    <ScreenShell>
      <div style={{ background: '#000', color: '#fff', padding: '58px 22px 18px' }}>
        <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, color: '#A8A8A8', textTransform: 'uppercase' }}>{d.dateLabel}</div>
        <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 800, letterSpacing: -0.5, marginTop: 8, lineHeight: 1.12 }}>
          Good morning, Alex
        </div>
        <div style={{ fontFamily: FONT, fontSize: 14, color: '#A8A8A8', marginTop: 8 }}>
          {d.subtitle}
        </div>

        {/* day tabs — scrollable with arrow controls */}
        <div style={{ position: 'relative', marginTop: 18 }}>
          {/* Left fade + arrow */}
          {canScrollLeft && (
            <>
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: 28,
                background: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
                pointerEvents: 'none', zIndex: 2, borderTopLeftRadius: 12, borderBottomLeftRadius: 12,
              }}/>
              <button onClick={() => scrollTabs(-1)} aria-label="Previous days" style={{
                position: 'absolute', left: 2, top: '50%', transform: 'translateY(-50%)',
                width: 24, height: 24, borderRadius: 12,
                background: 'rgba(255,255,255,0.92)', color: '#000', border: 'none',
                cursor: 'pointer', zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
              }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M6.5 2L3 5l3.5 3" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </>
          )}

          {/* Scrollable strip */}
          <div
            ref={tabStripRef}
            style={{
              display: 'flex', gap: 6, background: 'rgba(255,255,255,0.08)',
              padding: 4, borderRadius: 12, overflowX: 'auto', overflowY: 'hidden',
              scrollbarWidth: 'none', msOverflowStyle: 'none',
            }}
            className="hide-scrollbar"
          >
            {[1, 2, 3, 4, 5].map(n => {
              const active = day === n;
              return (
                <button key={n} onClick={() => setDay(n)} style={{
                  flex: '0 0 100px', background: active ? '#fff' : 'transparent',
                  color: active ? '#000' : '#A8A8A8',
                  border: 'none', borderRadius: 8, padding: '8px 6px',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                  fontFamily: FONT, textAlign: 'center',
                }}>
                  <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: -0.2 }}>{DAY_DATA[n].tabLabel}</div>
                  <div style={{ fontSize: 10.5, fontWeight: 600, marginTop: 1, opacity: active ? 0.6 : 1 }}>{DAY_DATA[n].tabSub}</div>
                </button>
              );
            })}
          </div>

          {/* Right fade + arrow */}
          {canScrollRight && (
            <>
              <div style={{
                position: 'absolute', right: 0, top: 0, bottom: 0, width: 28,
                background: 'linear-gradient(270deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
                pointerEvents: 'none', zIndex: 2, borderTopRightRadius: 12, borderBottomRightRadius: 12,
              }}/>
              <button onClick={() => scrollTabs(1)} aria-label="More days" style={{
                position: 'absolute', right: 2, top: '50%', transform: 'translateY(-50%)',
                width: 24, height: 24, borderRadius: 12,
                background: 'rgba(255,255,255,0.92)', color: '#000', border: 'none',
                cursor: 'pointer', zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
              }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3.5 2L7 5l-3.5 3" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* active ride */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ background: '#1A1A1A', color: '#fff', borderRadius: 16, padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: COLORS.green, boxShadow: `0 0 0 3px ${COLORS.green}33` }}/>
            <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: 1, color: COLORS.green, textTransform: 'uppercase' }}>{d.nextRide.label}</span>
          </div>
          <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 800, letterSpacing: -0.4, marginTop: 10 }}>{d.nextRide.title}</div>
          <div style={{ display: 'flex', marginTop: 16, borderTop: '0.5px solid rgba(255,255,255,0.12)', paddingTop: 14 }}>
            {d.nextRide.stats.map((s, i) => (
              <div key={i} style={{ flex: 1, borderLeft: i > 0 ? '0.5px solid rgba(255,255,255,0.12)' : 'none', paddingLeft: i > 0 ? 12 : 0 }}>
                <div style={{ fontFamily: FONT, fontSize: 10.5, fontWeight: 600, color: '#A8A8A8', letterSpacing: 0.4, textTransform: 'uppercase' }}>{s.label}</div>
                <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: s.color, marginTop: 3 }}>{s.value}</div>
              </div>
            ))}
          </div>
          <button style={{
            marginTop: 14, width: '100%', background: '#fff', color: '#000',
            border: 'none', borderRadius: 10, padding: '11px',
            fontFamily: FONT, fontSize: 13.5, fontWeight: 800, cursor: 'pointer', letterSpacing: -0.1,
          }}>Book ride →</button>
        </div>
      </div>

      {/* contextual prompt — only when defined for this day */}
      {d.prompt && (
        <div style={{ padding: '14px 20px 0' }}>
          {!ordered ? (
            <div style={{ background: COLORS.amberBg, border: `1px solid ${COLORS.amberBorder}`, borderRadius: 16, padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M3 11h18a0 0 0 010 0 9 9 0 01-18 0z" fill="#7C2D12"/>
                    <path d="M9 3c0 1.2 1 1.8 1 3s-1 1.8-1 3" stroke="#7C2D12" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M12 2c0 1.2 1 1.8 1 3s-1 1.8-1 3" stroke="#7C2D12" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M15 3c0 1.2 1 1.8 1 3s-1 1.8-1 3" stroke="#7C2D12" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <div style={{ fontFamily: FONT, fontSize: 17, fontWeight: 800, color: '#7C2D12', letterSpacing: -0.3 }}>{d.prompt.title}</div>
                </div>
                <span style={{ background: COLORS.orange, color: '#fff', fontFamily: FONT, fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 10 }}>{d.prompt.badge}</span>
              </div>
              <div style={{ fontFamily: FONT, fontSize: 13, color: '#7C2D12', marginTop: 6, lineHeight: 1.4 }}>
                {d.prompt.body}
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                <button onClick={onCtaClick} style={{
                  flex: 1, background: '#000', color: '#fff', border: 'none', borderRadius: 10,
                  padding: '11px', fontFamily: FONT, fontSize: 13.5, fontWeight: 700, cursor: 'pointer',
                }}>{d.prompt.cta}</button>
                <button style={{
                  flex: 1, background: 'transparent', color: '#7C2D12',
                  border: `1px solid ${COLORS.amberBorder}`, borderRadius: 10,
                  padding: '11px', fontFamily: FONT, fontSize: 13.5, fontWeight: 700, cursor: 'pointer',
                }}>Skip</button>
              </div>
            </div>
          ) : (
            <div style={{ background: COLORS.greenBg, border: `1px solid #A7E3C4`, borderRadius: 16, padding: 18, animation: 'fadeIn 0.3s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 14, background: COLORS.green, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 7l3 3 5-5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div style={{ fontFamily: FONT, fontSize: 16, fontWeight: 800, color: '#065F46', letterSpacing: -0.2 }}>{day === 2 && pickedRestaurant ? `Ride booked to ${pickedRestaurant.name}` : d.prompt.confirm}</div>
              </div>
              <div style={{ fontFamily: FONT, fontSize: 13, color: '#065F46', marginTop: 10, lineHeight: 1.4 }}>
                {day === 2 && pickedRestaurant
                  ? `Pickup hotel at 6:50 PM · ${pickedRestaurant.rideMin} min ride · ${pickedRestaurant.cuisine}`
                  : d.prompt.confirmDetail}
              </div>
            </div>
          )}
        </div>
      )}

      {/* today's schedule */}
      <div style={{ padding: '20px 20px 4px' }}>
        <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: 1, color: COLORS.gray500, textTransform: 'uppercase', marginBottom: 12 }}>{day === 1 ? "Today · Ride plan" : `${d.tabLabel} · Ride plan`}</div>
        {d.schedule.map((r, i) => {
          const isDinner = day === 2 && r.title.startsWith('Dinner ride');
          const title = isDinner && pickedRestaurant ? `Dinner ride · ${pickedRestaurant.name}` : r.title;
          const isLast = i === d.schedule.length - 1;
          const isFlight = title.toLowerCase().includes('flight ba178') || title.toLowerCase().includes('flight ba177');
          return (
            <React.Fragment key={i}>
              <div
                onClick={isFlight ? () => setFlightDetailsOpen(true) : undefined}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0',
                  borderBottom: !r.arrivalGuide && !isLast ? `0.5px solid ${COLORS.gray100}` : 'none',
                  cursor: isFlight ? 'pointer' : 'default',
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: 5, background: r.dot, boxShadow: r.active ? `0 0 0 4px ${r.dot}22` : 'none', flexShrink: 0 }}/>
                <div style={{ flex: 1, fontFamily: FONT, fontSize: 14.5, fontWeight: r.active ? 700 : 600, color: r.active ? '#000' : COLORS.gray700, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {title}
                  {isFlight && (
                    <span style={{
                      fontFamily: FONT, fontSize: 9.5, fontWeight: 800, letterSpacing: 0.4,
                      color: '#1D4ED8', background: '#DBEAFE',
                      padding: '2px 6px', borderRadius: 5, textTransform: 'uppercase',
                    }}>Live · Tap</span>
                  )}
                </div>
                <div style={{ fontFamily: FONT, fontSize: 13, color: COLORS.gray500 }}>{r.time}</div>
              </div>
              {r.arrivalGuide && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '0 0 12px 24px', position: 'relative',
                  borderBottom: !isLast ? `0.5px solid ${COLORS.gray100}` : 'none',
                }}>
                  {/* Connector line from parent dot */}
                  <div style={{
                    position: 'absolute', left: 4, top: -4, width: 1.5, height: 18,
                    background: COLORS.gray200,
                  }}/>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="13" cy="4.5" r="2" fill={COLORS.gray500}/>
                    <path d="M11 8l-2 5 3 2 1 5M14 11l3 1 2-2M11 13l-2 7" stroke={COLORS.gray500} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: FONT, fontSize: 13, color: '#000', fontWeight: 800, letterSpacing: -0.2 }}>
                      {typeof r.arrivalGuide === 'string' ? r.arrivalGuide : r.arrivalGuide.lead}
                    </div>
                    {typeof r.arrivalGuide === 'object' && r.arrivalGuide.detail && (
                      <div style={{ fontFamily: FONT, fontSize: 11.5, color: COLORS.gray500, fontWeight: 500, marginTop: 1 }}>
                        {r.arrivalGuide.detail}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Section divider + Explore London — only after arrival (Day 2 onwards) */}
      {day !== 1 && (
        <>
          <div style={{ padding: '4px 20px 0' }}>
            <div style={{ height: 6, background: COLORS.gray50, borderRadius: 3 }}/>
          </div>
          <div style={{ padding: '20px 20px 30px' }}>
            <LocalRecsWidget/>
          </div>
        </>
      )}
    </ScreenShell>

    {exploreOpen && (
      <ExploreRestaurants close={() => setExploreOpen(false)} onPick={onRestaurantPick}/>
    )}
    <FlightDetailsDrawer open={flightDetailsOpen} onClose={() => setFlightDetailsOpen(false)}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Notification — lock screen style, taps to Trip Detected
// ─────────────────────────────────────────────────────────────
function Notification({ go }) {
  return (
    <button onClick={go} style={{
      width: '100%', height: '100%', border: 'none', padding: 0, background: 'none', cursor: 'pointer',
      display: 'block',
    }}>
      <img src="assets/Image -23.png" alt="Notification" style={{
        width: '100%', height: '100%', objectFit: 'cover', display: 'block',
      }}/>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Trip Detected — shown after calendar connect / Enable now
// ─────────────────────────────────────────────────────────────
function TripDetected({ go, calendarSource = 'gmail' }) {
  const sourceLabel = calendarSource === 'outlook' ? 'Outlook Calendar' : calendarSource === 'icloud' ? 'iCloud Calendar' : calendarSource === 'ios' ? 'your device calendar' : 'Gmail Calendar';

  // Add missing detail (mirrors Page 8 pattern)
  const [adding, setAdding] = React.useState(false);
  const [addType, setAddType] = React.useState('activity');
  const [addValue, setAddValue] = React.useState('');
  const [addedItems, setAddedItems] = React.useState([]);
  const ADD_TYPES = [
    { key: 'activity', label: 'Activity', placeholder: 'e.g. Seine River Cruise · Sat 5pm', icon: '🎟️' },
    { key: 'flight',   label: 'Flight',   placeholder: 'e.g. AF234 · May 9, 8:00 AM LHR → ORY', icon: '✈️' },
    { key: 'hotel',    label: 'Hotel',    placeholder: 'e.g. Hôtel Plaza Athénée · 1 night', icon: '🏨' },
    { key: 'reservation', label: 'Reservation', placeholder: 'e.g. Lunch at Le Comptoir · 1pm', icon: '🍽️' },
  ];
  const confirmAdd = () => {
    if (!addValue.trim()) return;
    const t = ADD_TYPES.find(t => t.key === addType);
    setAddedItems(items => [...items, { icon: t.icon, label: t.label, value: addValue.trim() }]);
    setAddType('activity');
    setAddValue('');
    setAdding(false);
  };

  return (
    <ScreenShell>
      {/* header */}
      <div style={{ background: '#000', color: '#fff', padding: '58px 22px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: COLORS.green, boxShadow: `0 0 0 3px ${COLORS.green}33` }}/>
          <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: 1.2, color: COLORS.green, textTransform: 'uppercase' }}>
            ✨ Uber AI · Active
          </span>
        </div>
        <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, color: '#A8A8A8', textTransform: 'uppercase', marginBottom: 8 }}>
          London, UK 🇬🇧
        </div>
        <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1.12 }}>
          New trip detected from your calendar
        </div>
        <div style={{ fontFamily: FONT, fontSize: 14, color: '#A8A8A8', marginTop: 8 }}>
          Fri May 8 → Tue May 12 · 5 days · couple · via {sourceLabel}
        </div>
      </div>

      {/* detection card — bookends only */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: 1, color: COLORS.gray500, textTransform: 'uppercase', marginBottom: 8 }}>
          Inbound & outbound
        </div>
        <div style={{ background: COLORS.gray50, borderRadius: 16, overflow: 'hidden', border: `0.5px solid ${COLORS.gray200}` }}>
          {[
            { icon: '✈️', label: 'Outbound flight', value: 'BA178 · JFK → LHR · Fri May 8, 11:00 AM', status: 'British Airways' },
            { icon: '🏨', label: 'Hotel', value: 'The Hoxton, Holborn · 4 nights', status: 'Booking.com' },
            { icon: '🛬', label: 'Return flight', value: 'BA177 · LHR → JFK · Tue May 12, 6:30 PM', status: 'British Airways' },
          ].map((r, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px',
              borderBottom: `0.5px solid ${COLORS.gray200}`,
            }}>
              <div style={{ fontSize: 18, width: 28, textAlign: 'center', flexShrink: 0 }}>{r.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: COLORS.gray500, textTransform: 'uppercase', letterSpacing: 0.4 }}>{r.label}</div>
                <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: '#000', marginTop: 2 }}>{r.value}</div>
              </div>
              <span style={{ background: COLORS.greenBg, color: COLORS.green, fontFamily: FONT, fontSize: 11, fontWeight: 800, padding: '3px 8px', borderRadius: 6 }}>{r.status}</span>
            </div>
          ))}

          {/* User-added items */}
          {addedItems.map((r, i) => (
            <div key={'added-' + i} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px',
              borderBottom: `0.5px solid ${COLORS.gray200}`,
            }}>
              <div style={{ fontSize: 18, width: 28, textAlign: 'center', flexShrink: 0 }}>{r.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: COLORS.gray500, textTransform: 'uppercase', letterSpacing: 0.4 }}>{r.label}</div>
                <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: '#000', marginTop: 2 }}>{r.value}</div>
              </div>
              <span style={{ background: COLORS.gray100, color: COLORS.gray700, fontFamily: FONT, fontSize: 11, fontWeight: 800, padding: '3px 8px', borderRadius: 6 }}>Added by you</span>
            </div>
          ))}

          {/* Add missing detail row */}
          {!adding ? (
            <button onClick={() => setAdding(true)} style={{
              width: '100%', background: 'none', border: 'none', textAlign: 'left',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
              padding: '13px 14px',
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#fff', border: `1.5px dashed ${COLORS.gray400}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="#000" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
              <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: '#000' }}>Add missing detail</div>
              <div style={{ marginLeft: 'auto', fontFamily: FONT, fontSize: 12, color: COLORS.gray400 }}>flight, hotel, activity…</div>
            </button>
          ) : (
            <div style={{ padding: '14px 14px' }}>
              {/* type chips */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                {ADD_TYPES.map(t => (
                  <button key={t.key} onClick={() => setAddType(t.key)} style={{
                    padding: '5px 12px', borderRadius: 20, fontFamily: FONT, fontSize: 12.5, fontWeight: 700,
                    cursor: 'pointer', border: 'none',
                    background: addType === t.key ? '#000' : COLORS.gray100,
                    color: addType === t.key ? '#fff' : COLORS.gray700,
                    transition: 'all 0.15s',
                  }}>{t.label}</button>
                ))}
              </div>
              {/* input */}
              <input
                autoFocus
                value={addValue}
                onChange={e => setAddValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && confirmAdd()}
                placeholder={ADD_TYPES.find(t => t.key === addType)?.placeholder}
                style={{
                  width: '100%', fontFamily: FONT, fontSize: 14, fontWeight: 500,
                  border: `1.5px solid #000`, borderRadius: 8, padding: '9px 12px',
                  outline: 'none', background: '#fff', marginBottom: 10,
                }}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={confirmAdd} style={{
                  flex: 1, background: '#000', color: '#fff', border: 'none', borderRadius: 8,
                  padding: '10px', fontFamily: FONT, fontSize: 13.5, fontWeight: 700, cursor: 'pointer',
                }}>Add</button>
                <button onClick={() => { setAdding(false); setAddValue(''); }} style={{
                  flex: 1, background: COLORS.gray100, color: '#000', border: 'none', borderRadius: 8,
                  padding: '10px', fontFamily: FONT, fontSize: 13.5, fontWeight: 700, cursor: 'pointer',
                }}>Cancel</button>
              </div>
            </div>
          )}
        </div>

        {/* Reservations footer chip */}
        <div style={{
          marginTop: 10, display: 'flex', alignItems: 'center', gap: 10,
          background: COLORS.greenBg, border: `1px solid #A7E3C4`, borderRadius: 12, padding: '11px 14px',
        }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: COLORS.green, flexShrink: 0, boxShadow: `0 0 0 3px ${COLORS.green}33` }}/>
          <div style={{ fontFamily: FONT, fontSize: 12.5, color: '#065F46', lineHeight: 1.4, flex: 1 }}>
            <strong>+ 3 reservations also detected</strong> — Tower of London, London Eye, Dishoom dinner. Included in your day-by-day plan.
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '20px 20px 0' }}>
        <BlackButton onClick={go}>Review AI plan →</BlackButton>
      </div>
    </ScreenShell>
  );
}

// ─────────────────────────────────────────────────────────────
// Auth screens — shown between Invite and Calendar
// ─────────────────────────────────────────────────────────────

function GrayButton({ children, onClick, icon }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', background: COLORS.gray100, color: '#000', border: 'none',
      borderRadius: 14, padding: '15px 20px', fontFamily: FONT, fontSize: 15.5,
      fontWeight: 700, cursor: 'pointer', letterSpacing: -0.2,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    }}>
      {icon}
      {children}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path d="M17.64 9.2c0-.64-.06-1.25-.17-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.92a8.78 8.78 0 002.68-6.62z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.87-3.04.87-2.34 0-4.33-1.58-5.04-3.71H.92v2.33A9 9 0 009 18z" fill="#34A853"/>
      <path d="M3.96 10.72A5.4 5.4 0 013.68 9c0-.6.1-1.18.28-1.72V4.96H.92A9 9 0 000 9c0 1.45.35 2.83.92 4.04l3.04-2.32z" fill="#FBBC05"/>
      <path d="M9 3.58c1.32 0 2.5.46 3.44 1.35l2.58-2.58A9 9 0 009 0 9 9 0 00.92 4.96l3.04 2.32C4.67 5.16 6.66 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path d="M13.36 9.56c-.02-1.85 1.51-2.74 1.58-2.78-.86-1.26-2.2-1.43-2.68-1.45-1.14-.12-2.22.67-2.8.67-.58 0-1.47-.66-2.42-.64-1.25.02-2.4.72-3.04 1.84-1.3 2.25-.33 5.58.93 7.4.62.9 1.35 1.9 2.3 1.87.92-.04 1.27-.6 2.38-.6 1.1 0 1.43.6 2.4.58.99-.02 1.62-.91 2.22-1.81.7-1.04.99-2.05 1.01-2.1-.02-.01-1.94-.75-1.96-2.98zM11.6 4.1c.5-.61.84-1.46.75-2.3-.72.03-1.6.48-2.12 1.08-.46.54-.87 1.41-.76 2.24.8.06 1.62-.4 2.13-1.02z" fill="#000"/>
    </svg>
  );
}

function AuthPhone({ back, go, persona }) {
  const [value, setValue] = React.useState('');
  return (
    <ScreenShell>
      <div style={{ padding: '58px 20px 0' }}><BackArrow onClick={back}/></div>
      <div style={{ padding: '18px 24px 24px' }}>
        <h1 style={{ fontFamily: FONT, fontSize: 28, fontWeight: 800, lineHeight: 1.12, letterSpacing: -0.7, margin: 0 }}>
          What's your phone number or email?
        </h1>
        <p style={{ fontFamily: FONT, fontSize: 14, color: COLORS.gray500, marginTop: 10, lineHeight: 1.45 }}>
          We'll use this to link your Uber One invite to your Uber account.
        </p>
      </div>
      <div style={{ padding: '0 20px' }}>
        <div style={{ background: COLORS.gray100, borderRadius: 14, padding: '16px 18px', fontFamily: FONT, fontSize: 15, color: value ? '#000' : COLORS.gray500 }}>
          {value || 'Enter phone number or email'}
        </div>
        <div style={{ marginTop: 14 }}>
          <BlackButton onClick={go}>Continue</BlackButton>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '22px 0' }}>
          <div style={{ flex: 1, height: 1, background: COLORS.gray200 }}/>
          <span style={{ fontFamily: FONT, fontSize: 13, color: COLORS.gray500, fontWeight: 600 }}>or</span>
          <div style={{ flex: 1, height: 1, background: COLORS.gray200 }}/>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <GrayButton icon={<GoogleIcon/>} onClick={go}>Continue with Google</GrayButton>
          <GrayButton icon={<AppleIcon/>} onClick={go}>Continue with Apple</GrayButton>
        </div>
        {persona === 'personal' && (
          <p style={{ fontFamily: FONT, fontSize: 12, color: COLORS.gray500, marginTop: 20, textAlign: 'center', lineHeight: 1.5 }}>
            Already have a personal Uber? Use the same number — we'll link your business profile without touching your ride history.
          </p>
        )}
      </div>
    </ScreenShell>
  );
}

function AuthSMS({ back, go }) {
  return (
    <ScreenShell stickyBottom={<BlackButton onClick={go}>Verify and continue →</BlackButton>}>
      <div style={{ padding: '58px 20px 0' }}><BackArrow onClick={back}/></div>
      <div style={{ padding: '18px 24px 24px' }}>
        <h1 style={{ fontFamily: FONT, fontSize: 28, fontWeight: 800, lineHeight: 1.12, letterSpacing: -0.7, margin: 0 }}>
          Enter the 6-digit code
        </h1>
        <p style={{ fontFamily: FONT, fontSize: 14, color: COLORS.gray500, marginTop: 10, lineHeight: 1.45 }}>
          Sent to (•••) •••-4729. Didn't get it? <span style={{ color: '#000', fontWeight: 700, textDecoration: 'underline' }}>Resend code</span>
        </p>
      </div>
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between' }}>
          {['4', '9', '2', '', '', ''].map((d, i) => (
            <div key={i} style={{
              flex: 1, aspectRatio: '1', maxWidth: 52,
              background: '#fff', border: `${d ? 2 : 1}px solid ${d ? '#000' : COLORS.gray200}`,
              borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FONT, fontSize: 22, fontWeight: 800, color: '#000',
            }}>{d}</div>
          ))}
        </div>
        <p style={{ fontFamily: FONT, fontSize: 12, color: COLORS.gray500, marginTop: 22, lineHeight: 1.5 }}>
          By continuing, you agree to Uber's Terms of Service and Privacy Notice. Uber One will see your name and rides tagged as business — not your personal history.
        </p>
      </div>
    </ScreenShell>
  );
}

function AuthName({ back, go }) {
  return (
    <ScreenShell stickyBottom={<BlackButton onClick={go}>Create account →</BlackButton>}>
      <div style={{ padding: '58px 20px 0' }}><BackArrow onClick={back}/></div>
      <div style={{ padding: '18px 24px 24px' }}>
        <h1 style={{ fontFamily: FONT, fontSize: 28, fontWeight: 800, lineHeight: 1.12, letterSpacing: -0.7, margin: 0 }}>
          Tell us about you
        </h1>
        <p style={{ fontFamily: FONT, fontSize: 14, color: COLORS.gray500, marginTop: 10, lineHeight: 1.45 }}>
          We'll use your work email to send business receipts and power your AI travel plans.
        </p>
      </div>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { label: 'First name', value: 'Alex' },
          { label: 'Last name', value: 'Vuppalapati' },
          { label: 'Work email', value: 'sai@acecorp.com' },
        ].map(f => (
          <div key={f.label} style={{ background: COLORS.gray100, borderRadius: 14, padding: '12px 16px' }}>
            <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: COLORS.gray500, letterSpacing: 0.3, textTransform: 'uppercase' }}>{f.label}</div>
            <div style={{ fontFamily: FONT, fontSize: 15, color: '#000', marginTop: 3, fontWeight: 600 }}>{f.value}</div>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 14, padding: 14, background: COLORS.gray50, borderRadius: 12 }}>
          <svg width="18" height="18" viewBox="0 0 18 18" style={{ flexShrink: 0, marginTop: 1 }}><path d="M9 1a4 4 0 014 4v3h1a2 2 0 012 2v6a2 2 0 01-2 2H3a2 2 0 01-2-2v-6a2 2 0 012-2h1V5a4 4 0 014-4zm0 2a2 2 0 00-2 2v3h4V5a2 2 0 00-2-2z" fill={COLORS.gray700}/></svg>
          <div style={{ fontFamily: FONT, fontSize: 12, color: COLORS.gray700, lineHeight: 1.45 }}>
            Work email is required for business rides. Uber One covers eligible trips; personal rides stay billed to you.
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

function AuthWelcomeBack({ back, go }) {
  return (
    <ScreenShell stickyBottom={<BlackButton onClick={go}>Continue to calendar setup →</BlackButton>}>
      <div style={{ padding: '58px 20px 0' }}><BackArrow onClick={back}/></div>
      <div style={{ padding: '24px 24px 20px', textAlign: 'center' }}>
        <div style={{
          width: 80, height: 80, borderRadius: 40, background: '#000',
          margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: FONT, fontSize: 32, fontWeight: 800, color: '#fff', letterSpacing: -0.5,
          boxShadow: `0 0 0 6px ${COLORS.greenBg}, 0 0 0 8px ${COLORS.green}`,
        }}>S</div>
        <h1 style={{ fontFamily: FONT, fontSize: 28, fontWeight: 800, lineHeight: 1.15, letterSpacing: -0.7, margin: 0 }}>
          Welcome back, Alex
        </h1>
        <p style={{ fontFamily: FONT, fontSize: 14, color: COLORS.gray500, marginTop: 10, lineHeight: 1.5 }}>
          We recognized this number from your personal Uber. Uber One can now use the same account for business rides — your ride history stays private.
        </p>
      </div>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ background: COLORS.gray50, borderRadius: 14, padding: 16, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 16, background: '#fff', border: `1px solid ${COLORS.gray200}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 4h10v8H3zM3 4l5 4 5-4" stroke="#000" strokeWidth="1.4" fill="none" strokeLinejoin="round"/></svg>
          </div>
          <div>
            <div style={{ fontFamily: FONT, fontSize: 13.5, fontWeight: 800, letterSpacing: -0.2 }}>Confirm your work email</div>
            <div style={{ fontFamily: FONT, fontSize: 12.5, color: COLORS.gray500, marginTop: 3, lineHeight: 1.45 }}>sai@acecorp.com — required for expensing and trip AI</div>
          </div>
        </div>
        <div style={{ background: COLORS.gray50, borderRadius: 14, padding: 16, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 16, background: '#fff', border: `1px solid ${COLORS.gray200}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 1a4 4 0 014 4v2h1a1 1 0 011 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1h1V5a4 4 0 014-4zm0 2a2 2 0 00-2 2v2h4V5a2 2 0 00-2-2z" fill="#000"/></svg>
          </div>
          <div>
            <div style={{ fontFamily: FONT, fontSize: 13.5, fontWeight: 800, letterSpacing: -0.2 }}>Your personal rides stay yours</div>
            <div style={{ fontFamily: FONT, fontSize: 12.5, color: COLORS.gray500, marginTop: 3, lineHeight: 1.45 }}>Uber One only sees trips tagged as business. Your history, payment, and favorites remain private.</div>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

Object.assign(window, {
  Screen1, Screen2, Screen3, Screen4, Screen5, Screen6, Screen7, Screen8, Screen9,
  AuthPhone, AuthSMS, AuthName, AuthWelcomeBack, Notification, TripDetected,
  CalendarScanning, Screen2EventsPreview, CalendarPermission, CalendarOAuth,
  EnableSheet, ManualForm, COLORS, FONT,
});
