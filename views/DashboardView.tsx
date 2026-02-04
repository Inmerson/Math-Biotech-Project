
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ModuleType } from '../types';
import { 
  Grid3X3, TrendingUp, Activity, Infinity as InfinityIcon, 
  Divide, AreaChart, Layers, GraduationCap, ArrowRight, Dna
} from 'lucide-react';

interface ModuleConfig {
  id: ModuleType;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  gradient: string;
  desc: string;
}

const modules: ModuleConfig[] = [
  { 
    id: ModuleType.MATRIX, 
    title: 'Matrix', 
    subtitle: 'Linear Algebra', 
    icon: Grid3X3, 
    color: 'text-accent-cyan',
    gradient: 'from-accent-cyan/20 to-accent-blue/20',
    desc: 'Systems, Determinants & Vector Spaces'
  },
  { 
    id: ModuleType.SEQUENCES, 
    title: 'Sequences', 
    subtitle: 'Discrete Math', 
    icon: TrendingUp, 
    color: 'text-accent-purple',
    gradient: 'from-accent-purple/20 to-accent-pink/20',
    desc: 'Limits, Convergence & Series'
  },
  { 
    id: ModuleType.FUNCTIONS, 
    title: 'Functions', 
    subtitle: 'Analysis I', 
    icon: Activity, 
    color: 'text-accent-pink',
    gradient: 'from-accent-pink/20 to-red-600/20',
    desc: 'Domain, Range & Transformations'
  },
  { 
    id: ModuleType.LIMITS, 
    title: 'Limits', 
    subtitle: 'Foundations', 
    icon: InfinityIcon, 
    color: 'text-orange-400', 
    gradient: 'from-orange-500/20 to-amber-600/20',
    desc: 'Continuity & Asymptotes'
  },
  { 
    id: ModuleType.DERIVATIVES, 
    title: 'Derivatives', 
    subtitle: 'Calculus I', 
    icon: Divide, 
    color: 'text-teal-400', 
    gradient: 'from-teal-500/20 to-emerald-600/20',
    desc: 'Rates of Change & Optimization'
  },
  { 
    id: ModuleType.INTEGRALS, 
    title: 'Integrals', 
    subtitle: 'Calculus II', 
    icon: AreaChart, 
    color: 'text-emerald-400', 
    gradient: 'from-emerald-500/20 to-green-600/20',
    desc: 'Area, Volume & Accumulation'
  },
  { 
    id: ModuleType.DIFF_EQ, 
    title: 'Diff Eq', 
    subtitle: 'Modeling', 
    icon: Layers, 
    color: 'text-indigo-400', 
    gradient: 'from-indigo-500/20 to-violet-600/20',
    desc: 'Growth, Decay & Dynamics'
  },
  { 
    id: ModuleType.EXAMS, 
    title: 'Exams', 
    subtitle: 'Assessment', 
    icon: GraduationCap, 
    color: 'text-white', 
    gradient: 'from-slate-700/50 to-slate-800/50',
    desc: 'Prepare for Final Assessment'
  }
];

interface CardProps {
  module: ModuleConfig;
  onSelect: (m: ModuleType) => void;
  index: number;
}

const CompactCard: React.FC<CardProps> = ({ module, onSelect, index }) => {
    const Icon = module.icon;
    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(module.id)}
            className={`relative overflow-hidden rounded-2xl p-4 text-left glass-card hover:bg-white/5 transition-colors group min-h-[140px] flex flex-col justify-between`}
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10 flex justify-between items-start">
                <div className={`p-2.5 rounded-xl bg-white/5 w-fit ${module.color} border border-white/5 shadow-inner`}>
                    <Icon size={20} />
                </div>
            </div>

            <div className="relative z-10">
                <h3 className="font-bold text-white text-base leading-tight mb-1">{module.title}</h3>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{module.subtitle}</p>
            </div>
        </motion.button>
    );
};

// 3D Tilt Card Component
const DesktopCard: React.FC<CardProps> = ({ module, onSelect, index }) => {
    const Icon = module.icon;
    const ref = useRef<HTMLButtonElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            onClick={() => onSelect(module.id)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative h-full w-full rounded-[2rem] border border-white/10 bg-slate-900/20 backdrop-blur-sm p-8 text-left transition-colors hover:border-white/20 hover:bg-slate-900/40 perspective-1000"
        >
            <div
                className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-[2rem]`}
                style={{ transform: "translateZ(-50px)" }}
            />
            
            <div className="relative z-10 flex h-full flex-col justify-between" style={{ transform: "translateZ(20px)" }}>
                <div>
                    <div className={`mb-6 inline-flex rounded-2xl bg-white/5 p-4 ${module.color} ring-1 ring-white/10 shadow-lg shadow-black/20`}>
                        <Icon size={32} />
                    </div>
                    <h3 className="mb-2 text-3xl font-bold text-white tracking-tight">{module.title}</h3>
                    <p className={`text-xs font-bold uppercase tracking-widest ${module.color} opacity-80`}>{module.subtitle}</p>
                </div>
                
                <div className="mt-8 flex items-end justify-between">
                    <p className="max-w-[80%] text-sm text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">
                        {module.desc}
                    </p>
                    <div className={`rounded-full bg-white/5 p-3 text-slate-400 transition-all group-hover:bg-accent-cyan group-hover:text-black group-hover:scale-110`}>
                        <ArrowRight size={20} />
                    </div>
                </div>
            </div>
        </motion.button>
    );
};

interface DashboardProps {
  onSelectModule: (module: ModuleType) => void;
}

export const DashboardView: React.FC<DashboardProps> = ({ onSelectModule }) => {
  return (
    <div className="relative min-h-screen overflow-x-hidden w-full">
      
      {/* --- DESKTOP LAYOUT --- */}
      <div className="hidden md:flex min-h-screen flex-col px-12 py-12 relative z-10 max-w-[1600px] mx-auto perspective-2000">
          <motion.div 
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8 }}
            className="mb-16 mt-8"
          >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-accent-cyan to-accent-blue rounded-2xl shadow-lg shadow-accent-cyan/20">
                    <Dna size={40} className="text-white" />
                </div>
                <h1 className="text-7xl font-black tracking-tighter text-white">
                  Math Biotech
                </h1>
              </div>
              <p className="text-slate-400 text-lg max-w-2xl font-light ml-2 leading-relaxed">
                  Interactive mathematical modeling platform for the <strong className="text-slate-200">Warsaw University of Life Sciences</strong>.
                  Experience next-generation learning.
              </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-12">
              {modules.map((mod, idx) => (
                  <DesktopCard key={mod.id} module={mod} onSelect={onSelectModule} index={idx} />
              ))}
          </div>
      </div>

      {/* --- MOBILE LAYOUT --- */}
      <div className="md:hidden relative z-20 flex flex-col min-h-[100dvh] px-6 pt-10 pb-8 box-border">
         <div className="shrink-0 mb-8 mt-2">
             <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                 <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-accent-cyan to-accent-blue rounded-lg shadow-lg shadow-accent-cyan/20">
                        <Dna size={24} className="text-white" />
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter text-white leading-none">
                        Math
                    </h1>
                 </div>

                 <h2 className="text-lg text-slate-500 font-medium tracking-wide">
                    <span className="text-white font-bold">Warsaw University</span> of Life Sciences
                 </h2>
             </motion.div>
         </div>

         <div className="flex-1 grid grid-cols-2 gap-4 pb-8 content-start">
             {modules.map((mod, idx) => (
                 <CompactCard key={mod.id} module={mod} onSelect={onSelectModule} index={idx} />
             ))}
         </div>
      </div>
    </div>
  );
};
