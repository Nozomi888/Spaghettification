import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stars } from '@react-three/drei';

function AvatarModel() {
  const { scene } = useGLTF('/682876d055fa435d1480328e.glb');
  
  useFrame(() => {
    scene.rotation.y += 0.002;
  });

  return <primitive object={scene} scale={2.0} position={[0, -0.6, 0]} />;
}

function FloatingObject({ position, size }) {
  const objectRef = useRef();

  useFrame(() => {
    objectRef.current.rotation.y += 0.003;
    objectRef.current.position.y += Math.sin(Date.now() * 0.0005) * 0.02;
  });

  return (
    <mesh ref={objectRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color="#8B4513" />
    </mesh>
  );
}

function Avatar3D() {
  return (
    <Canvas style={{ width: '100vw', height: '70vh' }} camera={{ position: [0, 0, 5] }}>
      {/* Space lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight intensity={1} position={[0, 5, 5]} />
      <pointLight intensity={1} position={[0, -5, 5]} />

      {/* Stunning starry background */}
      <Stars radius={200} depth={70} count={7000} factor={5} saturation={1} fade />

      {/* Floating space objects */}
      <FloatingObject position={[-3, 1, -4]} size={0.6} />
      <FloatingObject position={[2, -1, -5]} size={0.8} />
      <FloatingObject position={[0, 3, -6]} size={1} />

      <Suspense fallback={null}>
        <AvatarModel />
        <OrbitControls enableZoom={false} target={[0, -0.5, 0]} />
      </Suspense>
    </Canvas>
  );
}

export default Avatar3D;
