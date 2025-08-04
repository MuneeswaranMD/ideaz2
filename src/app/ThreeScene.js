import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const effectThemes = [
  {
    name: "Lightning Storm",
    effect: "lightning",
    outer: [new THREE.Color(0x00ffff), new THREE.Color(0x4169e1), new THREE.Color(0x9400d3)],
    outerEdge: new THREE.Color(0x87cefa),
    inner: [new THREE.Color(0xff1493), new THREE.Color(0xff4500), new THREE.Color(0xffd700)],
    innerEdge: new THREE.Color(0xffd700)
  },
  {
    name: "Volcanic Shards",
    effect: "shards",
    outer: [new THREE.Color(0xffd700), new THREE.Color(0xff4500), new THREE.Color(0x8b0000)],
    outerEdge: new THREE.Color(0xff8c00),
    inner: [new THREE.Color(0xffff00), new THREE.Color(0xff6347), new THREE.Color(0xdc143c)],
    innerEdge: new THREE.Color(0xffa500),
    shardColors: [new THREE.Color(0xff8c00), new THREE.Color(0xffa500), new THREE.Color(0xffff00)]
  },
  {
    name: "Arctic Rings",
    effect: "rings",
    outer: [new THREE.Color(0x00ffff), new THREE.Color(0x87ceeb), new THREE.Color(0xb0e0e6)],
    outerEdge: new THREE.Color(0x00ffff),
    inner: [new THREE.Color(0xffffff), new THREE.Color(0xe0ffff), new THREE.Color(0xf0f8ff)],
    innerEdge: new THREE.Color(0xffffff),
    ringColors: [new THREE.Color(0x00ffff), new THREE.Color(0x87ceeb), new THREE.Color(0xffffff)]
  },
  {
    name: "Emerald Spiral",
    effect: "spiral",
    outer: [new THREE.Color(0x00ff00), new THREE.Color(0x32cd32), new THREE.Color(0x228b22)],
    outerEdge: new THREE.Color(0x98fb98),
    inner: [new THREE.Color(0xadff2f), new THREE.Color(0x9acd32), new THREE.Color(0x6b8e23)],
    innerEdge: new THREE.Color(0xadff2f),
    spiralColors: [new THREE.Color(0x00ff00), new THREE.Color(0x32cd32), new THREE.Color(0xadff2f)]
  },
  {
    name: "Solar Flare",
    effect: "flare",
    outer: [new THREE.Color(0xffa500), new THREE.Color(0xff8c00), new THREE.Color(0xff7f50)],
    outerEdge: new THREE.Color(0xffd700),
    inner: [new THREE.Color(0xffff00), new THREE.Color(0xffd700), new THREE.Color(0xffa500)],
    innerEdge: new THREE.Color(0xffff00),
    flareColors: [new THREE.Color(0xff4500), new THREE.Color(0xff6600), new THREE.Color(0xffa500), new THREE.Color(0xffff00), new THREE.Color(0xffd700)]
  }
];

const lightningMaterial = new THREE.ShaderMaterial({
  uniforms: { uTime: { value: 0 }, uLife: { value: 0 }, uFlicker: { value: 1.0 } },
  vertexShader: `
      varying vec2 vUv;
      void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
  `,
  fragmentShader: `
      uniform float uTime, uLife, uFlicker;
      varying vec2 vUv;
      float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
      }
      float noise(vec2 st) {
          vec2 i = floor(st), f = fract(st);
          float a = random(i), b = random(i + vec2(1,0)), c = random(i + vec2(0,1)), d = random(i + vec2(1,1));
          vec2 u = f*f*(3.0-2.0*f);
          return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
      }
      void main() {
          float core = smoothstep(0.4, 0.0, abs(vUv.x - 0.5));
          core += noise(vec2(vUv.y*40.0, uTime*2.0)) * noise(vec2(vUv.y*25.0, uTime*1.5)) * 0.8;
          vec3 color = mix(vec3(0.1,0.5,1.0), vec3(0.6,0.2,1.0), core*0.7);
          color = mix(color, vec3(1.0), pow(core, 2.0)*0.9);
          float lifeAlpha = smoothstep(0.0, 0.2, uLife) * (1.0 - smoothstep(0.6, 1.0, uLife));
          float intense = sin(uLife * 3.14159 * 3.0) * 0.5 + 0.5;
          float alpha = pow(1.0 - abs(vUv.x - 0.5)*2.0, 2.0) * lifeAlpha * uFlicker * intense;
          gl_FragColor = vec4(color, alpha);
      }
  `,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false
});

