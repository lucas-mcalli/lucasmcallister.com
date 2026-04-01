import { useRef } from 'react';
import '../input.css';
import Navbar from "../components/Navbar.jsx"
import { Link } from 'react-router';

// Tab component
const Tab = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      fontFamily: "'VT323', sans-serif",
      fontSize: '18px',
      padding: '3px 12px',
      background: active ? '#D4D0C8' : '#C0C0C0',
      borderTop: active ? '2px solid #FFFFFF' : '1px solid #FFFFFF',
      borderLeft: active ? '2px solid #FFFFFF' : '1px solid #FFFFFF',
      borderRight: active ? '2px solid #808080' : '1px solid #808080',
      borderBottom: active ? 'none' : '2px solid #808080',
      marginBottom: active ? '-2px' : '0',
      position: 'relative',
      cursor: 'pointer',
      zIndex: active ? 2 : 1,
      color: '#000',
    }}
  >
    {label}
  </button>
);

// Property row used inside the window
const PropRow = ({ label, value }) => (
  <div style={{ display: 'flex', gap: '8px', marginBottom: '6px', alignItems: 'flex-start' }}>
    <span style={{
      fontFamily: "'VT323', sans-serif",
      fontSize: '18px',
      fontWeight: 'bold',
      width: '120px',
      flexShrink: 0,
      color: '#000',
    }}>
      {label}:
    </span>
    <span style={{
      fontFamily: "'VT323', sans-serif",
      fontSize: '18px',
      color: '#000080',
      flex: 1,
    }}>
      {value}
    </span>
  </div>
);

export default function About({ isDark, toggleDarkMode, isFirstLoad }) {
  const activeTab = 'General';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#008080',
        paddingBottom: '48px',
        position: 'relative',
      }}
    >
      {/* Desktop icons */}
      <div
        style={{
          position: 'fixed',
          top: '12px',
          left: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          zIndex: 5,
        }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="win-icon">
            <div style={{ fontSize: '28px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              💼
            </div>
            <span className="win-icon-label" style={{ fontSize: '13px', color: '#FFF', textShadow: '1px 1px 2px #000' }}>
              My Portfolio
            </span>
          </div>
        </Link>
        <div className="win-icon">
          <div style={{ fontSize: '28px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            📄
          </div>
          <span className="win-icon-label" style={{ fontSize: '13px', color: '#FFF', textShadow: '1px 1px 2px #000' }}>
            About Me
          </span>
        </div>
      </div>

      {/* Main Properties window */}
      <div
        style={{
          maxWidth: '700px',
          margin: '40px auto 0',
          padding: '0 16px',
        }}
      >
        {/* Window chrome */}
        <div
          className="win-window"
          style={{ boxShadow: '3px 3px 0 #000000' }}
        >
          {/* Title bar */}
          <div className="win-titlebar">
            <img
              src="/THUMBNAIL.png"
              alt=""
              style={{ width: '14px', height: '14px', imageRendering: 'pixelated', flexShrink: 0 }}
            />
            <span style={{ flex: 1 }}>Lucas McAllister — Properties</span>
            <div style={{ display: 'flex', gap: '2px', marginLeft: 'auto' }}>
              <button className="win-chrome-btn">_</button>
              <button className="win-chrome-btn">□</button>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <button className="win-chrome-btn">✕</button>
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div style={{
            display: 'flex',
            padding: '6px 8px 0',
            background: '#D4D0C8',
            gap: '2px',
          }}>
            {['General', 'Interests', 'Balance'].map(t => (
              <Tab key={t} label={t} active={t === 'General'} onClick={() => {}} />
            ))}
          </div>

          {/* Tab content panel */}
          <div style={{
            border: '2px solid #FFFFFF',
            borderTop: '2px solid #808080',
            background: '#D4D0C8',
            padding: '12px',
          }}>
            {/* "General" tab */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', alignItems: 'flex-start' }}>
              {/* Photo */}
              <div className="win-sunken" style={{ padding: '4px', flexShrink: 0 }}>
                <img
                  src="/its_me.webp"
                  alt="Lucas McAllister"
                  style={{ width: '120px', height: '140px', objectFit: 'cover', display: 'block' }}
                  onError={(e) => { e.currentTarget.src = '/THUMBNAIL.png'; }}
                />
              </div>

              {/* Properties */}
              <div style={{ flex: 1 }}>
                {/* Big name */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px',
                }}>
                  <img
                    src="/THUMBNAIL.png"
                    alt=""
                    style={{ width: '32px', height: '32px', imageRendering: 'pixelated' }}
                  />
                  <div>
                    <p style={{
                      fontFamily: "'VT323', sans-serif",
                      fontSize: '26px',
                      lineHeight: 1,
                      color: '#000',
                    }}>Lucas McAllister</p>
                    <p style={{
                      fontFamily: "'VT323', sans-serif",
                      fontSize: '18px',
                      color: '#808080',
                    }}>Executable (User)</p>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #808080', borderBottom: '1px solid #FFFFFF', margin: '6px 0' }} />

                <PropRow label="Location" value="Miami Beach, FL → Gainesville, FL" />
                <PropRow label="Degree" value="B.S. Computer Science — University of Florida" />
                <PropRow label="Specialty" value="UX/UI Design, Front-End Engineering" />
                <PropRow label="Status" value="Open to internships & collaborations" />
              </div>
            </div>

            <div style={{ borderTop: '1px solid #808080', borderBottom: '1px solid #FFFFFF', margin: '8px 0' }} />

            {/* About text */}
            <div className="win-sunken" style={{ padding: '8px', marginBottom: '12px' }}>
              <p style={{
                fontFamily: "'VT323', sans-serif",
                fontSize: '18px',
                color: '#000',
                lineHeight: 1.4,
              }}>
                My name is Lucas McAllister, and I&apos;m a Computer Science undergrad at the University of Florida
                from Miami Beach. My passions for design and digital media led me to UX/UI design in my freshman year,
                where I started designing in teams building websites for clubs I was interested in. I love seeing how
                thoughtful design makes an impact — from the way campus architecture inspires pride to the way digital
                experiences shape someone&apos;s impression of a product or idea.
              </p>
            </div>

            {/* Interests */}
            <div style={{ marginBottom: '8px' }}>
              <p style={{
                fontFamily: "'VT323', sans-serif",
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#000',
                marginBottom: '4px',
              }}>
                Interests &amp; Hobbies:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {[
                  'Cooking', 'Beach Volleyball', 'PC Hardware',
                  'Sneaker Collecting', 'Fashion', 'Sewing & Pattern Making',
                  'Restaurant Ranking', 'Vodka Sauce Perfection',
                ].map(tag => (
                  <span
                    key={tag}
                    className="win-sunken"
                    style={{
                      padding: '1px 6px',
                      fontFamily: "'VT323', sans-serif",
                      fontSize: '16px',
                      color: '#000080',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #808080', borderBottom: '1px solid #FFFFFF', margin: '8px 0' }} />

            {/* Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <button className="win-btn">OK</button>
              </Link>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <button className="win-btn">Cancel</button>
              </Link>
              <a
                href="https://www.linkedin.com/in/lucas-mcallister-29a794289/"
                target="_blank"
                rel="noreferrer"
                className="win-btn"
                style={{ textDecoration: 'none' }}
              >
                Apply (LinkedIn)
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Taskbar */}
      <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} isFirstLoad={isFirstLoad} />
    </div>
  );
}
