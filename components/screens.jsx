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
// Screen 1 — Activate Uber for Business
// ─────────────────────────────────────────────────────────────
function Screen1({ go }) {
  return (
    <ScreenShell>
      <div style={{ padding: '58px 24px 12px', fontFamily: FONT, fontSize: 26, fontWeight: 800, letterSpacing: -0.6 }}>Uber</div>

      <div style={{ padding: '12px 24px 20px' }}>
        <h1 style={{ fontFamily: FONT, fontSize: 28, fontWeight: 800, lineHeight: 1.12, letterSpacing: -0.7, margin: 0, textWrap: 'balance' }}>
          Sai, join your team on Uber for Business
        </h1>
        <p style={{ fontFamily: FONT, fontSize: 15, lineHeight: 1.45, color: COLORS.gray700, margin: '14px 0 22px' }}>
          Ace Corp has invited you to join their Uber for Business account. Enjoy stress-free rides, expensing, and a new AI travel assistant.
        </p>
        <button onClick={go} style={{
          background: COLORS.black, color: '#fff', border: 'none',
          borderRadius: 10, padding: '12px 18px', fontFamily: FONT, fontSize: 14,
          fontWeight: 700, cursor: 'pointer', letterSpacing: -0.1,
        }}>Activate your account →</button>
      </div>

      {/* Hero image */}
      <div style={{ position: 'relative', height: 270, background: '#000', overflow: 'hidden' }}>
        <img src="assets/uber-for-business-hero.jpg" alt="Uber for Business" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
      </div>

      <div style={{ padding: '28px 24px 20px' }}>
        {[
          { icon: 'receipt', title: 'No more reimbursing', body: 'Charge eligible rides to the group' },
          { icon: 'mail', title: 'Keep work rides separate', body: 'Receipts sent to your work email' },
          { icon: 'ai', title: 'AI travel planning', body: 'Uber plans every ride — home, airport, hotel, meetings, and back', isNew: true },
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
// Screen 2 — Link Calendar
// ─────────────────────────────────────────────────────────────
function Screen2({ go, back, skip }) {
  const [selected, setSelected] = React.useState(0);
  const opts = [
    { title: 'Connect with Gmail', sub: 'Read-only · for Gmail users', icon: 'gmail' },
    { title: 'Connect with Outlook', sub: 'Read-only · for Microsoft 365 users', icon: 'outlook' },
  ];
  return (
    <ScreenShell stickyBottom={
      <>
        <BlackButton onClick={go}>Connect and continue →</BlackButton>
        <GhostText onClick={skip || go} style={{ paddingBottom: 0 }}>Skip for now</GhostText>
      </>
    }>
      <div style={{ padding: '58px 20px 0' }}>
        <BackArrow onClick={back}/>
      </div>
      <div style={{ padding: '18px 24px 12px' }}>
        <h1 style={{ fontFamily: FONT, fontSize: 28, fontWeight: 800, lineHeight: 1.12, letterSpacing: -0.7, margin: 0 }}>
          Connect your travel info
        </h1>
        <p style={{ fontFamily: FONT, fontSize: 14.5, lineHeight: 1.45, color: COLORS.gray500, margin: '10px 0 22px' }}>
          So Uber AI can automatically detect your trips and build your door to door group transporation plan. You control what we access.
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.2 }}>{o.title}</div>
                {o.badge && <span style={{ background: COLORS.blue, color: '#fff', fontSize: 9.5, fontWeight: 700, padding: '2px 7px', borderRadius: 10, letterSpacing: 0.1 }}>{o.badge}</span>}
              </div>
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

      <div style={{ padding: '18px 20px 20px' }}>
        <div style={{ background: COLORS.gray50, borderRadius: 12, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
            <rect x="3" y="8" width="12" height="8" rx="1.5" stroke="#000" strokeWidth="1.5"/>
            <path d="M6 8V6a3 3 0 016 0v2" stroke="#000" strokeWidth="1.5"/>
          </svg>
          <div style={{ fontFamily: FONT, fontSize: 12.5, color: COLORS.gray700, lineHeight: 1.45 }}>
            Read-only access only. We never store email content. Revoke anytime in Settings.
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
  if (kind === 'forward') return box(COLORS.gray50, <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="6" width="16" height="11" rx="1.5" stroke="#000" strokeWidth="1.5"/><path d="M3 7l8 5 8-5" stroke="#000" strokeWidth="1.5"/><path d="M14 3l3 2-3 2" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);
  return box(COLORS.gray50, <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M13 4l5 5-9 9H4v-5l9-9z" stroke="#000" strokeWidth="1.5" strokeLinejoin="round"/></svg>);
}

// ─────────────────────────────────────────────────────────────
// Screen 3 — Business Hub with banner
// ─────────────────────────────────────────────────────────────
function Screen3({ go, openSheet, goManual }) {
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

      {/* New feature banner */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ background: '#000', borderRadius: 16, padding: 18, color: '#fff', fontFamily: FONT }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: COLORS.green, boxShadow: `0 0 0 3px ${COLORS.green}33` }}/>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', color: '#CFE9DE' }}>New — Uber Business Travel AI</span>
          </div>
          <div style={{ fontSize: 19, fontWeight: 800, lineHeight: 1.2, letterSpacing: -0.4, marginBottom: 8 }}>
            Let Uber plan your next business trip automatically
          </div>
          <div style={{ fontSize: 13, color: '#A8A8A8', lineHeight: 1.4, marginBottom: 14 }}>
            Connect your calendar or email so Uber AI can detect upcoming trips and pre-book all your ground transport.
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

      {/* Company */}
      <div style={{ padding: '22px 24px 6px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: 22, background: COLORS.orange, color: '#fff', fontFamily: FONT, fontWeight: 800, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>A</div>
        <div>
          <div style={{ fontFamily: FONT, fontSize: 18, fontWeight: 800, letterSpacing: -0.3, display: 'flex', alignItems: 'center', gap: 6 }}>
            Ace Corp
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
    </ScreenShell>
  );
}

// Bottom sheet for Enable Now
function EnableSheet({ close, go }) {
  const [selected, setSelected] = React.useState(0);
  const opts = [
    { title: 'Connect Google Calendar', sub: 'Read-only · recommended', icon: 'gcal' },
    { title: 'Connect Outlook Calendar', sub: 'For Microsoft 365 users', icon: 'outlook' },
    { title: 'Forward confirmation emails', sub: 'trips@uber.com', icon: 'forward' },
    { title: 'Enter manually', sub: 'Type or photograph itinerary', icon: 'edit' },
  ];
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
          <BlackButton onClick={go}>Connect and continue →</BlackButton>
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
          { label: 'Destination city', value: 'San Jose, California' },
          { label: 'Travel dates', value: 'May 4–16, 2026' },
          { label: 'Flight number (optional)', value: 'AS401' },
          { label: 'Hotel name (optional)', value: 'Marriott San Jose' },
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
    { icon: 'plane', label: 'Flight', value: 'AS401 · May 4, 7:30 AM → 9:45 AM' },
    { icon: 'bed',   label: 'Hotel',  value: 'Marriott San Jose' },
    { icon: 'cal',   label: 'Meetings', value: '3 meetings · Ace Corp HQ, San Jose' },
  ]);
  const [editing, setEditing] = React.useState(null); // index being edited
  const [draft, setDraft] = React.useState('');
  const [adding, setAdding] = React.useState(false);
  const [addType, setAddType] = React.useState('meeting');
  const [addValue, setAddValue] = React.useState('');

  const ADD_TYPES = [
    { key: 'meeting', label: 'Meeting', placeholder: 'e.g. Lunch at Soho House, 1pm', icon: 'cal' },
    { key: 'flight',  label: 'Flight',  placeholder: 'e.g. UA901 · Apr 18, 9:00 AM → 11:30 AM', icon: 'plane' },
    { key: 'hotel',   label: 'Hotel',   placeholder: 'e.g. Hyatt Regency Chicago', icon: 'bed' },
    { key: 'location',label: 'Location',placeholder: 'e.g. Client office at 233 S Wacker Dr', icon: 'pin' },
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
          Uber Travel AI · Trip detected
        </div>
        <div style={{ fontFamily: FONT, fontSize: 36, fontWeight: 800, letterSpacing: -0.8, lineHeight: 1.05, marginTop: 8 }}>San Jose,<br/>California</div>
        <div style={{ fontFamily: FONT, fontSize: 14, color: '#A8A8A8', marginTop: 10 }}>May 4–16, 2026 · 13 days</div>
      </div>

      <div style={{ padding: '24px 24px 10px' }}>
        <h2 style={{ fontFamily: FONT, fontSize: 22, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1.18, margin: 0 }}>We found your upcoming business trip</h2>
        <p style={{ fontFamily: FONT, fontSize: 14, color: COLORS.gray500, lineHeight: 1.45, marginTop: 10 }}>
          Ace Corp. has a business travel program. Let Uber AI handle your complete ground transportation — stress-free, door to door.
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
    { type: 'check', text: 'Found flight AS401 to San Jose' },
    { type: 'check', text: 'Found Marriott San Jose' },
    { type: 'check', text: 'Detected 3 meetings at Ace Corp HQ' },
    { type: 'arrow', text: 'Building your ground transport plan...' },
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
        <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 800, letterSpacing: -0.6, marginTop: 26, textAlign: 'center' }}>Building your plan</div>
        <div style={{ fontFamily: FONT, fontSize: 14, color: COLORS.gray500, marginTop: 8, textAlign: 'center' }}>Uber AI is analyzing your trip...</div>

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
      <>
        <BlackButton onClick={goApprove}>Approve all rides →</BlackButton>
        <GhostText onClick={goDelay} style={{ paddingBottom: 0 }}>Preview flight delay scenario</GhostText>
      </>
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
        <div style={{ marginTop: 18, fontFamily: FONT, fontSize: 10.5, fontWeight: 700, letterSpacing: 1.4, color: '#A8A8A8', textTransform: 'uppercase' }}>Door-to-door plan</div>
        <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 800, letterSpacing: -0.6, lineHeight: 1.08, marginTop: 6 }}>San Jose Trip</div>
        <div style={{ fontFamily: FONT, fontSize: 13.5, color: '#A8A8A8', marginTop: 8 }}>May 4–16 · 6 rides · 2 meal prompts</div>
      </div>

      {/* days */}
      <DaySection label="MON MAY 4 — DEPARTURE">
        <TripLeg type="ride" title="Home → SEA Airport" meta="5:30 AM · Business Comfort" detail="TSA Wait Time ~8 min · Terminal S · Traffic clear" tag="Pre-booked"/>
        <TripLeg type="flight" title="AS401: SEA → SJC" meta="7:30 AM → 9:45 AM" detail="Real-time delay monitoring active" tag="Monitoring"/>
        <TripLeg type="ride" title="SJC Airport → Marriott San Jose" meta="Pickup ~10:05 AM" detail="Driver positioned before you land" tag="Pre-staged" last/>
      </DaySection>

      <DaySection label="TUE MAY 5 — FULL WORK DAY">
        <TripLeg type="meal" title="Breakfast suggestion" meta="Deliver to hotel by 7:30 AM" detail="Top picks in Downtown SJ · $45 credit" tag="Uber Eats" tagOrange/>
        <TripLeg type="ride" title="Marriott → Ace Corp HQ" meta="8:30 AM · ~18 min" tag="Suggested"/>
        <TripLeg type="meal" title="Lunch suggestion" meta="Order ahead, deliver to Ace Corp HQ" detail="$45 Uber Eats credit · Ace Corp pays" tag="Uber Eats" tagOrange/>
        <TripLeg type="rideGray" title="End of day → Hotel" meta="Based on 6pm calendar block" tag="Flexible" last/>
      </DaySection>

      <DaySection label="WED MAY 16 — RETURN DAY">
        <TripLeg type="warn" title="Marriott → SJC Airport" meta="3:45 PM · Flight at 6:00 PM" detail="▲ Peak traffic · Avg TSA Wait Time ~27 min · Allow 55 min total" tag="Pre-booked"/>
        <TripLeg type="flight" title="AS408: SJC → SEA" meta="6:00 PM → 8:15 PM" tag="Monitoring"/>
        <TripLeg type="ride" title="SEA Airport → Home" meta="~8:40 PM · evening" tag="Pre-booked" last/>
      </DaySection>

      <div style={{ height: 16 }}/>
    </ScreenShell>
  );
}

