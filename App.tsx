
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ViewMode, ModuleType } from './types';
import { DashboardView } from './views/DashboardView';
import { BasicsView } from './views/BasicsView';
import { OperationsView } from './views/OperationsView';
import { DeterminantView } from './views/DeterminantView';
import { InverseView } from './views/InverseView';
import { HomeworkView } from './views/ExercisesView';
import { SequencesView } from './views/SequencesView';
import { Sequences3DView } from './views/Sequences3DView';
import { FunctionsView } from './views/FunctionsView';
import { Surface3DView } from './views/Surface3DView';
import { FinalExamView } from './views/FinalExamView';
import { ExamAnalysisView } from './views/ExamAnalysisView';
import { DerivativesRulesView } from './views/DerivativesRulesView';
import { FunctionAnalysisView } from './views/FunctionAnalysisView';
import { SystemsView } from './views/SystemsView';
import { ContinuityView } from './views/ContinuityView';
import { GaussianView } from './views/GaussianView';
import { EigenView } from './views/EigenView';
import { CobwebView } from './views/CobwebView';
import { SeriesView } from './views/SeriesView';
import { TransformationsView } from './views/TransformationsView';
import { NewtonView } from './views/NewtonView';
import { TaylorSeriesView } from './views/TaylorSeriesView';
import { IntegralBasicsView } from './views/IntegralBasicsView';
import { IntegralRulesView } from './views/IntegralRulesView';
import { AreaUnderCurveView } from './views/AreaUnderCurveView';
import { Integrals3DView } from './views/Integrals3DView';
import { DiffEqBasicsView } from './views/DiffEqBasicsView';
import { PopulationModelsView } from './views/PopulationModelsView';
import { RadioactiveDecayView } from './views/RadioactiveDecayView';
import { DiffEq3DView } from './views/DiffEq3DView';
import { CheatSheetView } from './views/CheatSheetView';
import { LinearTransformation3DView } from './views/LinearTransformation3DView';
import { VectorOperations3DView } from './views/VectorOperations3DView';
import { AIChatView } from './views/AIChatView';
import { AnimatedBackground } from './components/AnimatedBackground'; // Imported
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Lock } from 'lucide-react';
import { usePersistedState } from './utils/usePersistedState';

const EmptyExamView: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
    <div className="p-6 bg-slate-900/50 rounded-full border border-slate-800 shadow-xl backdrop-blur-sm">
      <Lock size={48} className="text-slate-600" />
    </div>
    <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
        <div className="px-3 py-1 rounded-full bg-slate-800/50 text-xs font-mono text-slate-400 inline-block border border-slate-700">
            STATUS: LOCKED
        </div>
    </div>
    <p className="text-slate-400 max-w-md text-sm leading-relaxed">
      This examination module is currently unavailable. Please proceed to the <strong>Final Exam</strong> for comprehensive assessment.
    </p>
  </div>
);

