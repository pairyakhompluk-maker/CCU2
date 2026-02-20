
import React from 'react';
import { AssessmentType } from '../types';
import { Activity, UserCheck, ClipboardList, Wind } from 'lucide-react';

interface ScaleSelectorProps {
  currentScale: AssessmentType;
  onSelect: (scale: AssessmentType) => void;
}

const ScaleSelector: React.FC<ScaleSelectorProps> = ({ currentScale, onSelect }) => {
  const options = [
    { id: 'NRS', label: 'Numeric Scale (NRS)', icon: <Activity className="w-5 h-5" /> },
    { id: 'FACES', label: 'Face Scale (WBF)', icon: <UserCheck className="w-5 h-5" /> },
    { id: 'CPOT', label: 'CPOT (สำหรับผู้ป่วยหนัก)', icon: <ClipboardList className="w-5 h-5" /> },
    { id: 'DYSPNEA', label: 'อาการเหนื่อย', icon: <Wind className="w-5 h-5" /> },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onSelect(opt.id as AssessmentType)}
          className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all border-2 ${
            currentScale === opt.id 
              ? 'bg-blue-600 border-blue-600 text-white shadow-lg' 
              : 'bg-white border-gray-100 text-gray-600 hover:border-blue-200'
          }`}
        >
          {opt.icon}
          <span className="mt-2 text-sm font-medium text-center">{opt.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ScaleSelector;
