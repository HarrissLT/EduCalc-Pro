import React, { useState } from 'react';
import { Sparkles, MessageSquareQuote } from 'lucide-react';
import { getStudyAdvice } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface AIAdvisorProps {
  currentResult: number | null;
  calculatorType: string;
}

const AIAdvisor: React.FC<AIAdvisorProps> = ({ currentResult, calculatorType }) => {
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleGetAdvice = async () => {
    if (currentResult === null) return;
    
    setLoading(true);
    setAdvice('');

    const context = `Người dùng đang sử dụng công cụ: ${calculatorType}. Điểm tính ra là: ${currentResult.toFixed(2)}.`;
    const scores = { calculatedScore: currentResult }; // Simplified context passing

    const result = await getStudyAdvice(context, scores);
    setAdvice(result);
    setLoading(false);
  };

  if (currentResult === null) return null;

  return (
    <div className="mt-8 pt-8 border-t border-slate-200">
      <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-xl overflow-hidden relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-400 opacity-10 rounded-full -ml-5 -mb-5 blur-xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Sparkles className="w-6 h-6 text-yellow-300" />
            </div>
            <h3 className="text-xl font-bold">Góc lời khuyên AI</h3>
          </div>

          {!advice && !loading && (
            <div className="flex flex-col items-center justify-center py-4 text-center space-y-3">
              <p className="text-indigo-100">Bạn muốn nhận nhận xét và bí kíp học tập từ thầy giáo AI không?</p>
              <button
                onClick={handleGetAdvice}
                className="px-6 py-2.5 bg-white text-indigo-700 font-semibold rounded-full hover:bg-indigo-50 transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <MessageSquareQuote size={18} />
                Nhận lời khuyên ngay
              </button>
            </div>
          )}

          {loading && (
            <div className="py-6 flex flex-col items-center space-y-3">
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <p className="text-sm text-indigo-200 animate-pulse">Đang phân tích điểm số của bạn...</p>
            </div>
          )}

          {advice && (
            <div className="prose prose-invert prose-sm max-w-none animate-in fade-in duration-700">
              <ReactMarkdown>{advice}</ReactMarkdown>
              <button 
                onClick={handleGetAdvice}
                className="mt-4 text-xs text-indigo-200 hover:text-white underline decoration-dashed"
              >
                Xin lời khuyên khác
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAdvisor;