import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { InputGroup, ResultBox, FormulaGuide, AchievementBanner } from './UIComponents';
import { FORMULAS } from '../constants';
import { CalculatorType } from '../types';

// --- Subject Average Calculator ---
export const SubjectAvgCalc: React.FC<{ onResultChange: (val: number) => void }> = ({ onResultChange }) => {
  const [regulars, setRegulars] = useState<string[]>(['', '', '', '']);
  const [midterm, setMidterm] = useState<string>('');
  const [final, setFinal] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const regScores = regulars.map(s => parseFloat(s)).filter(n => !isNaN(n));
    const midScore = parseFloat(midterm);
    const finalScore = parseFloat(final);

    if (isNaN(midScore) || isNaN(finalScore)) {
      setResult(null);
      return;
    }

    const sum = regScores.reduce((a, b) => a + b, 0) + (midScore * 2) + (finalScore * 3);
    const totalCoeff = regScores.length + 2 + 3;
    const avg = sum / totalCoeff;
    setResult(avg);
    onResultChange(avg);
  };

  useEffect(() => { calculate(); }, [regulars, midterm, final]);

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100/50">
          <label className="text-sm font-bold text-slate-700 block mb-4 flex items-center gap-2">
             <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">1</span>
             Điểm Hệ Số 1 (Kiểm tra Miệng, 15 phút)
          </label>
          <div className="flex flex-wrap gap-4">
            {regulars.map((score, idx) => (
              <div key={idx} className="relative w-24 group">
                <input
                  type="number"
                  className="w-full px-2 py-3 bg-white border border-slate-200 rounded-xl text-center focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-lg shadow-sm transition-all"
                  value={score}
                  onChange={(e) => {
                    const newRegs = [...regulars];
                    newRegs[idx] = e.target.value;
                    setRegulars(newRegs);
                  }}
                  placeholder={`Bài ${idx + 1}`}
                />
                {regulars.length > 1 && (
                    <button 
                        onClick={() => setRegulars(regulars.filter((_, i) => i !== idx))}
                        className="absolute -top-2 -right-2 bg-white text-rose-500 border border-rose-100 rounded-full p-1 opacity-0 group-hover:opacity-100 shadow-md transition-opacity hover:bg-rose-50"
                        title="Xóa điểm này"
                    >
                        <X size={12} strokeWidth={3} />
                    </button>
                )}
              </div>
            ))}
            <button
              onClick={() => setRegulars([...regulars, ''])}
              className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-slate-400 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all"
              title="Thêm cột điểm"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InputGroup label="2. Điểm Giữa Kỳ (Hệ số 2)" value={midterm} onChange={setMidterm} placeholder="0.0" />
          <InputGroup label="3. Điểm Cuối Kỳ (Hệ số 3)" value={final} onChange={setFinal} placeholder="0.0" />
        </div>
      </div>

      <ResultBox result={result} label="Điểm Trung Bình Môn" subtext={result && result >= 5 ? "Đã qua môn! Chúc mừng bạn 🎉" : "Cố gắng hơn ở kỳ sau nhé! 💪"} />
      <FormulaGuide {...FORMULAS[CalculatorType.SUBJECT_AVG]} />
    </div>
  );
};

// --- Yearly Average Calculator ---
export const YearlyAvgCalc: React.FC<{ onResultChange: (val: number) => void }> = ({ onResultChange }) => {
  const [sem1, setSem1] = useState('');
  const [sem2, setSem2] = useState('');
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const s1 = parseFloat(sem1);
    const s2 = parseFloat(sem2);
    if (!isNaN(s1) && !isNaN(s2)) {
      const avg = (s1 + s2 * 2) / 3;
      setResult(avg);
      onResultChange(avg);
    } else {
      setResult(null);
    }
  }, [sem1, sem2]);

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
        <InputGroup label="Học Kỳ 1" value={sem1} onChange={setSem1} placeholder="Ví dụ: 7.5" suffix="HS 1" />
        <div className="relative">
             <div className="absolute -top-8 left-0 text-xs font-bold text-emerald-600 bg-emerald-100/50 px-3 py-1 rounded-full border border-emerald-100 animate-bounce">
                Hệ số 2
             </div>
             <InputGroup label="Học Kỳ 2" value={sem2} onChange={setSem2} suffix="HS 2" placeholder="Ví dụ: 8.0" />
        </div>
      </div>
      <ResultBox result={result} label="Điểm Tổng Kết Cả Năm" />
      {result !== null && <AchievementBanner score={result} type="year" />}
      <FormulaGuide {...FORMULAS[CalculatorType.YEARLY_AVG]} />
    </div>
  );
};