function DaySection({ label, children }) {
  return (
    <div style={{ padding: '20px 20px 6px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div style={{ fontFamily: FONT, fontSize: 10.5, fontWeight: 800, letterSpacing: 1, color: COLORS.gray500 }}>{label}</div>
        <div style={{ flex: 1, height: 0.5, background: COLORS.gray200 }}/>
      </div>
      <div>{children}</div>
    </div>
  );
}

function TripLeg({ type, title, meta, detail, tag, tagOrange, last }) {
  const [editing, setEditing] = React.useState(false);
  const [metaVal, setMetaVal] = React.useState(meta);
  const [detailVal, setDetailVal] = React.useState(detail || '');
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
                {tag && (
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
            {detail !== undefined && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontFamily: FONT, fontSize: 10.5, fontWeight: 700, color: COLORS.gray500, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 4 }}>Notes</div>
                <input value={detailVal} onChange={e => setDetailVal(e.target.value)} style={{
                  width: '100%', fontFamily: FONT, fontSize: 12.5, fontWeight: 500,
                  border: `1px solid ${COLORS.gray200}`, borderRadius: 7, padding: '7px 10px',
                  outline: 'none', background: '#fff',
                }}/>
              </div>
            )}
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
            <div style={{ fontFamily: FONT, fontSize: 13, color: '#7C2D12', marginTop: 4, lineHeight: 1.4 }}>AS401 delayed 35 min. Ground transport automatically adjusted.</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 20px 6px', fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: 1, color: COLORS.gray500, textTransform: 'uppercase' }}>What changed</div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <ChangeCard title="Flight AS401" oldVal="Arrives 9:45 AM" newVal="Now 10:20 AM"/>
        <ChangeCard title="SJC Pickup" oldVal="Pickup 10:05 AM" newVal="Now 10:40 AM"/>
        <div style={{ background: COLORS.greenBg, border: `1px solid #A7E3C4`, borderRadius: 12, padding: '14px' }}>
          <div style={{ fontFamily: FONT, fontSize: 13.5, fontWeight: 700, color: '#065F46' }}>11:00 AM Meeting at Ace Corp HQ</div>
          <div style={{ fontFamily: FONT, fontSize: 12.5, color: COLORS.green, marginTop: 4, fontWeight: 600 }}>✓ Still on time — no action needed</div>
        </div>
      </div>

      <div style={{ padding: '20px 20px 24px' }}>
        <div style={{ background: COLORS.gray50, borderRadius: 12, padding: '14px 16px', fontFamily: FONT, fontSize: 12.5, color: COLORS.gray700, lineHeight: 1.45 }}>
          Driver notified automatically. We'll keep monitoring and alert you if anything else changes.
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
        <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 800, letterSpacing: -0.6, marginTop: 24, textAlign: 'center' }}>Plan confirmed</div>
        <div style={{ fontFamily: FONT, fontSize: 14, color: COLORS.gray500, marginTop: 10, textAlign: 'center', lineHeight: 1.45, textWrap: 'balance' }}>
          6 rides pre-scheduled. Flights monitored. All charges to Ace Corp.
        </div>
      </div>

      <div style={{ padding: '12px 20px 14px' }}>
        <div style={{ background: '#000', color: '#fff', borderRadius: 16, padding: 18 }}>
          <div style={{ fontFamily: FONT, fontSize: 10.5, fontWeight: 700, letterSpacing: 1.4, color: '#A8A8A8', textTransform: 'uppercase' }}>Upcoming trip</div>
          <div style={{ fontFamily: FONT, fontSize: 20, fontWeight: 800, letterSpacing: -0.4, marginTop: 4 }}>San Jose · May 4–6</div>
          <div style={{ height: 0.5, background: 'rgba(255,255,255,0.12)', margin: '14px 0 2px' }}/>
          {[
            { icon: 'car', text: '6 rides pre-booked across 3 days' },
            { icon: 'plane', text: 'Flights UA847 + UA234 monitored' },
            { icon: 'bell', text: '2 meal prompts queued' },
            { icon: 'dollar', text: '$45 Uber Eats credit available' },
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
          Notifications sent as each leg approaches. Tap any ride to edit or cancel.
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
    tabSub: 'Mon May 4',
    dateLabel: 'MON MAY 4 · 5:00 AM',
    subtitle: 'Your San Jose trip starts today',
    nextRide: {
      label: 'Next ride · in 45 min',
      title: 'Home → SEA Airport',
      stats: [
        { label: 'Pickup', value: '5:30 AM', color: '#fff' },
        { label: 'TSA Wait Time', value: '~8 min', color: '#fff' },
        { label: 'Traffic', value: 'Clear', color: COLORS.green },
      ],
    },
    prompt: {
      title: 'Order lunch on arrival?',
      badge: 'Uber Eats',
      body: 'You land at 9:45 AM. Pre-order now from 8 top-rated local spots — delivered to Marriott San Jose by ~10:30 AM. Ace Corp meal credit available.',
      cta: 'Explore Uber Eats',
      confirm: 'Lunch ordered!',
      confirmDetail: 'Arrives at Marriott San Jose by 10:30 AM · Ace Corp meal credit applied',
    },
    schedule: [
      { dot: COLORS.green, active: true, title: 'Ride to SEA Airport', time: '5:30 AM' },
      { dot: COLORS.gray400, title: 'Flight AS401 to San Jose', time: '7:30 AM' },
      { dot: COLORS.gray400, title: 'Ride SJC → Marriott San Jose', time: '10:05 AM' },
    ],
  },
  2: {
    tabLabel: 'Day 2',
    tabSub: 'Tue May 5',
    dateLabel: 'TUE MAY 5 · 7:15 AM',
    subtitle: 'Full day of meetings in San Jose',
    nextRide: {
      label: 'Next ride · in 35 min',
      title: 'Marriott → Salesforce Tower',
      stats: [
        { label: 'Pickup', value: '7:50 AM', color: '#fff' },
        { label: 'Drive Time', value: '~12 min', color: '#fff' },
        { label: 'Traffic', value: 'Moderate', color: COLORS.amber },
      ],
    },
    prompt: {
      title: 'Dinner tonight?',
      badge: 'Uber',
      body: 'Your last meeting ends at 6:45 PM. Explore top-rated spots near Salesforce Tower — we\'ll pre-book your ride as soon as you pick one.',
      cta: 'Explore restaurants',
      confirm: 'Top picks ready',
      confirmDetail: 'Choose a spot and we\'ll book your pickup from Salesforce Tower. Uber AI will learn your taste with each trip.',
    },
    schedule: [
      { dot: COLORS.green, active: true, title: 'Ride to Salesforce Tower', time: '7:50 AM' },
      { dot: COLORS.gray400, title: 'Ride back to Marriott · lunch', time: '12:30 PM' },
      { dot: COLORS.gray400, title: 'Ride to afternoon session', time: '2:15 PM' },
      { dot: COLORS.gray400, title: 'Dinner ride · Pick a spot', time: '7:00 PM' },
    ],
  },
  3: {
    tabLabel: 'Day 3',
    tabSub: 'Wed May 6',
    dateLabel: 'WED MAY 6 · 6:00 AM',
    subtitle: 'Heading home today',
    nextRide: {
      label: 'Next ride · in 1 hr 10 min',
      title: 'Marriott → SJC Airport',
      stats: [
        { label: 'Pickup', value: '7:10 AM', color: '#fff' },
        { label: 'TSA Wait Time', value: '~14 min', color: COLORS.amber },
        { label: 'Traffic', value: 'Light', color: COLORS.green },
      ],
    },
    prompt: {
      title: 'Coffee before pickup?',
      badge: 'Uber Eats',
      body: 'Starbucks opens at 6 AM and delivers to the Marriott lobby in 15 min. Grab a coffee before your 7:10 AM pickup.',
      cta: 'Order coffee',
      confirm: 'Coffee ordered!',
      confirmDetail: 'Arrives at Marriott lobby by 6:45 AM · Ace Corp meal credit applied',
    },
    schedule: [
      { dot: COLORS.green, active: true, title: 'Ride to SJC Airport', time: '7:10 AM' },
      { dot: COLORS.gray400, title: 'Flight AS402 to Seattle', time: '9:15 AM' },
      { dot: COLORS.gray400, title: 'Ride SEA → Home', time: '12:05 PM' },
    ],
  },
};

