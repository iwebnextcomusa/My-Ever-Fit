import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x09090b, 0.015);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Create a 3D Energetic Fitness Orb & Particle System
    // Represents vital energy, customized training precision, and kinetic flow
    const particleCount = 280;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color("#f97316"); // Sleek Orange
    const color2 = new THREE.Color("#ffffff"); // Neutral Clean White
    const color3 = new THREE.Color("#ea580c"); // Deep Flame Orange

    for (let i = 0; i < particleCount; i++) {
      // Form an elegant double toroidal swirl or custom energetic sphere
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 8 + Math.random() * 6; // Radius variation

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color blending
      let mixedColor = color1.clone();
      if (Math.random() < 0.4) {
        mixedColor.lerp(color2, Math.random());
      } else {
        mixedColor.lerp(color3, Math.random());
      }

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom textured round particles
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(8, 8, 8, 0, Math.PI * 2);
      ctx.fill();
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.9,
      vertexColors: true,
      map: texture,
      transparent: true,
      alphaTest: 0.05,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Add a wireframe cage inside the particles for higher visual interest
    const cageGeometry = new THREE.IcosahedronGeometry(6, 2);
    const cageMaterial = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const cageMesh = new THREE.Mesh(cageGeometry, cageMaterial);
    scene.add(cageMesh);

    // Dynamic grid floor (representing modern workspace grid / digital platform)
    const gridHelper = new THREE.GridHelper(60, 20, 0xf97316, 0x27272a);
    gridHelper.position.y = -15;
    scene.add(gridHelper);

    // Track scroll
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Handle Resize using ResizeObserver as per Guidelines
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: currentWidth, height: currentHeight } = entry.contentRect;
        camera.aspect = currentWidth / currentHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentWidth, currentHeight);
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Scroll-triggered effects
      const scrollRatio = scrollYRef.current / (document.documentElement.scrollHeight - window.innerHeight || 1);

      // Rotate particle cloud based on time + mouse coords
      particleSystem.rotation.y = elapsedTime * 0.15 + mouseRef.current.x * 0.15;
      particleSystem.rotation.x = elapsedTime * 0.08 + mouseRef.current.y * 0.1;

      // Cage reacts slightly differently for dynamic movement
      cageMesh.rotation.y = -elapsedTime * 0.1 - mouseRef.current.x * 0.05;
      cageMesh.rotation.z = elapsedTime * 0.05;

      // Camera responds to scroll: moves camera slightly down and rotates perspective
      camera.position.y = -scrollRatio * 15;
      camera.position.x = Math.sin(scrollRatio * Math.PI) * 5;
      camera.lookAt(0, -scrollRatio * 5, 0);

      // Animate points positions slightly (kinetic energy flow)
      const posAttr = geometry.attributes.position;
      if (posAttr) {
        const array = posAttr.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          // Add micro wave movement
          const waveX = Math.sin(elapsedTime * 0.5 + array[idx] * 0.1) * 0.005;
          const waveY = Math.cos(elapsedTime * 0.4 + array[idx + 1] * 0.1) * 0.005;
          
          array[idx] += waveX;
          array[idx + 1] += waveY;
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      cageGeometry.dispose();
      cageMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      id="three-3d-scene"
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ minHeight: "100vh" }}
    />
  );
}
