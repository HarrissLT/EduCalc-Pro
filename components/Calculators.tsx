import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { InputGroup, ResultBox, FormulaGuide, AchievementBanner } from './UIComponents';
import { FORMULAS } from '../constants';
import { CalculatorType } from '../types';

// --- Subject Average Calculator ---
export const SubjectAvgCalc: React.FC<{ onResultChange: (val: number) => void }> = ({ onResultChange }) => {
  // Default 4 slots for regular tests (Oral, 15m x 3 is common)
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

    // Regular coeff 1, Midterm coeff 2, Final coeff 3
    const sum = regScores.reduce((a, b) => a + b, 0) + (midScore * 2) + (finalScore * 3);
    const totalCoeff = regScores.length + 2 + 3;
    
    const avg = sum / totalCoeff;
    setResult(avg);
    onResultChange(avg);
  };

  useEffect(() => { calculate(); }, [regulars, midterm, final]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
          <label className="text-sm font-bold text-blue-800 ml-1 block mb-2">
            1. Điểm Hệ Số 1 (Kiểm tra Miệng, 15 phút)
          </label>
          <div className="flex flex-wrap gap-3">
            {regulars.map((score, idx) => (
              <div key={idx} className="relative w-20">
                <input
                  type="number"
                  className="w-full px-3 py-2.5 bg-white border border-blue-200 rounded-lg text-center focus:ring-2 focus:ring-blue-500 outline-none font-medium shadow-sm"
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
                        className="absolute -top-2 -right-2 bg-rose-100 text-rose-500 rounded-full p-0.5 hover:bg-rose-200 shadow-sm"
                        title="Xóa điểm này"
                    >
                        <X size={12} />
                    </button>
                )}
              </div>
            ))}
            <button
              onClick={() => setRegulars([...regulars, ''])}
              className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-dashed border-blue-300 text-blue-400 hover:border-blue-500 hover:text-blue-600 transition-colors bg-white"
              title="Thêm cột điểm"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup label="2. Điểm Giữa Kỳ (Hệ số 2)" value={midterm} onChange={setMidterm} placeholder="Bài 1 tiết/GK..." />
          <InputGroup label="3. Điểm Cuối Kỳ (Hệ số 3)" value={final} onChange={setFinal} placeholder="Bài thi HK..." />
        </div>
      </div>

      <ResultBox result={result} label="Điểm Trung Bình Môn" subtext={result && result >= 5 ? "Đã qua môn! Chúc mừng bạn 🎉" : "Cần cố gắng thêm xíu nữa! 💪"} />
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
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
        <InputGroup label="Điểm TB Học Kỳ 1" value={sem1} onChange={setSem1} placeholder="Ví dụ: 7.5" />
        <div className="relative">
             <InputGroup label="Điểm TB Học Kỳ 2" value={sem2} onChange={setSem2} suffix="x2" placeholder="Ví dụ: 8.0" />
             <div className="absolute -top-6 right-0 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 animate-bounce">
                Quan trọng!
             </div>
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
    <div className="space-y-6">
      <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl mb-4 text-sm text-rose-800">
        Bạn muốn biết bài thi cuối kỳ cần bao nhiêu điểm để được <b>Học Sinh Giỏi (8.0)</b>? Nhập số liệu bên dưới nhé!
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup label="Điểm trung bình hiện có" value={currentAvg} onChange={setCurrentAvg} placeholder="Ví dụ: 7.2" />
        <InputGroup label="Mục tiêu tổng kết" value={target} onChange={setTarget} placeholder="Ví dụ: 8.0" />
      </div>
      
      <div className="grid grid-cols-2 gap-6 p-5 bg-slate-50 rounded-xl border border-slate-200">
        <div className="col-span-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            <span className="text-sm font-bold text-slate-600 uppercase">Cấu hình hệ số (Mặc định)</span>
        </div>
        <InputGroup label="Tổng hệ số đã có" value={currentWeight} onChange={setCurrentWeight} placeholder="Thường là 7 hoặc 12" />
        <InputGroup label="Hệ số bài thi sắp tới" value={weight} onChange={setWeight} placeholder="Thường là 3 (Thi HK)" />
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

// --- Semester Average Calculator (Simple List) ---
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

        // Default coefficients for Main subjects (Toan, Van, Anh often x2)
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
        <div className="space-y-8">
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <p className="text-sm font-semibold text-indigo-800 mb-3 flex items-center gap-2">
                    📚 Các Môn Chính (Hệ số 2)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputGroup label="Toán" value={math} onChange={setMath} suffix="x2" />
                    <InputGroup label="Ngữ Văn" value={lit} onChange={setLit} suffix="x2" />
                    <InputGroup label="Tiếng Anh" value={eng} onChange={setEng} suffix="x2" />
                </div>
            </div>
            
            <div>
                <p className="text-sm font-semibold text-slate-700 mb-3 ml-1">🧪 Các Môn Khác (Hệ số 1 - Lý, Hóa, Sinh, Sử, Địa...)</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
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
                                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-center focus:ring-2 focus:ring-blue-500 outline-none transition-shadow hover:shadow-sm"
                                placeholder={`Môn ${idx + 1}`}
                            />
                        </div>
                    ))}
                    <button
                        onClick={() => setOthers([...others, ''])}
                        className="flex items-center justify-center px-3 py-2.5 border border-dashed border-slate-300 rounded-lg text-slate-500 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all"
                    >
                        <Plus size={18} className="mr-1" /> Thêm
                    </button>
                </div>
            </div>

             <ResultBox result={result} label="Điểm Trung Bình Học Kỳ" />
             {result !== null && <AchievementBanner score={result} type="semester" />}
             <FormulaGuide {...FORMULAS[CalculatorType.SEMESTER_AVG]} />
        </div>
    )
}