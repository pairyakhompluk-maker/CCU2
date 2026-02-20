
import React, { useState } from 'react';
import { Star, Heart, CheckCircle } from 'lucide-react';

interface SatisfactionViewProps {
  onComplete: (score: number) => void;
}

const SatisfactionView: React.FC<SatisfactionViewProps> = ({ onComplete }) => {
  const [rating, setRating] = useState<number>(0);
  const [hovered, setHovered] = useState<number>(0);

  const labels = [
    "ไม่พอใจอย่างมาก",
    "ไม่พอใจ",
    "ปานกลาง",
    "พอใจ",
    "พอใจมากที่สุด"
  ];

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-50 text-center animate-in zoom-in-95 duration-500">
      <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <Heart className="w-10 h-10 text-emerald-500 fill-emerald-500" />
      </div>
      
      <h2 className="text-2xl font-black text-gray-800 mb-2">ความพึงพอใจต่อการจัดการ</h2>
      <p className="text-gray-500 mb-8">คุณรู้สึกอย่างไรหลังจากการจัดการความปวด/เหนื่อย?</p>

      <div className="flex justify-center gap-2 mb-8">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setRating(star)}
            className="group relative focus:outline-none"
          >
            <Star 
              className={`w-12 h-12 transition-all duration-200 ${
                star <= (hovered || rating) 
                  ? 'text-yellow-400 fill-yellow-400 scale-110' 
                  : 'text-gray-200'
              }`} 
            />
          </button>
        ))}
      </div>

      {rating > 0 && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300 mb-8">
          <p className="text-xl font-bold text-blue-600">{labels[rating - 1]}</p>
        </div>
      )}

      <button
        onClick={() => onComplete(rating)}
        disabled={rating === 0}
        className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
          rating > 0 
            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <CheckCircle className="w-5 h-5" /> บันทึกความพึงพอใจ
      </button>
    </div>
  );
};

export default SatisfactionView;
