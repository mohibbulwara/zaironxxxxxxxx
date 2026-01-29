import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Capsule, Float } from '@react-three/drei';
import * as THREE from 'three';

interface RobotProps {
  isMobile?: boolean;
}

const Robot: React.FC<RobotProps> = ({ isMobile }) => {
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const rootRef = useRef<THREE.Group>(null);
  
  const [isBlinking, setIsBlinking] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Smooth head movement
    if (headRef.current) {
      if (isMobile) {
        // Auto-movement on mobile since there's no mouse move usually tracked the same way
        headRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
        headRef.current.rotation.x = Math.cos(t * 0.3) * 0.1;
      } else {
        // Mouse follow on desktop
        headRef.current.rotation.y = THREE.MathUtils.lerp(
          headRef.current.rotation.y,
          state.mouse.x * 0.4,
          0.1
        );
        headRef.current.rotation.x = THREE.MathUtils.lerp(
          headRef.current.rotation.x,
          -state.mouse.y * 0.2,
          0.1
        );
      }
    }

    // Gentle autonomous rotation for the whole robot on mobile
    if (rootRef.current && isMobile) {
      rootRef.current.rotation.y = Math.sin(t * 0.2) * 0.3;
    }

    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(t * 1.5) * 0.05;
    }

    if (Math.random() < 0.008 && !isBlinking) {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 120);
    }

    if (leftEyeRef.current && rightEyeRef.current) {
      const eyeScale = isBlinking ? 0.01 : 1;
      leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, eyeScale, 0.5);
      rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, eyeScale, 0.5);
    }
  });

  return (
    <group ref={rootRef} position={[0, -0.5, 0]}>
      <group ref={bodyRef}>
        {/* Head */}
        <group ref={headRef} position={[0, 0.8, 0]}>
          <mesh>
            <sphereGeometry args={[0.6, 32, 32]} />
            <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.5} />
          </mesh>
          
          <mesh position={[0, 0, 0.35]} scale={[1, 0.6, 0.5]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="#111111" roughness={0} metalness={1} />
          </mesh>

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

        {/* Torso */}
        <group position={[0, 0, 0]}>
          <mesh scale={[1, 1.2, 0.8]}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.32]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.05, 32]} />
            <meshBasicMaterial color="#22D3EE" />
          </mesh>
        </group>

        {/* Floating Little Hands */}
        <Float speed={5} rotationIntensity={1} floatIntensity={1}>
          <mesh position={[0.6, 0.2, 0.1]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </Float>
        <Float speed={4} rotationIntensity={1} floatIntensity={1}>
          <mesh position={[-0.6, 0.2, 0.1]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </Float>
      </group>

      {/* Floor Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <ringGeometry args={[0.4, 0.45, 64]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

export default Robot;