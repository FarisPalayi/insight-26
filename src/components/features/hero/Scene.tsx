import { Canvas } from '@react-three/fiber'
import { BlackHole } from './Blackhole'

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 4, 8], fov: 50 }} >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} />

      <BlackHole />
    </Canvas>
  )
}
