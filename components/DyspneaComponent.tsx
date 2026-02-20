
import React from 'react';
import { Wind, AlertTriangle } from 'lucide-react';

interface DyspneaProps {
  value: number;
  onChange: (val: number) => void;
}

const DyspneaComponent: React.FC<DyspneaProps> = ({ value, onChange }) => {
  const getIntensityLabel = (v: number) => {
    if (v === 0) return "ไม่เหนื่อยเลย (Nothing at all)";
    if (v <= 2) return "เหนื่อยเล็กน้อย (Very slight/Slight)";
    if (v <= 4) return "เหนื่อยปานกลาง (Moderate)";
    if (v <= 6) return "เหนื่อยมาก (Somewhat severe/Severe)";
    if (v <= 9) return "เหนื่อยมากที่สุด (Very severe)";
    return "เหนื่อยที่สุดในชีวิต (Maximal)";
  };

  const getIntensityColor = (v: number) => {
    if (v === 0) return "text-emerald-500";
    if (v <= 3) return "text-blue-500";
    if (v <= 6) return "text-amber-500";
    return "text-rose-600";
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Wind className="w-6 h-6 text-teal-500" />
        <h3 className="text-xl font-semibold text-gray-800">ประเมินอาการเหนื่อย (Dyspnea)</h3>
      </div>
      
      <div className="relative pt-12 pb-8">
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-4 bg-teal-100 rounded-full appearance-none cursor-pointer accent-teal-600"
        />
        <div className="flex justify-between px-1 mt-4">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <span key={i} className={`text-sm font-bold ${value === i ? 'text-teal-600 scale-125' : 'text-gray-300'}`}>
              {i}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center bg-teal-50 p-6 rounded-2xl border border-teal-100">
        <p className={`text-2xl font-bold mb-1 ${getIntensityColor(value)}`}>{getIntensityLabel(value)}</p>
        <span className="text-4xl font-black text-teal-700">{value}</span>
        
        {value >= 7 && (
          <div className="mt-4 flex items-center justify-center gap-2 text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-100">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Critical Intensity</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DyspneaComponent;