const Visualizer = () => {
  const mountRef = useRef(null);
  const [effectState, setEffectState] = useState(0);
  const [effectInfo, setEffectInfo] = useState(effectThemes[0].name);
  const stateRef = useRef({});

  const createParticlePyramid = (height, baseSize, particleCount, innerPyramid = false) => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const particleColors = [];
    const originalColors = [];
    const twinkleFactors = [];
    const initialSizes = [];
    const baseParticleSize = innerPyramid ? 0.02 : 0.03;

    for (let i = 0; i < particleCount; i++) {
      const t = Math.random();
      const u = Math.random();
      const apex = { x: 0, y: height, z: 0 };
      const base = [
        { x: -baseSize, y: 0, z: -baseSize },
        { x: baseSize, y: 0, z: -baseSize },
        { x: baseSize, y: 0, z: baseSize },
        { x: -baseSize, y: 0, z: baseSize }
      ];
      const face = Math.floor(Math.random() * 4);
      const basePoint1 = base[face];
      const basePoint2 = base[(face + 1) % 4];
      const x = (1 - t) * ((1 - u) * basePoint1.x + u * basePoint2.x) + t * apex.x;
      const y = (1 - t) * 0 + t * height;
      const z = (1 - t) * ((1 - u) * basePoint1.z + u * basePoint2.z) + t * apex.z;
      positions.push(x, y, z);
      particleColors.push(0, 0, 0);
      originalColors.push(new THREE.Color());
      initialSizes.push(baseParticleSize);
      if (Math.random() < 0.2) {
        twinkleFactors.push(Math.random() * 2 + 1.0);
      } else {
        twinkleFactors.push(0);
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(initialSizes, 1));

    const material = new THREE.PointsMaterial({
      vertexColors: true,
      size: baseParticleSize,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    return { particles, originalColors, twinkleFactors, baseParticleSize };
  };

  const createPyramidEdges = (height, baseSize, color) => {
    const points = [];
    const apex = new THREE.Vector3(0, height, 0);
    const verts = [
      new THREE.Vector3(-baseSize, 0, -baseSize),
      new THREE.Vector3(baseSize, 0, -baseSize),
      new THREE.Vector3(baseSize, 0, baseSize),
      new THREE.Vector3(-baseSize, 0, baseSize)
    ];
    for (let i = 0; i < 4; i++) {
      points.push(apex.x, apex.y, apex.z, verts[i].x, verts[i].y, verts[i].z);
      points.push(verts[i].x, verts[i].y, verts[i].z, verts[(i + 1) % 4].x, verts[(i + 1) % 4].y, verts[(i + 1) % 4].z);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    const mat = new THREE.LineBasicMaterial({
      color: color,
      linewidth: 2,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    return new THREE.LineSegments(geo, mat);
  };

  const createCylinder = (start, end, radius) => {
    const dir = new THREE.Vector3().subVectors(end, start);
    const orient = new THREE.Matrix4();
    const rot = new THREE.Matrix4();
    orient.lookAt(start, end, new THREE.Object3D().up);
    rot.makeRotationX(Math.PI * 0.5);
    orient.multiply(rot);
    const geo = new THREE.CylinderGeometry(radius, radius, dir.length(), 8, 1, true);
    geo.applyMatrix4(orient);
    geo.translate((start.x + end.x) / 2, (start.y + end.y) / 2, (start.z + end.z) / 2);
    return geo;
  };

  const createEnhancedLightningBolt = useCallback(() => {
    const group = new THREE.Group();
    const origin = new THREE.Vector3(0, 2.8, 0);
    
    function branch(start, dir, energy, depth) {
      if (energy < 0.3 || depth > 15) return;
      const len = (Math.random() * 0.7 + 0.3) * energy * 0.6;
      const end = start.clone().add(dir.clone().multiplyScalar(len));
      const rad = 0.005 + (energy / 120) + Math.random() * 0.005;
      const seg = createCylinder(start, end, rad);
      const mesh = new THREE.Mesh(seg, lightningMaterial.clone());
      group.add(mesh);
      const nextE = energy * (0.85 + Math.random() * 0.1);
      const nextDir = dir.clone().add(new THREE.Vector3((Math.random() - 0.5) * 4.5, (Math.random() - 0.5) * 2.5, (Math.random() - 0.5) * 4.5)).normalize();
      branch(end, nextDir, nextE, depth + 1);
      if (Math.random() < 0.6 && depth > 0) {
        const bDir = new THREE.Vector3((Math.random() - 0.5) * 6.0, (Math.random() - 0.5) * 4.0, (Math.random() - 0.5) * 6.0).normalize();
        branch(end, bDir, nextE * 0.7, depth + 1);
      }
    }
    
    const n = Math.floor(Math.random() * 4) + 7;
    for (let i = 0; i < n; i++) {
      const d = new THREE.Vector3((Math.random() - 0.5) * 3.5, Math.random() * 0.7 + 0.3, (Math.random() - 0.5) * 3.5).normalize();
      branch(origin, d, 7, 0);
    }
    return group;
  }, []);

  useEffect(() => {
    const { current: mount } = mountRef;
    if (!mount) return;

   const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xff0000, 0); // <-- Transparent canvas
document.body.appendChild(renderer.domElement);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    camera.position.set(0, 2, 6);
    controls.target.set(0, 1, 0);
    controls.update();

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0.1;
    bloomPass.strength = 2.5;
    bloomPass.radius = 0.8;
    composer.addPass(bloomPass);

    const clock = new THREE.Clock();
    let time = 0;

    const effectGroups = {
      lightning: null,
      shards: new THREE.Group(),
      rings: new THREE.Group(),
      spiral: new THREE.Group(),
      flare: new THREE.Group()
    };
    scene.add(effectGroups.shards, effectGroups.rings, effectGroups.spiral, effectGroups.flare);

    const effectData = {
      lightning: { isActive: false, startTime: 0, duration: 1.0 },
      shards: { isActive: false },
      rings: { isActive: false },
      spiral: { isActive: false },
      flare: { isActive: false }
    };

    const pyramidGroup = new THREE.Group();
    scene.add(pyramidGroup);

    const outerPyramidData = createParticlePyramid(2.5, 1.8, 5000);
    const outerEdges = createPyramidEdges(2.5, 1.8, new THREE.Color());
    const outerGroup = new THREE.Group();
    outerGroup.userData.height = 2.5;
    outerGroup.add(outerPyramidData.particles);

    const innerPyramidData = createParticlePyramid(1.5, 1.0, 3000, true);
    const innerEdges = createPyramidEdges(1.5, 1.0, new THREE.Color());
    const innerGroup = new THREE.Group();
    innerGroup.userData.height = 1.5;
    innerGroup.add(innerPyramidData.particles);

    pyramidGroup.add(outerGroup, outerEdges, innerGroup, innerEdges);

    const updatePyramidColors = (pyramidData, newColors) => {
      const { particles, originalColors } = pyramidData;
      const positions = particles.geometry.attributes.position;
      const colors = particles.geometry.attributes.color;
      const height = particles.parent.userData.height;

      for (let i = 0; i < positions.count; i++) {
        const y = positions.getY(i);
        const colorPos = y / height;
        const idx = Math.min(newColors.length - 2, Math.floor(colorPos * (newColors.length - 1)));
        const c1 = newColors[idx];
        const c2 = newColors[idx + 1];
        const mix = (colorPos * (newColors.length - 1)) % 1;
        const finalColor = new THREE.Color().lerpColors(c1, c2, mix);
        colors.setXYZ(i, finalColor.r, finalColor.g, finalColor.b);
        originalColors[i].copy(finalColor);
      }
      colors.needsUpdate = true;
    };

    const setPalette = (theme) => {
      updatePyramidColors(outerPyramidData, theme.outer);
      outerEdges.material.color.set(theme.outerEdge);
      updatePyramidColors(innerPyramidData, theme.inner);
      innerEdges.material.color.set(theme.innerEdge);
    };

    setPalette(effectThemes[0]);

    const applySparkle = (pData, t) => {
      const { particles, originalColors, twinkleFactors, baseParticleSize } = pData;
      const colors = particles.geometry.attributes.color;
      const sizes = particles.geometry.attributes.size;
      for (let i = 0; i < colors.count; i++) {
        if (twinkleFactors[i] > 0) {
          const pulse = Math.pow(Math.abs(Math.sin(twinkleFactors[i] * t + i * 0.1)), 10);
          const brightness = 1.0 + 2.0 * pulse;
          const sizePulse = 1.0 + 3.0 * pulse;
          const oc = originalColors[i];
          colors.setXYZ(i, oc.r * brightness, oc.g * brightness, oc.b * brightness);
          sizes.setX(i, baseParticleSize * sizePulse);
        }
      }
      colors.needsUpdate = true;
      sizes.needsUpdate = true;
    };

    const animateLightning = (totalTime) => {
      const lt = totalTime - effectData.lightning.startTime;
      const life = lt / effectData.lightning.duration;
      effectGroups.lightning.traverse(c => {
        if (c.isMesh && c.material.uniforms) {
          c.material.uniforms.uTime.value = totalTime;
          c.material.uniforms.uLife.value = life;
          c.material.uniforms.uFlicker.value = Math.random() > 0.05 ? 1.0 : 0.0;
        }
      });
      if (life >= 1.0) {
        effectData.lightning.isActive = false;
        effectGroups.lightning.visible = false;
      }
    };

    const animateShards = () => {
      if (!effectGroups.shards.children.length) { effectData.shards.isActive = false; return; }
      for (let i = effectGroups.shards.children.length - 1; i >= 0; i--) {
        const s = effectGroups.shards.children[i];
        s.position.add(s.userData.velocity);
        s.userData.life -= 0.015;
        s.material.opacity = s.userData.life;
        if (s.userData.life <= 0) {
          s.geometry.dispose();
          s.material.dispose();
          effectGroups.shards.remove(s);
        }
      }
    };

    const animateRings = () => {
      if (!effectGroups.rings.children.length) { effectData.rings.isActive = false; return; }
      for (let i = effectGroups.rings.children.length - 1; i >= 0; i--) {
        const r = effectGroups.rings.children[i];
        r.scale.x += r.userData.speed;
        r.scale.y += r.userData.speed;
        r.userData.life -= 0.01;
        r.material.opacity = r.userData.life;
        if (r.userData.life <= 0) {
          r.geometry.dispose();
          r.material.dispose();
          effectGroups.rings.remove(r);
        }
      }
    };

    const animateSpiral = () => {
      if (!effectGroups.spiral.children.length) { effectData.spiral.isActive = false; return; }
      for (let i = effectGroups.spiral.children.length - 1; i >= 0; i--) {
        const p = effectGroups.spiral.children[i];
        p.userData.angle += p.userData.speed;
        p.userData.radius += 0.02;
        p.position.x = Math.cos(p.userData.angle) * p.userData.radius;
        p.position.z = Math.sin(p.userData.angle) * p.userData.radius;
        p.position.y += 0.03;
        p.userData.life -= 0.008;
        p.material.opacity = p.userData.life;
        if (p.userData.life <= 0) {
          p.geometry.dispose();
          p.material.dispose();
          effectGroups.spiral.remove(p);
        }
      }
    };

    const animateFlare = () => {
      if (!effectGroups.flare.children.length) { effectData.flare.isActive = false; return; }
      for (let i = effectGroups.flare.children.length - 1; i >= 0; i--) {
        const f = effectGroups.flare.children[i];
        f.position.add(f.userData.velocity);
        f.userData.velocity.y -= 0.0008;
        f.userData.velocity.x += (Math.random() - 0.5) * 0.001;
        f.userData.life -= 0.010;
        const flick = 0.85 + Math.sin(time * 15 + i * 0.5) * 0.15;
        f.material.opacity = f.userData.life * flick;
        if (f.userData.life <= 0) {
          f.geometry.dispose();
          f.material.dispose();
          effectGroups.flare.remove(f);
        }
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      const et = clock.getElapsedTime();
      const dt = clock.getDelta();
      time += dt;
      pyramidGroup.rotation.y += 0.005;
      innerGroup.rotation.y -= 0.015;
      applySparkle(outerPyramidData, time);
      applySparkle(innerPyramidData, time);
      if (effectData.lightning.isActive) animateLightning(et);
      if (effectData.shards.isActive) animateShards();
      if (effectData.rings.isActive) animateRings();
      if (effectData.spiral.isActive) animateSpiral();
      if (effectData.flare.isActive) animateFlare();
      controls.update();
      composer.render();
    };

    animate();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    stateRef.current = {
      ...stateRef.current,
      bloomPass,
      effectData,
      effectGroups,
      pyramidGroup,
      setPalette,
      time,
      clock,
      createEnhancedLightningBolt
    };

    return () => {
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
      // Clean up Three.js objects to prevent memory leaks
      scene.children.forEach(child => scene.remove(child));
      renderer.dispose();
      controls.dispose();
      composer.dispose();
      renderPass.dispose();
      bloomPass.dispose();
      pyramidGroup.children.forEach(child => {
        if (child.isGroup) {
          child.children.forEach(mesh => {
            if (mesh.isMesh) {
              mesh.geometry.dispose();
              mesh.material.dispose();
            }
          });
        }
        if (child.isLineSegments) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
    };
  }, [createEnhancedLightningBolt]);

  const handleTriggerEffect = () => {
    const { bloomPass, effectData, effectGroups, pyramidGroup, setPalette, clock, createEnhancedLightningBolt } = stateRef.current;
    if (Object.values(effectData).some(d => d.isActive)) return;

    const theme = effectThemes[effectState];
    setPalette(theme);
    setEffectInfo(theme.name);

    switch (theme.effect) {
      case 'lightning':
        if (effectGroups.lightning) {
          effectGroups.lightning.traverse(c => { if (c.isMesh) c.geometry.dispose(); });
          pyramidGroup.remove(effectGroups.lightning);
        }
        effectGroups.lightning = createEnhancedLightningBolt();
        pyramidGroup.add(effectGroups.lightning);
        effectGroups.lightning.visible = true;
        effectData.lightning.isActive = true;
        effectData.lightning.startTime = clock.getElapsedTime();
        bloomPass.strength = 4.5;
        setTimeout(() => bloomPass.strength = 2.5, 400);
        break;
      case 'shards':
        triggerShardBurst(effectGroups, theme.shardColors);
        bloomPass.strength = 5.5;
        setTimeout(() => bloomPass.strength = 2.5, 600);
        break;
      case 'rings':
        triggerRings(effectGroups, theme.ringColors);
        bloomPass.strength = 4.0;
        setTimeout(() => bloomPass.strength = 2.5, 500);
        break;
      case 'spiral':
        triggerSpiral(effectGroups, theme.spiralColors);
        bloomPass.strength = 3.5;
        setTimeout(() => bloomPass.strength = 2.5, 700);
        break;
      case 'flare':
        triggerFlare(effectGroups, theme.flareColors);
        bloomPass.strength = 5.5;
        setTimeout(() => bloomPass.strength = 2.5, 600);
        break;
      default:
        break;
    }
    setEffectState((prev) => (prev + 1) % effectThemes.length);
  };
  
  const triggerShardBurst = (effectGroups, colors) => {
    if (effectGroups.shards.children.length) return;
    stateRef.current.effectData.shards.isActive = true;
    for (let i = 0; i < 300; i++) {
      const geo = new THREE.ConeGeometry(0.015, 0.5, 4);
      const col = colors[Math.floor(Math.random() * colors.length)];
      const mat = new THREE.MeshBasicMaterial({ color: col, blending: THREE.AdditiveBlending, transparent: true, opacity: 1.0 });
      const shard = new THREE.Mesh(geo, mat);
      const origin = new THREE.Vector3(0, 1.5, 0);
      shard.position.copy(origin);
      const dir = new THREE.Vector3((Math.random() - 0.5), (Math.random() - 0.5), (Math.random() - 0.5)).normalize();
      shard.lookAt(dir.clone().add(origin));
      shard.rotateX(Math.PI / 2);
      shard.userData.velocity = dir.multiplyScalar(0.08 + Math.random() * 0.12);
      shard.userData.life = 1.0;
      effectGroups.shards.add(shard);
    }
  };
  
  const triggerRings = (effectGroups, colors) => {
    if (effectGroups.rings.children.length) return;
    stateRef.current.effectData.rings.isActive = true;
    for (let r = 0; r < 5; r++) {
      const ringGeo = new THREE.RingGeometry(0.5 + r * 0.3, 0.6 + r * 0.3, 32);
      const col = colors[r % colors.length];
      const mat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 1.0, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, mat);
      ring.position.set(0, 1.5, 0);
      ring.rotation.x = Math.PI / 2;
      ring.userData.speed = 0.03 + r * 0.02;
      ring.userData.life = 1.0;
      effectGroups.rings.add(ring);
    }
  };
  
  const triggerSpiral = (effectGroups, colors) => {
    if (effectGroups.spiral.children.length) return;
    stateRef.current.effectData.spiral.isActive = true;
    for (let i = 0; i < 200; i++) {
      const geo = new THREE.SphereGeometry(0.02, 8, 6);
      const col = colors[i % colors.length];
      const mat = new THREE.MeshBasicMaterial({ color: col, blending: THREE.AdditiveBlending, transparent: true, opacity: 1.0 });
      const p = new THREE.Mesh(geo, mat);
      const angle = (i / 200) * Math.PI * 8;
      const radius = 0.1 + (i / 200) * 2;
      p.position.set(Math.cos(angle) * radius, 1.5 + (i / 200) * 2, Math.sin(angle) * radius);
      p.userData.angle = angle;
      p.userData.radius = radius;
      p.userData.life = 1.0;
      p.userData.speed = 0.05;
      effectGroups.spiral.add(p);
    }
  };
  
  const triggerFlare = (effectGroups, colors) => {
    if (effectGroups.flare.children.length) return;
    stateRef.current.effectData.flare.isActive = true;
    for (let i = 0; i < 200; i++) {
      const geo = new THREE.PlaneGeometry(0.08 + Math.random() * 0.04, 0.4 + Math.random() * 0.3);
      const col = colors[Math.floor(Math.random() * colors.length)];
      const mat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 1.0, blending: THREE.AdditiveBlending });
      const f = new THREE.Mesh(geo, mat);
      f.position.set(0, 2.5, 0);
      const dir = new THREE.Vector3((Math.random() - 0.5) * 2, -Math.random() * 0.8, (Math.random() - 0.5) * 2).normalize();
      f.lookAt(dir.clone().add(f.position));
      f.userData.velocity = dir.multiplyScalar(0.05 + Math.random() * 0.10);
      f.userData.life = 1.0;
      f.userData.initialVelocity = f.userData.velocity.clone();
      effectGroups.flare.add(f);
    }
  };

  return (
    <>
    
      <div ref={mountRef} className="visualizer-canvas" />
      <div id="ui-container">
        <button id="effect-trigger" onMouseEnter={handleTriggerEffect}>IDEAZ 2.0</button>
      </div>
    </>
  );
};

export default Visualizer;
