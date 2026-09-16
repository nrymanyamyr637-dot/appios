import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, Eye, RotateCw, ZoomIn } from 'lucide-react';

interface Hero3DSceneProps {
  isDarkMode: boolean;
}

export const Hero3DScene: React.FC<Hero3DSceneProps> = ({ isDarkMode }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [activeLayer, setActiveLayer] = useState<'all' | 'pcb' | 'mcu' | 'robot' | 'ai'>('all');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 460;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.8, 7.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Master Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Layer Groups
    const pcbGroup = new THREE.Group();
    const mcuGroup = new THREE.Group();
    const robotGroup = new THREE.Group();
    const aiCoreGroup = new THREE.Group();
    const ringsGroup = new THREE.Group();

    masterGroup.add(pcbGroup);
    masterGroup.add(mcuGroup);
    masterGroup.add(robotGroup);
    masterGroup.add(aiCoreGroup);
    masterGroup.add(ringsGroup);

    // 1. PCB PLATFORM LAYER
    // Dark green/black high-tech fiberglass board
    const pcbGeo = new THREE.BoxGeometry(4.4, 0.12, 3.2);
    const pcbMat = new THREE.MeshPhysicalMaterial({
      color: isDarkMode ? 0x0a1420 : 0x152238,
      metalness: 0.3,
      roughness: 0.25,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
    });
    const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
    pcbMesh.position.y = -0.6;
    pcbGroup.add(pcbMesh);

    // Gold/Copper Corner Mounting Holes
    const holeGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.13, 16);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.9,
      roughness: 0.2
    });
    const holePositions = [
      [-1.9, -0.6, -1.3],
      [1.9, -0.6, -1.3],
      [-1.9, -0.6, 1.3],
      [1.9, -0.6, 1.3]
    ];
    holePositions.forEach(([x, y, z]) => {
      const hole = new THREE.Mesh(holeGeo, goldMat);
      hole.position.set(x, y, z);
      pcbGroup.add(hole);
    });

    // Glowing Neon Circuit Traces (Lines)
    const traceMaterialCyan = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      linewidth: 2,
      transparent: true,
      opacity: 0.85
    });
    const traceMaterialPurple = new THREE.LineBasicMaterial({
      color: 0xa855f7,
      linewidth: 2,
      transparent: true,
      opacity: 0.85
    });

    function createTrace(pointsArray: number[][], mat: THREE.Material) {
      const pts = pointsArray.map(p => new THREE.Vector3(p[0], -0.53, p[1]));
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      return new THREE.Line(geo, mat);
    }

    pcbGroup.add(createTrace([[-1.6, -1.0], [-1.0, -1.0], [-0.5, -0.5], [-0.2, -0.2]], traceMaterialCyan));
    pcbGroup.add(createTrace([[-1.7, 0.8], [-1.2, 0.8], [-0.8, 0.4], [-0.3, 0.2]], traceMaterialCyan));
    pcbGroup.add(createTrace([[1.6, -1.0], [1.1, -1.0], [0.6, -0.5], [0.3, -0.2]], traceMaterialPurple));
    pcbGroup.add(createTrace([[1.7, 0.8], [1.2, 0.8], [0.7, 0.3], [0.3, 0.2]], traceMaterialPurple));
    pcbGroup.add(createTrace([[-1.8, 0.0], [-1.0, 0.0], [-0.4, 0.0]], traceMaterialCyan));
    pcbGroup.add(createTrace([[1.8, 0.0], [1.0, 0.0], [0.4, 0.0]], traceMaterialPurple));

    // SMD Capacitors & Resistors on PCB
    const smdGeo = new THREE.BoxGeometry(0.14, 0.08, 0.08);
    const smdMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 });
    for (let i = 0; i < 14; i++) {
      const smd = new THREE.Mesh(smdGeo, smdMat);
      const angle = (i / 14) * Math.PI * 2;
      const radius = 1.2 + (i % 3) * 0.25;
      smd.position.set(Math.cos(angle) * radius, -0.52, Math.sin(angle) * radius);
      smd.rotation.y = angle;
      pcbGroup.add(smd);
    }

    // 2. MICROCONTROLLER (ARM CORTEX / STM32 IC)
    const icBodyGeo = new THREE.BoxGeometry(1.2, 0.16, 1.2);
    const icBodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x111622,
      metalness: 0.5,
      roughness: 0.35,
      clearcoat: 0.5
    });
    const icMesh = new THREE.Mesh(icBodyGeo, icBodyMat);
    icMesh.position.y = -0.48;
    mcuGroup.add(icMesh);

    // Glowing Central Silicon Die
    const dieGeo = new THREE.BoxGeometry(0.5, 0.02, 0.5);
    const dieMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.95
    });
    const dieMesh = new THREE.Mesh(dieGeo, dieMat);
    dieMesh.position.y = -0.39;
    mcuGroup.add(dieMesh);

    // Metallic IC Pins (QFP Package)
    const pinGeo = new THREE.BoxGeometry(0.04, 0.04, 0.18);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.95,
      roughness: 0.15
    });

    const pinCountPerSide = 8;
    const pinSpacing = 1.0 / (pinCountPerSide - 1);
    for (let i = 0; i < pinCountPerSide; i++) {
      const offset = -0.5 + i * pinSpacing;
      // Front & Back
      const p1 = new THREE.Mesh(pinGeo, pinMat);
      p1.position.set(offset, -0.52, 0.65);
      mcuGroup.add(p1);

      const p2 = new THREE.Mesh(pinGeo, pinMat);
      p2.position.set(offset, -0.52, -0.65);
      mcuGroup.add(p2);

      // Left & Right
      const p3 = new THREE.Mesh(pinGeo, pinMat);
      p3.rotation.y = Math.PI / 2;
      p3.position.set(-0.65, -0.52, offset);
      mcuGroup.add(p3);

      const p4 = new THREE.Mesh(pinGeo, pinMat);
      p4.rotation.y = Math.PI / 2;
      p4.position.set(0.65, -0.52, offset);
      mcuGroup.add(p4);
    }

    // 3. MECHANICAL GEAR & ROBOT HEAD/ARM SEGMENTS
    // Mechanical Gear (Bevel Gear)
    const gearShape = new THREE.Shape();
    const teeth = 12;
    const innerR = 0.55;
    const outerR = 0.72;
    for (let i = 0; i < teeth; i++) {
      const angle1 = (i / teeth) * Math.PI * 2;
      const angle2 = ((i + 0.35) / teeth) * Math.PI * 2;
      const angle3 = ((i + 0.65) / teeth) * Math.PI * 2;
      const angle4 = ((i + 1.0) / teeth) * Math.PI * 2;

      if (i === 0) gearShape.moveTo(Math.cos(angle1) * innerR, Math.sin(angle1) * innerR);
      gearShape.lineTo(Math.cos(angle2) * outerR, Math.sin(angle2) * outerR);
      gearShape.lineTo(Math.cos(angle3) * outerR, Math.sin(angle3) * outerR);
      gearShape.lineTo(Math.cos(angle4) * innerR, Math.sin(angle4) * innerR);
    }
    const extrudeSettings = { depth: 0.1, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 };
    const gearGeo = new THREE.ExtrudeGeometry(gearShape, extrudeSettings);
    const gearMat = new THREE.MeshStandardMaterial({
      color: 0x3b4252,
      metalness: 0.85,
      roughness: 0.25
    });
    const gearMesh = new THREE.Mesh(gearGeo, gearMat);
    gearMesh.rotation.x = Math.PI / 2;
    gearMesh.position.set(1.1, -0.4, -0.8);
    robotGroup.add(gearMesh);

    // Articulated Robot Arm Link & Gripper
    const armBaseGeo = new THREE.CylinderGeometry(0.3, 0.35, 0.4, 24);
    const armBaseMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.9, roughness: 0.2 });
    const armBase = new THREE.Mesh(armBaseGeo, armBaseMat);
    armBase.position.set(-1.2, -0.35, -0.7);
    robotGroup.add(armBase);

    // Hydraulic cylinder
    const pistonGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.9, 16);
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.1 });
    const piston = new THREE.Mesh(pistonGeo, chromeMat);
    piston.position.set(-1.1, 0.15, -0.6);
    piston.rotation.z = -Math.PI / 4;
    robotGroup.add(piston);

    // 4. CENTRAL FLOATING GLASS ORB & AI CORE
    // Refractive Glass Orb
    const orbGeo = new THREE.SphereGeometry(0.68, 48, 48);
    const orbMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      metalness: 0.05,
      roughness: 0.05,
      transmission: 0.92, // Real optical glass transparency
      thickness: 1.2,
      ior: 1.52,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transparent: true,
      opacity: 0.88
    });
    const glassOrb = new THREE.Mesh(orbGeo, orbMat);
    glassOrb.position.set(0, 0.65, 0);
    aiCoreGroup.add(glassOrb);

    // Inner Energy Icosahedron Core (Glowing pulsing AI nucleus)
    const innerCoreGeo = new THREE.IcosahedronGeometry(0.28, 1);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    innerCore.position.set(0, 0.65, 0);
    aiCoreGroup.add(innerCore);

    // Solid inner glowing orb point
    const coreGlowGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const coreGlowMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const coreGlow = new THREE.Mesh(coreGlowGeo, coreGlowMat);
    coreGlow.position.set(0, 0.65, 0);
    aiCoreGroup.add(coreGlow);

    // 5. FLOATING DIGITAL HOLOGRAPHIC RINGS
    const ringGeo1 = new THREE.TorusGeometry(1.4, 0.015, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.7 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.position.y = 0.65;
    ring1.rotation.x = Math.PI / 2.3;
    ringsGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(1.8, 0.012, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.6 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.position.y = 0.65;
    ring2.rotation.x = -Math.PI / 2.8;
    ringsGroup.add(ring2);

    const ringGeo3 = new THREE.TorusGeometry(2.1, 0.01, 16, 100);
    const ringMat3 = new THREE.MeshBasicMaterial({ color: 0x65f2b5, transparent: true, opacity: 0.45 });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.position.y = 0.65;
    ring3.rotation.y = Math.PI / 4;
    ringsGroup.add(ring3);

    // Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0x00f0ff, 3.2, 15);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 2.8, 15);
    purpleLight.position.set(-4, 2, -3);
    scene.add(purpleLight);

    const emeraldLight = new THREE.PointLight(0x65f2b5, 1.8, 12);
    emeraldLight.position.set(0, -2, 3);
    scene.add(emeraldLight);

    // Mouse Tracking / Parallax
    let targetRotationX = 0;
    let targetRotationY = 0;
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = x * 0.7;
      targetRotationX = y * 0.4;
    };
    container.addEventListener('pointermove', handlePointerMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    function animate() {
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera / group parallax
      masterGroup.rotation.y += (targetRotationY - masterGroup.rotation.y) * 0.05;
      masterGroup.rotation.x += (targetRotationX - masterGroup.rotation.x) * 0.05;

      // Continuous slow rotation if enabled
      if (isRotating) {
        masterGroup.rotation.y += 0.003;
      }

      // Floating breathing movement
      masterGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;

      // Inner Core rotation & pulse
      innerCore.rotation.x = elapsedTime * 0.6;
      innerCore.rotation.y = elapsedTime * 0.8;
      const pulse = 1 + Math.sin(elapsedTime * 3) * 0.06;
      innerCore.scale.set(pulse, pulse, pulse);

      // Glass Orb gentle float
      glassOrb.position.y = 0.65 + Math.sin(elapsedTime * 2) * 0.04;
      coreGlow.position.y = glassOrb.position.y;
      innerCore.position.y = glassOrb.position.y;

      // Mechanical Gear spin
      gearMesh.rotation.z = elapsedTime * 0.8;

      // Holographic Rings differential spin
      ring1.rotation.z = elapsedTime * 0.4;
      ring2.rotation.z = -elapsedTime * 0.3;
      ring3.rotation.x = Math.PI / 2 + Math.sin(elapsedTime * 0.5) * 0.2;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isDarkMode, isRotating]);

  // Update visibility on layer toggle
  useEffect(() => {
    // Zoom control logic could scale camera position
  }, [activeLayer, zoomLevel]);

  return (
    <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[460px] flex items-center justify-center select-none">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
        style={{ touchAction: 'pan-y' }}
      />

      {/* Top Left HUD Telemetry Badge */}
      <div className="absolute top-2.5 left-2.5 z-20 px-2.5 py-1 rounded-full bg-[#0a0e17]/85 backdrop-blur-xl border border-white/10 font-mono text-[10px] sm:text-[11px] text-[#00f0ff] flex items-center gap-1.5 shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
        <span className="tracking-wider">REALTIME 3D CAD KERNEL</span>
      </div>

      {/* Interactive 3D HUD Controls Toolbar */}
      <div className="absolute bottom-2 left-2 right-2 z-20 flex items-center justify-between gap-1 p-1.5 sm:p-2 rounded-2xl bg-[#090d16]/85 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        {/* Layer Filters - horizontally scrollable without breaking on mobile */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 max-w-[calc(100%-44px)] sm:max-w-none">
          <span className="text-[10px] font-mono text-[#b9cacb] px-1 hidden md:inline shrink-0">لایه‌ها:</span>
          <button
            onClick={() => setActiveLayer('all')}
            className={`px-2 py-1 sm:px-2.5 rounded-lg text-[11px] sm:text-xs font-mono shrink-0 transition-all ${
              activeLayer === 'all'
                ? 'bg-[#00f0ff] text-[#002022] font-bold shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                : 'text-[#b9cacb] hover:text-white bg-white/5'
            }`}
          >
            همه
          </button>
          <button
            onClick={() => setActiveLayer('pcb')}
            className={`px-2 py-1 sm:px-2.5 rounded-lg text-[11px] sm:text-xs font-mono shrink-0 transition-all ${
              activeLayer === 'pcb'
                ? 'bg-[#00f0ff] text-[#002022] font-bold shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                : 'text-[#b9cacb] hover:text-white bg-white/5'
            }`}
          >
            PCB
          </button>
          <button
            onClick={() => setActiveLayer('mcu')}
            className={`px-2 py-1 sm:px-2.5 rounded-lg text-[11px] sm:text-xs font-mono shrink-0 transition-all ${
              activeLayer === 'mcu'
                ? 'bg-[#00f0ff] text-[#002022] font-bold shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                : 'text-[#b9cacb] hover:text-white bg-white/5'
            }`}
          >
            MCU
          </button>
          <button
            onClick={() => setActiveLayer('robot')}
            className={`px-2 py-1 sm:px-2.5 rounded-lg text-[11px] sm:text-xs font-mono shrink-0 transition-all ${
              activeLayer === 'robot'
                ? 'bg-[#00f0ff] text-[#002022] font-bold shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                : 'text-[#b9cacb] hover:text-white bg-white/5'
            }`}
          >
            رباتیک
          </button>
          <button
            onClick={() => setActiveLayer('ai')}
            className={`px-2 py-1 sm:px-2.5 rounded-lg text-[11px] sm:text-xs font-mono shrink-0 transition-all ${
              activeLayer === 'ai'
                ? 'bg-[#00f0ff] text-[#002022] font-bold shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                : 'text-[#b9cacb] hover:text-white bg-white/5'
            }`}
          >
            هسته AI
          </button>
        </div>

        {/* Rotation & Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-1.5 rounded-lg transition-colors ${
              isRotating ? 'text-[#00f0ff] bg-[#00f0ff]/10' : 'text-[#b9cacb] bg-white/5'
            }`}
            title="تغییر چرخش خودکار"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
          </button>
          <div className="text-[10px] font-mono text-[#65f2b5] px-1.5 py-0.5 rounded bg-[#65f2b5]/10 border border-[#65f2b5]/20 hidden sm:block">
            60 FPS
          </div>
        </div>
      </div>
    </div>
  );
};
