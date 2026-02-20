
import React, { useState, useEffect } from 'react';
import { AssessmentResult, ManagementCategory } from '../types';
import { MANAGEMENT_OPTIONS, MUSIC_GENRES } from '../constants';
import { getCareAdvice } from '../services/geminiService';
import { CheckCircle, Sparkles, Loader2, ChevronRight, Music, PenLine } from 'lucide-react';

interface ManagementViewProps {
  result: AssessmentResult;
  onComplete: (updatedResult: AssessmentResult) => void;
  onCancel: () => void;
}

const ManagementView: React.FC<ManagementViewProps> = ({ result, onComplete, onCancel }) => {
  const [selectedCategory, setSelectedCategory] = useState<ManagementCategory | 'ALL'>('ALL');
  const [selectedManagement, setSelectedManagement] = useState<string | null>(null);
  const [selectedMusicGenre, setSelectedMusicGenre] = useState<string | null>(null);
  const [customManagementText, setCustomManagementText] = useState<string>('');
  const [advice, setAdvice] = useState<any>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  useEffect(() => {
    async function fetchAdvice() {
      setLoadingAdvice(true);
      const data = await getCareAdvice(result);
      setAdvice(data);
      setLoadingAdvice(false);
    }
    fetchAdvice();
  }, [result]);

  const filteredOptions = selectedCategory === 'ALL' 
    ? MANAGEMENT_OPTIONS 
    : MANAGEMENT_OPTIONS.filter(o => o.category === selectedCategory);

  const handleProceed = () => {
    const updatedResult: AssessmentResult = {
      ...result,
      managementId: selectedManagement || undefined,
      musicGenre: selectedMusicGenre || undefined,
      customManagementText: selectedManagement === 'other' ? customManagementText : undefined
    };
    onComplete(updatedResult);
  };

  const isProceedDisabled = !selectedManagement || 
    (selectedManagement === 'music-therapy' && !selectedMusicGenre) || 
    (selectedManagement === 'other' && !customManagementText.trim());

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles className="w-24 h-24" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-bold text-lg uppercase tracking-wide">AI Care Advisor</h3>
          </div>
          
          {loadingAdvice ? (
            <div className="flex items-center gap-3 py-4">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>กำลังวิเคราะห์ผล...</span>
            </div>
          ) : advice ? (
            <div className="space-y-4">
              <div>
                <p className="text-indigo-100 text-xs mb-1 font-medium">สรุปอาการ (Score: {result.score})</p>
                <p className="text-lg leading-relaxed font-semibold">{advice.summary}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                  <p className="text-[10px] font-bold uppercase text-rose-200 mb-1">สัญญาณอันตราย</p>
                  <p className="text-xs">{advice.dangerSigns}</p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                  <p className="text-[10px] font-bold uppercase text-emerald-200 mb-1">คำแนะนำ</p>
                  <p className="text-xs">{advice.recommendation}</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="text-center pt-2">
        <h2 className="text-2xl font-black text-gray-800">เลือกวิธีการจัดการ</h2>
        <p className="text-gray-500">เลือกวิธีการพยาบาลที่เหมาะสมที่สุด</p>
      </div>

      <div className="flex justify-center gap-2">
        {['ALL', 'PHARMACO', 'NON_PHARMACO'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat as any)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedCategory === cat 
                ? 'bg-gray-800 text-white shadow-md' 
                : 'bg-white text-gray-500 border border-gray-100'
            }`}
          >
            {cat === 'ALL' ? 'ทั้งหมด' : cat === 'PHARMACO' ? 'ใช้ยา' : 'ไม่ใช้ยา'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => {
              setSelectedManagement(opt.id);
              if (opt.id !== 'music-therapy') setSelectedMusicGenre(null);
            }}
            className={`flex items-start p-4 rounded-3xl transition-all border-2 text-left group ${
              selectedManagement === opt.id 
                ? 'bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-100' 
                : 'bg-white border-gray-100 hover:border-blue-200'
            }`}
          >
            <div className={`p-3 rounded-2xl mr-3 ${selectedManagement === opt.id ? 'bg-white' : 'bg-gray-50'}`}>
              {opt.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <h4 className={`font-bold text-sm truncate ${selectedManagement === opt.id ? 'text-blue-900' : 'text-gray-800'}`}>
                  {opt.title}
                </h4>
                {selectedManagement === opt.id && <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />}
              </div>
              <p className="text-[10px] text-gray-400 mt-1 line-clamp-2">{opt.description}</p>
            </div>
          </button>
        ))}
      </div>

      {selectedManagement === 'music-therapy' && (
        <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100 animate-in zoom-in-95 duration-300 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-purple-800">
            <Music className="w-5 h-5" />
            <h3 className="font-bold">แนวเพลงดนตรีบำบัด</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {MUSIC_GENRES.map((genre) => (
              <button
                key={genre.id}
                onClick={() => setSelectedMusicGenre(genre.id)}
                className={`p-3 rounded-2xl text-left border-2 transition-all flex items-center gap-3 ${
                  selectedMusicGenre === genre.id ? 'bg-white border-purple-500 shadow-sm' : 'bg-white/40 border-transparent hover:bg-white'
                }`}
              >
                <div className={`p-2 rounded-xl flex-shrink-0 ${selectedMusicGenre === genre.id ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400'}`}>
                  {genre.icon}
                </div>
                <p className={`text-xs font-bold truncate ${selectedMusicGenre === genre.id ? 'text-purple-900' : 'text-gray-700'}`}>{genre.title}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedManagement === 'other' && (
        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 animate-in zoom-in-95 duration-300 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-gray-800">
            <PenLine className="w-5 h-5" />
            <h3 className="font-bold">ระบุวิธีการจัดการอื่นๆ</h3>
          </div>
          <textarea
            value={customManagementText}
            onChange={(e) => setCustomManagementText(e.target.value)}
            placeholder="พิมพ์รายละเอียดวิธีการจัดการที่นี่..."
            className="w-full p-4 rounded-2xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none h-24 text-sm"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 pt-4 animate-in slide-in-from-bottom-4 duration-500">
        <button
          onClick={handleProceed}
          disabled={isProceedDisabled}
          className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
            !isProceedDisabled
              ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 hover:bg-blue-700' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          จัดการอาการสำเร็จ <ChevronRight className="w-5 h-5" />
        </button>
        <button onClick={onCancel} className="w-full bg-white text-gray-500 py-3 rounded-2xl font-semibold border border-gray-200">
          ยกเลิก
        </button>
      </div>
    </div>
  );
};

export default ManagementView;
