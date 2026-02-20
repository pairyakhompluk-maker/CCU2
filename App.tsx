
import React, { useState, useEffect, useRef } from 'react';
import { AssessmentType, AssessmentResult } from './types';
import ScaleSelector from './components/ScaleSelector';
import NRSComponent from './components/NRSComponent';
import FacesComponent from './components/FacesComponent';
import CPOTComponent from './components/CPOTComponent';
import DyspneaComponent from './components/DyspneaComponent';
import ManagementView from './components/ManagementView';
import HistoryView from './components/HistoryView';
import SatisfactionView from './components/SatisfactionView';
import InstallGuideModal from './components/InstallGuideModal';
import { Heart, Clock, ArrowRight, RotateCcw, CheckCircle, Download, Sparkles } from 'lucide-react';

type Step = 'ASSESSMENT' | 'MANAGEMENT' | 'SATISFACTION' | 'SUMMARY' | 'HISTORY';

const App: React.FC = () => {
  const [scale, setScale] = useState<AssessmentType>('NRS');
  const [score, setScore] = useState<number>(0);
  const [currentResult, setCurrentResult] = useState<AssessmentResult | null>(null);
  const [step, setStep] = useState<Step>('ASSESSMENT');
  const [patientSessionId, setPatientSessionId] = useState<string>(Date.now().toString());
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  
  // For PWA Native Install Prompt
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      setIsInstallModalOpen(true);
    }
  };

  const startNewPatient = () => {
    setPatientSessionId(Date.now().toString());
    reset();
  };

  const reset = () => {
    setStep('ASSESSMENT');
    setCurrentResult(null);
    setScore(0);
  };

  const handleAssessmentComplete = () => {
    const initial: AssessmentResult = {
      id: Date.now().toString(),
      patientSessionId: patientSessionId,
      type: scale,
      score: score,
      timestamp: new Date(),
    };
    setCurrentResult(initial);
    setStep('MANAGEMENT');
  };

  const handleManagementComplete = (updatedResult: AssessmentResult) => {
    setCurrentResult(updatedResult);
    setStep('SATISFACTION');
  };

  const handleSatisfactionComplete = (satisfactionScore: number) => {
    if (!currentResult) return;
    
    const finalRecord: AssessmentResult = {
      ...currentResult,
      satisfactionScore
    };

    const existingHistory = JSON.parse(localStorage.getItem('careease_history') || '[]');
    localStorage.setItem('careease_history', JSON.stringify([...existingHistory, finalRecord]));

    setCurrentResult(finalRecord);
    setStep('SUMMARY');
  };

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900 pb-12">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30 px-6 py-4 flex items-center justify-between shadow-sm">
        <button onClick={reset} className="flex items-center gap-2 outline-none">
          <div className="bg-blue-600 p-2 rounded-xl shadow-md shadow-blue-100">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <div className="text-left">
            <h1 className="text-xl font-black text-gray-800 tracking-tight leading-none">CareEase</h1>
            <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Nursing Care</p>
          </div>
        </button>
        <div className="flex gap-2">
          {deferredPrompt ? (
            <button 
              onClick={handleInstallClick}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 animate-bounce"
            >
              <Download className="w-4 h-4" />
              <span className="text-xs font-bold">ติดตั้งแอป</span>
            </button>
          ) : (
            <button 
              onClick={() => setIsInstallModalOpen(true)}
              className="flex items-center justify-center p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all"
            >
              <Download className="w-5 h-5" />
            </button>
          )}
          <button 
            onClick={() => setStep('HISTORY')}
            className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full transition-all ${
              step === 'HISTORY' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>ประวัติ</span>
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-8">
        {step === 'ASSESSMENT' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black text-gray-800">ประเมินอาการ</h2>
                <p className="text-gray-500 mt-1">Session ID: {patientSessionId.slice(-4)}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-2xl relative">
                <Heart className="w-6 h-6 text-blue-500 animate-pulse" />
                <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1" />
              </div>
            </div>

            <ScaleSelector currentScale={scale} onSelect={setScale} />

            <div className="mb-8">
              {scale === 'NRS' && <NRSComponent value={score} onChange={setScore} />}
              {scale === 'FACES' && <FacesComponent value={score} onChange={setScore} />}
              {scale === 'CPOT' && <CPOTComponent onScoreChange={setScore} />}
              {scale === 'DYSPNEA' && <DyspneaComponent value={score} onChange={setScore} />}
            </div>

            <button
              onClick={handleAssessmentComplete}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-3xl text-xl shadow-2xl shadow-blue-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              ประเมินและไปต่อ <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {step === 'MANAGEMENT' && currentResult && (
          <ManagementView 
            result={currentResult} 
            onComplete={handleManagementComplete}
            onCancel={reset}
          />
        )}

        {step === 'SATISFACTION' && (
          <SatisfactionView onComplete={handleSatisfactionComplete} />
        )}

        {step === 'SUMMARY' && currentResult && (
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-50 text-center animate-in slide-in-from-bottom-8 duration-700">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-blue-500" />
            </div>
            <h2 className="text-2xl font-black text-gray-800 mb-2">บันทึกข้อมูลสำเร็จ!</h2>
            <p className="text-gray-500 mb-8">ข้อมูลการประเมินและการจัดการถูกจัดเก็บลงในประวัติแล้ว</p>
            
            <div className="flex flex-col gap-4">
              <button
                onClick={reset}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-blue-100"
              >
                <RotateCcw className="w-5 h-5" /> ประเมินซ้ำ (ผู้ป่วยเดิม)
              </button>
              <button
                onClick={startNewPatient}
                className="w-full bg-gray-100 text-gray-600 py-3 rounded-2xl font-bold"
              >
                เริ่มเคสผู้ป่วยใหม่
              </button>
            </div>
          </div>
        )}

        {step === 'HISTORY' && (
          <HistoryView onBack={reset} />
        )}
      </main>

      <InstallGuideModal 
        isOpen={isInstallModalOpen} 
        onClose={() => setIsInstallModalOpen(false)} 
      />

      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 p-4 flex justify-around text-gray-400 text-[10px] font-black uppercase tracking-widest md:hidden z-40">
        <button onClick={reset} className={`flex flex-col items-center gap-1 transition-colors ${step !== 'HISTORY' ? 'text-blue-600' : 'hover:text-gray-600'}`}>
          <Heart className={`w-5 h-5 ${step !== 'HISTORY' ? 'fill-blue-100' : ''}`} />
          <span>ประเมิน</span>
        </button>
        <button onClick={handleInstallClick} className="flex flex-col items-center gap-1 hover:text-gray-600">
          <Download className="w-5 h-5" />
          <span>ติดตั้ง</span>
        </button>
        <button onClick={() => setStep('HISTORY')} className={`flex flex-col items-center gap-1 transition-colors ${step === 'HISTORY' ? 'text-blue-600' : 'hover:text-gray-600'}`}>
          <Clock className={`w-5 h-5 ${step === 'HISTORY' ? 'fill-blue-100' : ''}`} />
          <span>ประวัติ</span>
        </button>
      </div>
    </div>
  );
};

export default App;