const RESTAURANTS = [
  { name: 'Adega', cuisine: 'Portuguese · Fine dining', rating: 4.8, reviews: '1.2k', price: '$$$', rideMin: 6, tag: 'Trending', tagColor: COLORS.orange, accent: '#7C2D12', bg: '#FFF4E5' },
  { name: 'Paper Plane', cuisine: 'Cocktails · Small plates', rating: 4.9, reviews: '2.4k', price: '$$$', rideMin: 4, tag: 'Trending', tagColor: COLORS.orange, accent: '#1F2937', bg: '#F3F4F6' },
  { name: "Original Joe's", cuisine: 'Italian · Classic', rating: 4.7, reviews: '3.8k', price: '$$', rideMin: 5, tag: 'Neighborhood favorite', tagColor: COLORS.green, accent: '#065F46', bg: '#E6F7EF' },
  { name: 'The Farmers Union', cuisine: 'American · Gastropub', rating: 4.6, reviews: '1.9k', price: '$$', rideMin: 7, tag: 'Group-friendly', tagColor: COLORS.blue, accent: '#1E3A8A', bg: '#E6EEFC' },
  { name: 'Shirasoni', cuisine: 'Japanese · Steakhouse', rating: 4.5, reviews: '980', price: '$$', rideMin: 11, tag: null, tagColor: null, accent: '#3D3D3D', bg: '#F6F6F6' },
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
              <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: 1, color: COLORS.gray500, textTransform: 'uppercase' }}>Dinner · Tue May 5</div>
              <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 800, letterSpacing: -0.5, marginTop: 4 }}>Near Salesforce Tower</div>
              <div style={{ fontFamily: FONT, fontSize: 13, color: COLORS.gray500, marginTop: 4 }}>Pickup ready at 7:00 PM · Ride time from last meeting</div>
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

