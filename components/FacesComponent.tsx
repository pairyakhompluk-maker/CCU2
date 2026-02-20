
import React from 'react';
import { FACES_CONFIG } from '../constants';

interface FacesProps {
  value: number;
  onChange: (val: number) => void;
}

const FacesComponent: React.FC<FacesProps> = ({ value, onChange }) => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
      <h3 className="text-xl font-semibold text-gray-800 mb-8 text-center">ประเมินความปวดจากใบหน้า (Face Scale)</h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {FACES_CONFIG.map((face) => (
          <button
            key={face.score}
            onClick={() => onChange(face.score)}
            className={`flex flex-col items-center p-3 rounded-2xl transition-all border-2 ${
              value === face.score 
                ? 'bg-gray-50 border-blue-500 shadow-inner' 
                : 'border-transparent hover:bg-gray-50'
            }`}
          >
            <div className={`${face.color} ${value === face.score ? 'scale-110' : 'opacity-70'}`}>
              {face.icon}
            </div>
            <span className="mt-2 text-lg font-bold text-gray-800">{face.score}</span>
            <span className="text-[10px] text-gray-500 font-medium text-center leading-tight mt-1">{face.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FacesComponent;
