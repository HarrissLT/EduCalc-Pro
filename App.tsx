import React, { useState } from 'react';
import { TOOLS } from './constants';
import { CalculatorType } from './types';
import { SubjectAvgCalc, YearlyAvgCalc, TargetScoreCalc, SemesterAvgCalc } from './components/Calculators';
import { Card } from './components/UIComponents';
import AIAdvisor from './components/AIAdvisor';
import { GraduationCap, Menu } from 'lucide-react';

const App: React.FC = () => {
  const [activeToolId, setActiveToolId] = useState<CalculatorType>(CalculatorType.SUBJECT_AVG);
  const [currentResult, setCurrentResult] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeTool = TOOLS.find(t => t.id === activeToolId) || TOOLS[0];

  const renderCalculator = () => {
    // Reset result when switching tools is handled by the useEffect inside components mostly, 
    // but we wrap logic to pass currentResult up for AI.
    const handleResult = (val: number) => setCurrentResult(val);

    switch (activeToolId) {
      case CalculatorType.SUBJECT_AVG:
        return <SubjectAvgCalc onResultChange={handleResult} />;
      case CalculatorType.YEARLY_AVG:
        return <YearlyAvgCalc onResultChange={handleResult} />;
      case CalculatorType.TARGET_SCORE:
        return <TargetScoreCalc onResultChange={handleResult} />;
      case CalculatorType.SEMESTER_AVG:
        return <SemesterAvgCalc onResultChange={handleResult} />;
      default:
        return null;
    }
  };

  // Reset result when tool changes
  React.useEffect(() => {
    setCurrentResult(null);
    setIsMenuOpen(false);
  }, [activeToolId]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
                <GraduationCap className="text-white w-6 h-6" />
            </div>
            <h1 className="font-bold text-lg text-slate-800">EduCalc Pro</h1>
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
            <Menu />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 hidden md:flex items-center gap-3 mb-6">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
            <GraduationCap className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight text-slate-900">EduCalc Pro</h1>
            <p className="text-xs text-slate-500 font-medium">Trợ lý học tập thông minh</p>
          </div>
        </div>

        <div className="px-4 space-y-2">
            <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-4 md:mt-0">Công cụ tính toán</p>
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeToolId === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveToolId(tool.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group text-left
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
              >
                <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-white text-blue-600' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-500'}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                    <span className="font-medium block">{tool.name}</span>
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="absolute bottom-6 left-0 w-full px-6">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-4 text-white text-center">
                <p className="text-xs font-medium opacity-80 mb-1">Phiên bản 1.0</p>
                <p className="text-sm font-bold">Chúc bạn học tốt!</p>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Header Section */}
          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-slate-900">{activeTool.name}</h2>
            <p className="text-slate-500 text-lg">{activeTool.description}</p>
          </div>

          {/* Calculator Card */}
          <Card className="p-6 md:p-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            {renderCalculator()}
          </Card>

          {/* AI Advisor Section */}
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
             <AIAdvisor currentResult={currentResult} calculatorType={activeTool.name} />
          </div>

        </div>
      </main>
      
      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default App;