const App: React.FC = () => {
  // Persist current module and view selection
  const [currentModule, setCurrentModule] = usePersistedState<ModuleType>('app_module', ModuleType.HOME);
  const [view, setView] = usePersistedState<ViewMode>('app_view', ViewMode.BASICS);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle Module Selection from Dashboard
  const handleModuleSelect = (mod: ModuleType) => {
    setCurrentModule(mod);
    // Set default view for each module
    switch (mod) {
      case ModuleType.MATRIX: setView(ViewMode.BASICS); break;
      case ModuleType.SEQUENCES: setView(ViewMode.SEQUENCES); break;
      case ModuleType.FUNCTIONS: setView(ViewMode.FUNCTIONS); break;
      case ModuleType.LIMITS: setView(ViewMode.FUNCTIONS); break;
      case ModuleType.DERIVATIVES: setView(ViewMode.DERIVATIVE_RULES); break;
      case ModuleType.INTEGRALS: setView(ViewMode.INTEGRAL_BASICS); break;
      case ModuleType.DIFF_EQ: setView(ViewMode.DIFF_BASICS); break;
      case ModuleType.EXAMS: setView(ViewMode.FULL_EXAM); break;
      default: setView(ViewMode.BASICS);
    }
    setIsMobileMenuOpen(false);
  };

  const handleGoHome = () => {
    setCurrentModule(ModuleType.HOME);
    setIsMobileMenuOpen(false);
  };

  const renderView = () => {
    switch (view) {
      // Matrix
      case ViewMode.BASICS: return <BasicsView />;
      case ViewMode.OPERATIONS: return <OperationsView />;
      case ViewMode.DETERMINANT: return <DeterminantView />;
      case ViewMode.INVERSE: return <InverseView />;
      case ViewMode.SYSTEMS: return <SystemsView />; 
      case ViewMode.GAUSSIAN: return <GaussianView />;
      case ViewMode.EIGENVALUES: return <EigenView />;
      case ViewMode.VECTOR_3D: return <LinearTransformation3DView />;
      case ViewMode.VECTOR_OPS_3D: return <VectorOperations3DView />;
      
      // Sequences
      case ViewMode.SEQUENCES: return <SequencesView />;
      case ViewMode.SERIES: return <SeriesView />;
      case ViewMode.COBWEB: return <CobwebView />;
      case ViewMode.SEQUENCES_3D: return <Sequences3DView />;
      
      // Functions
      case ViewMode.FUNCTIONS: return <FunctionsView />;
      case ViewMode.TRANSFORMATIONS: return <TransformationsView />;
      case ViewMode.NEWTON: return <NewtonView />;
      case ViewMode.FUNCTIONS_3D: return <Surface3DView mode="function" />;
      
      // Limits
      case ViewMode.LIMITS: return <FunctionsView />; 
      case ViewMode.CONTINUITY: return <ContinuityView />;
      case ViewMode.LIMITS_3D: return <Surface3DView mode="limit" />;

      // Derivatives
      case ViewMode.DERIVATIVE_RULES: return <DerivativesRulesView />;
      case ViewMode.FUNCTION_ANALYSIS: return <FunctionAnalysisView />;
      case ViewMode.TAYLOR: return <TaylorSeriesView />;
      case ViewMode.DERIVATIVES_3D: return <Surface3DView mode="derivative" />;

      // Integrals
      case ViewMode.INTEGRAL_BASICS: return <IntegralBasicsView />;
      case ViewMode.INTEGRAL_RULES: return <IntegralRulesView />;
      case ViewMode.AREA_UNDER_CURVE: return <AreaUnderCurveView />;
      case ViewMode.INTEGRALS_3D: return <Integrals3DView />;

      // Differential Equations
      case ViewMode.DIFF_BASICS: return <DiffEqBasicsView />;
      case ViewMode.POPULATION_MODELS: return <PopulationModelsView />;
      case ViewMode.RADIOACTIVE_DECAY: return <RadioactiveDecayView />;
      case ViewMode.DIFF_EQ_3D: return <DiffEq3DView />;

      // Exams
      case ViewMode.CLASS_EXAM_1: return <EmptyExamView title="Class Exam I" />;
      case ViewMode.CLASS_EXAM_2: return <EmptyExamView title="Class Exam II" />;
      case ViewMode.CLASS_EXAM_3: return <EmptyExamView title="Class Exam III" />;
      case ViewMode.FULL_EXAM: return <FinalExamView key="FINAL" examMode="FINAL" />;
      case ViewMode.EXAM_ANALYSIS: return <ExamAnalysisView />;

      // Shared
      case ViewMode.HOMEWORK: return <HomeworkView key={currentModule} module={currentModule} />;
      case ViewMode.FINAL_EXAM: return <FinalExamView key={currentModule} module={currentModule} />;
      case ViewMode.CHEAT_SHEET: return <CheatSheetView key={currentModule} module={currentModule} />;
      case ViewMode.AI_CHAT: return <AIChatView />;
      default: return <BasicsView />;
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-slate-200 font-sans selection:bg-accent-cyan/30 overflow-hidden">
      
      {/* Global Animated Background */}
      <AnimatedBackground />

      <div className="relative z-10">
        {currentModule === ModuleType.HOME ? (
          <DashboardView onSelectModule={handleModuleSelect} />
        ) : (
          <div className="flex h-screen overflow-hidden">
            <Sidebar
                currentView={view}
                currentModule={currentModule}
                setView={setView}
                goHome={handleGoHome}
                isOpen={isMobileMenuOpen}
                toggleSidebar={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
            
            <main className="flex-1 md:ml-20 lg:ml-0 overflow-y-auto h-full relative">
                {/* Mobile Header */}
                <div className="md:hidden sticky top-0 z-30 flex items-center justify-between p-4 bg-background/80 backdrop-blur-md border-b border-white/5">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="text-xs font-bold text-accent-cyan tracking-widest uppercase glow-text">
                        {currentModule.replace('_',' ')}
                    </span>
                    <div className="w-10" /> {/* Spacer */}
                </div>

                <div className="max-w-[1600px] mx-auto p-4 md:p-8 pb-32">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={view}
                            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            {renderView()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
