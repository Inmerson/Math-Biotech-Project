
import React, { useMemo, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Cylinder, Float, Text, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Dna, Settings2, Activity, Play } from 'lucide-react';

const DNAStrand = ({ 
  radius, 
  climb, 
  frequency, 
  showBonds, 
  animate 
}: { 
  radius: number, 
  climb: number, 
  frequency: number, 
  showBonds: boolean, 
  animate: boolean 
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (animate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  const { strandA, strandB, connections } = useMemo(() => {
    const sA: THREE.Vector3[] = [];
    const sB: THREE.Vector3[] = [];
    const conns: { start: THREE.Vector3, end: THREE.Vector3, id: number }[] = [];
    const count = 40;
    const startOffset = -count * climb / 2;

    for (let i = 0; i < count; i++) {
      const angle = i * frequency;
      const y = startOffset + i * climb;

      // Helix A
      const xA = Math.cos(angle) * radius;
      const zA = Math.sin(angle) * radius;
      const vecA = new THREE.Vector3(xA, y, zA);
      sA.push(vecA);

      // Helix B (Phase shifted by PI)
      const xB = Math.cos(angle + Math.PI) * radius;
      const zB = Math.sin(angle + Math.PI) * radius;
      const vecB = new THREE.Vector3(xB, y, zB);
      sB.push(vecB);

      conns.push({ start: vecA, end: vecB, id: i });
    }
    return { strandA: sA, strandB: sB, connections: conns };
  }, [radius, climb, frequency]);

  return (
    <group ref={groupRef}>
      {/* Strand A (Cyan) */}
      <Line points={strandA} color="#22d3ee" lineWidth={3} transparent opacity={0.6} />
      {strandA.map((pos, i) => (
        <mesh key={`a-${i}`} position={pos}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.5} />
        </mesh>
      ))}

      {/* Strand B (Purple) */}
      <Line points={strandB} color="#a855f7" lineWidth={3} transparent opacity={0.6} />
      {strandB.map((pos, i) => (
        <mesh key={`b-${i}`} position={pos}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.5} />
        </mesh>
      ))}

      {/* Hydrogen Bonds (Base Pairs) */}
      {showBonds && connections.map((conn, i) => {
        // Calculate center and orientation for cylinder
        const center = new THREE.Vector3().addVectors(conn.start, conn.end).multiplyScalar(0.5);
        const length = conn.start.distanceTo(conn.end);
        const direction = new THREE.Vector3().subVectors(conn.end, conn.start).normalize();
        const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

        return (
          <group key={`conn-${i}`}>
             <mesh position={center} quaternion={quaternion}>
                <cylinderGeometry args={[0.03, 0.03, length, 8]} />
                <meshStandardMaterial color="white" transparent opacity={0.2} />
             </mesh>
             {/* Ladder rungs glow */}
             <mesh position={center} quaternion={quaternion} scale={[1, 0.2, 1]}>
                <cylinderGeometry args={[0.06, 0.06, length * 0.4, 8]} />
                <meshStandardMaterial color={i % 2 === 0 ? "#22d3ee" : "#a855f7"} emissive={i % 2 === 0 ? "#22d3ee" : "#a855f7"} emissiveIntensity={0.8} transparent opacity={0.6}/>
             </mesh>
          </group>
        );
      })}
    </group>
  );
};

export const Sequences3DView: React.FC = () => {
  const [radius, setRadius] = useState(2);
  const [climb, setClimb] = useState(0.4); 
  const [frequency, setFrequency] = useState(0.6); 
  const [showBonds, setShowBonds] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col pb-6">
      <header className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-4 shrink-0 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Dna className="text-cyan-400" /> Bio-Sequences
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl">
            Modeling biological structures using interleaved mathematical sequences. 
            <span className="font-mono text-cyan-400"> a_n</span> and <span className="font-mono text-purple-400"> b_n</span> form the double helix backbone.
          </p>
        </div>
      </header>

      <div className="flex-1 bg-slate-950 rounded-3xl border border-slate-800 relative overflow-hidden shadow-2xl flex flex-col md:flex-row">
        
        {/* Controls Overlay */}
        <div className="absolute top-4 left-4 z-10 w-72 bg-slate-900/80 backdrop-blur-xl p-5 rounded-2xl border border-slate-700/50 flex flex-col gap-6 shadow-2xl">
            <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
                    <Settings2 size={14}/> Helix Parameters
                </h4>
                
                <div className="space-y-5">
                    <div>
                        <div className="flex justify-between text-[10px] text-slate-400 mb-1 font-bold uppercase">
                            <span>Radius (Amplitude)</span>
                            <span className="text-cyan-400">{radius}u</span>
                        </div>
                        <input 
                            type="range" min="1" max="4" step="0.1" 
                            value={radius} onChange={(e) => setRadius(parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between text-[10px] text-slate-400 mb-1 font-bold uppercase">
                            <span>Base Pair Spacing (Climb)</span>
                            <span className="text-purple-400">{climb}u</span>
                        </div>
                        <input 
                            type="range" min="0.2" max="1" step="0.05" 
                            value={climb} onChange={(e) => setClimb(parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between text-[10px] text-slate-400 mb-1 font-bold uppercase">
                            <span>Twist Rate (Frequency)</span>
                            <span className="text-pink-400">{frequency} rad</span>
                        </div>
                        <input 
                            type="range" min="0.2" max="1.5" step="0.1" 
                            value={frequency} onChange={(e) => setFrequency(parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <button 
                    onClick={() => setShowBonds(!showBonds)}
                    className={`py-2 rounded-lg text-[10px] font-bold border transition-all flex items-center justify-center gap-2 uppercase tracking-wide ${showBonds ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' : 'bg-transparent text-slate-400 border-slate-600'}`}
                >
                    <Activity size={14} /> Base Pairs
                </button>
                <button 
                    onClick={() => setAutoRotate(!autoRotate)}
                    className={`py-2 rounded-lg text-[10px] font-bold border transition-all flex items-center justify-center gap-2 uppercase tracking-wide ${autoRotate ? 'bg-purple-500/20 text-purple-300 border-purple-500/50' : 'bg-transparent text-slate-400 border-slate-600'}`}
                >
                    <Play size={14} /> Rotation
                </button>
            </div>
        </div>

        <div className="w-full h-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(168,85,247,0.1),_transparent_70%)] pointer-events-none z-0"></div>
            
            <Canvas camera={{ position: [10, 0, 10], fov: 35 }}>
                <color attach="background" args={['#020617']} />
                <fog attach="fog" args={['#020617', 10, 40]} />
                
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
                
                <OrbitControls makeDefault enableZoom={true} enablePan={true} />
                
                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <DNAStrand 
                        radius={radius} 
                        climb={climb} 
                        frequency={frequency} 
                        showBonds={showBonds}
                        animate={autoRotate}
                    />
                </Float>

                <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
            </Canvas>
            
            <div className="absolute bottom-6 right-6 pointer-events-none text-right">
                <h3 className="text-2xl font-black text-white/10 uppercase tracking-tighter">Sequence Model</h3>
                <div className="text-[10px] text-cyan-500/50 font-mono">
                    x = r · cos(nθ)<br/>
                    z = r · sin(nθ)
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
