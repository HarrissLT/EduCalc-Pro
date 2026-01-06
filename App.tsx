import React, { useState } from 'react';
import { TOOLS } from './constants';
import { CalculatorType } from './types';
import { SubjectAvgCalc, YearlyAvgCalc, TargetScoreCalc, SemesterAvgCalc } from './components/Calculators';
import { Card } from './components/UIComponents';
import AIAdvisor from './components/AIAdvisor';
import { GraduationCap, Menu, X, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [activeToolId, setActiveToolId] = useState<CalculatorType>(CalculatorType.SUBJECT_AVG);
  const [currentResult, setCurrentResult] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeTool = TOOLS.find(t => t.id === activeToolId) || TOOLS[0];

  const renderCalculator = () => {
    const handleResult = (val: number) => setCurrentResult(val);
    switch (activeToolId) {
      case CalculatorType.SUBJECT_AVG: return <SubjectAvgCalc onResultChange={handleResult} />;
      case CalculatorType.YEARLY_AVG: return <YearlyAvgCalc onResultChange={handleResult} />;
      case CalculatorType.TARGET_SCORE: return <TargetScoreCalc onResultChange={handleResult} />;
      case CalculatorType.SEMESTER_AVG: return <SemesterAvgCalc onResultChange={handleResult} />;
      default: return null;
    }
  };

  React.useEffect(() => {
    setCurrentResult(null);
    setIsMenuOpen(false);
  }, [activeToolId]);

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      
      {/* Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px] mix-blend-multiply animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/20 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-purple-400/20 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden glass sticky top-0 z-50 px-4 py-3 flex items-center justify-between border-b border-white/50">
        <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-blue-500/30">
                <GraduationCap className="text-white w-5 h-5" />
            </div>
            <h1 className="font-bold text-lg text-slate-800 tracking-tight">EduCalc Pro</h1>
        </div>
        <button onClick={() => setIsMenuOpen(true)} className="p-2 text-slate-600 hover:bg-slate-100/50 rounded-xl transition-colors">
            <Menu size={24} />
        </button>
      </div>

      <div className="flex min-h-screen">
        {/* Sidebar Navigation */}
        <aside className={`
          fixed inset-y-0 left-0 z-40 w-80 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 transition-transform duration-300 ease-out 
          md:translate-x-0 md:sticky md:top-0 md:h-screen md:block
          ${isMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        `}>
          <div className="p-4 md:hidden flex justify-end">
            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-400 hover:text-slate-600">
              <X size={24} />
            </button>
          </div>

          <div className="p-8 hidden md:flex items-center gap-4 mb-2">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2.5 rounded-2xl shadow-xl shadow-blue-500/20">
              <GraduationCap className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="font-extrabold text-2xl tracking-tight text-slate-900">EduCalc</h1>
              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full inline-block mt-1">Phiên bản Pro</p>
            </div>
          </div>

          <div className="px-6 py-4">
            <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Công cụ tính</p>
            <div className="space-y-2">
              {TOOLS.map((tool) => {
                const Icon = tool.icon;
                const isActive = activeToolId === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setActiveToolId(tool.id)}
                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden
                      ${isActive 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                  >
                    <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-600 group-hover:shadow-sm'}`}>
                      <Icon size={20} />
                    </div>
                    <span className="font-semibold text-sm tracking-wide">{tool.name}</span>
                    {isActive && <ChevronRight className="ml-auto opacity-60" size={16} />}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-white via-white to-transparent">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <p className="text-xs font-medium text-slate-300 mb-1">Mẹo hay</p>
                  <p className="text-sm font-bold leading-relaxed relative z-10">"Học đều các môn là chìa khóa để đạt học sinh giỏi!" 🎓</p>
              </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-10 lg:p-14 w-full max-w-[100vw]">
          <div className="max-w-4xl mx-auto space-y-10">
            
            {/* Header Section */}
            <div className="animate-fade-in space-y-3 pt-4 md:pt-0">
              <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">{activeTool.name}</h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-2xl">{activeTool.description}</p>
            </div>

            {/* Calculator Card */}
            <div className="animate-slide-in-bottom">
              <Card className="p-6 md:p-10 border-t-4 border-t-blue-500">
                {renderCalculator()}
              </Card>
            </div>

            {/* AI Advisor Section */}
            <div className="animate-slide-in-bottom delay-100">
               <AIAdvisor currentResult={currentResult} calculatorType={activeTool.name} />
            </div>

          </div>
        </main>
      </div>
      
      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 md:hidden transition-opacity"
            onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default App;