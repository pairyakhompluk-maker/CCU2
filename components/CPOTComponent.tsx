
import React, { useState, useEffect } from 'react';
import { CPOTScore } from '../types';

interface CPOTProps {
  onScoreChange: (total: number) => void;
}

const CPOTComponent: React.FC<CPOTProps> = ({ onScoreChange }) => {
  const [scores, setScores] = useState<CPOTScore>({
    facialExpression: 0,
    bodyMovements: 0,
    muscleTension: 0,
    compliance: 0
  });

  useEffect(() => {
    // Fix: Explicitly cast Object.values(scores) to number[] to resolve 'unknown' type errors in reduction
    const total = (Object.values(scores) as number[]).reduce((a: number, b: number) => a + b, 0);
    onScoreChange(total);
  }, [scores]);

  const updateScore = (key: keyof CPOTScore, val: number) => {
    setScores(prev => ({ ...prev, [key]: val }));
  };

  const sections = [
    {
      key: 'facialExpression',
      label: '1. การแสดงออกทางสีหน้า (Facial Expression)',
      options: [
        { val: 0, label: 'ปกติ / ผ่อนคลาย (Relaxed, Neutral)' },
        { val: 1, label: 'เกร็ง / คิ้วขมวด (Tense, Frowning)' },
        { val: 2, label: 'บูดเบี้ยว / หลับตาแน่น (Grimacing)' }
      ]
    },
    {
      key: 'bodyMovements',
      label: '2. การเคลื่อนไหวร่างกาย (Body Movements)',
      options: [
        { val: 0, label: 'ไม่มีการเคลื่อนไหว / อยู่ในท่าปกติ' },
        { val: 1, label: 'มีการเคลื่อนไหวช้าๆ / ป้องกันตัว' },
        { val: 2, label: 'กระสับกระส่าย / พยายามดึงสายยาง' }
      ]
    },
    {
      key: 'muscleTension',
      label: '3. ความตึงตัวของกล้ามเนื้อ (Muscle Tension)',
      options: [
        { val: 0, label: 'ปกติ / ไม่มีการเกร็งเมื่อขยับแขน' },
        { val: 1, label: 'เกร็งเล็กน้อย / มีแรงต้านเมื่อขยับ' },
        { val: 2, label: 'เกร็งมาก / มีแรงต้านรุนแรง' }
      ]
    },
    {
      key: 'compliance',
      label: '4. การทำงานร่วมกับเครื่องช่วยหายใจ / การเปล่งเสียง',
      options: [
        { val: 0, label: 'หายใจสัมพันธ์ดี / เงียบสงบ' },
        { val: 1, label: 'ไอแต่ยอมรับเครื่อง / บ่นพึมพำ' },
        { val: 2, label: 'ต้านเครื่องช่วยหายใจ / ร้องคราง/ตะโกน' }
      ]
    }
  ];

  // Fix: Explicitly cast Object.values(scores) to number[] to resolve 'unknown' type errors in reduction
  const total = (Object.values(scores) as number[]).reduce((a: number, b: number) => a + b, 0);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">CPOT Assessment (0-8)</h3>
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.key} className="border-b border-gray-100 pb-4 last:border-0">
            <p className="font-medium text-blue-800 mb-3">{section.label}</p>
            <div className="grid grid-cols-1 gap-2">
              {section.options.map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => updateScore(section.key as keyof CPOTScore, opt.val)}
                  className={`text-left px-4 py-2 rounded-xl text-sm transition-all ${
                    scores[section.key as keyof CPOTScore] === opt.val
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="font-bold mr-2">{opt.val}:</span> {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Total CPOT Score</p>
        <span className="text-5xl font-black text-blue-600">{total}</span>
        <p className="text-sm mt-2 font-medium text-gray-600">
          {total >= 3 ? '⚠️ มีความปวด (Significant Pain)' : 'ความปวดอยู่ในระดับที่ยอมรับได้'}
        </p>
      </div>
    </div>
  );
};

export default CPOTComponent;
