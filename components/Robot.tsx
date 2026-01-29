
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Capsule, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Robot: React.FC = () => {
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Group>(null);
  
  const [isBlinking, setIsBlinking] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Smooth Look-At Mouse behavior
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        state.mouse.x * 0.5,
        0.1
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -state.mouse.y * 0.3,
        0.1
      );
    }

    // Body Bobbing
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(t * 2) * 0.05;
    }

    // Blinking Logic
    if (Math.random() < 0.01 && !isBlinking) {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }

    if (leftEyeRef.current && rightEyeRef.current) {
      const eyeScale = isBlinking ? 0.01 : 1;
      leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, eyeScale, 0.4);
      rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, eyeScale, 0.4);
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      {/* Floating Main Body */}
      <group ref={bodyRef}>
        {/* Head */}
        <group ref={headRef} position={[0, 0.8, 0]}>
          {/* Helmet Shell */}
          <mesh>
            <sphereGeometry args={[0.6, 32, 32]} />
            <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.5} />
          </mesh>
          
          {/* Visor Area */}
          <mesh position={[0, 0, 0.35]} scale={[1, 0.6, 0.5]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="#111111" roughness={0} metalness={1} />
          </mesh>

          {/* Expressive Eyes */}
          <mesh ref={leftEyeRef} position={[-0.2, 0, 0.55]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#22D3EE" />
            <pointLight intensity={0.5} color="#22D3EE" />
          </mesh>
          <mesh ref={rightEyeRef} position={[0.2, 0, 0.55]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#22D3EE" />
            <pointLight intensity={0.5} color="#22D3EE" />
          </mesh>

          {/* Antennas */}
          <group position={[0.4, 0.4, 0]} rotation={[0, 0, -0.4]}>
             <Capsule args={[0.03, 0.2, 4, 8]}>
               <meshStandardMaterial color="#ffffff" />
             </Capsule>
          </group>
          <group position={[-0.4, 0.4, 0]} rotation={[0, 0, 0.4]}>
             <Capsule args={[0.03, 0.2, 4, 8]}>
               <meshStandardMaterial color="#ffffff" />
             </Capsule>
          </group>
        </group>

        {/* Torso/Chassis */}
        <group position={[0, 0, 0]}>
          {/* Fix: Moved scale from sphereGeometry to mesh */}
          <mesh scale={[1, 1.2, 0.8]}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
          {/* Core Badge */}
          {/* Fix: Moved rotation from cylinderGeometry to mesh to correct TypeError */}
          <mesh position={[0, 0, 0.32]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.05, 32]} />
            <meshBasicMaterial color="#22D3EE" />
          </mesh>
        </group>

        {/* Floating Little Hands */}
        <Float speed={5} rotationIntensity={2} floatIntensity={1}>
          <mesh position={[0.7, 0.2, 0.2]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </Float>
        <Float speed={4} rotationIntensity={2} floatIntensity={1}>
          <mesh position={[-0.7, 0.2, 0.2]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </Float>
      </group>

      {/* Decorative Shadow Ring on floor (invisible floor) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <ringGeometry args={[0.4, 0.45, 64]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.2} />
      </mesh>

      <ambientLight intensity={0.5} />
      <spotLight position={[5, 5, 5]} intensity={1} angle={0.3} penumbra={1} />
      <pointLight position={[-3, -3, 2]} intensity={0.5} color="#22D3EE" />
    </group>
  );
};

export default Robot;
