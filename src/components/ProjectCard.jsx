import { useState, useRef, useEffect } from 'react';

const ProjectCard = ({ project, getGraphic, isExpanded, onToggle }) => {
  const projectContainerRef = useRef(null);
  const projectElementsRef = useRef([]);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Draggable title bar
  const onMouseDown = (e) => {
    if (isExpanded) return; // don't drag when expanded
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

  // Handle expand/close logic
  const handleToggle = () => {
    if (project.disabled) return;

    if (!isExpanded) {
      onToggle(project.id, true);
      setTimeout(() => {
        const projectElement = document.querySelector(`[data-project-id="${project.id}"]`);
        if (projectElement) {
          const firstSection = projectElement.querySelector('section');
          if (firstSection) {
            firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 100);
    } else {
      const scrollAnchor = document.querySelector(`[data-project-card="${project.id}"]`);
      if (scrollAnchor) {
        const handleScrollEnd = () => {
          window.removeEventListener('scrollend', handleScrollEnd);
          onToggle(project.id, false);
        };
        window.addEventListener('scrollend', handleScrollEnd);
        scrollAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        onToggle(project.id, false);
      }
    }
  };

  const ProjectComponent = project.component;

  const windowStyle = !isExpanded
    ? {
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: dragging ? 'none' : 'transform 0.05s',
        position: 'relative',
        zIndex: dragging ? 20 : 1,
        cursor: dragging ? 'grabbing' : 'default',
      }
    : {};

  return (
    <li
      className="win-window"
      data-project-card={project.id}
      style={{
        marginBottom: '16px',
        boxShadow: '3px 3px 0 #000000',
        scrollMarginTop: '12px',
        ...windowStyle,
      }}
    >
      <div data-project-id={project.id}>
        {/* Title bar */}
        <div
          className="win-titlebar"
          onMouseDown={onMouseDown}
          style={{
            cursor: isExpanded ? 'default' : dragging ? 'grabbing' : 'move',
            userSelect: 'none',
          }}
        >
          <span style={{ fontSize: '16px' }}>🗂</span>
          <span style={{ flex: 1 }}>
            {project.titleMobile
              ? <><span className="hidden md:inline">{project.title}</span><span className="md:hidden">{project.titleMobile}</span></>
              : project.title
            }
            {' '}— {project.subtitle}
          </span>
          <div style={{ display: 'flex', gap: '2px', marginLeft: 'auto' }}>
            <button className="win-chrome-btn" aria-label="Minimize">_</button>
            <button className="win-chrome-btn" aria-label="Maximize">□</button>
            <button
              className="win-chrome-btn"
              aria-label="Close"
              disabled={project.disabled}
              style={project.disabled ? { color: '#808080', cursor: 'not-allowed' } : {}}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div style={{
          display: 'flex',
          gap: '4px',
          padding: '2px 4px',
          background: '#D4D0C8',
          borderBottom: '1px solid #808080',
          alignItems: 'center',
        }}>
          <button
            onClick={handleToggle}
            disabled={project.disabled}
            className="win-btn"
            style={{ minWidth: '90px' }}
          >
            {project.disabled ? 'Coming Soon' : isExpanded ? 'Close' : 'Open'}
          </button>
          <div style={{
            width: '1px', height: '20px',
            borderLeft: '1px solid #808080',
            borderRight: '1px solid #FFFFFF',
            margin: '0 2px',
          }} />
          <span style={{
            fontFamily: "'VT323', sans-serif",
            fontSize: '16px',
            color: '#444444',
          }}>
            {project.disabled ? 'File is locked' : isExpanded ? 'Viewing project details' : 'Double-click or press Open to expand'}
          </span>
        </div>

        {/* Preview image */}
        <div className="win-sunken" style={{ margin: '8px', overflow: 'hidden', aspectRatio: '16/6' }}>
          {project.media.endsWith('.mp4') ? (
            <video
              src={project.media}
              autoPlay muted loop
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
            />
          ) : (
            <img
              src={project.media}
              alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          )}
        </div>

        {/* Expanded project content */}
        {isExpanded && (
          <div ref={projectContainerRef} style={{ animation: 'fadeIn 0.3s ease' }}>
            <div style={{ borderTop: '1px solid #808080', borderBottom: '1px solid #FFFFFF', margin: '8px' }} />
            <div style={{ padding: '0 8px 8px' }}>
              <ProjectComponent
                getGraphic={getGraphic}
                projectElementsRef={projectElementsRef}
                isExpanded={isExpanded}
                projectId={project.id}
              />
            </div>
          </div>
        )}

        {/* Status bar */}
        <div className="win-statusbar">
          <div className="win-statusbar-panel" style={{ flex: 1 }}>
            {project.disabled ? 'Access Denied' : isExpanded ? 'Object(s) Loaded' : '1 object(s)'}
          </div>
          <div className="win-statusbar-panel">{project.subtitle}</div>
        </div>
      </div>
    </li>
  );
};

export default ProjectCard;
