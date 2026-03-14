import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ParticleNetwork = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // Scene & camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, el.clientWidth / el.clientHeight, 0.1, 1000);
    camera.position.z = 8;

    // Particles
    const PARTICLE_COUNT = 3000;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      velocities.push({
        x: (Math.random() - 0.5) * 0.005,
        y: (Math.random() - 0.5) * 0.005,
      });
    }

    const dummy = new THREE.Object3D();
    const geometry = new THREE.SphereGeometry(1, 4, 4);
    const material = new THREE.MeshBasicMaterial({ color: '#00F0FF', transparent: true, opacity: 0.6 });
    const instancedMesh = new THREE.InstancedMesh(geometry, material, PARTICLE_COUNT);
    scene.add(instancedMesh);

    // Lines
    const linePoints = [];
    for (let i = 0; i < 40; i++) {
      linePoints.push(new THREE.Vector3(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 5
      ));
    }
    const linePos = [];
    for (let i = 0; i < linePoints.length; i++) {
      for (let j = i + 1; j < linePoints.length; j++) {
        if (linePoints[i].distanceTo(linePoints[j]) < 4) {
          linePos.push(linePoints[i].x, linePoints[i].y, linePoints[i].z);
          linePos.push(linePoints[j].x, linePoints[j].y, linePoints[j].z);
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePos), 3));
    const lineMat = new THREE.LineBasicMaterial({ color: '#7000FF', transparent: true, opacity: 0.15 });
    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineSegments);

    // Animation
    let animId;
    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = positions[i * 3] + Math.sin(t * 0.3 + i * 0.01) * velocities[i].x * 10;
        const y = positions[i * 3 + 1] + Math.cos(t * 0.2 + i * 0.01) * velocities[i].y * 10;
        const z = positions[i * 3 + 2] + Math.sin(t * 0.1 + i * 0.02) * 0.5;
        dummy.position.set(x, y, z);
        dummy.scale.setScalar(0.02 + Math.sin(t + i) * 0.005);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      }
      instancedMesh.instanceMatrix.needsUpdate = true;
      lineMat.opacity = 0.15 + Math.sin(t * 0.5) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
};
