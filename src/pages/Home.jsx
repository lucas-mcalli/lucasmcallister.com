import { useState, useEffect } from 'react';
import '../input.css';

import Navbar from "../components/Navbar.jsx"
import Hero from "../components/Hero.jsx"
import ProjectCard from "../components/ProjectCard.jsx"
import { projectsData } from '../data/projectsData';
import { getGraphic } from '../helpers/getGraphic';
import { Link } from 'react-router';

// Tiny helper to add win-icon-label class styling inline (avoids unused-class warnings)
const iconLabelStyle = { fontSize: '13px', lineHeight: '1.2', color: '#FFF', textShadow: '1px 1px 2px #000' };

// Desktop icons for the Win2K desktop
const DesktopIcon = ({ label, icon, href, onClick }) => {
  const inner = (
    <div className="win-icon" onDoubleClick={onClick}>
      <div
        className="win-icon-img"
        style={{
          fontSize: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
        }}
      >
        {icon}
      </div>
      <span className="win-icon-label" style={{ fontSize: '13px', lineHeight: 1.2, maxWidth: '68px', overflowWrap: 'break-word' }}>
        {label}
      </span>
    </div>
  );

  if (href) return <a href={href} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>{inner}</a>;
  return inner;
};

// Win2K-style folder window that holds the projects list
const ProjectsWindow = ({ isDark, expandedProjectId, setExpandedProjectId }) => {
  const [pos, setPos] = useState({ x: 60, y: 20 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = { x: 0, y: 0 };
  const getGraphicFn = getGraphic(isDark);

  const onMouseDown = (e) => {
    setDragging(true);
    dragOffset.x = e.clientX - pos.x;
    dragOffset.y = e.clientY - pos.y;
    e._offset = { ...dragOffset };
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      if (!e._offset) {
        // first event after mousedown – compute offset from current pos
        e._offset = { x: e.clientX - pos.x, y: e.clientY - pos.y };
      }
    };
    // We'll use a closure approach instead
    let offset = { ...dragOffset };
    const captureOffset = (e) => { offset = { x: e.clientX - pos.x, y: e.clientY - pos.y }; };
    const onMoveReal = (e) => { setPos({ x: e.clientX - offset.x, y: e.clientY - offset.y }); };
    const onUp = () => setDragging(false);

    // capture initial offset on first move
    let captured = false;
    const moveHandler = (e) => {
      if (!captured) { captureOffset(e); captured = true; }
      onMoveReal(e);
    };

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', onUp);
    };
  }, [dragging]);

  return null; // The projects are rendered inline below Hero
};

export default function Home({ isDark, toggleDarkMode, isFirstLoad, isFirstHeroLoad }) {
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const getGraphicFn = getGraphic(isDark);

  // Auto-close project if user scrolls back to top
  useEffect(() => {
    if (!expandedProjectId) return;
    const handleScroll = () => {
      const scrollThreshold = window.innerWidth < 768 ? 200 : 700;
      if (window.scrollY < scrollThreshold) {
        setExpandedProjectId(null);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [expandedProjectId]);

  return (
    /*  teal desktop background  */
    <div
      style={{
        minHeight: '100vh',
        background: '#008080',
        paddingBottom: '48px',   /* room for taskbar */
        position: 'relative',
      }}
    >
      {/* ── Desktop icons (left column) ── */}
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
          <DesktopIcon label="My Portfolio" icon="💼" />
        </Link>
        <Link to="/about" style={{ textDecoration: 'none' }}>
          <DesktopIcon label="About Me" icon="📄" />
        </Link>
        <DesktopIcon
          label="LinkedIn"
          icon="🔗"
          href="https://www.linkedin.com/in/lucas-mcallister-29a794289/"
        />
        <DesktopIcon label="Recycle Bin" icon="🗑️" />
      </div>

      {/* ── Hero welcome window ── */}
      <div id="landing-page" style={{ position: 'relative', minHeight: '100vh', paddingLeft: '90px' }}>
        <Hero isFirstHeroLoad={isFirstHeroLoad} />
      </div>

      {/* ── Projects folder window ── */}
      <div
        id="projects-section"
        style={{
          margin: '0 auto',
          maxWidth: '960px',
          padding: '0 16px 16px',
        }}
      >
        {/* Folder window chrome */}
        <div
          className="win-window"
          style={{ boxShadow: '3px 3px 0 #000000', marginBottom: '16px' }}
        >
          {/* Title bar */}
          <div className="win-titlebar">
            <span style={{ fontSize: '16px' }}>📁</span>
            <span style={{ flex: 1 }}>My Projects — Folder</span>
            <div style={{ display: 'flex', gap: '2px', marginLeft: 'auto' }}>
              <button className="win-chrome-btn">_</button>
              <button className="win-chrome-btn">□</button>
              <button className="win-chrome-btn">✕</button>
            </div>
          </div>

          {/* Address bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '3px 6px',
            background: '#D4D0C8',
            borderBottom: '1px solid #808080',
          }}>
            <span style={{ fontFamily: "'VT323', sans-serif", fontSize: '16px', color: '#000' }}>Address:</span>
            <div className="win-sunken" style={{ flex: 1, padding: '1px 4px', fontSize: '16px', fontFamily: "'VT323', sans-serif" }}>
              C:\Users\lucas\Projects
            </div>
            <button className="win-btn" style={{ padding: '1px 10px', minWidth: 'unset', fontSize: '16px' }}>Go</button>
          </div>

          {/* Menu bar */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #808080',
            padding: '1px 2px',
            background: '#D4D0C8',
          }}>
            {['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'].map(m => (
              <span key={m} className="win-menu-item">{m}</span>
            ))}
          </div>

          {/* Project cards list */}
          <div style={{ padding: '8px', background: '#D4D0C8' }}>
            <ul id="projects-section-text" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {projectsData.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  getGraphic={getGraphicFn}
                  isExpanded={expandedProjectId === project.id}
                  onToggle={(projectId, isOpening) => {
                    if (isOpening) {
                      setExpandedProjectId(projectId);
                    } else {
                      setExpandedProjectId(null);
                    }
                  }}
                />
              ))}
            </ul>
          </div>

          {/* Status bar */}
          <div className="win-statusbar">
            <div className="win-statusbar-panel" style={{ flex: 1 }}>
              {projectsData.length} object(s)
            </div>
            <div className="win-statusbar-panel">Local Disk (C:)</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="#landing-page"
            className="win-btn"
            style={{ textDecoration: 'none', fontSize: '18px' }}
          >
            Back to Top
          </a>
        </div>
      </div>

      {/* Taskbar */}
      <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} isFirstLoad={isFirstLoad} />
    </div>
  );
}
