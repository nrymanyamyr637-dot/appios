import React, { useEffect, useRef } from 'react';

interface CyberBackgroundProps {
  isDarkMode: boolean;
}

export const CyberBackground: React.FC<CyberBackgroundProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    function syncSize() {
      if (!canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    syncSize();
    window.addEventListener('resize', syncSize);

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_is_dark;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    
    // Smooth fluid motion
    float t = u_time * 0.22;
    vec2 m = (u_mouse / u_resolution) - 0.5;
    p += m * 0.12;
    
    float n1 = noise(p * 1.6 + vec2(sin(t * 0.35), cos(t * 0.28)));
    float n2 = noise(p * 3.0 - vec2(cos(t * 0.22), sin(t * 0.32)) + n1);
    
    // Background base
    vec3 colDark = vec3(0.035, 0.048, 0.082);
    vec3 colLight = vec3(0.94, 0.96, 0.99);
    vec3 col = mix(colLight, colDark, u_is_dark);
    
    // Neon electric glows
    vec3 cyanGlow = vec3(0.0, 0.94, 1.0);
    vec3 indigoGlow = vec3(0.48, 0.35, 0.96);
    vec3 violetGlow = vec3(0.72, 0.25, 0.98);
    
    float plasma = sin(p.x * 2.0 + n1 * 2.8 + t) * cos(p.y * 2.0 + n2 * 2.8 - t);
    plasma = smoothstep(-0.6, 0.9, plasma);
    
    float ripple = sin(length(p * 2.0) * 4.0 - u_time * 0.7 + n1 * 2.0);
    float glow1 = smoothstep(0.7, 1.0, ripple) * 0.18;
    
    float intensity = mix(0.45, 1.0, u_is_dark);
    col += cyanGlow * pow(n2, 3.4) * 0.24 * intensity;
    col += indigoGlow * plasma * 0.20 * intensity;
    col += violetGlow * glow1 * intensity;
    
    // Subtle PCB grid circuit aesthetic
    vec2 grid = abs(fract(p * 6.0 - 0.5) - 0.5) / fwidth(p * 6.0);
    float line = min(grid.x, grid.y);
    float gridPattern = 1.0 - min(line, 1.0);
    col += vec3(0.0, 0.94, 1.0) * gridPattern * 0.03 * intensity;
    
    float vig = 1.0 - smoothstep(0.5, 1.9, length(p));
    col *= vig;
    
    gl_FragColor = vec4(col, 1.0);
}`;

    function compileShader(type: number, src: string) {
      if (!gl) return null;
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const vShader = compileShader(gl.VERTEX_SHADER, vs);
    const fShader = compileShader(gl.FRAGMENT_SHADER, fs);
    if (!vShader || !fShader) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vShader);
    gl.attachShader(prog, fShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');
    const uIsDark = gl.getUniformLocation(prog, 'u_is_dark');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = window.innerHeight - event.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animId: number;
    function render(t: number) {
      if (!gl || !canvas) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      if (uIsDark) gl.uniform1f(uIsDark, isDarkMode ? 1.0 : 0.0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    }
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', syncSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [isDarkMode]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60 transition-opacity duration-1000"
        style={{ display: 'block' }}
      />
      {/* Ambient Lighting Orbs */}
      <div className={`fixed top-1/4 -right-20 w-[32rem] h-[32rem] rounded-full blur-[140px] pointer-events-none transition-all duration-700 ${
        isDarkMode ? 'bg-[#00f0ff]/10' : 'bg-[#00a3ff]/8'
      }`} />
      <div className={`fixed bottom-1/4 -left-20 w-[36rem] h-[36rem] rounded-full blur-[160px] pointer-events-none transition-all duration-700 ${
        isDarkMode ? 'bg-[#8b5cf6]/12' : 'bg-[#8b5cf6]/8'
      }`} />
      {/* Subtle PCB Grid Overlay */}
      <div className="absolute inset-0 pcb-grid pointer-events-none opacity-40" />
    </div>
  );
};
