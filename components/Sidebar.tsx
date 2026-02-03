

import React from 'react';
import { ViewMode, ModuleType } from '../types';
import { 
  BookOpen, Calculator, Grid3X3, Sigma, GitGraph, 
  TrendingUp, Activity, Library, ArrowLeft, Infinity, GraduationCap, Divide, LineChart, Dna,
  Unplug, Layers, Atom, Shuffle, Move, Target, Waves, FileText, X, Menu, AreaChart, History, Variable, Microscope, Sprout, Timer, Box,
  Cylinder, Globe, ArrowUpRight, PieChart, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  currentView: ViewMode;
  currentModule: ModuleType;
  setView: (view: ViewMode) => void;
  goHome: () => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, currentModule, setView, goHome, isOpen, toggleSidebar }) => {
  
  const getMenuItems = () => {
    const commonTools = [
      { type: 'header', label: 'Academic Tools' },
      { id: ViewMode.CHEAT_SHEET, label: 'Cheat Sheet', icon: FileText },
      { id: ViewMode.AI_CHAT, label: 'AI Asistan', icon: Sparkles },
      { id: ViewMode.HOMEWORK, label: 'Homework Exercises', icon: Library },
      { id: ViewMode.FINAL_EXAM, label: 'Module Test', icon: GraduationCap },
    ];

    switch (currentModule) {
      case ModuleType.MATRIX:
        return [
          { type: 'header', label: 'Core Concepts' },
          { id: ViewMode.BASICS, label: 'Definitions', icon: BookOpen },
          { id: ViewMode.OPERATIONS, label: 'Operations', icon: Calculator },
          
          { type: 'header', label: '3D Space' },
          { id: ViewMode.VECTOR_OPS_3D, label: 'Vector Lab (3D)', icon: ArrowUpRight },
          { id: ViewMode.VECTOR_3D, label: 'Matrix Warper (3D)', icon: Box },

          { type: 'header', label: 'Linear Systems' },
          { id: ViewMode.GAUSSIAN, label: 'Gaussian Elimination', icon: Layers },
          { id: ViewMode.SYSTEMS, label: 'Cramer\'s Systems', icon: Sigma },
          { id: ViewMode.INVERSE, label: 'Inverse Matrix', icon: GitGraph },

          { type: 'header', label: 'Spectral Theory' },
          { id: ViewMode.DETERMINANT, label: 'Determinant', icon: Grid3X3 },
          { id: ViewMode.EIGENVALUES, label: 'Eigenvalues', icon: Atom },
          
          ...commonTools
        ];
      
      case ModuleType.SEQUENCES:
        return [
          { type: 'header', label: 'Sequence Analysis' },
          { id: ViewMode.SEQUENCES, label: 'Limits & Monotonicity', icon: TrendingUp },
          { id: ViewMode.COBWEB, label: 'Chaos & Cobweb', icon: Shuffle },
          { type: 'header', label: 'Visualization' },
          { id: ViewMode.SEQUENCES_3D, label: '3D Helix Visualizer', icon: Box },
          { type: 'header', label: 'Infinite Series' },
          { id: ViewMode.SERIES, label: 'Partial Sums', icon: Layers },
          ...commonTools
        ];

      case ModuleType.FUNCTIONS:
        return [
          { type: 'header', label: 'Properties' },
          { id: ViewMode.FUNCTIONS, label: 'Graphing & Domain', icon: Activity },
          { id: ViewMode.TRANSFORMATIONS, label: 'Transformations', icon: Move },
          { type: 'header', label: '3D Geometry' },
          { id: ViewMode.FUNCTIONS_3D, label: 'Surface Plotter', icon: Box },
          { type: 'header', label: 'Applications' },
          { id: ViewMode.NEWTON, label: 'Newton Optimization', icon: Target },
          ...commonTools
        ];

      case ModuleType.LIMITS:
        return [
          { type: 'header', label: 'Analysis' },
          { id: ViewMode.FUNCTIONS, label: 'Limit Analysis', icon: Infinity },
          { id: ViewMode.CONTINUITY, label: 'Continuity & Holes', icon: Unplug },
          { type: 'header', label: 'Multivariable' },
          { id: ViewMode.LIMITS_3D, label: '3D Limits', icon: Box },
          ...commonTools
        ];

      case ModuleType.DERIVATIVES:
        return [
            { type: 'header', label: 'Calculus I' },
            { id: ViewMode.DERIVATIVE_RULES, label: 'Rules & Formulas', icon: Divide },
            { id: ViewMode.FUNCTION_ANALYSIS, label: 'Curve Analysis', icon: LineChart },
            { type: 'header', label: 'Multivariable' },
            { id: ViewMode.DERIVATIVES_3D, label: 'Tangent Planes (3D)', icon: Box },
            { type: 'header', label: 'Approximation' },
            { id: ViewMode.TAYLOR, label: 'Taylor Series', icon: Waves },
            ...commonTools
        ];

      case ModuleType.INTEGRALS:
        return [
            { type: 'header', label: 'Calculus II' },
            { id: ViewMode.INTEGRAL_BASICS, label: 'Concept & Constant', icon: History },
            { id: ViewMode.INTEGRAL_RULES, label: 'Rules & Formulas', icon: Variable },
            { type: 'header', label: 'Definite Integrals' },
            { id: ViewMode.AREA_UNDER_CURVE, label: 'Area & FTC', icon: AreaChart },
            { id: ViewMode.INTEGRALS_3D, label: 'Solid of Revolution', icon: Cylinder },
            ...commonTools
        ];

      case ModuleType.DIFF_EQ:
        return [
            { type: 'header', label: 'Modeling Change' },
            { id: ViewMode.DIFF_BASICS, label: 'Solutions & Curves', icon: Microscope },
            { id: ViewMode.POPULATION_MODELS, label: 'Population Bio-Models', icon: Sprout },
            { id: ViewMode.RADIOACTIVE_DECAY, label: 'Radioactive Decay', icon: Timer },
            { type: 'header', label: 'Chaos Theory' },
            { id: ViewMode.DIFF_EQ_3D, label: 'Lorenz Attractor (3D)', icon: Globe },
            ...commonTools
        ];

      case ModuleType.EXAMS:
        return [
            { type: 'header', label: 'Examination Hall' },
            { id: ViewMode.CLASS_EXAM_1, label: 'Class Exam I', icon: FileText },
            { id: ViewMode.CLASS_EXAM_2, label: 'Class Exam II', icon: FileText },
            { id: ViewMode.CLASS_EXAM_3, label: 'Class Exam III', icon: FileText },
            { type: 'header', label: 'Final Assessment' },
            { id: ViewMode.FULL_EXAM, label: 'Final Exam', icon: GraduationCap },
            { id: ViewMode.EXAM_ANALYSIS, label: 'Performance Analytics', icon: PieChart },
        ];

      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.div 
        className={`
          fixed top-0 bottom-0 left-0 w-72 z-50
          glass-panel-heavy
          overflow-y-auto
          flex flex-col
          md:!translate-x-0
        `}
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        style={{ transform: undefined }} 
        variants={{
           open: { x: 0 },
           closed: { x: '-100%' }
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
         {/* Mobile Close */}
         <div className="absolute top-4 right-4 md:hidden">
            <button onClick={toggleSidebar} className="p-2 text-slate-400 hover:text-white transition-colors">
                <X size={24} />
            </button>
         </div>

         <div className="p-5">
            {/* Header */}
            <div className="mb-8">
                <button 
                    onClick={goHome}
                    className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-cyan-400 uppercase tracking-widest transition-colors mb-5 group pl-1"
                >
                    <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/>
                    Dashboard
                </button>

                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white shrink-0">
                        <Dna size={18} />
                    </div>
                    <div>
                        <h1 className="font-bold text-white text-sm leading-tight">Math Biotech</h1>
                        <div className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider">{currentModule.replace('_', ' ')}</div>
                    </div>
                </div>
            </div>

            {/* Menu */}
            <nav className="space-y-0.5">
                {menuItems.map((item, idx) => {
                    if (item.type === 'header') {
                        return (
                            <div key={`head-${idx}`} className="pt-5 pb-2 px-3 text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] font-mono">
                                {item.label}
                            </div>
                        );
                    }

                    const Icon = item.icon as any;
                    const isActive = currentView === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                setView(item.id as ViewMode);
                                if (window.innerWidth < 768) toggleSidebar();
                            }}
                            className={`
                                relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 group overflow-hidden
                                ${isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'}
                            `}
                        >
                            {/* Active Background & Glow */}
                            {isActive && (
                                <motion.div 
                                    layoutId="activeNavBg"
                                    className="absolute inset-0 bg-white/[0.03] border border-cyan-500/30 rounded-lg"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="absolute inset-0 bg-cyan-500/10 blur-xl opacity-50" />
                                </motion.div>
                            )}

                            {/* Active Indicator Line */}
                            {isActive && (
                                <motion.div 
                                    layoutId="activeNavLine"
                                    className="absolute left-0 top-2.5 bottom-2.5 w-0.5 bg-cyan-400 rounded-r-full shadow-[0_0_8px_#22d3ee]"
                                />
                            )}

                            <div className={`relative z-10 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                            </div>
                            <span className="relative z-10 text-[13px] font-medium tracking-tight">
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </nav>
         </div>
         
         <div className="mt-auto p-5 border-t border-white/5">
            <div className="text-[9px] text-slate-600 font-mono text-center">
                v2.5.0 • Stable Release
            </div>
         </div>
      </motion.div>
    </>
  );
};