// --- Target Score Calculator ---
export const TargetScoreCalc: React.FC<{ onResultChange: (val: number) => void }> = ({ onResultChange }) => {
  const [currentAvg, setCurrentAvg] = useState('');
  const [target, setTarget] = useState('');
  const [weight, setWeight] = useState('3'); 
  const [currentWeight, setCurrentWeight] = useState('7'); 
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const c = parseFloat(currentAvg);
    const t = parseFloat(target);
    const fw = parseFloat(weight); 
    const cw = parseFloat(currentWeight); 

    if (!isNaN(c) && !isNaN(t) && !isNaN(fw) && !isNaN(cw) && fw > 0) {
        const totalWeight = cw + fw;
        const requiredScore = (t * totalWeight - c * cw) / fw;
        setResult(requiredScore);
        onResultChange(requiredScore);
    } else {
        setResult(null);
    }
  }, [currentAvg, target, weight, currentWeight]);

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-100 p-6 rounded-2xl text-rose-800 flex gap-4">
        <span className="text-2xl">🎯</span>
        <div>
            <p className="font-bold mb-1">Tính điểm mục tiêu</p>
            <p className="text-sm opacity-80">Bạn muốn biết bài thi cuối kỳ cần bao nhiêu điểm để được <b>Học Sinh Giỏi (8.0)</b>? Nhập số liệu bên dưới nhé!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InputGroup label="Điểm trung bình hiện có" value={currentAvg} onChange={setCurrentAvg} placeholder="Ví dụ: 7.2" />
        <InputGroup label="Mục tiêu tổng kết" value={target} onChange={setTarget} placeholder="Ví dụ: 8.0" />
      </div>
      
      <div className="p-6 bg-slate-50/80 rounded-2xl border border-slate-200/60">
        <div className="flex items-center gap-2 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Cấu hình hệ số</span>
        </div>
        <div className="grid grid-cols-2 gap-8">
            <InputGroup label="Tổng hệ số đã có" value={currentWeight} onChange={setCurrentWeight} placeholder="7 hoặc 12" />
            <InputGroup label="Hệ số bài sắp thi" value={weight} onChange={setWeight} placeholder="Thường là 3" />
        </div>
      </div>

      <ResultBox 
        result={result} 
        label="Điểm Bài Thi Cần Đạt" 
        subtext={result && result > 10 ? "⚠️ Hơi khó rồi! (> 10 điểm)" : result && result <= 0 ? "Chắc chắn đạt! (Cần > 0)" : "Cố lên! Bạn làm được!"} 
      />
      <FormulaGuide {...FORMULAS[CalculatorType.TARGET_SCORE]} />
    </div>
  );
};

// --- Semester Average Calculator ---
export const SemesterAvgCalc: React.FC<{ onResultChange: (val: number) => void }> = ({ onResultChange }) => {
    const [math, setMath] = useState('');
    const [lit, setLit] = useState('');
    const [eng, setEng] = useState('');
    const [others, setOthers] = useState<string[]>(['', '', '', '', '']);
    const [result, setResult] = useState<number | null>(null);

    useEffect(() => {
        const m = parseFloat(math) || 0;
        const l = parseFloat(lit) || 0;
        const e = parseFloat(eng) || 0;
        const otherScores = others.map(s => parseFloat(s)).filter(n => !isNaN(n));
        
        let totalScore = 0;
        let totalCoeff = 0;

        if (math) { totalScore += m * 2; totalCoeff += 2; }
        if (lit) { totalScore += l * 2; totalCoeff += 2; }
        if (eng) { totalScore += e * 2; totalCoeff += 2; }

        otherScores.forEach(s => {
            totalScore += s;
            totalCoeff += 1;
        });

        if (totalCoeff > 0) {
            const avg = totalScore / totalCoeff;
            setResult(avg);
            onResultChange(avg);
        } else {
            setResult(null);
        }
    }, [math, lit, eng, others]);

    return (
        <div className="space-y-10">
            <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100/50">
                <p className="text-sm font-bold text-indigo-800 mb-6 flex items-center gap-2 uppercase tracking-wider">
                    📚 Các Môn Chính (Hệ số 2)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InputGroup label="Toán" value={math} onChange={setMath} suffix="x2" />
                    <InputGroup label="Ngữ Văn" value={lit} onChange={setLit} suffix="x2" />
                    <InputGroup label="Tiếng Anh" value={eng} onChange={setEng} suffix="x2" />
                </div>
            </div>
            
            <div>
                <p className="text-sm font-bold text-slate-700 mb-4 ml-1 flex items-center gap-2 uppercase tracking-wider">
                    🧪 Các Môn Khác (Hệ số 1)
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {others.map((val, idx) => (
                        <div key={idx} className="relative">
                            <input
                                type="number"
                                value={val}
                                onChange={(e) => {
                                    const newOthers = [...others];
                                    newOthers[idx] = e.target.value;
                                    setOthers(newOthers);
                                }}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-center focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm font-medium"
                                placeholder={`Môn ${idx + 1}`}
                            />
                        </div>
                    ))}
                    <button
                        onClick={() => setOthers([...others, ''])}
                        className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 font-bold hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all"
                    >
                        <Plus size={20} className="mr-1" /> Thêm môn
                    </button>
                </div>
            </div>

             <ResultBox result={result} label="Điểm Trung Bình Học Kỳ" />
             {result !== null && <AchievementBanner score={result} type="semester" />}
             <FormulaGuide {...FORMULAS[CalculatorType.SEMESTER_AVG]} />
        </div>
    )
}