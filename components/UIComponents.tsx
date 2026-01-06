import React, { useEffect, useState } from 'react';
import { Trophy, Medal } from 'lucide-react';
import katex from 'katex';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden ${className}`}>
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
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-slate-600 ml-1">{label}</label>
    <div className="relative">
      <input
        type={type}
        max={max}
        min={0}
        step="0.1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-800 font-medium placeholder-slate-400"
        placeholder={placeholder}
      />
      {suffix && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
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

  let colorClass = 'text-slate-700';
  let bgClass = 'bg-slate-50';
  
  if (result >= 8.0) { colorClass = 'text-emerald-600'; bgClass = 'bg-emerald-50 border-emerald-100'; }
  else if (result >= 6.5) { colorClass = 'text-blue-600'; bgClass = 'bg-blue-50 border-blue-100'; }
  else if (result >= 5.0) { colorClass = 'text-orange-600'; bgClass = 'bg-orange-50 border-orange-100'; }
  else { colorClass = 'text-rose-600'; bgClass = 'bg-rose-50 border-rose-100'; }

  return (
    <div className={`mt-6 p-6 rounded-xl border ${bgClass} text-center animate-in fade-in slide-in-from-bottom-4 duration-500`}>
      <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2">{label}</p>
      <div className={`text-5xl font-bold ${colorClass} tracking-tight`}>
        {result.toFixed(2)}
      </div>
      {subtext && <p className="mt-2 text-slate-600 font-medium">{subtext}</p>}
    </div>
  );
};

export const AchievementBanner: React.FC<{ score: number; type: 'semester' | 'year' }> = ({ score, type }) => {
  // Check if score is >= 8.0 for Excellent Student
  if (score < 8.0) return null;

  return (
    <div className="mt-6 relative overflow-hidden rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg shadow-orange-100 animate-in zoom-in duration-500 ring-2 ring-offset-2 ring-yellow-200">
      {/* Decorative circles */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-white opacity-20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-yellow-200 opacity-20 rounded-full blur-xl"></div>

      <div className="p-1">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4 relative z-10 text-white border border-white/20">
            <div className="bg-white/20 p-3 rounded-full shrink-0 shadow-inner">
                <Trophy size={32} className="text-yellow-50 drop-shadow-md" />
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-lg leading-tight drop-shadow-sm">
                    {type === 'year' ? 'Chúc Mừng HS Giỏi Cả Năm! 🎉' : 'Chúc Mừng HS Giỏi Học Kỳ! 🏆'}
                </h4>
                <p className="text-yellow-50 text-sm mt-1 font-medium opacity-95">
                    Điểm tổng kết {score.toFixed(2)}. Bạn quá xuất sắc!
                </p>
            </div>
            <div className="hidden sm:block opacity-30 rotate-12">
                <Medal size={48} />
            </div>
        </div>
      </div>
    </div>
  );
};

// Internal component to render Latex
const LatexRenderer: React.FC<{ latex: string }> = ({ latex }) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    try {
      // Use renderToString to avoid DOM access and quirks mode checks
      const rendered = katex.renderToString(latex, {
        throwOnError: false,
        displayMode: true,
      });
      setHtml(rendered);
    } catch (e) {
      console.error("KaTeX rendering error", e);
      setHtml(latex); // Fallback to raw text
    }
  }, [latex]);

  return (
    <div 
      className="overflow-x-auto overflow-y-hidden py-1"
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
};

export const FormulaGuide: React.FC<{
  title: string;
  formula: string;
  explanation: string;
  tips: string[];
}> = ({ title, formula, explanation, tips }) => (
  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 mt-8 space-y-4">
    <div className="flex items-center gap-2">
      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
      <h3 className="font-semibold text-slate-800">{title}</h3>
    </div>
    
    <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm text-slate-700">
      <LatexRenderer latex={formula} />
    </div>
    
    <p className="text-sm text-slate-600 leading-relaxed">
      <span className="font-semibold text-slate-700">Cách tính: </span>
      {explanation}
    </p>

    <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
      <p className="text-xs font-bold text-amber-600 uppercase mb-2 flex items-center gap-1">
        💡 Mẹo nhỏ
      </p>
      <ul className="list-disc list-inside space-y-1">
        {tips.map((tip, idx) => (
          <li key={idx} className="text-sm text-slate-700">{tip}</li>
        ))}
      </ul>
    </div>
  </div>
);