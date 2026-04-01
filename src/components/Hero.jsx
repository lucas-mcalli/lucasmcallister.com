import { useEffect, useRef, useState } from "react";

// Win2K-style "Welcome" dialog / hero window
const Hero = ({ isFirstHeroLoad }) => {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 80, y: 60 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const windowRef = useRef(null);

  useEffect(() => {
    // Small delay before showing, like a dialog box appearing
    const t = setTimeout(() => setVisible(true), isFirstHeroLoad.current ? 400 : 80);
    isFirstHeroLoad.current = false;
    return () => clearTimeout(t);
  }, []);

  // Draggable title bar
  const onMouseDown = (e) => {
    setDragging(true);
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
    };
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [dragging]);

  if (!visible) return null;

  return (
    <div
      ref={windowRef}
      className="win-window"
      style={{
        position: 'absolute',
        top: `${pos.y}px`,
        left: `${pos.x}px`,
        width: 'min(580px, calc(100vw - 32px))',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10,
        boxShadow: '3px 3px 0 #000000',
      }}
    >
      {/* Title bar */}
      <div
        className="win-titlebar"
        onMouseDown={onMouseDown}
        style={{ cursor: dragging ? 'grabbing' : 'move', userSelect: 'none' }}
      >
        <img
          src="/THUMBNAIL.png"
          alt=""
          style={{ width: '14px', height: '14px', imageRendering: 'pixelated', flexShrink: 0 }}
        />
        <span style={{ flex: 1 }}>Welcome — lucas mcallister</span>
        <div style={{ display: 'flex', gap: '2px', marginLeft: 'auto' }}>
          <button className="win-chrome-btn" aria-label="Minimize">_</button>
          <button className="win-chrome-btn" aria-label="Maximize">□</button>
          <button
            className="win-chrome-btn"
            aria-label="Close"
            onClick={() => setVisible(false)}
            style={{ fontWeight: 'bold' }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Menu bar */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #808080',
        padding: '1px 2px',
        background: '#D4D0C8',
      }}>
        <span className="win-menu-item">File</span>
        <span className="win-menu-item">Edit</span>
        <span className="win-menu-item">View</span>
        <span className="win-menu-item">Help</span>
      </div>

      {/* Content */}
      <div style={{ padding: '16px', background: '#FFFFFF' }}>
        {/* Info rows like a Properties dialog */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '16px',
          alignItems: 'flex-start',
        }}>
          {/* Big icon */}
          <div style={{ flexShrink: 0 }}>
            <img
              src="/THUMBNAIL.png"
              alt="avatar"
              style={{ width: '48px', height: '48px', imageRendering: 'pixelated' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{
              fontFamily: "'VT323', sans-serif",
              fontSize: '28px',
              lineHeight: 1.1,
              color: '#000000',
              marginBottom: '6px',
            }}>
              Hi, I&apos;m Lucas McAllister
            </p>
            <p style={{
              fontFamily: "'VT323', sans-serif",
              fontSize: '20px',
              color: '#444444',
              lineHeight: 1.3,
            }}>
              Computer Science undergraduate at UF<br />
              focused on User Experience &amp; front-end programming.
            </p>
          </div>
        </div>

        {/* Horizontal rule */}
        <div style={{ borderTop: '1px solid #808080', borderBottom: '1px solid #FFFFFF', marginBottom: '12px' }} />

        {/* Status-bar style property rows */}
        {[
          { label: 'Degree', value: 'B.S. Computer Science — University of Florida' },
          { label: 'Focus',  value: 'UX/UI Design, Front-End Engineering' },
          { label: 'Status', value: 'Available for internships & collaborations' },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: 'flex', gap: '8px', marginBottom: '4px', alignItems: 'flex-start' }}>
            <span style={{
              fontFamily: "'VT323', sans-serif",
              fontSize: '18px',
              color: '#000000',
              fontWeight: 'bold',
              width: '80px',
              flexShrink: 0,
            }}>{label}:</span>
            <span style={{
              fontFamily: "'VT323', sans-serif",
              fontSize: '18px',
              color: '#000080',
            }}>{value}</span>
          </div>
        ))}

        {/* Separator */}
        <div style={{ borderTop: '1px solid #808080', borderBottom: '1px solid #FFFFFF', margin: '12px 0' }} />

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <a
            href="#projects-section-text"
            className="win-btn"
            style={{ textDecoration: 'none' }}
          >
            View Projects
          </a>
          <a
            href="https://www.linkedin.com/in/lucas-mcallister-29a794289/"
            target="_blank"
            rel="noreferrer"
            className="win-btn"
            style={{ textDecoration: 'none' }}
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Status bar */}
      <div className="win-statusbar">
        <div className="win-statusbar-panel" style={{ flex: 1 }}>Ready</div>
        <div className="win-statusbar-panel">Portfolio v2.0</div>
      </div>
    </div>
  );
};

export default Hero;
