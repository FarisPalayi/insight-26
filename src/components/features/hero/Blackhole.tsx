import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function BlackHole() {
  const meshRef = useRef<THREE.Points>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const { camera } = useThree();
  const mouse3D = useRef(new THREE.Vector3());
  const raycaster = useRef(new THREE.Raycaster());

  // Gyroscope data
  const gyro = useRef({ beta: 0, gamma: 0 });
  const targetGyro = useRef({ beta: 0, gamma: 0 });

  // Create accretion disk particles
  const particlesCount = 3000;

  const particleData = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const offsets = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 2.5;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 0.2;
      const z = Math.sin(angle) * radius;

      const i3 = i * 3;
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      offsets[i3] = 0;
      offsets[i3 + 1] = 0;
      offsets[i3 + 2] = 0;
    }

    return { positions, offsets };
  }, []);

  // Setup gyroscope listener
  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta !== null && event.gamma !== null) {
        // beta: front-to-back tilt (-180 to 180)
        // gamma: left-to-right tilt (-90 to 90)
        targetGyro.current.beta = event.beta;
        targetGyro.current.gamma = event.gamma;
      }
    };

    // Request permission for iOS 13+
    const requestPermission = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        } catch (error) {
          console.log('Gyroscope permission denied');
        }
      } else {
        // Non-iOS devices
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;

    // Smooth gyroscope interpolation
    gyro.current.beta += (targetGyro.current.beta - gyro.current.beta) * 0.1;
    gyro.current.gamma += (targetGyro.current.gamma - gyro.current.gamma) * 0.1;

    // Apply subtle gyroscope tilt to the entire group
    // Convert degrees to radians and scale down for subtlety
    const tiltX = (gyro.current.beta * Math.PI / 180) * 0.15; // Front-back tilt
    const tiltY = (gyro.current.gamma * Math.PI / 180) * 0.15; // Left-right tilt

    groupRef.current.rotation.x = tiltX;
    groupRef.current.rotation.z = tiltY;

    // Base rotation continues
    meshRef.current.rotation.y += 0.002;

    // Get mouse position in 3D world space
    raycaster.current.setFromCamera(state.pointer, camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    raycaster.current.ray.intersectPlane(plane, mouse3D.current);

    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const { offsets } = particleData;

    // Temporary vector for calculations
    const particleWorld = new THREE.Vector3();
    const rotationMatrix = new THREE.Matrix4().makeRotationY(meshRef.current.rotation.y);

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;

      // Get base orbital position (without offsets)
      const baseX = positions[i3] - offsets[i3];
      const baseY = positions[i3 + 1] - offsets[i3 + 1];
      const baseZ = positions[i3 + 2] - offsets[i3 + 2];

      // Transform to world space with current rotation
      particleWorld.set(baseX, baseY, baseZ);
      particleWorld.applyMatrix4(rotationMatrix);

      // Calculate distance to mouse
      const dx = particleWorld.x - mouse3D.current.x;
      const dy = particleWorld.y - mouse3D.current.y;
      const dz = particleWorld.z - mouse3D.current.z;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      const maxDistance = 1.2;

      if (distance < maxDistance && distance > 0.01) {
        // Smooth falloff
        const influence = Math.pow(1 - distance / maxDistance, 2);
        const pushStrength = influence * 0.4;

        // Direction away from mouse
        const dirX = dx / distance;
        const dirY = dy / distance;
        const dirZ = dz / distance;

        // Add to offset (smooth accumulation)
        offsets[i3] += (dirX * pushStrength - offsets[i3]) * 0.15;
        offsets[i3 + 1] += (dirY * pushStrength - offsets[i3 + 1]) * 0.15;
        offsets[i3 + 2] += (dirZ * pushStrength - offsets[i3 + 2]) * 0.15;
      } else {
        // Smoothly return to orbit
        offsets[i3] *= 0.9;
        offsets[i3 + 1] *= 0.9;
        offsets[i3 + 2] *= 0.9;
      }

      // Apply offset to base position
      positions[i3] = baseX + offsets[i3];
      positions[i3 + 1] = baseY + offsets[i3 + 1];
      positions[i3 + 2] = baseZ + offsets[i3 + 2];
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particleData.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#22d3ee"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
