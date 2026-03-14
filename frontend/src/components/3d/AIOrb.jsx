import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const AIOrb = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth;
    const H = el.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.set(0, 0, 5);

    // ── Core glowing sphere ──────────────────────────────────────────────
    const coreGeo = new THREE.SphereGeometry(1, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#7000FF'),
      transparent: true,
      opacity: 0.15,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Inner bright core
    const innerGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#00F0FF'),
      transparent: true,
      opacity: 0.9,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // ── Outer wireframe icosahedron ──────────────────────────────────────
    const icoGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#00F0FF'),
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    scene.add(icoMesh);

    // Second icosahedron — offset rotation
    const ico2Geo = new THREE.IcosahedronGeometry(2.1, 1);
    const ico2Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#7000FF'),
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const ico2Mesh = new THREE.Mesh(ico2Geo, ico2Mat);
    scene.add(ico2Mesh);

    // ── Orbiting ring ────────────────────────────────────────────────────
    const ringGeo = new THREE.TorusGeometry(1.9, 0.012, 8, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#00F0FF'),
      transparent: true,
      opacity: 0.5,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    scene.add(ringMesh);

    const ring2Geo = new THREE.TorusGeometry(2.4, 0.008, 8, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#7000FF'),
      transparent: true,
      opacity: 0.3,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.x = Math.PI / 5;
    ring2Mesh.rotation.y = Math.PI / 4;
    scene.add(ring2Mesh);

    // ── Orbiting particles ───────────────────────────────────────────────
    const ORBIT_COUNT = 80;
    const orbGeo = new THREE.SphereGeometry(1, 4, 4);
    const orbMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#00F0FF'),
      transparent: true,
      opacity: 0.8,
    });
    const orbInstance = new THREE.InstancedMesh(orbGeo, orbMat, ORBIT_COUNT);
    scene.add(orbInstance);

    const orbData = Array.from({ length: ORBIT_COUNT }, (_, i) => ({
      radius: 1.5 + Math.random() * 1.2,
      theta: (i / ORBIT_COUNT) * Math.PI * 2,
      phi: Math.acos(2 * Math.random() - 1),
      speed: 0.15 + Math.random() * 0.3,
      size: 0.012 + Math.random() * 0.02,
    }));

    const dummy = new THREE.Object3D();

    // ── Mouse tracking ───────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    el.addEventListener('mousemove', onMouseMove);

    // ── Animation loop ───────────────────────────────────────────────────
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Core pulse
      const pulse = 1 + Math.sin(t * 2.5) * 0.06;
      coreMesh.scale.setScalar(pulse);
      innerMesh.scale.setScalar(0.9 + Math.sin(t * 3) * 0.08);
      innerMat.opacity = 0.7 + Math.sin(t * 2) * 0.25;

      // Mouse tilt
      icoMesh.rotation.y = t * 0.25 + mouse.x * 0.3;
      icoMesh.rotation.x = t * 0.15 + mouse.y * 0.2;
      ico2Mesh.rotation.y = -t * 0.18 + mouse.x * 0.2;
      ico2Mesh.rotation.z = t * 0.12;

      // Rings
      ringMesh.rotation.z = t * 0.4;
      ring2Mesh.rotation.y = -t * 0.3;
      ring2Mesh.rotation.z = t * 0.2;

      // Orbiting particles
      for (let i = 0; i < ORBIT_COUNT; i++) {
        const d = orbData[i];
        const angle = d.theta + t * d.speed;
        const x = d.radius * Math.sin(d.phi) * Math.cos(angle);
        const y = d.radius * Math.cos(d.phi);
        const z = d.radius * Math.sin(d.phi) * Math.sin(angle);
        dummy.position.set(x, y, z);
        dummy.scale.setScalar(d.size * (1 + Math.sin(t * 2 + i) * 0.3));
        dummy.updateMatrix();
        orbInstance.setMatrixAt(i, dummy.matrix);
      }
      orbInstance.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

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
      el.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      [coreGeo, innerGeo, icoGeo, ico2Geo, ringGeo, ring2Geo, orbGeo].forEach(g => g.dispose());
      [coreMat, innerMat, icoMat, ico2Mat, ringMat, ring2Mat, orbMat].forEach(m => m.dispose());
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
    />
  );
};
