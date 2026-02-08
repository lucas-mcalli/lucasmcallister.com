import { useState, useEffect, useRef } from 'react';

const ASCIIRain = ({ 
  fontSize = 16, 
  textColor="#f6f6f6ff", 
  darkTextColor="#1b1b1bff", 
  isDark = false,
  updateInterval = 50,
  charsPerUpdate = 20,
  characters = '0123456789ABCLMQXYZ@#$%^&*()_+-=[]{}%&;:,.<>?/',
  isVisible = true,
  mouseEffectRadius = 10
}) => {
  const [grid, setGrid] = useState([]);
  const [colorGrid, setColorGrid] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const effectGridRef = useRef({}); // Track effect timers for each cell
  const containerRef = useRef(null);
  const gridRef = useRef([]);
  const colorGridRef = useRef([]);
  const dimsRef = useRef({ rows: 0, cols: 0, charWidth: 0, charHeight: 0 });

  useEffect(() => {
    const charWidth = fontSize * 0.6;
    const charHeight = fontSize * 1.2;
    
    const cols = Math.ceil(window.innerWidth / charWidth);
    const rows = Math.ceil(window.innerHeight / charHeight);
    
    dimsRef.current = { rows, cols, charWidth, charHeight };
    
    // Initialize grid
    const newGrid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => 
        characters[Math.floor(Math.random() * characters.length)]
      )
    );
    
    // Initialize color grid (false = normal color, true = effect color)
    const newColorGrid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => false)
    );
    
    gridRef.current = newGrid;
    colorGridRef.current = newColorGrid;
    setGrid(newGrid);
    setColorGrid(newColorGrid);
  }, [fontSize, characters]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const { rows, cols, charWidth, charHeight } = dimsRef.current;
      if (rows === 0 || cols === 0) return;
      
      // Update multiple random characters (but skip cells with active effects)
      for (let i = 0; i < charsPerUpdate; i++) {
        let randomRow, randomCol, cellKey;
        // Find a cell that's not under an active effect
        do {
          randomRow = Math.floor(Math.random() * rows);
          randomCol = Math.floor(Math.random() * cols);
          cellKey = `${randomRow},${randomCol}`;
        } while (effectGridRef.current[cellKey]);
        
        const randomChar = characters[Math.floor(Math.random() * characters.length)];
        gridRef.current[randomRow][randomCol] = randomChar;
      }

      // Mouse effect - directional characters based on position in radius
      const mouseGridCol = Math.floor(mousePos.x / charWidth);
      const mouseGridRow = Math.floor(mousePos.y / charHeight);
      const radiusInChars = Math.ceil(mouseEffectRadius / charWidth);
      const now = Date.now();
      const effectDuration = 1500; // 1.5 seconds

      // Create a circle of affected characters around cursor
      for (let row = mouseGridRow - radiusInChars; row <= mouseGridRow + radiusInChars; row++) {
        for (let col = mouseGridCol - radiusInChars; col <= mouseGridCol + radiusInChars; col++) {
          const distance = Math.sqrt((col - mouseGridCol) ** 2 + (row - mouseGridRow) ** 2);
          
          if (distance <= radiusInChars && row >= 0 && row < rows && col >= 0 && col < cols) {
            const cellKey = `${row},${col}`;
            
            // Only apply effect if not already affected
            if (!effectGridRef.current[cellKey] || now - effectGridRef.current[cellKey].startTime > effectDuration) {
              // Determine character based on position relative to center
              const angle = Math.atan2(row - mouseGridRow, col - mouseGridCol);
              let effectChar;
              
              // Right side (< -90 to 90 degrees, i.e., right half)
              if (angle > -Math.PI / 2 && angle < Math.PI / 2) {
                // Right side
                effectChar = '>';
              } else {
                // Left side
                effectChar = '<';
              }
              
              gridRef.current[row][col] = effectChar;
              colorGridRef.current[row][col] = true; // Mark as colored
              effectGridRef.current[cellKey] = { startTime: now, originalChar: gridRef.current[row][col] };
            }
          }
        }
      }

      // Clean up and restore old characters after effect expires
      Object.keys(effectGridRef.current).forEach(cellKey => {
        if (now - effectGridRef.current[cellKey].startTime > effectDuration) {
          const [row, col] = cellKey.split(',').map(Number);
          // Character reverts to random on next normal update
          colorGridRef.current[row][col] = false; // Remove color
          delete effectGridRef.current[cellKey];
        }
      })
      
      // Clone grids to trigger re-render
      setGrid([...gridRef.current.map(row => [...row])]);
      setColorGrid([...colorGridRef.current.map(row => [...row])]);
    }, updateInterval);

    return () => clearInterval(interval);
  }, [characters, updateInterval, charsPerUpdate, mousePos, mouseEffectRadius]);

  const currentColor = isDark ? darkTextColor : textColor;

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden whitespace-pre select-none z-0 font-menlo"
      style={{
        fontSize: `${fontSize}px`,
        color: currentColor,
        lineHeight: '1.2',
        letterSpacing: '0'
      }}
    >
      {grid.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.join('')}
        </div>
      ))}
    </div>
  );
};

export default ASCIIRain;