function Screen9() {
  const [day, setDay] = React.useState(1);
  const [orderedMap, setOrderedMap] = React.useState({});
  const [exploreOpen, setExploreOpen] = React.useState(false);
  const [pickedRestaurant, setPickedRestaurant] = React.useState(null);
  const d = DAY_DATA[day];
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
          Good morning, Sai
        </div>
        <div style={{ fontFamily: FONT, fontSize: 14, color: '#A8A8A8', marginTop: 8 }}>
          {d.subtitle}
        </div>

        {/* day tabs */}
        <div style={{ display: 'flex', gap: 6, marginTop: 18, background: 'rgba(255,255,255,0.08)', padding: 4, borderRadius: 12 }}>
          {[1, 2, 3].map(n => {
            const active = day === n;
            return (
              <button key={n} onClick={() => setDay(n)} style={{
                flex: 1, background: active ? '#fff' : 'transparent',
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
            marginTop: 14, width: '100%', background: 'transparent', color: '#fff',
            border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, padding: '10px',
            fontFamily: FONT, fontSize: 13, fontWeight: 700, cursor: 'pointer', letterSpacing: -0.1,
          }}>Edit ride</button>
        </div>
      </div>

      {/* contextual prompt */}
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
                ? `Pickup Salesforce Tower at 7:00 PM · ${pickedRestaurant.rideMin} min ride · ${pickedRestaurant.cuisine}`
                : d.prompt.confirmDetail}
            </div>
          </div>
        )}
      </div>

      {/* today's schedule */}
      <div style={{ padding: '20px 20px 30px' }}>
        <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: 1, color: COLORS.gray500, textTransform: 'uppercase', marginBottom: 12 }}>{day === 1 ? "Today's Ground Transport Schedule" : `${d.tabLabel} · Ground Transport Schedule`}</div>
        {d.schedule.map((r, i) => {
          const isDinner = day === 2 && r.title.startsWith('Dinner ride');
          const title = isDinner && pickedRestaurant ? `Dinner ride · ${pickedRestaurant.name}` : r.title;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i < d.schedule.length - 1 ? `0.5px solid ${COLORS.gray100}` : 'none' }}>
              <div style={{ width: 10, height: 10, borderRadius: 5, background: r.dot, boxShadow: r.active ? `0 0 0 4px ${r.dot}22` : 'none', flexShrink: 0 }}/>
              <div style={{ flex: 1, fontFamily: FONT, fontSize: 14.5, fontWeight: r.active ? 700 : 600, color: r.active ? '#000' : COLORS.gray700 }}>{title}</div>
              <div style={{ fontFamily: FONT, fontSize: 13, color: COLORS.gray500 }}>{r.time}</div>
            </div>
          );
        })}
      </div>
    </ScreenShell>

    {exploreOpen && (
      <ExploreRestaurants close={() => setExploreOpen(false)} onPick={onRestaurantPick}/>
    )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Notification — lock screen style, taps to Trip Detected
// ─────────────────────────────────────────────────────────────
function Notification({ go }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: 'linear-gradient(180deg, #FF8C42 0%, #FFB347 50%, #FFC857 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '20px', textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      {/* time */}
      <div style={{
        position: 'absolute', top: 18, left: 20, fontFamily: 'SF Pro Display, system-ui',
        fontSize: 13, fontWeight: 600, color: '#fff', letterSpacing: -0.2,
      }}>
        8:03
      </div>

      {/* status bar icons */}
      <div style={{
        position: 'absolute', top: 18, right: 20, display: 'flex', gap: 4, alignItems: 'center',
      }}>
        <svg width="14" height="10" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx="0.6" fill="#fff"/><rect x="4.5" y="5" width="3" height="6" rx="0.6" fill="#fff"/><rect x="9" y="2.5" width="3" height="8.5" rx="0.6" fill="#fff"/><rect x="13.5" y="0" width="3" height="11" rx="0.6" fill="#fff"/></svg>
        <svg width="14" height="10" viewBox="0 0 15 11" fill="none"><path d="M7.5 3C9.5 3 11.4 3.8 12.8 5.1L13.8 4.1C12.1 2.4 9.9 1.4 7.5 1.4C5.1 1.4 2.9 2.4 1.2 4.1L2.2 5.1C3.6 3.8 5.5 3 7.5 3z" fill="#fff"/><circle cx="7.5" cy="9.5" r="1.3" fill="#fff"/></svg>
        <svg width="20" height="10" viewBox="0 0 24 11"><rect x="0.5" y="0.5" width="20" height="10" rx="2.5" fill="none" stroke="#fff" strokeOpacity="0.4"/><rect x="2" y="2" width="17" height="7" rx="1.5" fill="#fff"/></svg>
      </div>

      {/* date label */}
      <div style={{
        position: 'absolute', top: 72, left: 0, right: 0,
        fontFamily: 'SF Pro Display, system-ui', fontSize: 13, fontWeight: 500,
        color: 'rgba(255,255,255,0.8)', letterSpacing: -0.2,
      }}>
        Monday, June 6
      </div>

      {/* main time display */}
      <div style={{
        position: 'absolute', top: 200, left: 0, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
        paddingBottom: 140, pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: 'SF Pro Display, system-ui', fontSize: 84, fontWeight: 300,
          color: '#fff', letterSpacing: -2, lineHeight: 1,
        }}>
          8:03
        </div>
      </div>

      {/* notification card — clickable */}
      <button onClick={go} style={{
        position: 'absolute', bottom: 70, left: 16, right: 16,
        background: 'rgba(0,0,0,0.6)', border: 'none',
        borderRadius: 20, padding: '16px', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', gap: 12,
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.7)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.6)'; }}
      >
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 800, color: '#fff', letterSpacing: -0.2 }}>Uber</div>
            <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: 0.3, textTransform: 'uppercase' }}>now</div>
          </div>
          <div style={{
            width: 32, height: 32, borderRadius: 8, background: '#fff', display: 'flex',
            alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 9.5H13v2.5h-2v-2.5H8.5v-2h2.5V7h2v2.5h2.5v2z" fill="#FF8C42"/>
            </svg>
          </div>
        </div>

        {/* AI detected badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, marginTop: 4,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <path d="M12 2l2.5 6.5h7l-5.5 4.5 2.5 6.5-6-4.5-6 4.5 2.5-6.5-5.5-4.5h7z" fill="#FF8C42"/>
          </svg>
          <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 800, color: '#FF8C42', textTransform: 'uppercase', letterSpacing: 0.5 }}>AI DETECTED</span>
        </div>

        {/* title */}
        <div style={{ fontFamily: FONT, fontSize: 17, fontWeight: 800, color: '#fff', letterSpacing: -0.3, textAlign: 'left', lineHeight: 1.2 }}>
          Upcoming trip to Airport
        </div>

        {/* details */}
        <div style={{ fontFamily: FONT, fontSize: 13, color: 'rgba(255,255,255,0.8)', textAlign: 'left', lineHeight: 1.4 }}>
          Based on your calendar — Flight UA 247 departs at 10:30 AM
        </div>

        {/* footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'rgba(255,255,255,0.7)', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.7)" strokeWidth="2"/><path d="M12 7v5l3 2" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"/></svg>
            Pickup in 45 min
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" stroke="rgba(255,255,255,0.7)" strokeWidth="1"/></svg>
            28 min ride
          </div>
        </div>

        {/* CTA button */}
        <button onClick={go} style={{
          width: '100%', background: '#fff', color: '#000', border: 'none',
          borderRadius: 14, padding: '12px 14px', fontFamily: FONT, fontSize: 13,
          fontWeight: 800, cursor: 'pointer', letterSpacing: -0.2, marginTop: 4,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.95)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
        >
          Review Door to Door Ground Transportation Plan
        </button>
      </button>

      {/* home indicator */}
      <div style={{
        position: 'absolute', bottom: 6, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
      }}>
        <div style={{ width: 120, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.15)' }}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Trip Detected — shown after calendar connect / Enable now
// ─────────────────────────────────────────────────────────────
function TripDetected({ go }) {
  return (
    <ScreenShell>
      {/* header */}
      <div style={{ background: '#000', color: '#fff', padding: '58px 22px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: COLORS.green, boxShadow: `0 0 0 3px ${COLORS.green}33` }}/>
          <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 800, letterSpacing: 1.2, color: COLORS.green, textTransform: 'uppercase' }}>
            Uber Travel AI · Active
          </span>
        </div>
        <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, color: '#A8A8A8', textTransform: 'uppercase', marginBottom: 8 }}>
          San Jose, California
        </div>
        <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1.12 }}>
          New trip detected from your calendar
        </div>
        <div style={{ fontFamily: FONT, fontSize: 14, color: '#A8A8A8', marginTop: 8 }}>
          May 4–6, 2026 · 3 days · via Google Calendar
        </div>
      </div>

      {/* detection card */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ background: COLORS.gray50, borderRadius: 16, overflow: 'hidden', border: `0.5px solid ${COLORS.gray200}` }}>
          {[
            { icon: '✈️', label: 'Flight', value: 'AS401 · May 4, 7:30 AM', status: 'Detected' },
            { icon: '🏨', label: 'Hotel', value: 'Marriott San Jose', status: 'Detected' },
            { icon: '📅', label: 'Meetings', value: '3 meetings · Salesforce Tower', status: 'Detected' },
          ].map((r, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px',
              borderBottom: i < 2 ? `0.5px solid ${COLORS.gray200}` : 'none',
            }}>
              <div style={{ fontSize: 18, width: 28, textAlign: 'center', flexShrink: 0 }}>{r.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: COLORS.gray500, textTransform: 'uppercase', letterSpacing: 0.4 }}>{r.label}</div>
                <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: '#000', marginTop: 2 }}>{r.value}</div>
              </div>
              <span style={{ background: COLORS.greenBg, color: COLORS.green, fontFamily: FONT, fontSize: 11, fontWeight: 800, padding: '3px 8px', borderRadius: 6 }}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* source note */}
      <div style={{ margin: '14px 20px 0', padding: '12px 14px', background: '#F0FDF4', borderRadius: 12, border: `1px solid #A7E3C4`, display: 'flex', alignItems: 'center', gap: 10 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}><path d="M8 1a4 4 0 014 4v2h1a1 1 0 011 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1h1V5a4 4 0 014-4zm0 2a2 2 0 00-2 2v2h4V5a2 2 0 00-2-2z" fill={COLORS.green}/></svg>
        <div style={{ fontFamily: FONT, fontSize: 12, color: '#065F46', lineHeight: 1.4 }}>
          Read-only access · your calendar data is never stored · revoke anytime in Settings
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '20px 20px 0' }}>
        <BlackButton onClick={go}>Review AI plan →</BlackButton>
        <div style={{ fontFamily: FONT, fontSize: 12, color: COLORS.gray500, textAlign: 'center', marginTop: 12, lineHeight: 1.4 }}>
          Uber AI is building your door-to-door plan in the background
        </div>
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
          We'll use this to link your Ace Corp invite to your Uber account.
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
          By continuing, you agree to Uber's Terms of Service and Privacy Notice. Ace Corp will see your name and rides tagged as business — not your personal history.
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
          { label: 'First name', value: 'Sai' },
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
            Work email is required for business rides. Ace Corp covers eligible trips; personal rides stay billed to you.
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
          Welcome back, Sai
        </h1>
        <p style={{ fontFamily: FONT, fontSize: 14, color: COLORS.gray500, marginTop: 10, lineHeight: 1.5 }}>
          We recognized this number from your personal Uber. Ace Corp can now use the same account for business rides — your ride history stays private.
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
            <div style={{ fontFamily: FONT, fontSize: 12.5, color: COLORS.gray500, marginTop: 3, lineHeight: 1.45 }}>Ace Corp only sees trips tagged as business. Your history, payment, and favorites remain private.</div>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

Object.assign(window, {
  Screen1, Screen2, Screen3, Screen4, Screen5, Screen6, Screen7, Screen8, Screen9,
  AuthPhone, AuthSMS, AuthName, AuthWelcomeBack, Notification, TripDetected,
  EnableSheet, ManualForm, COLORS, FONT,
});
