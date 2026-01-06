import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Info, Calculator, ChevronRight } from 'lucide-react';
import katex from 'katex';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`glass-card rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/60 ${className}`}>
    {children}
  </div>
);

export const InputGroup: React.FC<{
  label: string;
  value: number | string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
  max?: number;
  suffix?: string;
}> = ({ label, value, onChange, placeholder = '0.0', type = 'number', max = 10, suffix }) => (
  <div className="group flex flex-col gap-2">
    <label className="text-sm font-semibold text-slate-600 ml-1 flex items-center gap-1 group-focus-within:text-blue-600 transition-colors">
      {label}
    </label>
    <div className="relative transform transition-all duration-200 group-focus-within:-translate-y-0.5">
      <input
        type={type}
        max={max}
        min={0}
        step="0.1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 font-bold placeholder-slate-300 shadow-sm"
        placeholder={placeholder}
      />
      {suffix && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-100 px-2 py-1 rounded-md text-slate-500 text-xs font-bold uppercase tracking-wider">
          {suffix}
        </span>
      )}
    </div>
  </div>
);

export const ResultBox: React.FC<{
  result: number | null;
  label: string;
  subtext?: string;
}> = ({ result, label, subtext }) => {
  if (result === null) return null;

  let colorClass = 'text-slate-700 from-slate-500 to-slate-700';
  let bgClass = 'bg-slate-50 border-slate-200';
  let icon = <Calculator className="w-6 h-6 text-slate-400" />;
  
  if (result >= 8.0) { 
    colorClass = 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600'; 
    bgClass = 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100';
    icon = <Trophy className="w-6 h-6 text-emerald-500" />;
  }
  else if (result >= 6.5) { 
    colorClass = 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600'; 
    bgClass = 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100'; 
    icon = <Medal className="w-6 h-6 text-blue-500" />;
  }
  else if (result >= 5.0) { 
    colorClass = 'text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600'; 
    bgClass = 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100'; 
    icon = <Medal className="w-6 h-6 text-orange-500" />;
  }
  else { 
    colorClass = 'text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600'; 
    bgClass = 'bg-gradient-to-br from-rose-50 to-pink-50 border-rose-100'; 
    icon = <Info className="w-6 h-6 text-rose-500" />;
  }

  return (
    <div className={`mt-8 p-8 rounded-3xl border shadow-sm ${bgClass} text-center animate-slide-in-bottom relative overflow-hidden group`}>
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
        {React.cloneElement(icon as React.ReactElement<any>, { size: 120 })}
      </div>
      
      <p className="relative z-10 text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">{label}</p>
      
      <div className="relative z-10 flex items-center justify-center">
        <div className={`text-7xl md:text-8xl font-black tracking-tighter ${colorClass} drop-shadow-sm`}>
          {result.toFixed(2)}
        </div>
      </div>
      
      {subtext && (
        <div className="relative z-10 mt-4 inline-block px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-white/50 shadow-sm">
          <p className="text-slate-600 font-medium text-sm">{subtext}</p>
        </div>
      )}
    </div>
  );
};

export const AchievementBanner: React.FC<{ score: number; type: 'semester' | 'year' }> = ({ score, type }) => {
  if (score < 8.0) return null;

  return (
    <div className="mt-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 shadow-xl shadow-orange-500/20 animate-zoom-in">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      
      <div className="relative z-10 p-1">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 flex flex-col sm:flex-row items-center gap-5 text-white">
            <div className="bg-gradient-to-br from-white to-orange-50 p-4 rounded-full shadow-lg">
                <Trophy size={32} className="text-amber-500" />
            </div>
            <div className="text-center sm:text-left flex-1">
                <h4 className="font-bold text-xl leading-tight drop-shadow-md">
                    {type === 'year' ? 'Xuất Sắc! Học Sinh Giỏi Cả Năm 🎉' : 'Tuyệt Vời! Học Sinh Giỏi Học Kỳ 🏆'}
                </h4>
                <p className="text-amber-50 text-sm mt-1.5 font-medium opacity-95 leading-relaxed">
                    Điểm tổng kết <span className="font-bold text-white text-lg">{score.toFixed(2)}</span>. Bạn đã nỗ lực rất nhiều!
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

const LatexRenderer: React.FC<{ latex: string }> = ({ latex }) => {
  const [html, setHtml] = useState('');
  useEffect(() => {
    try {
      const rendered = katex.renderToString(latex, { throwOnError: false, displayMode: true });
      setHtml(rendered);
    } catch (e) { setHtml(latex); }
  }, [latex]);
  return <div className="overflow-x-auto py-2" dangerouslySetInnerHTML={{ __html: html }} />;
};

export const FormulaGuide: React.FC<{
  title: string;
  formula: string;
  explanation: string;
  tips: string[];
}> = ({ title, formula, explanation, tips }) => (
  <div className="mt-10 group">
    <div className="flex items-center gap-3 mb-4">
       <div className="p-2 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <Info size={18} />
       </div>
       <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
    </div>
    
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow">
      <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 mb-4">
        <LatexRenderer latex={formula} />
      </div>
      
      <p className="text-slate-600 leading-relaxed mb-6">
        <span className="font-bold text-slate-800">Giải thích: </span>
        {explanation}
      </p>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100/50">
        <p className="text-xs font-bold text-amber-600 uppercase mb-3 flex items-center gap-2">
          <span>💡</span> Bí kíp đạt điểm cao
        </p>
        <ul className="space-y-2">
          {tips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
              <ChevronRight size={14} className="mt-1 text-amber-400 shrink-0" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
