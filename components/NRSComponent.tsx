
import React from 'react';

interface NRSProps {
  value: number;
  onChange: (val: number) => void;
}

const NRSComponent: React.FC<NRSProps> = ({ value, onChange }) => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">ระดับความปวด (Numeric Rating Scale: 0-10)</h3>
      <div className="flex justify-between text-xs text-gray-500 mb-2 px-1">
        <span>ไม่ปวดเลย</span>
        <span>ปวดปานกลาง</span>
        <span>ปวดมากที่สุด</span>
      </div>
      <input
        type="range"
        min="0"
        max="10"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
      <div className="flex justify-between px-1 mt-2">
        {[...Array(11)].map((_, i) => (
          <span key={i} className={`text-sm font-bold ${value === i ? 'text-blue-600 scale-125 transition-transform' : 'text-gray-300'}`}>
            {i}
          </span>
        ))}
      </div>
      <div className="mt-8 text-center">
        <span className="text-5xl font-bold text-blue-600">{value}</span>
        <p className="text-gray-500 mt-2 font-medium">
          {value === 0 ? 'สบายดี' : value <= 3 ? 'ปวดน้อย' : value <= 6 ? 'ปวดปานกลาง' : 'ปวดรุนแรง'}
        </p>
      </div>
    </div>
  );
};

export default NRSComponent;
