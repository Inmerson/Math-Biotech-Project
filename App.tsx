
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
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, FileText, Lock } from 'lucide-react';
import { usePersistedState } from './utils/usePersistedState';

const EmptyExamView: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
    <div className="p-6 bg-slate-900/50 rounded-full border border-slate-800 shadow-xl">
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
    // We use 'key' prop in some views to ensure the component remounts 
    // and hooks re-initialize when switching contexts (e.g. different exams)
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

  // If we are at Home, show Dashboard
  if (currentModule === ModuleType.HOME) {
    return <DashboardView onSelectModule={handleModuleSelect} />;
  }

  // Otherwise show the Module Interface
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-hidden">
      
      <Sidebar 
        currentView={view} 
        currentModule={currentModule}
        setView={setView} 
        goHome={handleGoHome}
        isOpen={isMobileMenuOpen}
        toggleSidebar={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      
      <main className="md:ml-72 p-4 md:p-6 min-h-screen relative">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between mb-6">
            <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 bg-slate-800 rounded-lg text-white border border-slate-700"
            >
                <Menu size={24} />
            </button>
            <span className="text-sm font-bold text-slate-400 tracking-widest uppercase">{currentModule.replace('_',' ')}</span>
        </div>

        {/* Background Layers */}
        <div className="fixed inset-0 z-0 pointer-events-none">
            {/* Noise Texture */}
            <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay"></div>
            
            {/* Ambient Glows - Updated to match Dashboard Theme (Cyan/Purple) */}
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[120px] opacity-40" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[900px] h-[900px] bg-purple-900/10 rounded-full blur-[120px] opacity-40" />
            
             {/* Floating Elements - Animation removed */}
            <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] bg-indigo-900/5 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto pt-2 pb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default App;
