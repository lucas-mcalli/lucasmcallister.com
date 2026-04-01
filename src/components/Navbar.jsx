import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";

// Windows 2000–style Taskbar
const Navbar = ({ isDark, toggleDarkMode }) => {
  const [time, setTime] = useState('');
  const [startOpen, setStartOpen] = useState(false);
  const location = useLocation();

  // Live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  // Close start menu on outside click
  useEffect(() => {
    if (!startOpen) return;
    const close = () => setStartOpen(false);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [startOpen]);

  const isHome = location.pathname === '/';
  const isAbout = location.pathname === '/about';

  return (
    <nav
      id="main-nav"
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        height: '40px',
        background: '#C0C0C0',
        borderTop: '2px solid #FFFFFF',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '0 4px',
        boxShadow: '0 -1px 0 #808080',
      }}
    >
      {/* Start button */}
      <div style={{ position: 'relative' }}>
        <button
          className="win-start-btn"
          onClick={(e) => { e.stopPropagation(); setStartOpen(v => !v); }}
          style={{ fontWeight: 'bold', letterSpacing: '0.5px' }}
        >
          <img
            src="/THUMBNAIL.png"
            alt=""
            style={{ width: '18px', height: '18px', imageRendering: 'pixelated' }}
          />
          Start
        </button>

        {/* Start menu popup */}
        {startOpen && (
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              left: 0,
              width: '200px',
              background: '#C0C0C0',
              borderTop: '2px solid #FFFFFF',
              borderLeft: '2px solid #FFFFFF',
              borderRight: '2px solid #808080',
              borderBottom: '2px solid #808080',
              outline: '1px solid #000',
              zIndex: 100,
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sidebar strip */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              flex: 1,
            }}>
              <div style={{
                width: '24px',
                background: 'linear-gradient(to top, #000080, #1084D0)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                padding: '4px 0',
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 'bold',
                letterSpacing: '2px',
                fontFamily: "'VT323', sans-serif",
                flexShrink: 0,
              }}>
                lucas mcallister
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '4px 0' }}>
                <Link
                  to="/"
                  className="win-menu-item"
                  onClick={() => setStartOpen(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 8px' }}
                >
                  <span style={{ fontSize: '20px' }}>🏠</span>
                  <span>Home</span>
                </Link>
                <Link
                  to="/about"
                  className="win-menu-item"
                  onClick={() => setStartOpen(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 8px' }}
                >
                  <span style={{ fontSize: '20px' }}>📄</span>
                  <span>About Me</span>
                </Link>
                <a
                  href="https://www.linkedin.com/in/lucas-mcallister-29a794289/"
                  target="_blank"
                  rel="noreferrer"
                  className="win-menu-item"
                  onClick={() => setStartOpen(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 8px' }}
                >
                  <span style={{ fontSize: '20px' }}>🔗</span>
                  <span>LinkedIn</span>
                </a>
                <div style={{
                  borderTop: '1px solid #808080',
                  borderBottom: '1px solid #FFFFFF',
                  margin: '2px 0',
                }} />
                <button
                  className="win-menu-item"
                  onClick={() => { toggleDarkMode(); setStartOpen(false); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 8px',
                    background: 'none',
                    border: 'none',
                    width: '100%',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontFamily: "'VT323', sans-serif",
                    fontSize: '18px',
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{isDark ? '☀️' : '🌙'}</span>
                  <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Divider */}
      <div style={{
        width: '1px',
        height: '28px',
        borderLeft: '1px solid #808080',
        borderRight: '1px solid #FFFFFF',
        margin: '0 2px',
      }} />

      {/* Open window buttons */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button className={`win-taskbar-btn ${isHome ? 'active' : ''}`}>
          <img
            src="/THUMBNAIL.png"
            alt=""
            style={{ width: '14px', height: '14px', imageRendering: 'pixelated', flexShrink: 0 }}
          />
          lucas.exe
        </button>
      </Link>

      {isAbout && (
        <Link to="/about" style={{ textDecoration: 'none' }}>
          <button className="win-taskbar-btn active">
            📄 About
          </button>
        </Link>
      )}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* System tray */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '2px 6px',
          borderTop: '1px solid #808080',
          borderLeft: '1px solid #808080',
          borderRight: '1px solid #FFFFFF',
          borderBottom: '1px solid #FFFFFF',
          background: '#C0C0C0',
          height: '28px',
          fontSize: '16px',
          fontFamily: "'VT323', sans-serif",
        }}
      >
        <span style={{ fontSize: '16px' }}>🔊</span>
        <span style={{ fontSize: '16px' }}>🌐</span>
        <span style={{ borderLeft: '1px solid #808080', paddingLeft: '6px', fontSize: '16px' }}>
          {time}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
