import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Box({ position }) {
  const meshRef = useRef(); // Initialize ref without TypeScript types
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Target scale for smooth animation
  const targetScale = clicked ? 1.4 : hovered ? 1.1 : 0.9;

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Smooth scale animation
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );

      // Floating animation
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + position[0] + position[2]) * 0.1;

      // Rotation animation when clicked
      if (clicked) {
        meshRef.current.rotation.x += delta * 0.5;
        meshRef.current.rotation.y += delta * 0.7;
      }
    }
  });

  return (
    <mesh
      ref={meshRef} // Pass the ref correctly
      position={position}
      onPointerDown={() => setClicked(true)}
      onPointerUp={() => setClicked(false)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => {
        setHovered(false);
        setClicked(false);
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        color={clicked ? '#ff6b6b' : hovered ? '#ff9999' : '#ffffff'}
        metalness={0.7}
        roughness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transmission={0.2}
        thickness={1.5}
        opacity={1}
        transparent={true}
        envMapIntensity={1}
      />
    </mesh>
  );
}

function CubeGrid({ size }) {
  const cubes = [];

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      for (let z = 0; z < size; z++) {
        cubes.push(
          <Box
            key={`${x}-${y}-${z}`}
            position={[
              x - size / 2 + 0.5,
              y - size / 2 + 0.5,
              z - size / 2 + 0.5,
            ]}
          />
        );
      }
    }
  }

  return <>{cubes}</>;
}

export function Cube() {
  const [gridSize, setGridSize] = useState(4);
  const [autoRotateSpeed, setAutoRotateSpeed] = useState(0.5);
  const [lightIntensity, setLightIntensity] = useState(2);

  return (
    <div className="h-[600px] w-full relative">
      {/* UI Controls */}
      <div className="absolute top-4 left-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
        <label className="block text-white text-sm mb-2">
          Grid Size:
          <input
            type="number"
            value={gridSize}
            onChange={(e) => setGridSize(parseInt(e.target.value, 10))}
            min="1"
            max="10"
            className="ml-2 p-1 rounded bg-white/10 text-white"
          />
        </label>
        <label className="block text-white text-sm mb-2">
          Auto Rotate Speed:
          <input
            type="number"
            step="0.1"
            value={autoRotateSpeed}
            onChange={(e) => setAutoRotateSpeed(parseFloat(e.target.value))}
            min="0"
            max="2"
            className="ml-2 p-1 rounded bg-white/10 text-white"
          />
        </label>
        <label className="block text-white text-sm">
          Light Intensity:
          <input
            type="number"
            step="0.1"
            value={lightIntensity}
            onChange={(e) => setLightIntensity(parseFloat(e.target.value))}
            min="0"
            max="5"
            className="ml-2 p-1 rounded bg-white/10 text-white"
          />
        </label>
      </div>

      {/* Canvas */}
      <Canvas
        camera={{ position: [6, 6, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#111111']} />
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={lightIntensity} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff9999" />
        <spotLight
          position={[5, 5, 5]}
          angle={0.4}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <CubeGrid size={gridSize} />
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={autoRotateSpeed}
        />
      </Canvas>
    </div>
  );
}

export default Cube;