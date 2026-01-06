import { CalculatorType, FormulaInfo } from './types';
import { Calculator, Calendar, Target, TrendingUp } from 'lucide-react';

export const TOOLS = [
  {
    id: CalculatorType.SUBJECT_AVG,
    name: 'Tính TBM (Môn)',
    icon: Calculator,
    description: 'Tính điểm trung bình môn (Miệng, 15p, GK, CK).',
    color: 'bg-blue-500',
  },
  {
    id: CalculatorType.SEMESTER_AVG,
    name: 'Tính TB Học Kỳ',
    icon: Calendar,
    description: 'Tổng kết điểm học kỳ dựa trên các môn học.',
    color: 'bg-emerald-500',
  },
  {
    id: CalculatorType.YEARLY_AVG,
    name: 'Tính TB Cả Năm',
    icon: TrendingUp,
    description: 'Tổng kết điểm cả năm học (HK1 + HK2).',
    color: 'bg-indigo-500',
  },
  {
    id: CalculatorType.TARGET_SCORE,
    name: 'Tính Điểm Cần Đạt',
    icon: Target,
    description: 'Mục tiêu điểm thi để đạt học sinh giỏi/khá.',
    color: 'bg-rose-500',
  },
];

export const FORMULAS: Record<CalculatorType, FormulaInfo> = {
  [CalculatorType.SUBJECT_AVG]: {
    title: 'Công thức TBM (Trung Bình Môn)',
    formula: '\\text{TBM} = \\frac{\\text{Tổng Đ.Hệ Số 1} + (\\text{Đ.GK} \\times 2) + (\\text{Đ.CK} \\times 3)}{\\text{Tổng số hệ số}}',
    explanation: 'Cộng tổng điểm kiểm tra thường xuyên (hệ số 1), cộng điểm giữa kỳ (nhân 2) và điểm cuối kỳ (nhân 3). Sau đó chia cho tổng các hệ số.',
    tips: [
      'Điểm "Thường Xuyên" gồm: Kiểm tra miệng, 15 phút.',
      'Điểm "Giữa Kỳ" (GK) rất quan trọng, hệ số 2.',
      'Điểm "Cuối Kỳ" (CK) hệ số 3 là cơ hội lớn nhất để kéo điểm.',
      'Ví dụ: Bạn có 3 bài 15p, 1 bài GK, 1 bài CK. Tổng hệ số = 3 + 2 + 3 = 8.'
    ]
  },
  [CalculatorType.SEMESTER_AVG]: {
    title: 'Công thức TBHK (Trung Bình Học Kỳ)',
    formula: '\\text{TBHK} = \\frac{\\sum (\\text{Đ.Môn} \\times \\text{Hệ Số Môn})}{\\text{Tổng các hệ số môn}}',
    explanation: 'Lấy điểm trung bình của từng môn nhân với hệ số của môn đó (thường môn chính hệ số 2), rồi chia cho tổng hệ số.',
    tips: [
      'Thông thường: Toán, Văn, Anh tính hệ số 2.',
      'Các môn còn lại tính hệ số 1.',
      'Đừng bỏ bê môn phụ, điểm 9, 10 môn phụ kéo điểm rất nhanh!',
      'Cân bằng học đều các môn là chiến thuật tốt nhất.'
    ]
  },
  [CalculatorType.YEARLY_AVG]: {
    title: 'Công thức TBCN (Trung Bình Cả Năm)',
    formula: '\\text{TBCN} = \\frac{\\text{Đ.HK1} + (\\text{Đ.HK2} \\times 2)}{3}',
    explanation: 'Điểm học kỳ 2 nhân đôi cộng với học kỳ 1, sau đó chia cho 3. Học kỳ 2 quyết định rất lớn đến kết quả cả năm.',
    tips: [
      'Học kỳ 2 quan trọng gấp đôi học kỳ 1.',
      'Nếu HK1 lỡ thấp, bạn hoàn toàn có thể gỡ lại ở HK2.',
      'Ví dụ: HK1 được 6.5, chỉ cần HK2 được 7.8 là cả năm được 7.4 -> Học sinh Khá.'
    ]
  },
  [CalculatorType.TARGET_SCORE]: {
    title: 'Công thức Tính Điểm Cần Thi',
    formula: '\\text{Điểm Cần} = \\frac{\\text{Mục Tiêu} \\times \\text{Tổng HS} - \\text{Điểm Đang Có}}{\\text{Hệ Số Bài Thi}}',
    explanation: 'Giúp bạn biết chính xác bài kiểm tra sắp tới cần được bao nhiêu điểm để đạt mục tiêu.',
    tips: [
      'Nhập điểm mục tiêu (ví dụ: 8.0).',
      'Nhập điểm trung bình hiện tại.',
      'Hệ thống sẽ tính ra con số chính xác bạn cần đạt.',
      'Tránh áp lực: Hãy đặt nhiều mục tiêu nhỏ để phấn đấu.'
    ]
  }
};