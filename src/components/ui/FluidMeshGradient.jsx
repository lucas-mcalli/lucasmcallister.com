import { useEffect, useRef } from 'react';

// Fluid, cursor-reactive mesh gradient rendered with a single WebGL fragment
// shader (fbm + two-pass domain warp, à la Inigo Quilez). Drop it in as a
// sized box anywhere in the page - it fills its parent completely and
// otherwise behaves like any other block-level element.

const VERTEX_SRC = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

// Simplex noise (Ashima Arts / Ian McEwan, MIT) + fbm + domain warp.
const FRAGMENT_SRC = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uGrainTime;
uniform vec2 uMouse;
uniform float uMouseEffectStrength;
uniform float uMouseRadius;
uniform float uScale;
uniform float uDistortion;
uniform float uGrainStrength;
uniform float uBloomStrength;
uniform vec3 uVoidColor;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
vec2 mod289(vec2 x){return x - floor(x*(1.0/289.0))*289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
        + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 2; i++) {
    sum += amp * snoise(p);
    p = rot * p * 1.7;
    amp *= 0.55;
  }
  return sum;
}

vec2 warp(vec2 p, float t) {
  vec2 q = vec2(
    fbm(p * 0.8 + t * 0.045),
    fbm(p * 0.8 + vec2(5.2, 1.3) - t * 0.035)
  );
  vec2 r = vec2(
    fbm(p * 0.8 + 0.6 * q + vec2(1.7, 9.2) + t * 0.03),
    fbm(p * 0.8 + 0.6 * q + vec2(8.3, 2.8) - t * 0.04)
  );
  return p + uDistortion * r;
}

void main() {
  float aspect = uResolution.x / uResolution.y;
  vec2 uv = gl_FragCoord.xy / uResolution.xy;

  vec2 p = uv - 0.5;
  p.x *= aspect;
  p *= uScale;

  vec2 mUv = uMouse;
  mUv.y = 1.0 - mUv.y;
  vec2 mP = mUv - 0.5;
  mP.x *= aspect;
  mP *= uScale;

  float md = length(p - mP);
  float mouseInfluence = uMouseEffectStrength * exp(-(md * md) / (2.0 * uMouseRadius * uMouseRadius));
  vec2 dir = md > 0.0001 ? (p - mP) / md : vec2(0.0);
  p += dir * mouseInfluence * (0.3 + 0.08 * sin(uTime * 0.3 - md * 0.6));

  vec2 wp = warp(p * 0.45, uTime);
  float n = fbm(wp * 0.6 + uTime * 0.01);
  n = n * 0.6 + 0.5;
  n += mouseInfluence * 0.3;

  vec3 col = uVoidColor;
  col = mix(col, uColor1, smoothstep(0.30, 0.75, n));
  col = mix(col, uColor2, smoothstep(0.55, 0.95, n));
  col = mix(col, uColor3, smoothstep(0.85, 1.25, n));

  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  col += col * smoothstep(0.8, 1.15, lum) * uBloomStrength;

  vec2 gp = fract((gl_FragCoord.xy + uGrainTime) * vec2(443.897, 441.423));
  gp += dot(gp, gp + 19.19);
  float grain = fract(gp.x * gp.y);
  col += (grain - 0.5) * uGrainStrength;

  gl_FragColor = vec4(col, 1.0);
}
`;

const PRESETS = {
  signature: { voidColor: '#a4460c', primaryColor: '#f5d949', secondaryColor: '#f5943a', tertiaryColor: '#8b7fb0' },
  aurora: { voidColor: '#04030a', primaryColor: '#3ee8b5', secondaryColor: '#6a5cff', tertiaryColor: '#ff6fd8' },
  sunset: { voidColor: '#160a08', primaryColor: '#ff6a3d', secondaryColor: '#ff2f8f', tertiaryColor: '#ffd166' },
  ocean: { voidColor: '#020814', primaryColor: '#0091ff', secondaryColor: '#00e0c6', tertiaryColor: '#6a5cff' },
  mono: { voidColor: '#050505', primaryColor: '#8a8a8a', secondaryColor: '#d9d9d9', tertiaryColor: '#ffffff' },
};

let colorCanvas = null;
function parseColor(input, fallback) {
  if (typeof document === 'undefined') return fallback;
  try {
    if (!colorCanvas) colorCanvas = document.createElement('canvas');
    colorCanvas.width = 1;
    colorCanvas.height = 1;
    const ctx = colorCanvas.getContext('2d');
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#000';
    ctx.fillStyle = input;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return [r / 255, g / 255, b / 255];
  } catch {
    return fallback;
  }
}

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${info}`);
  }
  return shader;
}

function createProgram(gl) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Program link error: ${info}`);
  }
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  return program;
}

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const FluidMeshGradient = ({
  preset = 'signature',
  primaryColor,
  secondaryColor,
  tertiaryColor,
  voidColor,
  scale = 1,
  distortion = 0.4,
  speed = 0.4,
  grainStrength = 0,
  bloomStrength = 0,
  mouseEffectStrength = 0.3,
  mouseRadius = 0.7,
  mouseLag = 0.06,
  autonomousDrift = true,
  interactive = true,
  paused = false,
  respectReducedMotion = true,
  maxDpr = 2,
  className = '',
  style = {},
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const configRef = useRef(null);
  const glStuffRef = useRef(null);
  const stateRef = useRef({
    visible: true,
    docVisible: true,
    lastTime: 0,
    renderScale: 1,
    perfSamples: [],
  });
  const mouseRef = useRef({ nx: 0.5, ny: 0.5, cx: 0.5, cy: 0.5, activeTarget: 0, active: 0 });
  const timeRef = useRef({ main: 0, grain: 0 });
  const rafIdRef = useRef(null);
  const runningRef = useRef(false);
  const reducedRef = useRef(false);
  const staticRenderedRef = useRef(false);
  const ensureRunningRef = useRef(() => {});

  // Resolve preset + explicit overrides into the actual config, kept in a
  // ref so the render loop always reads live values without re-mounting.
  useEffect(() => {
    const base = PRESETS[preset] || PRESETS.signature;
    configRef.current = {
      voidColor: parseColor(voidColor || base.voidColor, [0.04, 0.04, 0.04]),
      color1: parseColor(primaryColor || base.primaryColor, [1, 1, 1]),
      color2: parseColor(secondaryColor || base.secondaryColor, [0.8, 0.8, 0.8]),
      color3: parseColor(tertiaryColor || base.tertiaryColor, [0.6, 0.6, 0.6]),
      scale: clamp(scale, 0.1, 5),
      distortion: clamp(distortion, 0, 3),
      speed: clamp(speed, 0, 5),
      grainStrength: clamp(grainStrength, 0, 1),
      bloomStrength: clamp(bloomStrength, 0, 2),
      mouseEffectStrength: clamp(mouseEffectStrength, 0, 3),
      mouseRadius: clamp(mouseRadius, 0.05, 3),
      mouseLag: clamp(mouseLag, 0.01, 1),
      autonomousDrift,
      interactive,
      paused,
      maxDpr: clamp(maxDpr, 0.5, 4),
    };
    ensureRunningRef.current();
  }, [
    preset, primaryColor, secondaryColor, tertiaryColor, voidColor,
    scale, distortion, speed, grainStrength, bloomStrength,
    mouseEffectStrength, mouseRadius, mouseLag, autonomousDrift,
    interactive, paused, maxDpr,
  ]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // React StrictMode double-invokes this effect in dev (mount, cleanup,
    // mount again) on the same <canvas>/GL context. Without this guard, a
    // stray rAF callback from the first, already-cleaned-up invocation can
    // fire after the second has taken over gl.useProgram, and start
    // spamming "location is not from the associated program" errors.
    let cancelled = false;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
    });

    // No WebGL: fall back to a static CSS gradient so the box still reads
    // as a designed element instead of a blank rectangle.
    if (!gl) {
      const cfg = configRef.current;
      const toCss = (c) => `rgb(${Math.round(c[0] * 255)},${Math.round(c[1] * 255)},${Math.round(c[2] * 255)})`;
      container.style.background = `radial-gradient(120% 120% at 30% 20%, ${toCss(cfg.color1)}, ${toCss(cfg.color2)} 45%, ${toCss(cfg.voidColor)} 100%)`;
      return;
    }

    let program, aPositionLoc, positionBuffer;
    const uniforms = {};

    try {
      program = createProgram(gl);
    } catch (err) {
      console.error('[FluidMeshGradient]', err);
      return;
    }

    gl.useProgram(program);
    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    aPositionLoc = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    [
      'uResolution', 'uTime', 'uGrainTime', 'uMouse', 'uMouseEffectStrength', 'uMouseRadius',
      'uScale', 'uDistortion', 'uGrainStrength', 'uBloomStrength', 'uVoidColor', 'uColor1', 'uColor2', 'uColor3',
    ].forEach((name) => { uniforms[name] = gl.getUniformLocation(program, name); });

    glStuffRef.current = { gl, program, uniforms };

    const mql = typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null;
    reducedRef.current = respectReducedMotion && !!mql?.matches;

    function resizeCanvas() {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, configRef.current.maxDpr) * stateRef.current.renderScale;
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      return { w, h };
    }

    function renderFrame() {
      const cfg = configRef.current;
      const { w, h } = resizeCanvas();
      gl.uniform2f(uniforms.uResolution, w, h);
      gl.uniform1f(uniforms.uTime, timeRef.current.main);
      gl.uniform1f(uniforms.uGrainTime, timeRef.current.grain);
      gl.uniform2f(uniforms.uMouse, mouseRef.current.cx, mouseRef.current.cy);
      gl.uniform1f(uniforms.uMouseEffectStrength, cfg.interactive ? cfg.mouseEffectStrength * mouseRef.current.active : 0);
      gl.uniform1f(uniforms.uMouseRadius, cfg.mouseRadius);
      gl.uniform1f(uniforms.uScale, cfg.scale);
      gl.uniform1f(uniforms.uDistortion, cfg.distortion);
      gl.uniform1f(uniforms.uGrainStrength, cfg.grainStrength);
      gl.uniform1f(uniforms.uBloomStrength, cfg.bloomStrength);
      gl.uniform3fv(uniforms.uVoidColor, cfg.voidColor);
      gl.uniform3fv(uniforms.uColor1, cfg.color1);
      gl.uniform3fv(uniforms.uColor2, cfg.color2);
      gl.uniform3fv(uniforms.uColor3, cfg.color3);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function updatePerfScale(dt) {
      const st = stateRef.current;
      st.perfSamples.push(dt);
      if (st.perfSamples.length < 30) return;
      const avg = st.perfSamples.reduce((a, b) => a + b, 0) / st.perfSamples.length;
      st.perfSamples.length = 0;
      if (avg > 26 && st.renderScale > 0.5) {
        st.renderScale = clamp(st.renderScale - 0.15, 0.5, 1);
      } else if (avg < 17 && st.renderScale < 1) {
        st.renderScale = clamp(st.renderScale + 0.1, 0.5, 1);
      }
    }

    function tick(now) {
      if (cancelled) { runningRef.current = false; return; }
      const st = stateRef.current;
      const cfg = configRef.current;
      const shouldRun = st.visible && st.docVisible && !cfg.paused;
      if (!shouldRun) { runningRef.current = false; return; }

      let dt = now - st.lastTime;
      if (!Number.isFinite(dt) || dt <= 0) dt = 16;
      dt = Math.min(dt, 50);
      st.lastTime = now;

      const m = mouseRef.current;
      const lag = cfg.mouseLag;
      m.cx += (m.nx - m.cx) * lag;
      m.cy += (m.ny - m.cy) * lag;
      m.active += (m.activeTarget - m.active) * 0.06;

      const driftFactor = cfg.autonomousDrift ? 1 : m.active;
      timeRef.current.main += dt * 0.001 * cfg.speed * driftFactor;
      // Wrapped, not just incremented: an ever-growing value fed into the
      // grain hash loses float precision over a long session and starts
      // producing correlated banding instead of clean per-frame noise.
      timeRef.current.grain = (timeRef.current.grain + dt * 0.001 * 60) % 1000;

      updatePerfScale(dt);
      renderFrame();

      rafIdRef.current = requestAnimationFrame(tick);
    }

    function ensureRunning() {
      if (cancelled) return;
      const cfg = configRef.current;
      if (!cfg) return;
      if (reducedRef.current) {
        if (!staticRenderedRef.current) {
          staticRenderedRef.current = true;
          stateRef.current.lastTime = performance.now();
          renderFrame();
        }
        return;
      }
      const shouldRun = stateRef.current.visible && stateRef.current.docVisible && !cfg.paused;
      if (shouldRun && !runningRef.current) {
        runningRef.current = true;
        stateRef.current.lastTime = performance.now();
        rafIdRef.current = requestAnimationFrame(tick);
      }
    }
    ensureRunningRef.current = ensureRunning;

    function onPointerMove(e) {
      const rect = container.getBoundingClientRect();
      mouseRef.current.nx = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      mouseRef.current.ny = clamp((e.clientY - rect.top) / rect.height, 0, 1);
      mouseRef.current.activeTarget = 1;
      ensureRunning();
    }
    function onPointerLeave() {
      mouseRef.current.activeTarget = 0;
    }

    if (configRef.current.interactive) {
      container.addEventListener('pointermove', onPointerMove, { passive: true });
      container.addEventListener('pointerenter', onPointerMove, { passive: true });
      container.addEventListener('pointerleave', onPointerLeave, { passive: true });
    }

    const ro = new ResizeObserver(() => {
      resizeCanvas();
      if (reducedRef.current) renderFrame();
    });
    ro.observe(container);

    const io = new IntersectionObserver(([entry]) => {
      stateRef.current.visible = entry.isIntersecting;
      if (entry.isIntersecting) ensureRunning();
    }, { threshold: 0.01 });
    io.observe(container);

    function onVisibilityChange() {
      stateRef.current.docVisible = document.visibilityState === 'visible';
      if (stateRef.current.docVisible) ensureRunning();
    }
    document.addEventListener('visibilitychange', onVisibilityChange);

    function onReducedMotionChange(e) {
      reducedRef.current = respectReducedMotion && e.matches;
      if (reducedRef.current) {
        staticRenderedRef.current = false;
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        runningRef.current = false;
        ensureRunning();
      } else {
        ensureRunning();
      }
    }
    mql?.addEventListener?.('change', onReducedMotionChange);

    function onContextLost(e) {
      e.preventDefault();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      runningRef.current = false;
    }
    function onContextRestored() {
      if (cancelled) return;
      try {
        program = createProgram(gl);
        gl.useProgram(program);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aPositionLoc);
        Object.keys(uniforms).forEach((name) => { uniforms[name] = gl.getUniformLocation(program, name); });
        ensureRunning();
      } catch (err) {
        console.error('[FluidMeshGradient] failed to restore context', err);
      }
    }
    canvas.addEventListener('webglcontextlost', onContextLost, false);
    canvas.addEventListener('webglcontextrestored', onContextRestored, false);

    resizeCanvas();
    ensureRunning();

    return () => {
      cancelled = true;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      runningRef.current = false;
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerenter', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      mql?.removeEventListener?.('change', onReducedMotionChange);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      glStuffRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden isolate ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block w-full h-full" />
    </div>
  );
};

export { PRESETS };
export default FluidMeshGradient;
