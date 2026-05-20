import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
// Three.js addons are usually in /examples/jsm or /addons depending on version
// For this environment, we'll try the standard jsm path but cast to any if types are missing
// @ts-ignore
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
// @ts-ignore
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
// @ts-ignore
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

interface OpeningAnimationProps {
  onComplete: () => void;
}

interface LogicRef {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  composer: any;
  mesh: THREE.Mesh;
  pointLight: THREE.PointLight;
  bloomPass: any;
  mouse: THREE.Vector2;
  targetMouse: THREE.Vector2;
  isDivingInternal?: boolean;
}

const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDiving, setIsDiving] = useState(false);
  const logicRef = useRef<LogicRef | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true, 
      powerPreference: "high-performance" 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    // TorusKnotGeometry
    const geometry = new THREE.TorusKnotGeometry(1.6, 0.45, 300, 60);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x020202,
      metalness: 0.95,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      emissive: 0x000000,
      emissiveIntensity: 0
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Initial Light
    const pointLight = new THREE.PointLight(0xffffff, 0, 70);
    scene.add(pointLight);

    // Post processing
    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight), 
        1.5, 0.4, 0.85
    );
    bloomPass.threshold = 0.01;
    bloomPass.strength = 1.0;

    const composer = new EffectComposer(renderer);
    composer.addPass(renderPass);
    composer.addPass(bloomPass);

    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);

    logicRef.current = {
      scene, camera, renderer, composer, mesh, pointLight, bloomPass, mouse, targetMouse,
      isDivingInternal: false
    };

    // Intro Animation
    const introTl = gsap.timeline({ delay: 0.5 });
    introTl.to(pointLight, { intensity: 15, duration: 4, ease: "sine.inOut" }, 0);
    introTl.to("#intro-title", { opacity: 0.8, letterSpacing: "2.5rem", duration: 3, ease: "expo.out" }, 0.5);
    introTl.to("#hint-text", { opacity: 1, duration: 2 }, 1.5);

    // Loop Animation
    gsap.to(mesh.scale, {
      x: 1.05, y: 1.05, z: 1.05,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    const onMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      const cursor = document.getElementById('opening-cursor');
      if (cursor) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      mouse.x += (targetMouse.x - mouse.x) * 0.08;
      mouse.y += (targetMouse.y - mouse.y) * 0.08;

      if (!logicRef.current?.isDivingInternal) {
        mesh.rotation.y += 0.005;
        mesh.rotation.x += 0.003;
        
        pointLight.position.x = mouse.x * 12;
        pointLight.position.y = mouse.y * 12;
        pointLight.position.z = 7;

        camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (-mouse.y * 0.5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
      } else {
        mesh.rotation.y += 0.15;
        mesh.rotation.z += 0.08;
      }

      composer.render();
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  const triggerDive = () => {
    if (isDiving || !logicRef.current) return;
    setIsDiving(true);
    logicRef.current.isDivingInternal = true;

    const { camera, mesh, bloomPass, pointLight } = logicRef.current;
    const tl = gsap.timeline();
    
    tl.to(camera.position, { z: -10, duration: 1.5, ease: "expo.in" }, 0);
    tl.to(camera, { 
        fov: 150, 
        duration: 1.4, 
        ease: "expo.in",
        onUpdate: () => camera.updateProjectionMatrix() 
    }, 0);

    tl.to(mesh.scale, { x: 50, y: 50, z: 50, duration: 1.5, ease: "expo.in" }, 0);
    const material = mesh.material as THREE.MeshPhysicalMaterial;
    tl.to(material, { emissiveIntensity: 200, duration: 1 }, 0.4);
    tl.to(material.emissive, { r: 1, g: 1, b: 1, duration: 0.8 }, 0.5);

    tl.to(bloomPass, { strength: 40, radius: 4, duration: 1.2, ease: "power2.in" }, 0.2);
    tl.to(pointLight, { intensity: 10000, duration: 1.2 }, 0.3);

    // Flash and Auto-Complete
    tl.to("#flash-overlay", { opacity: 1, duration: 0.1 }, 1.1);
    tl.to({}, {
      duration: 0.2,
      onStart: () => {
        // Transition to main page at the peak of the flash
        onComplete();
      }
    }, 1.2);
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black overflow-hidden cursor-none"
      onClick={!isDiving ? triggerDive : undefined}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
      
      <div id="opening-cursor" className="fixed w-[5px] h-[5px] bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference top-0 left-0 shadow-[0_0_15px_white] will-change-transform" />
      
      <div id="flash-overlay" className="fixed inset-0 bg-white z-[200] opacity-0 pointer-events-none" />

      <div className="fixed inset-0 flex flex-col justify-center items-center pointer-events-none">
        <h1 
          id="intro-title" 
          className="text-white font-bold uppercase m-0 opacity-0 tracking-[3vw] indent-[3vw] text-[clamp(1.5rem,10vw,6rem)]"
        >
          PORTFOLIO
        </h1>
        <div id="hint-text" className="fixed bottom-[60px] w-full text-center text-white/25 text-[8px] tracking-[12px] uppercase opacity-0">
          Click to dive in
        </div>
      </div>
    </div>
  );
};

export default OpeningAnimation;
