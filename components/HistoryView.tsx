
import React from 'react';
import { AssessmentResult } from '../types';
import { FACES_CONFIG, MANAGEMENT_OPTIONS } from '../constants';
import { Clock, Calendar, Trash2, ChevronRight, Activity, UserCheck, ClipboardList, Wind, Star, PenLine } from 'lucide-react';

interface HistoryViewProps {
  onBack: () => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ onBack }) => {
  const [history, setHistory] = React.useState<AssessmentResult[]>([]);

  React.useEffect(() => {
    const saved = localStorage.getItem('careease_history');
    if (saved) {
      setHistory(JSON.parse(saved).sort((a: any, b: any) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ));
    }
  }, []);

  const clearHistory = () => {
    if (confirm('ลบประวัติทั้งหมดใช่หรือไม่?')) {
      localStorage.removeItem('careease_history');
      setHistory([]);
    }
  };

  const getScaleIcon = (type: string) => {
    switch(type) {
      case 'NRS': return <Activity className="w-4 h-4" />;
      case 'FACES': return <UserCheck className="w-4 h-4" />;
      case 'CPOT': return <ClipboardList className="w-4 h-4" />;
      case 'DYSPNEA': return <Wind className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getManagementTitle = (item: AssessmentResult) => {
    if (item.managementId === 'other' && item.customManagementText) {
      return item.customManagementText;
    }
    return MANAGEMENT_OPTIONS.find(o => o.id === item.managementId)?.title || 'ไม่มีข้อมูลการจัดการ';
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-2xl font-black text-gray-800">ประวัติการดูแล</h2>
          <p className="text-sm text-gray-500">บันทึกข้อมูลย้อนหลัง</p>
        </div>
        {history.length > 0 && (
          <button onClick={clearHistory} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center border-2 border-dashed border-gray-100">
          <Clock className="w-8 h-8 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400 font-medium">ไม่มีประวัติ</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase w-fit">
                    {getScaleIcon(item.type)}
                    <span>{item.type}</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">Case ID: {item.patientSessionId?.slice(-6)}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
                  <Calendar className="w-3 h-3" />
                  {new Date(item.timestamp).toLocaleString('th-TH')}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-gray-50 w-14 h-14 rounded-2xl flex flex-col items-center justify-center border border-gray-100">
                  <span className="text-xl font-black text-blue-600">{item.score}</span>
                  <span className="text-[8px] font-bold text-gray-400 uppercase">Score</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-800 text-sm truncate">
                    {item.managementId === 'other' ? (
                      <span className="flex items-center gap-1.5">
                        <PenLine className="w-3 h-3 text-gray-400" />
                        {item.customManagementText}
                      </span>
                    ) : (
                      getManagementTitle(item)
                    )}
                  </h4>
                  <div className="flex items-center gap-3 mt-1">
                    {item.satisfactionScore && (
                      <div className="flex items-center gap-0.5 text-yellow-500">
                        <Star className="w-3 h-3 fill-yellow-500" />
                        <span className="text-[10px] font-black">{item.satisfactionScore}/5</span>
                      </div>
                    )}
                    {item.musicGenre && <span className="text-[10px] text-purple-500 font-bold">♫ {item.musicGenre}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button onClick={onBack} className="w-full bg-gray-800 text-white py-4 rounded-2xl font-bold shadow-lg mt-4">
        กลับ
      </button>
    </div>
  );
};

export default HistoryView;
